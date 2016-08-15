(function () {

  "use strict";
  
  var canvas = document.querySelector('canvas');
  var ctx = canvas.getContext('2d');

  var clear = function () {
    ctx.save();
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.restore();
  };

  var input = new TD.Input(canvas);

  var gridContent = [];
  var colors = [TD.COLORS.YELLOW, TD.COLORS.RED, TD.COLORS.GREEN, TD.COLORS.LIGHT_BLUE];

  for (var x = 0; x < 10; x = x + 1) {
    gridContent.push([]);
    for (var y = 0; y < 10; y = y + 1) {
      if (x !== 0 && x !== 9 && y !== 0 && y !== 9) {
        gridContent[x].push(new TD.DotItem(TD.Utils.arrayRandom(colors)));
      } else {
        gridContent[x].push(new TD.EmptyItem());
      }
    }
  }

  var grid = new TD.Grid(gridContent);
  var startItem = null;

  var update = function () {
    window.requestAnimationFrame(update);

    if (input.start !== null) {
      startItem = grid.itemAt(input.start.x, input.start.y);
    }

    if (input.current !== null && grid.itemAt(input.current.x, input.current.y) !== startItem) {
      console.log(grid.itemAt(input.current.x, input.current.y));
    }

    clear();
    grid.draw(ctx);
  };

  update();
}());