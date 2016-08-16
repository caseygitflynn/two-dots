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
  var randomizer = new TD.Randomizer([
    new TD.DotItem(TD.COLORS.YELLOW),
    new TD.DotItem(TD.COLORS.RED),
    new TD.DotItem(TD.COLORS.GREEN),
    new TD.DotItem(TD.COLORS.LIGHT_BLUE),
  ]);

  for (var x = 0; x < 10; x = x + 1) {
    gridContent.push([]);
    for (var y = 0; y < 10; y = y + 1) {
      gridContent[x].push(new TD.GridCell(x, y, null));
    }
  }

  var grid = new TD.Grid(gridContent);
  grid.fill(randomizer.getItems(grid.getEmptyCount()));

  var connections = new TD.Connections();
  var time = new Date();
  var current = new Date();
  var delta = 0;

  var update = function () {
    window.requestAnimationFrame(update);

    current = new Date();
    delta = (current - time) / 1000;
    time = current;

    if (!grid.isAnimating()) {
      if (input.current !== null) {
        connections.add(grid.itemAt(input.current.x, input.current.y));
      } else {
        if (connections.hasClears()) {
          if (connections.hasSquare()) {
            grid.removeAllOfColor(connections.color);
          } else {
            grid.removeItems(connections.getClears());
          }

          var refillCount = grid.getEmptyCount();
          grid.drop();
          grid.fill(randomizer.getItems(refillCount));
        }

        connections.reset();
      }
    } else {
      grid.animate(delta);
    }

    clear();
    grid.draw(ctx);
    connections.draw(ctx);
    connections.drawTail(input.current, ctx);
  };

  update();
}());