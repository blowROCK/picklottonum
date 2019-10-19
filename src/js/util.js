export const getRndInteger = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const isInArr = (arr, find) => {
  for (let value of arr) {
    if(value == find){
      return true;
    }
  }
  return false;
};

export const sortNumber = (arr) => {
  function sortNumber(a, b) {
    return a - b;
  }
  return arr.sort(sortNumber);
};