// /* eslint-disable no-unused-vars */
import { createServer } from "miragejs";
import { todoFactory } from "./factories";
import { ListModel, TodoModel } from "./models";
import { deleteTodosRoutes, getTodosRoutes, postTodosRoutes } from "./routes";

export function MakeServer({ environment = "test" } = {}) {
  return createServer({
    environment,
    logging: true,
    models: {
      todo: TodoModel,
      list: ListModel,
    },
    factories: {
      todo: todoFactory,
    },
    routes() {
      this.namespace = "/api/v1";
      getTodosRoutes(this);
      postTodosRoutes(this);
      deleteTodosRoutes(this);
    },
  });
}
