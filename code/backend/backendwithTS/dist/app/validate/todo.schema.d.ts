import { z } from "zod";
export declare const TodoSchema: z.ZodObject<{
    id: z.ZodNumber;
    title: z.ZodString;
    iscompleted: z.ZodDefault<z.ZodBoolean>;
    desscrption: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export type Todo = z.infer<typeof TodoSchema>;
//# sourceMappingURL=todo.schema.d.ts.map