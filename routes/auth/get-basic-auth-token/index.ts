import { Context } from "hapta";

export default function GET(ctx: Context){
    var token = ctx.services.Clover.createTemporaryToken(1000, "1d")
    return ctx.text(token)
}