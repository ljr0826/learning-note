var menu = document.querySelector(".menu");
var studentList = document.querySelector(".student-list");

function init() {
  var active = document.querySelector(".active");
  initContentShow(active);
}
init();
function bindEvent() {
  menu.onclick = function (e) {
    if (e.target.tagName !== "DD") {
      return false;
    }
    initContentShow(e.target);
    initMenuList();
    e.target.classList.add("active");
  };
}

function initMenuList() {
  var active = document.getElementsByClassName("active");
  for (var i = 0; i < active.length; i++) {
    active[i].classList.remove("active");
  }
}

function initContentShow(dom) {
  var id = dom.getAttribute("data-id");
  var rightContent = document.querySelector(`.${id}`);
  var content = document.querySelectorAll(".content");
  for (var i = 0; i < content.length; i++) {
    content[i].style.display = "none";
  }
  rightContent.style.display = "block";
}

bindEvent();
