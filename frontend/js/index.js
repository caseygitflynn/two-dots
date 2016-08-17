(function () {

  "use strict";
  
  var canvas = document.querySelector('canvas');

  var level = new TD.Level("level-1.json", function (level) {
    var game = new TD.Game(canvas, level);
  });
  
}());