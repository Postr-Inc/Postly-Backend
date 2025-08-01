import { Context, DatabaseService } from "hapta";
import RecommendationAlgorithmHandler from "../../../src/Alogorithm";
import { Post } from "../../../src/types";
type incoming = {
     page: number,
     limit: number,
     options?: {
          order?: "asc" | "dec" | any;
          sort?: string;
          expand?: string[];
          recommended?: boolean;
          filter?: string;
          cacheKey?: string;
     },
}
 
export default async function POST(ctx: Context, Database: DatabaseService){
    const { page, limit, options }  = ctx.metadata.json as incoming
 
    if(!page || !limit){
        return ctx.json({error: true, message: "Page and or Limit is not defined"}, 400)
    }
    try {
          
        const res = await Database.list(ctx.metadata.params.collection, {
           expand:  options?.expand,
           filter: options?.filter,
           sort: options?.sort,
           page,
           limit
        }) 
        const Recommender = new RecommendationAlgorithmHandler({items:res.items, totalPages: res.totalPages, totalItems: res.totalItems, cacheKey: res.cacheKey})
        const posts = Recommender.process()  
        // this allows us to cache on serverless 
        return ctx.json(posts) 
    } catch (error) {
        console.log(error)
        return ctx.json(error, 400)
    } 
}