import { FindMapItem } from "./type";

export const getIsValidValue = (value: string) => {
  if (value === "A" || value === "B" || value === "C") true;
  else false;
};

export const regExp = (str: string) => {
  var reg = /[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/gi;
  //특수문자 검증
  if (reg.test(str)) {
    //특수문자 제거후 리턴
    return str.replace(reg, "");
  } else {
    //특수문자가 없으므로 본래 문자 리턴
    return str;
  }
};

// reduce를 이용해 배열 순회 및 비교하여 리턴 반복. dimension 값이 큰 객체 조회
export const maxDimension = (map: FindMapItem[]) => {
  return map.reduce((a, b) => (a.dimension > b.dimension ? a : b)).dimension;
};

export const isDefineChar = (input: string, chars: string) => {
  for (let i = 0; i < input.length; i++) {
    if (chars.indexOf(input.charAt(i)) === -1) {
      return false;
    }
  }
  return true;
};

export const isAlphabet = (value: string) => {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYXabcdefghijklmnopqrstuvwxyx";
  return isDefineChar(value, chars);
};

export const isNumber = (value: string) => {
  const chars = "1234567890";
  return isDefineChar(value, chars);
};
