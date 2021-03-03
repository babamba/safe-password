# Noul Homework

김진원 - (주)Noul 프론트엔드 과제전형 저장소

Typescript 로 개발 진행.

해당 repository 가 담고 있는 source code 에 대한 설명

    ├── node_modules            # npm을 통한 dependencies 들이 관리되는 폴더.
    ├── src                     # 소스 폴더
    │   ├── command             # 생성, 삭제, 검색 등의 기능이 존재하는 Class가 있는 파일
    │   ├── index               # ts-node를 통해 실행되고 main 함수, 리듀서 역할을 하는 getNextState함수 가 존재하는 파일
    │   ├── input               # readline을 통해 키입력을 기다리고 입력정보를 리턴하는 waitForInput 함수를 가진 파일.
    │   ├── line                # 입력받는 타일정보를 저장하는 Line Class 파일
    │   ├── solution            # 과제에서 요구하는 기능을 포함하는 함수 파일
    │   ├── type                # 해당 소스에서 사용되고있는 타입스크립트 인터페이스를 가지고있는 파일
    │   ├── util                # helper 함수가 존재하는 파일
    │   └── *.test.ts           # unit testing 파일.
    │
    ├── .gitignore              # 커밋제외할 것들에 대한 명세서.
    ├── ts-config.js            # typescript 관련 설정 파일
    └── package.json            # 어플리케이션의 패키지에 관한 정보와 의존중인 버전에 관한 정보를 담고있는 파일.

### 요구 사항 구현 목록

- 입력과 출력 기능 구현
- 입력된 타일정보를 동일한 이름의 타일정보 4개를 모서리로 하여 만들 수 있는 직사각형 검색 구현
- 출력 형식(정상, 오류)에 맞게 log 출력
- Core 함수의 Unit testing

### 그외 필요에 의한 추가 구현 목록

- node readline을 통한 Command 목록
- 입력한 타일 정보 삭제 및 전체 삭제 기능
- 입력한 타일 정보 노출

### Package Manager

- yarn 사용.

### 실행 방법

0. node.js & npm & yarn 설치
1. 터미널에 `yarn` 입력 을 통해 package.json에 명시된 dependency package 설치.
2. yarn start 를 통해 ts-node 동작 및 index.ts의 main 함수 실행.
3. n을 입력하여 타일 한줄을 입력. ABC만 입력 가능하며, 한줄이상 입력했을 시, 첫번째 줄보다 길면 자동으로 제일 첫번째 줄을 길이만큼 잘리게되며, 첫번째 줄보다 적게 작성했을 시 입력실패 및 메인 command list 로 이동.
4. d를 입력하여 행 아이디에 해당하는 파란색 번호를 입력하고 삭제한다.
5. s를 입력하여 금고 비밀번호를 검색한다.
6. a를 입력하여 입력했었던 타일정보를 모두 삭제한다.
7. yarn test 를 통해 unit testing 결과 보기.

### 개발환경

- node : 12.18.3
- yarn : 1.22.10
- typescript : 4.0.3
- jest : ^26.5.2
