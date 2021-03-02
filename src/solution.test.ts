import { outputLog } from "./solution";

describe("Solution", () => {
  let items = [
    "BCCCCBBCAA",
    "BACBBABBAA",
    "BCBCAAABCB",
    "BBBACBACBA",
    "AAACACCBAC",
    "ABBAACBCCC",
    "CBAACBBCAA",
  ];

  describe("function test", () => {
    const testoutputLog = outputLog;
    const consoleSpy = jest.spyOn(console, "log");
    describe("solution - outputLog", () => {
      it("넓이가 0일 경우 0을 노출한다. ", async () => {
        testoutputLog([
          {
            dimension: 0,
          },
        ]);
        expect(consoleSpy).toHaveBeenCalledWith("0 ");
      });

      it("넓이가 더 큰 값이 있을경우 더 큰 직사각형 정보를 표시한다. ", async () => {
        testoutputLog([
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

      it("최고넓이는 넓이 그대로 숫자형으로 노출한다. ", async () => {
        testoutputLog([
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
  });
});

describe("Util", () => {
  describe("Util - maxDimension", () => {
    it.todo("Dimension 값이 제일 높은 FindMapItem 타입 객체를 리턴한다.");
  });

  describe("Util - isDefineChar", () => {
    it.todo(
      "특정문자인 두번째 인수가 비교값인 첫번째 인수와 비교하여 리턴한다."
    );
  });
});
