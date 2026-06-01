import {z} from "zod";

const envSchema = z.object({
    PORT:z.string().optional().default("8080")
})
console.log(envSchema)

function cretaeEnv(env:NodeJS.ProcessEnv){

    const ParseEnve=envSchema.safeParse(env)
    if(!ParseEnve.success) throw new Error(ParseEnve.error.message)
        return ParseEnve.data
}

export const env=cretaeEnv(process.env)
