console.log("loading script.js");

$("#game-count")
  .css("color", "red")
  .text("Game count")
  .on("click", function (evt) {
    console.log("clicked!");
  });
