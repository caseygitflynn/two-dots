(function () {

  "use strict";
  
  var canvas = document.querySelector('canvas');
  var ctx = canvas.getContext('2d');
  ctx.save();
  ctx.fillStyle = "#000000";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.restore();
  console.log(canvas);
}());