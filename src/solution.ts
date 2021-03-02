import { Coord, FindMapItem } from "./type";
import { maxDimension } from "./util";

export const solution = (item: string[]) => {
  console.clear();
  const board: string[][] = item.map((v) => v.split(""));
  const width: number = board[0].length; // x축 총길이
  const height: number = board.length; // y축 총길이
  const boardMap: Coord[] = coordinate(board, width, height); // input 정보를 가지고 좌표값과 타일 이름으로 재구조

  const founded: FindMapItem[] = findEdge(boardMap, width);

  outputLog(founded);
};

export const outputLog = (findMap: FindMapItem[]) => {
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
        // 2-1 & 3. 비밀번호가 되는 직사각형의 넓이 출력
        console.log(findMap[i].dimension);
      } else {
        // 4. 오류
        console.log(
          `${findMap[i].dimension} -> 더 큰 직사각형을 만드는 결과가 있음.`
        );
      }
    }
  }
};

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
                //console.log("find reverse x : ", boardMap[End].location);

                // x 축 역순으로 찾았으면, 처음에 시작한 boardMap[i]의 y축과 동일한 값인지 비교
                if (boardMap[End].location.x === boardMap[start].location.x) {
                  founded.push({
                    dimension:
                      (boardMap[findX].location.x +
                        1 -
                        boardMap[start].location.x) *
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
    if (!isFound) {
      founded.push({
        dimension: 0,
      });
    }
  }
  return founded;
};
