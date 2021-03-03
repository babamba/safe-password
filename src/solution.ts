import { Coord, FindMapItem } from "./type";
import { maxDimension } from "./util";

/**
 *  command 입력을 통해 생성된 타일정보를 통해 요구사항을 실행한다.
 *  x,y 좌표값을 구하기 위해 입력받은 타일 이름정보를 각 요소로 ['abc'] -> ['a','b','c'] 쪼개준다.
 *  행의 총 길이를 구하기 위해 첫번쨰 요소에 길이로 width를 지정
 *  열의 총 길이를 구하기 위해 배열의 길이를 height로 지정
 *  coordinate, findEdge ,outputLog 함수 를 통해 요구사항에 대한 결과를 구한다.
 * */
export const solution = (item: string[]) => {
  console.clear();
  const board: string[][] = item.map((v) => v.split(""));
  console.log("item : ", item);
  console.log("board : ", board);
  const width: number = board[0].length; // x축 총길이
  const height: number = board.length; // y축 총길이
  const boardMap: Coord[] = coordinate(board, width, height); // input 정보를 가지고 좌표값과 타일 이름으로 재구조

  const founded: FindMapItem[] = findEdge(boardMap, width);

  outputLog(founded);
};

/**
 *  findEdge를 통해 나온 결과값을 인수로 받고,
 *  dimension 이 0 일 경우 그대로 0을 출력.
 *  dimension 이 0보다 크고, 더 넓은 직사각형이 존재 할 경우 예외메시지와 함께 출력
 *  dimension 이 제일 넓은 요소 일 경우 dimension 값을 출력
 * */
export const outputLog = (findMap: FindMapItem[]) => {
  if (findMap) {
    const max = maxDimension(findMap);
    // reduce를 이용해 배열 순회 및 비교하여 리턴 반복. dimension 값이 큰 객체 조회
    //   const maxResult = findMap.reduce((a, b) =>
    //     a.dimension > b.dimension ? a : b
    //   ).dimension;

    for (let i = 0; i < findMap.length; i++) {
      if (findMap[i].dimension === 0) {
        // 2-2. 단, 직사각형이 존재하지 않는 경우 0을 출력
        console.log(`${findMap[i].dimension} `);
      } else {
        if (findMap[i].dimension === max) {
          // 2-1 & 3. 비밀번호가 되는 제일 큰 직사각형의 넓이 출력
          console.log(findMap[i].dimension);
        } else {
          // 4. 오류
          console.log(
            `${findMap[i].dimension} -> 더 큰 직사각형을 만드는 결과가 있음.`
          );
        }
      }
    }
  } else {
    console.log("not found");
  }
};

/**
 *  타일입력 정보 board, 한 줄의 길이값 boardWidth, 행 길이 height 를 인수로 받고,
 *  각 요소마다 좌표값, 타일이름 값을 이루는 객체로 배열을 재생성하여 리턴한다.
 *  Command-newline에서 타일정보 입력 시 예외처리를 하여서 별도로 board의 배열요소 없음에 대한 예외는 처리하지 않았음.
 * */
export const coordinate = (
  board: string[][],
  width: number,
  height: number
) => {
  let boardMap: Coord[] = [];
  for (let i = 0; i < height; i++) {
    for (let j = 0; j < width; j++) {
      boardMap.push({
        location: {
          x: j,
          y: i,
        },
        value: board[i][j],
      });
    }
  }
  return boardMap;
};

/**
 *  타일지도 정보 boardMap, 한 줄을 길이값 boardWidth 를 인수로 받고,
 *  동일한 이름의 타일 4개를 모서리로 하여, 만들 수 있는 가장 넓이의 직사각형을 찾는다.
 *  n번째 요소가 이룰 수 있는 직사각형이 없을 경우 dimension: 0을 리턴.
 * */
export const findEdge = (boardMap: Coord[], boardWidth: number) => {
  let founded: FindMapItem[] = [];
  //전체 순회
  for (let start = 0; start < boardMap.length; start++) {
    let isFound = false;
    // start = 시작 인덱스 초기 (0, 0부터 시작);
    // 현재 위치 / 가로 길이 를 통한 현재 순회를 돌려고하는 포인트의 라인을 구한다. ex = 0 일때 9 / 10 일떄 19
    const currentLine = (Math.floor(start / boardWidth) + 1) * boardWidth - 1;

    //가로축 정방향 탐색 - 보드의 boardMap[start]의 x축 정보를 기준으로 총가로길이 - x축 위치값을 빼고 가로로 반복
    for (let findX = start; findX <= currentLine; findX++) {
      if (boardMap[start].value === boardMap[findX].value) {
        //x 축에 같은 문자가 있다면 아래로 추적
        for (
          let findY = findX + boardWidth; // x값에서 x길이를 합하면 아래로 한칸 값(ex = 11 -> 21 & 24 -> 34)
          findY < boardMap.length;
          findY = findY + boardWidth
        ) {
          if (boardMap[findY].value === boardMap[findX].value) {
            // x축 역순으로 탐색 시작
            for (
              let End = findY - 1;
              End >= findY - boardMap[findY].location.x;
              End--
            ) {
              if (boardMap[End].value === boardMap[findY].value) {
                // x축 역순으로 찾았으면, 처음에 시작한 boardMap[i]의 x축과 동일한 x값인지 비교
                if (boardMap[End].location.x === boardMap[start].location.x) {
                  //같은 x 축에 같은 값이 존재한다면 직사각형을 이루므로 founded 배열에 직사각형 넓이와 각 모서리의 위치값을 추가.
                  founded.push({
                    dimension:
                      //[3, 0], [1, 0] 일 경우 4 - 1 = 3
                      (boardMap[findX].location.x +
                        1 -
                        boardMap[start].location.x) *
                      //[1, 2], [1, 0] 일 경우 2 + 1 - 0 = 3
                      (boardMap[End].location.y +
                        1 -
                        boardMap[start].location.y),
                    location: {
                      leftUp: boardMap[start].location,
                      rightUp: boardMap[findX].location,
                      rightDown: boardMap[findY].location,
                      leftDown: boardMap[End].location,
                    },
                  });
                  isFound = true;
                }
              }
            }
          }
        }
      } else {
        isFound = false;
      }
    }
    // 결과 flag 값이 false 일 경우 직사각형을 이루지 못하므로 0을 founded 배열에 추가.
    if (!isFound) {
      founded.push({
        dimension: 0,
      });
    }
  }
  return founded;
};
