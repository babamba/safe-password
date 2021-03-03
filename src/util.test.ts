import { isDefineChar, maxDimension } from "./util";

describe("Util", () => {
  describe("Util - maxDimension", () => {
    const mockMaxDimension = jest.fn().mockImplementation(maxDimension);
    it("Dimension 값이 제일 높은 FindMapItem 타입 객체를 리턴한다.", async () => {
      mockMaxDimension([
        {
          dimension: 6,
        },
        {
          dimension: 1,
        },
        {
          dimension: 2,
        },
      ]);

      expect(mockMaxDimension).toHaveBeenCalled();
      expect(mockMaxDimension).toHaveReturnedWith(6);
    });
  });

  describe("Util - isDefineChar", () => {
    it("특정문자인 두번째 인수를 가지고 비교값인 첫번째 인수와 비교하여 특정문자를 제외한 문자가있다면 false를 리턴한다.", async () => {
      const mockIsDefineChar = jest.fn().mockImplementation(isDefineChar);
      const result = mockIsDefineChar("ABCDABCFD", "ABC");
      expect(result).toBeFalsy();
    });

    it("특정문자인 두번째 인수를 가지고 비교값인 첫번째 인수와 비교하여 특정문자만 포함한다면 true를 리턴한다.", async () => {
      const mockIsDefineChar = jest.fn().mockImplementation(isDefineChar);
      const result = mockIsDefineChar("ABCCCBA", "ABC");
      expect(result).toBeTruthy();
    });
  });
});
