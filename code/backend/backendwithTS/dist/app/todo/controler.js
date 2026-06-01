import { TodoSchema } from "../validate/todo.schema.js";
export class ToDo {
    _db;
    constructor() {
        this._db = [];
    }
    getallTodo(req, res) {
        const todo = this._db;
        res.status(101).json({ todo });
    }
    async setTodo(req, res) {
        try {
            const unvalidated = req.body;
            const validated = await TodoSchema.parseAsync(unvalidated);
            this._db.push(validated);
        }
        catch (error) {
            console.log(error);
        }
    }
}
//# sourceMappingURL=controler.js.map