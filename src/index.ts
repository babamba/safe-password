interface Coord {
  location: EdgeLocation;
  value: string;
}

interface EdgeLocation {
  y: number;
  x: number;
}

async function main() {
  //   let state: AppState = {
  //     todos: [
  //       new Todo("test1", Priority.High),
  //       new Todo("test2", Priority.Medium),
  //       new Todo("test3", Priority.Low),
  //     ],
  //   };

  let item = [
    "BCCCCBBCAA",
    "BACBBABBAA",
    "BCBCAAABCB",
    "BBBACBACBA",
    "AAACACCBAC",
    "ABBAACBCCC",
    "CBAACBBCAA",
  ];

  const solution = (item: string[]) => {
    const board = item.map((v) => v.split(""));
    //console.log("board: ", board);

    const width = board[0].length;
    const height = board.length;

    //console.log("board width : ", width);
    //console.log("board height : ", height);

    const boardMap = coordinate(board, width, height);
    //console.log("boardMap : ", boardMap);

    const founded = findEdge(boardMap, width, height);
  };

  const coordinate = (board: string[][], width: number, height: number) => {
    let boardMap: Coord[] = [];
    for (let i = 0; i < height; i++) {
      //   console.log(`board row[${i}] => ${board[i]}`);
      for (let j = 0; j < width; j++) {
        // console.log(`board row[${i}] / column[${j}] : ${board[i][j]}`);
        boardMap.push({
          location: {
            y: i,
            x: j,
          },
          value: board[i][j],
        });
      }
    }
    return boardMap;
  };

  const findEdge = (boardMap: Coord[], width: number, height: number) => {
    let founded = [];
    for (let i = 0; i < boardMap.length; i++) {
      //초기 (0, 0부터 시작);

      // j = 비교값 인덱스
      // i = 현재 인덱스

      // if (i === 0) {
      //   console.log(
      //     `start x find, current test width = width - boardMap[i].location.x = ${i}`
      //   );
      // }

      //가로축 정방향 탐색 - 보드의 i번째 x축 정보를 기준으로  총가로길이 - x축 위치값을 빼고 가로로 반복
      for (let j = boardMap[i].location.x + 1; j < width; j++) {
        console.log("### right start");
        // console.log("j : ", j);
        //if (i === 0) { //0번째 줄 테스트용 블럭
        if (boardMap[i].value === boardMap[j].value) {
          // 문자가 같으면 아래축(x + board.length)으로 반복한다.
          // console.log(
          //   `find ! : current map[${i}] value = ${boardMap[i].value} find map[${j}] value = ${boardMap[j].value}`
          // );

          //console.log("start y find");
          //console.log("test 1: ", boardMap[j].location.x);

          //x 축에 같은 문자가 있다면 아래로 추적
          console.log("### down start");
          for (
            let k = boardMap[j].location.x + width;
            k < boardMap.length;
            k = k + width
          ) {
            // console.log("test 2 x + width: ", k);
            // console.log("test 2 width : ", width);
            // console.log("test 3 height: ", height);

            // console.log(
            //   "current y : ",
            //   boardMap[k].location,
            //   " / value : ",
            //   boardMap[k].value
            // );

            console.log("k = ", k);
            if (boardMap[k].value === boardMap[j].value) {
              // console.log(
              //   `find ! : current map[${i}] value = ${boardMap[j].value} find map[${j}] value = ${boardMap[k].value}`
              // );
              // x축 역순으로 탐색 시작
              // console.log("### reverse start");
              // console.log("### reverse start 1", boardMap[k].location.x);
              // console.log("### reverse start 2", k - boardMap[k].location.x);
              for (let l = k - 1; l >= k - boardMap[k].location.x; l--) {
                // console.log("l : ", l); // 35 ~ 30
                // console.log(
                //   "test : ",
                //   boardMap[k].location.x - boardMap[l].location.x
                // );

                // console.log("### reverse k : ", k - boardMap[k].location.x);
                //console.log("### reverse l : ", boardMap[l].location.x);

                // console.log("### reverse x : ", boardMap[l].location);
                if (boardMap[l].value === boardMap[k].value) {
                  console.log("find reverse x : ", boardMap[l].location);
                  // console.log(
                  //   "boardMap[i].location.x : ",
                  //   boardMap[i].location.x
                  // );
                  // console.log(
                  //   "boardMap[l].location.x : ",
                  //   boardMap[l].location.x
                  // );
                  // x 축 역순으로 찾았으면, 처음에 시작한 boardMap[i]의 y축과 동일한 값인지 비교
                  if (boardMap[l].location.x === boardMap[i].location.x) {
                    // console.log('boardMap[l].location.y : ', boardMap[l].location.y)
                    // console.log('boardMap[i].location.y : ', boardMap[i].location.y)
                    // console.log("horizontal : ", boardMap[j].location.x + 1);
                    // console.log("   *   ");
                    // console.log("vertical : ", boardMap[l].location.y + 1);
                    founded.push({
                      // origin: `${boardMap[j].location.x} / ${boardMap[l].location.y}`,
                      // formula: `${
                      //   boardMap[j].location.x + 1 - boardMap[i].location.x
                      // } * ${
                      //   boardMap[l].location.y + 1 - boardMap[i].location.y
                      // }`,
                      dimension:
                        (boardMap[j].location.x + 1 - boardMap[i].location.x) *
                        (boardMap[l].location.y + 1 - boardMap[i].location.y),
                      location: {
                        leftUp: boardMap[i].location,
                        rightUp: boardMap[j].location,
                        rightDown: boardMap[k].location,
                        leftDown: boardMap[l].location,
                      },
                    });
                    // console.log("x = ", i);
                    // console.log("j = ", j);
                    // console.log("k = ", k);

                    // console.log("l = ", l);
                    //founded.push()
                  }
                  // for(let m = l;  m > )
                }
              }
            }
          }
        }
        //} 0번째 줄 테스트용 블럭
        // if (boardMap[i].value === boardMap[j].value) {
        //   //   console.log("boardMap[j].value x : ", boardMap[j].value);
        //   //   console.log("boardMap[i].value x : ", boardMap[i].value);
        //   //   console.log("boardMap[i] x : ", boardMap[i].location);
        //   //   console.log("boardMap[i] x : ", boardMap[j].location);
        // }
      }
    }

    // const find = boardMap.map((item, idx) => {

    // })

    for (let item of founded) {
      console.log("item : ", item);
    }
  };

  solution(item);
}

main();
