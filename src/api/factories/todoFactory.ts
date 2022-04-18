import seedrandom from "seedrandom";
import { ITodoType } from "../models";
import faker from "@faker-js/faker";
import { Factory } from "miragejs";

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

export const todoFactory = Factory.extend({
  id(index: number): number {
    return Number(index);
  },
  text(): string {
    return generateTodoText();
  },
  completed(): boolean {
    return false;
  },
  color(): string {
    return "";
  },
});
