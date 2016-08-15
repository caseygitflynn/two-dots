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
      if (x !== 0 && x !== 9 && y !== 9) {
        gridContent[x].push(null);
      } else {
        gridContent[x].push(new TD.EmptyItem());
      }
    }
  }

  var grid = new TD.Grid(gridContent);
  grid.fill(randomizer.getItems(grid.getEmptyCount()));

  var connections = new TD.Connections();

  var update = function () {
    window.requestAnimationFrame(update);

    if (input.current !== null) {
      connections.add(grid.itemAt(input.current.x, input.current.y));
    } else {
      if (connections.hasClears()) {
        if (connections.hasSquare()) {
          grid.removeAllOfColor(connections.color);
        } else {
          grid.removeItems(connections.getClears());
        }

         grid.fill(randomizer.getItems(grid.getEmptyCount()));
      }

      connections.reset();
    }

    clear();
    grid.draw(ctx);
    connections.draw(ctx);
    connections.drawTail(input.current, ctx);
  };

  update();
}());