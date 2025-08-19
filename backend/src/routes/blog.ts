import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { verify } from "hono/jwt";
import { createPostInput, updatePostInput } from "@ankitr3/blog-common";

export const blogRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string;
        JWT_SECRET: string;
    },
    Variables: {
        userId: string
    }
}>();

blogRouter.use('/*', async (c, next) => {
  const authHeader = c.req.header("authorization") || "";
  try {
    const user = await verify(authHeader, c.env.JWT_SECRET)

    if (user) {
      // @ts-ignore
      c.set("userId", user.id);
      await next()
    } else {
      c.status(403);
      return c.json({
        message: "You are not logged in"
      })
    }
  } catch (e) {
    c.status(403);
    return c.json({
      message: "authentication failed"
    })
  }
});

blogRouter.post('/', async (c) => {
  try {
    const body = await c.req.json();
    console.log("Request body:", body); // Debug log

    const result = createPostInput.safeParse(body);
    console.log("Validation result:", result); // Debug log
    if (!result.success) {
      c.status(411);
      return c.json({
        message: "Inputs not correct",
        error: result.error.errors // Show the actual errors
      })
    }
    
    const authorId = c.get('userId');
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate())

    const blog = await prisma.blog.create({
      data: {
        title: body.title,
        content: body.content,
        authorId:  Number(authorId),
        date: new Date(),
      }
    })

    return c.json({
      id: blog.id
    });

  } catch (error) {
    console.log("Catch block error:", error);
    c.status(500);
    return c.json({ message: "blog post error", error});
  }
})

blogRouter.put('/', async (c) => {
  const userId = c.get('userId');
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL
  }).$extends(withAccelerate())

  const body = await c.req.json();
  const { success } = updatePostInput.safeParse(body);
  if (!success) {
    c.status(411);
    return c.json({
      message: "Inputs not correct"
    })
  }
  const post = await prisma.blog.update({
    where: {
      id: body.id,
      authorId:  Number(userId)
    },
    data: {
      title: body.title,
      content: body.content
    }
  })

  return c.json({
    id: post.id,
    message: 'updated post'
  });
})

blogRouter.get('/bulk', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())
  const blogs = await prisma.blog.findMany({
    select: {
      content: true,
      title: true,
      id: true,
      author: {
        select: {
          name: true
        }
      }
    }
  });

  return c.json({
    blogs
  });
})

blogRouter.get('/:id', async (c) => {
  const id = c.req.param('id');
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())

  try {
    const blog = await prisma.blog.findUnique({
      where: {
        id:  Number(id)
      },
      select: {
        id: true,
        title: true,
        content: true,
        author: {
          select: {
            name: true
          }
        }
      }
    });

    return c.json({
      blog
    });
  } catch (e) {
    c.status(411);
    return c.json({
      message: "Error while fetching blog post"
    });
  }
})