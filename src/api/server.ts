/* eslint-disable no-unused-vars */

import {
  Server,
  Model,
  Factory,
  hasMany,
  RestSerializer,
  Serializer,
} from "miragejs";

import faker from "@faker-js/faker";
import seedrandom from "seedrandom";

export interface TodoType {
  id: number;
  text: string;
  completed: boolean;
  color: string;
}

const IdSerializer = RestSerializer.extend({
  serializeIds: "always",
});

// Set up a seeded random number generator, so that we get
// a consistent set of users / entries each time the page loads.
// This can be reset by deleting this localStorage value,
// or turned off by setting `useSeededRNG` to false.
let useSeededRNG = false;

let rng = seedrandom();

if (useSeededRNG) {
  let randomSeedString = localStorage.getItem("randomTimestampSeed");
  let seedDate;

  if (randomSeedString) {
    seedDate = new Date(randomSeedString);
  } else {
    seedDate = new Date();
    randomSeedString = seedDate.toISOString();
    localStorage.setItem("randomTimestampSeed", randomSeedString);
  }

  rng = seedrandom(randomSeedString);
  faker.seed(seedDate.getTime());
}

function getRandomInt(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(rng() * (max - min + 1)) + min;
}

const randomFromArray = (array: any) => {
  const index = getRandomInt(0, array.length - 1);
  return array[index];
};

const todoTemplates = [
  { base: "Buy $THING", values: ["milk", "bread", "cheese", "toys"] },
  { base: "Clean $THING", values: ["house", "yard", "bedroom", "car"] },
  { base: "Read $THING", values: ["newspaper", "book", "email"] },
];

const generateTodoText = () => {
  const template = randomFromArray(todoTemplates);
  const value = randomFromArray(template.values);
  const text = template.base.replace("$THING", value);
  return text;
};

new Server({
  routes() {
    this.namespace = "fakeApi";
    //this.timing = 2000

    this.resource("todos");
    this.resource("lists");

    const server = this;

    this.post("/todos", function (schema, req) {
      const data = this.normalizedRequestAttrs();

      if (data.text === "error") {
        throw new Error("Could not save the todo!");
      }

      const result = server.create("todo", data);
      return result;
    });
  },
  models: {
    todo: Model.extend<Partial<TodoType>>({}),
    list: Model.extend({
      todos: hasMany(),
    }),
  },
  factories: {
    todo: Factory.extend<Partial<TodoType>>({
      id(i) {
        return Number(i);
      },
      text() {
        return generateTodoText();
      },
      completed() {
        return false;
      },
      color() {
        return "";
      },
    }),
  },
  serializers: {
    todo: IdSerializer.extend({
      serialize(object: any, request: any) {
        // HACK Mirage keeps wanting to store integer IDs as strings. Always convert them to numbers for now.
        const numerifyId = (todo: any) => {
          todo.id = Number(todo.id);
        };
        let json = IdSerializer.prototype.serialize.apply(this, arguments);

        if (json.todo) {
          numerifyId(json.todo);
        } else if (json.todos) {
          json.todos.forEach(numerifyId);
        }

        return json;
      },
    }),
    list: IdSerializer,
  },
  seeds(server) {
    server.createList("todo", 5);
  },
});
