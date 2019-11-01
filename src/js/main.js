import { lotto } from "./lotto";
import { sweet } from "./util";



const active = () => {
  console.log("TCL: active -> active");
  initEvent();
  initModel();
  afterDom();
}
const initModel = () => {
  var nomal = new lotto({
    min: 1,
    max: 45,
    leng: 6,
    combination: {
      // 합계가 120~160 사이.
      sumlimit: [120, 160],

      // 22.5를 기준으로 큰숫자, 작은 숫자의 비율 조정. 0~3
      // EX : 2이면 1:5 ~ 5:1 까지 통과
      updown: 1,

      // 홀수 짝수의 비율 0 ~ 3
      // EX : 2이면 1:5 ~ 5:1 까지 통과
      oddEven: 1,

      // 1의 자리수를 모두 합한 수가 20~36사이
      endSum: [20, 36],

      // 연속된 번호 를 제거함.
      // 4 입력 시  2, 12,13,14,15, 44실패 2~6
      // 1금지.
      continueNum: 4,
      
      //각 0,10,20,30,40 대에서 4개이상 나오지 않도록.
      tensRatio: 4,

      // 중복 검사 할 것
      // 고정 숫자, 제외 숫자
      fixedNum: [1],
      exceptedNumber: [45]
    }
  });
  console.log("TCL: initModel -> nomal", nomal);
  console.log("TCL: initModel -> nomal.options", nomal.options);
  console.log("TCL: initModel -> nomal.getNumber", nomal.getNumber);
  console.log("TCL: initModel -> nomal.lastLottoNumber", nomal.lastLottoNumber);
}
const initEvent = () => {
  
}
const afterDom = () => {
  sweet('안뇽');
  $(document).ready(function() {
    console.log("----------afterDom----------");
    $("#pageSection").pagepiling({
      menu: null,
      direction: "vertical",
      verticalCentered: true,
      scrollingSpeed: 0,
      sectionsColor: ["#f2f2f2", "#4BBFC3", "#7BAABE", "whitesmoke", "#000"],
      anchors: [],
      easing: "linear", //swing ,easeInQuart, linear
      // normalScrollElements: ['#sec1', "#sec2", "#sec3", "#sec4"],
      // normalScrollElementTouchThreshold :1,
      loopTop: false,
      loopBottom: false,
      css3: true,
      //events
      onLeave: function(index, nextIndex, direction) {},
      afterLoad: function(anchorLink, index) {},
      afterRender: function() {}
    });
  });
}



active();