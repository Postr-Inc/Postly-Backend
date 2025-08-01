import { Context } from "hapta";

export default async function POST(ctx: Context){
    const { code,   authenticated_id } = ctx.json as any;
    if(!code || !authenticated_id){
        return ctx.json({success: false, message: "Expected a code and authenticated_id in request body got null"}, 400)
    }

    const res = await ctx.services.Clover.Authenticate({
        type: "oauth",
        code,
        authenticated_id,
        redirectUri :""
    })

    if(res.isAuthenticated){
        return ctx.json(res, 200)
    }else{
        return ctx.json({success: false, message: "Oauth failed"})
    }
}