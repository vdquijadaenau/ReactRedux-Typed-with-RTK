import { Request, Server } from "miragejs";
import { AppSchema } from "../../models";

export function getTodosRoutes(context: Server) {
  return [
    context.get("/todo", (schema: AppSchema) => {
      return schema.all("todo");
    }),
    context.get("/todo/:id", function (schema: AppSchema, request: Request) {
      let id = request.params.id;

      let data = schema.find("todo", id);

      if (!data) {
        throw new Error("Could not find the todo!");
      }
      return data;
    }),
  ];
}
