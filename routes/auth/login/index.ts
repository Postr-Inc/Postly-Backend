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
        const { emailOrUsername, password } = ctx.metadata.json as { emailOrUsername: string, password: string } 
        const record = await ctx.services.Clover.Authenticate({
                type: "passwordAuth",
                emailOrUsername,
                password,
        }) 
        if (record.isAuthenticated) return ctx.json(record)
        else return ctx.json({ error: true, message: "failed to authenticate user check credentials" }, 400)
}
