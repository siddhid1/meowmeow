import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { decode, sign, verify } from "hono/jwt";
import { Jwt } from "hono/utils/jwt";
import { JWTPayload } from "hono/utils/jwt/types";

export const blogRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
  Variables: {
    userId: string;
  };
}>();

blogRouter.use("/*", async (c, next) => {
  //extracts the user id
  //pass it down to the route handler
  const authHeader = c.req.header("authorization") || "";
  try {
    const user = await verify(authHeader, c.env.JWT_SECRET);
    if (user) {
      // jwtPayload ke jaga pe userId hona cha hei ye re
      //@ts-ignore
      c.set("userId", user.id);
      await next();
    } else {
      c.status(403);
      return c.json({
        msg: "Error",
      });
    }
  } catch (e) {
    c.status(403);
    return c.json({
      msg: "You are not logged in",
    });
  }
});

blogRouter.post("/", async (c) => {
  const body = await c.req.json();
  const authorId = c.get("userId");
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const post = await prisma.post.create({
    data: {
      title: body.title,
      content: body.content,
      authorId: parseInt(authorId),
    },
  });

  return c.json({
    id: post.id,
  });
});

blogRouter.put("/", async (c) => {
  const body = await c.req.json();
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const post = await prisma.post.update({
    where: {
      id: body.id,
    },
    data: {
      title: body.title,
      content: body.content,
    },
  });

  return c.json({
    id: post.id,
  });
});

//add  pagination
blogRouter.get("/bulk", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  const allPosts = await prisma.post.findMany();
  return c.json({
    allPosts,
  });
});

blogRouter.get("/:id", async (c) => {
  const id = c.req.param("id");
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const post = await prisma.post.findFirst({
      where: {
        id: Number(id),
      },
    });
    return c.json({
      post,
    });
  } catch (e) {
    c.status(411);
    return c.json({
      msg: "Error",
    });
  }
});
