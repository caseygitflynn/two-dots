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

  var cells = [];
  for (var x = 0; x < 10; x = x + 1) {
    cells.push([]);
    for (var y = 0; y < 10; y = y + 1) {
      if ((y == 5) || (x == 0 && (y == 0 || y == 9)) || (x == 9 && (y == 0 || y == 9))) {
        cells[x].push(null);
      } else {
        cells[x].push(new TD.GridCell());
      }
    }
  }

  var items = [];
  for (var x = 0; x < 10; x = x + 1) {
    items.push([]);
    for (var y = 0; y < 20; y = y + 1) {
      items[x].push(null);
    }
  }

  var randomizer = new TD.Randomizer([
    new TD.DotItem(TD.COLORS.YELLOW),
    new TD.DotItem(TD.COLORS.RED),
    new TD.DotItem(TD.COLORS.GREEN),
    new TD.DotItem(TD.COLORS.LIGHT_BLUE),
  ]);

  var grid = new TD.Grid(cells, items);
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