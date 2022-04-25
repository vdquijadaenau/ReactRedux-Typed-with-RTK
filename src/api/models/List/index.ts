import { Model } from "miragejs";
import { ModelDefinition } from "miragejs/-types";
import { TodoType } from "../Todo";

export type List = [TodoType];

export const ListModel: ModelDefinition = Model.extend([]);
