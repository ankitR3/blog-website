import { verify } from "hono/jwt";

export function initMiddleware(app) {
    app.use('/api/v1/blog/*', async (c, next) => {
        const header = c.req.header("authorization") || "";
        // Bearer token => ["Bearer", "token"];
        const token = header.split(" ")[1];

        if (!token) {
            c.status(403);
            return c.json({ error: "unauthorized" });
        }
        
        const response = await verify(token, c.env.JWT_SECRET)
        if (response.id) {
            c.set('userId', response.id as string);
            await next()
        } else {
          c.status(403)
          return c.json({ error: "unauthorized" })
        }
    }) 
}