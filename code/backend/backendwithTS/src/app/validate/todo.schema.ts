
import { title } from "node:process";
import {z} from "zod";

 export const TodoSchema=z.object({
    id:z.number().describe("dsjna"),
    title:z.string(),
    iscompleted:z.boolean().default(false).describe("to do ka task hai"),
    desscrption:z.string().optional().describe("ha sab thi hai bhiii"),
})

export type Todo=z.infer<typeof TodoSchema >