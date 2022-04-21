// /* eslint-disable no-unused-vars */

// import {
//   Server,
//   Model,
//   Factory,
//   hasMany,
//   RestSerializer,
//   Serializer,
// } from "miragejs";

// import faker from "@faker-js/faker";
// import seedrandom from "seedrandom";
// import { SerializerInterface } from "miragejs/serializer";

// new Server({
//   routes() {
//     this.namespace = "fakeApi";
//     //this.timing = 2000

//     this.resource("todos");
//     this.resource("lists");

//     const server = this;

//     this.post("/todos", function (schema, req) {
//       const data:TodoType = this.normalizedRequestAttrs();

//       if (data.text === "error") {
//         throw new Error("Could not save the todo!");
//       }

//       const result = server.create("todo", data);
//       return result;
//     });
//   },
//   models: {
//     todo: Model.extend<Partial<TodoType>>({}),
//     list: Model.extend({
//       todos: hasMany(),
//     }),
//   },
//   factories: {
//     todo: Factory.extend<Partial<TodoType>>({
//       id(i) {
//         return Number(i);
//       },
//       text() {
//         return generateTodoText();
//       },
//       completed() {
//         return false;
//       },
//       color() {
//         return "";
//       },
//     }),
//   },
//   serializers: {
//     todo: IdSerializer.extend?({
//       serialize(object: any, request: any) {
//         // HACK Mirage keeps wanting to store integer IDs as strings. Always convert them to numbers for now.
//         const numerifyId = (todo: any) => {
//           todo.id = Number(todo.id);
//         };
//         let json = IdSerializer.prototype.serialize.apply(this, arguments);

//         if (json.todo) {
//           numerifyId(json.todo);
//         } else if (json.todos) {
//           json.todos.forEach(numerifyId);
//         }

//         return json;
//       },
//     }),
//     list: IdSerializer,
//   },
//   seeds(server) {
//     server.createList("todo", 5);
//   },
// });

import { belongsTo, createServer, hasMany, Model } from "miragejs";
import { todoFactory } from "./factories";
import { List, TodoType } from "./models";
import { getTodosRoutes, postTodosRoutes } from "./routes";

export default function MakeServer() {
  const server = createServer({
    models: {
      todo: Model.extend<Partial<TodoType>>({}),
    },
    factories: {
      todo: todoFactory,
    },
    routes() {
      getTodosRoutes(this);
    },
  });

  return server;
}
