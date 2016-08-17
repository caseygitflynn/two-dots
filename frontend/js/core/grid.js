"use strict";

var TD = TD || {};

TD.GRID_SIZE = 40;

TD.Grid = function (cells, items) {
  this.cells = cells;
  this.items = TD.Utils.gridOfSize(10, 20);
  this.updateItemPositions();
};

TD.Grid.prototype.draw = function (ctx) {
  this.drawCells(ctx);
  this.drawItems(ctx);
};

TD.Grid.prototype.drawCells = function (ctx) {
  TD.Utils.gridEach(this.cells, function (x, y, cell) {
    if (cell === null) {
      return;
    }

    var canvasCoords = TD.Utils.worldToCanvas(x * TD.GRID_SIZE + TD.GRID_SIZE / 2, y * TD.GRID_SIZE + TD.GRID_SIZE / 2);
    ctx.save();
    ctx.translate(canvasCoords.x, canvasCoords.y);
    cell.draw(ctx);
    ctx.restore();
  });
};

TD.Grid.prototype.drawItems = function (ctx) {
  TD.Utils.gridEach(this.items, function (x, y, item) {
    if (item === null) {
      return;
    }

    var canvasCoords = TD.Utils.worldToCanvas(item.x * TD.GRID_SIZE + TD.GRID_SIZE / 2, item.y * TD.GRID_SIZE + TD.GRID_SIZE / 2);
    ctx.save();
    ctx.translate(canvasCoords.x, canvasCoords.y);
    item.draw(ctx);
    ctx.restore();
  });
};

TD.Grid.prototype.update = function (dt) {
  TD.Utils.gridEach(this.items, function (x, y, item) {
    if (item !== null) {
      item.update(dt);
    }
  });
};

TD.Grid.prototype.isAnimating = function () {
  var animating = false;

  TD.Utils.gridEach(this.items, function (x, y, item) {
    if (item === null) {
      return;
    }

    animating = animating || item.isAnimating();
  });

  return animating;
};

TD.Grid.prototype.drop = function () {
  for (var x = 0; x < this.items.length; x = x + 1) {
    for (var y = 0; y < this.items[x].length; y = y + 1) {
      if (this.cells[x][y] !== null && this.items[x][y] == null) {
        for (var lookup = y + 1; lookup < this.items[x].length; lookup = lookup + 1) {
          var item = this.items[x][lookup];

          if (item !== null) {
            this.items[x][lookup] = null;
            this.items[x][y] = item;
            break;
          }
        }
      }
    }
  }

  this.updateItemPositions(true);
};

TD.Grid.prototype.removeItems = function (gridItems) {
  for (var i = 0; i < gridItems.length; i = i + 1) {
    var gridItem = gridItems[i];
    this.items[gridItem.x][gridItem.y] = null;
  }
};

TD.Grid.prototype.removeAllOfColor = function (color) {
  var self = this;

  TD.Utils.gridEach(this.items, function (x, y, item) {
    if ((item instanceof TD.DotItem) && item.color == color) {
      self.items[x][y] = null;
    }
  });
};

TD.Grid.prototype.getEmptyCount = function () {
  var empty = 0;
  var self = this;

  TD.Utils.gridEach(this.items, function (x, y, item) {
    if(self.cells[x][y] !== null && item == null) {
      empty++;
    }
  });

  return empty;
};

TD.Grid.prototype.fill = function (newItems) {
  var self = this;
  TD.Utils.gridEach(this.items, function (x, y, item) {
    if (self.cells[x][y] !== null && item == null) {
      self.items[x][y] = newItems.pop();
    }
  });

  this.updateItemPositions(true);
};

TD.Grid.prototype.updateItemPositions = function (animated) {
  TD.Utils.gridEach(this.items, function (x, y, item) {
    if (item === null) {
      return;
    }

    if (animated === true) {
      item.animateTo(x, y);
    } else {
      item.x = x;
      item.y = y;
    }
  });
};

TD.Grid.prototype.itemAt = function (x, y) {
  var gridX = Math.floor(x / TD.GRID_SIZE);
  var gridY = Math.floor(y / TD.GRID_SIZE);

  return this.items[gridX][gridY];
};