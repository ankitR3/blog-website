// import { Hono } from "hono";
// import { verify } from "hono/jwt";

// export function initMiddleware(app: Hono<any>) {
//     app.use('/api/v1/blog/*', async (c: any, next: any) => {
//         const header = c.req.header("Authorization") || "";
//         // Bearer token => ["Bearer", "token"];
//         if (!header) {
//             c.status(401);
//             return c.json({ error: "unauthorized" });
//         }
//         const token = header.split(' ')[1];

//         if (!token) {
//             c.status(403);
//             return c.json({ error: "unauthorized" });
//         }
        
//         const payload = await verify(token, c.env.JWT_SECRET)

//         if (!payload || !payload.id) {
//             c.status(401);
//             return c.json({ error: "unauthorized" });
//         }
//         c.set('userId', payload.id as string);
//         await next()
//     }) 
// }