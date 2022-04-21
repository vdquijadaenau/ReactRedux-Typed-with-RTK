import { Server } from "miragejs";

export function postTodosRoutes(context: Server) {
  return [context.post("/todo", function (schema, req) {})];
}
