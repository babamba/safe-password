import { outputLog, coordinate, findEdge, solution } from "./solution";

describe("Solution", () => {
  describe("function test", () => {
    const consoleSpy = jest.spyOn(console, "log");

    describe("solution - outputLog", () => {
      const mockOutputLog = jest.fn().mockImplementation(outputLog);
      const zeroDimentionItems = [
        {
          dimension: 0,
        },
      ];

      it("outputLog func 가 정상적으로 실행되어야한다.", () => {
        mockOutputLog(zeroDimentionItems);
        expect(mockOutputLog).toHaveBeenCalled();
      });

      it("outputLog func 가 인수와 함께 호출되어야한다.", () => {
        mockOutputLog(zeroDimentionItems);
        expect(mockOutputLog).toHaveBeenCalledWith(zeroDimentionItems);
      });

      it("outputLog func 가 인수 없이 호출되면 'not found'를 console.log 한다.", () => {
        mockOutputLog();
        expect(consoleSpy).toHaveBeenCalledWith("not found");
      });

      it("배열에 포함된 객체중 넓이가 0일 경우 0을 노출한다. ", () => {
        mockOutputLog([
          {
            dimension: 0,
          },
        ]);
        expect(consoleSpy).toHaveBeenCalledWith("0 ");
      });

      it("넓이가 더 큰 값이 있을경우 예외 메시지를 표시한다. ", () => {
        mockOutputLog([
          {
            dimension: 2,
          },
          {
            dimension: 4,
          },
        ]);
        expect(consoleSpy).toHaveBeenCalledWith(
          "2 -> 더 큰 직사각형을 만드는 결과가 있음."
        );
      });

      it("최고넓이는 넓이 그대로 숫자형으로 노출한다. ", () => {
        mockOutputLog([
          {
            dimension: 2,
          },
          {
            dimension: 4,
          },
        ]);
        expect(consoleSpy).toHaveBeenCalledWith(4);
      });
    });

    describe("solution - coordinate", () => {
      const item = ["BCC", "BAC", "BCA"];
      const width: number = item[0].length; // x축 총길이
      const height: number = item.length; // y축 총길이

      const mockCoordinate = jest.fn().mockImplementation(coordinate);

      it("coordinate func 가 정상적으로 실행되어야한다.", () => {
        mockCoordinate(item, width, height);
        expect(mockCoordinate).toHaveBeenCalled();
      });

      it("coordinate func 가 필수 인수 item, width, height와 함께 실행되어야한다.", () => {
        mockCoordinate(item, width, height);
        expect(mockCoordinate).toHaveBeenCalledWith(item, width, height);
      });

      it("coordinate func의 리턴값이 예상값과 같아야한다.", () => {
        const result = mockCoordinate(item, width, height);
        expect(result).toEqual([
          { location: { x: 0, y: 0 }, value: "B" },
          { location: { x: 1, y: 0 }, value: "C" },
          { location: { x: 2, y: 0 }, value: "C" },
          { location: { x: 0, y: 1 }, value: "B" },
          { location: { x: 1, y: 1 }, value: "A" },
          { location: { x: 2, y: 1 }, value: "C" },
          { location: { x: 0, y: 2 }, value: "B" },
          { location: { x: 1, y: 2 }, value: "C" },
          { location: { x: 2, y: 2 }, value: "A" },
        ]);
      });
    });

    describe("solution - findEdge", () => {
      const mockWidth: number = 3;
      const mockItem = [
        { location: { x: 0, y: 0 }, value: "B" },
        { location: { x: 1, y: 0 }, value: "C" },
        { location: { x: 2, y: 0 }, value: "B" },
        { location: { x: 0, y: 1 }, value: "B" },
        { location: { x: 1, y: 1 }, value: "A" },
        { location: { x: 2, y: 1 }, value: "B" },
      ];

      const mockFindEdge = jest.fn().mockImplementation(findEdge);

      it("findEdge func 가 정상적으로 실행되어야한다.", () => {
        const result = mockFindEdge(mockItem, mockWidth);
        console.log("result : ", result);
        expect(mockFindEdge).toHaveBeenCalled();
      });

      it("findEdge func 가 필수 인수 item, width와 함께 실행되어야한다.", () => {
        mockFindEdge(mockItem, mockWidth);
        expect(mockFindEdge).toHaveBeenCalledWith(mockItem, mockWidth);
      });

      it("findEdge func 는 리턴값이 예상하는 하나의 직사각형 넓이와 존재하지 않을경우의 값 0을 가져야한다.", () => {
        const result = mockFindEdge(mockItem, mockWidth);
        expect(result).toEqual([
          {
            dimension: 6,
            location: {
              leftDown: {
                x: 0,
                y: 1,
              },
              leftUp: {
                x: 0,
                y: 0,
              },
              rightDown: {
                x: 2,
                y: 1,
              },
              rightUp: {
                x: 2,
                y: 0,
              },
            },
          },
          { dimension: 0 },
          { dimension: 0 },
          { dimension: 0 },
          { dimension: 0 },
          { dimension: 0 },
        ]);
      });

      it("findEdge func 는 리턴값이 예상하는 존재하지 않을경우의 0이라는 값을 가져야한다.", () => {
        const result = mockFindEdge(
          [
            { location: { x: 0, y: 0 }, value: "A" },
            { location: { x: 1, y: 0 }, value: "B" },
            { location: { x: 0, y: 1 }, value: "C" },
            { location: { x: 1, y: 1 }, value: "B" },
          ],
          2
        );
        expect(result).toEqual([
          { dimension: 0 },
          { dimension: 0 },
          { dimension: 0 },
          { dimension: 0 },
        ]);
      });
    });

    describe("solution - main solution func", () => {
      const mockItem = ["BBA", "BBC"];
      const mockOneSquareItem = ["BBA", "BBC"];
      const mockZeroSquareItem = ["AB", "BA"];
      const mockSolution = jest.fn().mockImplementation(solution);

      it("solution func 는 정상적으로 실행되어야한다.", () => {
        mockSolution(mockItem);
        expect(mockSolution).toHaveBeenCalled();
      });

      it("solution func 는 필수 인수 item과 함께 실행되어야한다.", () => {
        mockSolution(mockItem);
        expect(mockSolution).toHaveBeenCalledWith(mockItem);
      });

      it("solution func 은 직사각형이 존재하지 않을경우는 0을 문자형으로 console.log한다.", () => {
        mockSolution(mockZeroSquareItem);
        expect(consoleSpy).toHaveBeenCalledWith("0 ");
      });

      it("solution func 은 직사각형이 존재할 경우는 넓이값을 숫자형으로 console.log한다.", () => {
        mockSolution(mockOneSquareItem);
        expect(consoleSpy).toHaveBeenCalledWith(4);
      });
    });
  });
});
