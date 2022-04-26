import { Request, Server } from "miragejs";
import { AppSchema } from "../../models";

export function deleteTodosRoutes(context: Server) {
  return [
    context.delete("/todo/:id", (schema: AppSchema, request: Request) => {
      let id = request.params.id;

      let todo = schema.find("todo", id);

      if (todo) {
        todo.destroy();
      }
      return schema.all("todo");
    }),
  ];
}
