import Line from "./line";
import chalk from "chalk";

describe("My Line Test", () => {
  const mockfirstId = 1;
  const mockValue = "ABC";
  let mockFirstLine: Line;
  it("입력한 라인정보를 입력받고 Line Class의 생성자를 통해 인스턴스 객체를 생성한다.", () => {
    mockFirstLine = new Line(mockValue);
    expect(mockFirstLine).toEqual({ id: mockfirstId, value: mockValue });
  });

  it("생성된 Line 인스턴스 객체는 toString 메서드를 통해 자기 자신의 정보를 리턴할 수 있다.", () => {
    const str = mockFirstLine.toString();
    expect(str).toEqual(
      chalk`{blue.bold ${mockfirstId})} 값 : {bold ${mockValue}}`
    );
  });

  it("Line 인스턴스 객체를 생성 시 정적프로퍼티 nextId를 생성자에서 증가 연산하여 고유 ID를 저장한다.", () => {
    const mockSecondLine = new Line(mockValue);
    expect(mockSecondLine).toEqual({ id: 2, value: mockValue });
  });
});
