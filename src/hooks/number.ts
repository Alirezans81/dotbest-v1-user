function getNumber(_str: string) {
  var arr = (_str + "").split("");
  var out = [];
  for (let cnt = 0; cnt < arr.length; cnt++) {
    if (isNaN(+arr[cnt]) === false) {
      out.push(+arr[cnt]);
    }
  }
  return Number(out.join(""));
}
function getIntegerPart(number: string) {
  let str = number;
  return str.split(".")[0];
}
function getFloatPart(number: string) {
  let str = number + "";
  return str.split(".")[1];
}
function addComma(number: string, returnsZero?: boolean) {
  if (+number < 1000) {
    return number;
  } else {
    var num = getNumber(getIntegerPart(number));
    if (num === 0) {
      return returnsZero ? 0 : "";
    } else {
      return (
        num.toLocaleString() +
        (getFloatPart(number) ? "." + getFloatPart(number) : "")
      );
    }
  }
}
export const useAddComma = () => {
  return addComma;
};

const removeComma = (string: string) => {
  if (string.length >= 3) {
    return +string.replaceAll(",", "");
  } else {
    return +string;
  }
};
export const useRemoveComma = () => {
  return removeComma;
};
