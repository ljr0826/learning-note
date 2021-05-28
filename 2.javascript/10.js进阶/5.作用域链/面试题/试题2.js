var food = "rice";

var eat = function () {
  console.log(`eat ${food}`); // eat rice
};

(function () {
  var food = "noodle";
  eat();
})();
