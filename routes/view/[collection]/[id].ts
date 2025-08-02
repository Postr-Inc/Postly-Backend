import { Context, DatabaseService } from "hapta"
type metadataParams = { collection: string, id: string, filter?: string, sort?: string }
export default function GET(ctx: Context, db: DatabaseService) {
    const { collection, id, filter, sort } = ctx.metadata.params as metadataParams;
    if (!collection || !id) {
        return ctx.json({ error: "Collection and ID are required" }, 400)
    }

    if (!ctx.principal.isAuthenticated) {
        return ctx.json({ error: "Unauthorized" }, 401)
    }


    switch (collection) {
        case "users":
            const user = db.get(collection, id, ["following", "followers"])
            if (!user) return ctx.json({ error: "User not found" }, 404)
            return ctx.json({
                ...user,
            }, 200)
        case "posts":
            const post = db.get(collection, id, ["author", "likes", "comments", "repost"])
            if (!post) return ctx.json({ error: "Post not found" }, 404)
            return ctx.json({
                ...post,
            }, 200)

    } 

    return ctx.json({ error: "Collection not supported" }, 400)
}