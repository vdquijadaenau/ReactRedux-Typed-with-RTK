import { Request, Response, RestSerializer, Server } from "miragejs";
import { TodoModel, TodoType } from "../../models";
import { AppSchema } from "../../schema";

export function postTodosRoutes(context: Server) {
  return [
    context.post("/todo", (schema: AppSchema, request: Request) => {
      const todoData = JSON.parse(request.requestBody);

      if (todoData) {
        schema.create("todo", todoData);
      }

      return new Response(200, {});
    }),
  ];
}
