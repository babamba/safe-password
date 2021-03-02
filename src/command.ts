import chalk from "chalk";
import { waitForInput } from "./input";
import { isDefineChar, regExp, isNumber, isAlphabet } from "./util";
import { solution } from "./solution";
import {
  Action,
  ActionDeleteLine,
  ActionDeleteAllLine,
  ActionNewLine,
  ActionSearchSquare,
  AppState,
} from "./type";

export abstract class Command {
  constructor(public key: string, private desc: string) {}

  toString() {
    // return `${this.key} : ${this.desc}`;
    return chalk`{blue.bold ${this.key}}: ${this.desc}`;
  }

  abstract run(state: AppState): Promise<Action | void>;
}

export class CommandNewLine extends Command {
  constructor() {
    super("n", chalk`행 {red.bold 추가}하기`);
  }
  async run(state: AppState): Promise<ActionNewLine | void> {
    if (state.tiles.length > 0) {
      console.log(
        `입력 시 자동으로 ${state.tiles[0].value.length}개 만큼만 작성됩니다.`
      );
    } else {
      console.log(`입력 시 첫번째 타일갯수 길이로 넓이가 측정됩니다.`);
    }

    console.log();
    const currentTiles = state.tiles.map((item) => item.value);
    console.log("현재 타일 입력정보 : ", currentTiles);

    const value = await waitForInput("value : ");
    if (value) {
      if (
        state.tiles.length > 0 &&
        value.length < state.tiles[0].value.length
      ) {
        const key = await waitForInput(
          `${state.tiles[0].value.length} 만큼 작성되어야 합니다. 엔터키를 눌러 메뉴로 이동`
        );
        if (key) return;
      } else {
        if (!isDefineChar(value.toUpperCase(), "ABC")) {
          const key = await waitForInput(
            "ABC만 입력할 수 있습니다. 엔터키를 눌러 메뉴로 이동"
          );
          if (key) return;
        } else {
          return {
            type: "newLine",
            value: value.toUpperCase(),
          };
        }
      }
    } else {
      console.log("입력실패");
    }
  }
}

export class CommandDeleteLine extends Command {
  constructor() {
    super("d", chalk`행 {red.bold 제거}하기`);
  }
  async run(state: AppState): Promise<ActionDeleteLine | void> {
    if (state.tiles.length > 0) {
      for (const tileLine of state.tiles) {
        const text = tileLine.toString();
        console.log(text);
      }

      const idStr = await waitForInput("press line-number to delete : ");
      const id = Number(idStr);
      return {
        type: "deleteLine",
        id,
      };
    } else {
      const key = await waitForInput(
        "지울목록이 없습니다. 엔터키를 눌러 메뉴로 이동"
      );
      if (key) return;
    }
  }
}

export class CommandDeleteAllLine extends Command {
  constructor() {
    super("a", chalk`전체 {red.bold 제거}하기`);
  }
  async run(state: AppState): Promise<ActionDeleteAllLine | void> {
    if (state.tiles.length > 0) {
      const key = await waitForInput("정말 전체 삭제하시겠습니까 ? y / n");
      console.log();

      if (key === "y") {
        return {
          type: "deleteAllLine",
        };
      } else {
        return;
      }
    } else {
      const key = await waitForInput(
        "입력정보가 없습니다. 엔터키를 눌러 메뉴로 이동"
      );
      if (key) return;
    }
  }
}

export class CommandSearchSquare extends Command {
  constructor() {
    super("s", chalk`비밀번호 {red.bold 검색}하기`);
  }
  async run(state: AppState): Promise<ActionSearchSquare | void> {
    if (state.tiles.length > 1) {
      const currentTiles = state.tiles.map((item) => item.value);
      solution(currentTiles);
      console.log();
      const key = await waitForInput("엔터키를 눌러 메뉴로 이동");
      if (key) return;
    } else {
      const key = await waitForInput(
        "최소 길이가 2줄 이상이어야 합니다. 엔터키를 눌러 메뉴로 이동"
      );
      if (key) return;
    }
  }
}
