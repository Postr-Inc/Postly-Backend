import { Context, DatabaseService } from "hapta"
export default async function GET(ctx: Context){
  const usernametest = "people"
  const passwordtest = "suck2499999999945%"

  const res  = await ctx.services.Clover.Register({
     record: {
        username: "bonny",
        email: "bonny@gmail.com",
        password: passwordtest,
        dob: new Date()
     }
  })

  console.log(res)


  return ctx.json({})
}