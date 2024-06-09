import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { decode, sign, verify } from 'hono/jwt'
import { userRouter } from "./routes/user";
import { blogRouter } from "./routes/blog";
import { cors } from "hono/cors";
const app = new Hono<{
  Bindings: {
    DATABASE_URL: string;
	JWT_SECRET:string
  }
}>()
app.use('/*',cors())
app.route("/api/v1/user",userRouter)
app.route("/api/v1/blog",blogRouter)




// const prisma = new PrismaClient({
//   datasourceUrl:env.DATABASE_URL,
// }).$extends(withAccelerate())

// app.post("/api/v1/user/signup", async (c) => {
//   const body = await c.req.json();

//   const prisma = new PrismaClient({
//     datasourceUrl: c.env.DATABASE_URL,
//   }).$extends(withAccelerate())

//   //zod , hashing the password

//   try {
//     const user = await prisma.user.create({
//       data: {
//         email: body.email,
//         password: body.password,
//         name: body.name
//       }
//     });
//     return c.text("Ho gaya bc")
//   } catch (e) {
//     c.status(411);
//     console.log("here");
//     console.log(e);
//     return c.text("Invalid credentials");
//   }
// })




export default app;
