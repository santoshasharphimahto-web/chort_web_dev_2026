import type { Request, Response } from "express";
export declare class ToDo {
    private _db;
    constructor();
    getallTodo(req: Request, res: Response): void;
    setTodo(req: Request, res: Response): Promise<void>;
}
//# sourceMappingURL=controler.d.ts.map