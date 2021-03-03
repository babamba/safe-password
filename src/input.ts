import readline from "readline";

const readlineInterface = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// 인수를 통해 질문은 출력하고, 입력을 기다리다 입력을 받으면 입력정보를 리턴한다.
export function waitForInput(msg: string) {
  return new Promise<string>((res) =>
    readlineInterface.question(msg, (key) => {
      res(key);
    })
  );
}
