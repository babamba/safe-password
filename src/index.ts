import {
  Command,
  CommandDeleteAllLine,
  CommandDeleteLine,
  CommandNewLine,
  CommandSearchSquare,
} from "./command";
import Line from "./line";
import { waitForInput } from "./input";
import { Action, AppState } from "./type";

const commands: Command[] = [
  new CommandNewLine(),
  new CommandDeleteLine(),
  new CommandSearchSquare(),
  new CommandDeleteAllLine(),
];

// redux reducer 처럼 Command 실행 후 액션에 대한 실행액션타입, 결과를 리턴한다.
function getNextState(state: AppState, action: Action): AppState {
  switch (action.type) {
    case "newLine":
      if (state.tiles.length > 0) {
        const subStr = action.value.substr(0, state.tiles[0].value.length);
        return {
          ...state,
          tiles: [...state.tiles, new Line(subStr)],
        };
      } else {
        return {
          ...state,
          tiles: [...state.tiles, new Line(action.value)],
        };
      }
    case "deleteLine":
      return {
        ...state,
        tiles: state.tiles.filter((item) => item.id !== action.id),
      };
    case "deleteAllLine":
      return {
        ...state,
        tiles: [],
      };
    case "searchSquare":
      return {
        ...state,
      };
    default:
      return state;
  }
}
async function main() {
  //타일정보를 저장하는 변수
  let state: AppState = {
    tiles: [],
  };

  while (true) {
    console.clear();
    console.log("--------------------------------");
    for (const command of commands) {
      console.log(command.toString());
    }

    const currentTiles = state.tiles.map((item) => item.value);
    console.log("현재 타일 입력정보 : ", currentTiles);
    console.log("--------------------------------");

    const key = await waitForInput("input command : ");
    console.log();

    console.clear();
    const command = commands.find((item) => item.key === key);
    if (command) {
      const action = await command.run(state);
      if (action) state = getNextState(state, action);
    }
  }
}

main();
