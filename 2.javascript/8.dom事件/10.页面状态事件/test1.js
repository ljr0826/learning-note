var img = document.querySelector("img");

function getImgSize(img) {
  for (var i = 0; i < 10; i++) {}
  img.onload = function () {
    console.log(this.width, this.height, i);
    console.log(document.readyState);
  };
}
getImgSize(img);
