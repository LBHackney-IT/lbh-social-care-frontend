export const allNumeric = (inputTxt: string) => {
  const numbers = /^[0-9]+$/;
  if (inputTxt.match(numbers)) {
    return true;
  } else {
    return false;
  }
};
