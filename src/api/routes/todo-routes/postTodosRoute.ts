import { Request, Server } from "miragejs";
import { AppSchema } from "../../models";

export function postTodosRoutes(context: Server) {
  return [
    context.post("/todo", (schema: AppSchema, request: Request) => {
      const todoData = JSON.parse(request.requestBody);

      schema.create("todo", todoData);
      return schema.all("todo");
    }),
  ];
}
