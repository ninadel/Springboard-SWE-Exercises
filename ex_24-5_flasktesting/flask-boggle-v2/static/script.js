console.log("loading script.js 11");

$("#game-count")
  .css("color", "red")
  // .text("Game count")
  .on("click", function (event) {
    console.log("clicked!");
  });

$(document).ready(function (event) {
  console.log("document ready");
});

$("form").on("submit", function (event) {});
