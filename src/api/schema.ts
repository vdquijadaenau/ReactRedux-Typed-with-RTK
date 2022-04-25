import { Registry } from "miragejs";
import Schema from "miragejs/orm/schema";
import { ListModel, TodoModel } from "./models";

export type AppRegistry = Registry<
  { todo: typeof TodoModel; list: typeof ListModel },
  {}
>;

export type AppSchema = Schema<AppRegistry>;
