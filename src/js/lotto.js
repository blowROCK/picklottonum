import { getRndInteger, isInArr, sortNumber, allPass4Obj } from "./util";

const loopLimit = 3000;

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
      tensRatio: 4,
      fixedNum: [],
      exceptedNumber: []
    };
    const populated = Object.assign(defaults, options);
    for (const key in populated) {
      if (populated.hasOwnProperty(key)) {
        this.combination[key] = populated[key];
      }
    }
    this.lastLotto = [];

    this.getRandomLotto = (fixedNum, exceptedNumber) => {
      var returnArr = [...fixedNum];
      var length = this.leng - fixedNum.length;
      for (let i = 0; i < length; i++) {
        let num = getRndInteger(this.min, this.max);
        if (!isInArr(returnArr, num) && exceptedNumber.indexOf(num) == -1)
          returnArr.push(num);
        else i--;
      }
      return returnArr;
    };

    this.checkSumlimit = (sumlimit, numberArray) => {
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
    this.checkUpDown = (updown, numberArray) => {
      updown *= 2;
      let minCounter = 0;
      let maxCounter = 0;
      for (const iterator of numberArray) {
        22.5 < iterator ? minCounter++ : maxCounter++;
      }
      if (minCounter - maxCounter <= updown) return true;
      return false;
    };
    this.checkOddEven = (oddEven, numberArray) => {
      oddEven *= 2;
      let oddCounter = 0;
      let evenCounter = 0;
      for (const iterator of numberArray) {
        iterator % 2 == 0 ? evenCounter++ : oddCounter++;
      }
      if (oddCounter - evenCounter <= oddEven) return true;
      return false;
    };
    this.checkEndSum = (endSum, numberArray) => {
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
    this.checkContinueNum = (continueNum, numberArray) => {
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
    this.checkTensRatio = (tensRatio, numberArray) => {
      let arr = [0, 0, 0, 0, 0];
      for (const iterator of numberArray) {
        let index = Math.floor(iterator * 0.1);
        arr[index]++;
      }
      return arr.every(function(element) {
        return element < tensRatio;
      });
    };
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
      var returnArr = this.getRandomLotto(
        this.combination.fixedNum,
        this.combination.exceptedNumber
      );

      let tempNumbers = sortNumber(returnArr);
      let ispass = {
        sum: this.checkSumlimit(this.combination.sumlimit, tempNumbers),
        updown: this.checkUpDown(this.combination.updown, tempNumbers),
        oddEven: this.checkOddEven(this.combination.oddEven, tempNumbers),
        endSum: this.checkEndSum(this.combination.endSum, tempNumbers),
        continueNum: this.checkContinueNum(
          this.combination.continueNum,
          tempNumbers
        ),
        tensRatio: this.checkTensRatio(this.combination.tensRatio, tempNumbers)
      };
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