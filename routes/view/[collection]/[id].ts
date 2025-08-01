import { Context, DatabaseService} from "hapta"

export default function GET(ctx: Context, db: DatabaseService) {
    const { collection, id } = ctx.metadata.params as { collection: string, id: string }
    
    return   Response.json(JSON.stringify({tesla: 200}), {status: 200})
}