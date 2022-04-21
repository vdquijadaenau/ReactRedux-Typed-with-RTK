import { Request, Server } from "miragejs";
import { AnyFactories, ModelDefinition, Registry } from "miragejs/-types";
import Schema from "miragejs/orm/schema";
import { todoFactory } from "../../factories";
import { TodoType } from "../../models";

interface Todos extends Schema<Registry<TodoType>, AnyFactories> {
  todos: TodoType[];
}

export function getTodosRoutes(context: Server) {
  return [
    context.get(
      "/todos",
      (
        schema: Schema<{ todos: ModelDefinition<TodoType> }>,
        request: Request
      ) => {
        return schema.todos.all();
      }
    ),
    context.get("/todo/:id", function (schema, request) {
      let id = request.params.id;

      let data = schema.todos.find(id);

      if (data.text === "error") {
        throw new Error("Could not save the todo!");
      }
      return data;
    }),
  ];
}
