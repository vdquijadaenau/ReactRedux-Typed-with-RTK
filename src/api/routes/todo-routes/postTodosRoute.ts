import { Server } from "miragejs";

export function postTodosRoutes(context: Server) {
  return [
    context.post("/todos", function (schema, req) {
      const data = context.normalizedRequestAttrs();

      if (data.text === "error") {
        throw new Error("Could not save the todo!");
      }

      const result = context.create("todo", data);
      return result;
    }),
  ];
}
