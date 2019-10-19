import { getRndInteger, isInArr, sortNumber } from "./util";
var loopLimit = 3000;
export class lotto {
  constructor(params) {
    this.min = params.min;
    this.max = params.max;
    this.leng = params.leng;
    this.combination = {};
    var options = params.combination;
    const defaults = {
      sumlimit: [101, 180],
      updown: 1,
      oddEven: 1,
      endSum: [20, 36],
      continueNum: 4,
      tensRatio: 4
    };
    const populated = Object.assign(defaults, options);
    for (const key in populated) {
      if (populated.hasOwnProperty(key)) {
        this.combination[key] = populated[key];
      }
    }
    this.lastLotto = [];
  }
  get options() {
    return {
      min: this.min,
      max: this.max,
      leng: this.leng,
      combination: this.combination
    };
  }
  set options({ min, max, leng, combination }) {
    this.min = min;
    this.max = max;
    this.leng = leng;
    this.combination = combination;
  }
  get getNumber() {
    var notDone = true;
    var counter = 0;
    while (notDone) {
      if (loopLimit < counter) return false; // 에러메시지 써줄것.
      var returnArr = [];
      for (let i = 0; i < this.leng; i++) {
        let num = getRndInteger(this.min, this.max);
        if (!isInArr(returnArr, num)) returnArr.push(num);
        else i--;
      }
      let tempNumbers = sortNumber(returnArr);
      let ispass = {
        sum: checkSumlimit(this.combination.sumlimit, tempNumbers),
        updown: checkUpDown(this.combination.updown, tempNumbers),
        oddEven: checkOddEven(this.combination.oddEven, tempNumbers),
        endSum: checkEndSum(this.combination.endSum, tempNumbers),
        continueNum: checkContinueNum(this.combination.continueNum, tempNumbers),
        tensRatio: checkTensRatio(this.combination.tensRatio, tempNumbers)

        
      };
      console.log("TCL: getgetNumber -> ispass", ispass);
      if (allPass4Obj(ispass)) {
        notDone = false;
        this.lastLotto = tempNumbers;
      }
      counter++;
    }
    return sortNumber(returnArr);
  }
  get lastLottoNumber() {
    return this.lastLotto;
  }
}
const checkSumlimit = (sumlimit, numberArray) => {
  let min = sumlimit[0];
  let max = sumlimit[1];
  let sum = 0;
  for (const iterator of numberArray) {
    sum += iterator;
  }
  if (min < sum && sum < max) {
    return true;
  }
  return false;
};
const checkUpDown = (updown, numberArray) => {
  updown *= 2;
  let minCounter = 0;
  let maxCounter = 0;
  for (const iterator of numberArray) {
    22.5 < iterator ? minCounter++ : maxCounter++;
  }
  if (minCounter - maxCounter <= updown) return true;
  return false;
};
const checkOddEven = (oddEven, numberArray) => {
  oddEven *= 2;
  let oddCounter = 0;
  let evenCounter = 0;
  for (const iterator of numberArray) {
    iterator % 2 == 0 ? evenCounter++ : oddCounter++;
  }
  if (oddCounter - evenCounter <= oddEven) return true;
  return false;
};
const checkEndSum = (endSum, numberArray) => {
  let min = endSum[0];
  let max = endSum[1];
  let sum = 0;
  for (const iterator of numberArray) {
    sum += iterator % 10;
  }
  if (min < sum && sum < max) {
    return true;
  }
  return false;
};
const checkContinueNum = (continueNum, numberArray) => {
  let counter = 1;
  for (let i = 0; i < numberArray.length; i++) {
    const el1 = numberArray[i];
    const el2 = numberArray[i + 1];
    if (el2 == undefined) break;
    if (el1 - el2 == -1) {
      counter++;
    } else {
      counter = 0;
    }
    if (counter >= continueNum) break;
  }
  if (counter >= continueNum) {
    return false;
  }
  return true;
};
// console.log( Math.floor(t*0.1) );
const checkTensRatio = (tensRatio, numberArray) => {
  let arr = [0,0,0,0,0]
  for (const iterator of numberArray) {
    let index = Math.floor(iterator*0.1);
    arr[index]++;
  }
  return arr.every(function(element) {
    return element < tensRatio;
  });
}
// 유틸로 옮기던지
function allPass4Obj(object) {
  for (const key in object) {
    if (object.hasOwnProperty(key) && !object[key])
      return false;
  }
  return true;
}
// sum : 합계분석
// upDown : 고저 비율
// OddEven : 홀짝 비율
// endSum: 끝자리 합계
// continueNum : 연속 번호 제거
// tensRatio : 0, 10, 20, 30, 40 번에서 4개 이상 나오지 않도록 제거

// 고정번호 넣기
// 제외번호 넣기
// 경고 넣기
