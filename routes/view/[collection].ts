import Context from "../../helpers/HTTP/Request/Context";

export default function GET(ctx: Context){
    console.log(ctx.metadata.params)

    return   Response.json(JSON.stringify({tesla: 200}), {status: 200})
}