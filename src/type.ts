import Line from "./line";

export interface Coord {
  location: EdgeLocation;
  value: string;
}

export interface EdgeLocation {
  y: number;
  x: number;
}

export interface FindMapItem {
  dimension: number;
  location?: {
    [key: string]: EdgeLocation;
  };
}

export interface AppState {
  tiles: Line[];
}

export type Action =
  | ActionNewLine
  | ActionDeleteLine
  | ActionSearchSquare
  | ActionDeleteAllLine;

export interface ActionNewLine {
  type: "newLine";
  value: string;
}

export interface ActionDeleteLine {
  type: "deleteLine";
  id: number;
}

export interface ActionDeleteAllLine {
  type: "deleteAllLine";
}

export interface ActionSearchSquare {
  type: "searchSquare";
}

export interface EdgeLocation {
  x: number;
  y: number;
}
