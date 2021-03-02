import chalk from "chalk";

export default class Line {
  static nextId: number = 1;
  constructor(public value: string, public id: number = Line.nextId) {
    Line.nextId++;
  }

  toString() {
    return chalk`{blue.bold ${this.id})} 값 : {bold ${this.value}}`;
  }
}
