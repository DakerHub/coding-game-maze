import type { Position } from ".";

export interface Step {
  pos: Position;
}

export default class Record {
  history: Step[] = [];

  add(step: Step) {
    this.history.push(step);
  }

  getAll() {
    return this.history;
  }

  clear() {
    this.history.length = 0;
  }
}
