import { Context } from "hapta";

export default async function GET(ctx: Context){
    var token = await ctx.services.Clover.createTemporaryToken(1000, "1d")
    if(!token){
        return ctx.json({error: "Failed to create token"}, 500)
    }

    return ctx.text(token, 200)
}