import  z from 'zod'

 export const singinPayload=z.object({
   firstName:z.string().min(2).max(45),
   lastName:z.string().optional().nullable(),
   email:z.string(),
   password:z.string().min(6),
 
})

export const singupPayload=z.object({
   email:z.string(),
   password:z.string().min(6),
})

