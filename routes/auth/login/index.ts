import { Context, DatabaseService } from "hapta";
function getRoles(User: any, ctx: Context) {
    if (!User.roles) return []
    return ctx.services.Clover.Roles?.filter((r: any) => User.Roles.includes(r.id));
}

/**
 * Basic GET handler to test OAuth login via query parameters.
 * Supports `type=oauth` with `code` and optional `redirectUri`.
 */
export default async function POST(ctx: Context, DB:  DatabaseService) {
    try {
        const { type, code, redirectUri, authenticated_id } = ctx.metadata.query as any;
        if (type === "oauth") {
            if (!code) {
                return new Response(JSON.stringify({ success: false, error: "Missing OAuth code" }), { status: 400 });
            }

            const record = await ctx.services.Clover.Authenticate({
                type: "oauth",
                code,
                authenticated_id,
                redirectUri: redirectUri || "http://localhost:3000", // default for test
            });

            if (record.isAuthenticated) {
                record.Roles = getRoles(record, ctx) as [];
                return ctx.json(record)
            } else {
                return ctx.json({
                    success: false,
                    error: "OAuth authentication failed",
                }, 401)
            }
        } else {
            const { emailOrUsername, password } = ctx.metadata.json as { emailOrUsername: string, password: string } 
            const record = await ctx.services.Clover.Authenticate({
                type: "passwordAuth",
                emailOrUsername,
                password,
            }) 
            if (record.isAuthenticated) return ctx.json(record)
            else return ctx.json({ error: true, message: "failed to authenticate user check credentials" }, 400)
        }



    } catch (error) {
        return ctx.json({ success: false, error: "Unsupported auth type" }, 400) 
    }
}
