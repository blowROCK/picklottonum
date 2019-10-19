import { random } from "./util";
import {lotto } from "./lotto";
active();

function active() {
  console.log("TCL: active -> active");
  initEvent();
  initModel();
  afterDom();
}
function initModel() {}
function initEvent() {}

function afterDom() {
  $(document).ready(function() {
    console.log("----------afterDom----------");
    $("#pageSection").pagepiling({
      menu: null,
      direction: "vertical",
      verticalCentered: true,
      scrollingSpeed: 300,
      sectionsColor: ["#f2f2f2", "#4BBFC3", "#7BAABE", "whitesmoke", "#000"],
      anchors: [],
      easing: "linear", //swing

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
