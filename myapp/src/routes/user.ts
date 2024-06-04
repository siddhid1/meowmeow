import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { decode, sign, verify } from "hono/jwt";
import { signinInput, signupInput } from "@zicox/medium_common";

export const userRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
}>();

userRouter.post("/signup", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());
  const body = await c.req.json();
  const{success} = signupInput.safeParse(body)
  if(!success){
    c.status(411)
    return c.json({
        msg:"Incorrect Inputs"
    })
  }
  try {
    const user = await prisma.user.create({
      data: {
        email: body.email,
        password: body.password,
      },
    });
    const jwt = await sign(
      {
        id: user.id,
      },
      c.env.JWT_SECRET
    );

    return c.text(jwt);
  } catch (e) {
    console.log(e);
    c.status(411);
    return c.text("Invalid");
  }
});

userRouter.post("/signin", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());
  const body = await c.req.json();
  const {success} = signinInput.safeParse(body);
  if(!success){
    c.status(411)
    return c.json({
        msg:"incorrect inputs"
    })
  }
  try {
    const user = await prisma.user.findFirst({
      where: {
        email: body.email,
        password: body.password,
      },
    });
    if (!user) {
      c.status(403); //unauthorized
      return c.text("Invalid");
    }
    const jwt = await sign(
      {
        id: user.id,
      },
      c.env.JWT_SECRET
    );

    return c.text(jwt);
  } catch (e) {
    console.log(e);
    c.status(411);
    return c.text("Invalid");
  }
});
