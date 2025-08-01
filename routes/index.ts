import { Context, DatabaseService } from "hapta" 
export default async function GET(ctx: Context, DB: DatabaseService ){
      if(ctx.principal.isAuthenticated){
        // the user has went to /auth/login no need for explicit token checks the runtime handles that for you caches the data and returns auth state every request

         console.log(ctx.principal.Roles)
         console.log(ctx.principal.id)
         console.log(ctx.principal.username)
      }
 
      const record = await DB.get("users", "2bpczvgnxrby7pv")
  
      return ctx.json(record, 200)
}