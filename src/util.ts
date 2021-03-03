import { FindMapItem } from "./type";

// reduce를 이용해 배열 순회 및 비교하여 리턴 반복. dimension 값이 큰 객체 조회
export const maxDimension = (map: FindMapItem[]) => {
  return map.reduce((a, b) => (a.dimension > b.dimension ? a : b)).dimension;
};

// chars에 포함된 글자만 input 문자열에 존재하는 지 validation
export const isDefineChar = (input: string, chars: string) => {
  for (let i = 0; i < input.length; i++) {
    if (chars.indexOf(input.charAt(i)) === -1) {
      return false;
    }
  }
  return true;
};
