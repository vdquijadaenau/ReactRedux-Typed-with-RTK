import { Model } from "miragejs";
import { ModelDefinition } from "miragejs/-types";

export type TodoType = {
  id: number;
  text: string;
  completed: boolean;
  color: string;
};

export const TodoModel: ModelDefinition<TodoType> = Model.extend({});
