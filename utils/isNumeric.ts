export const isNumeric = (inputTxt: string): boolean => {
  const numbers = /^[0-9]+$/;
  if (inputTxt.match(numbers)) {
    return true;
  } else {
    return false;
  }
};
