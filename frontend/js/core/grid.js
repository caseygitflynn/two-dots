"use strict";

var TD = TD || {};

TD.GRID_SIZE = 40;

TD.Grid = function (gridContents) {
  this.gridContents = gridContents;
  this.updateItemPositions();
};

TD.Grid.prototype.draw = function (ctx) {
  this.eachItem(function (x, y, gridItem) {
    if (!gridItem) {
      return;
    }

    ctx.save();
    ctx.translate(x * TD.GRID_SIZE + TD.GRID_SIZE / 2, y * TD.GRID_SIZE + TD.GRID_SIZE / 2);
    gridItem.draw(ctx);
    ctx.restore();
  });
};

TD.Grid.prototype.removeItems = function (gridItems) {
  var removed = 0;

  for (var i = 0; i < gridItems.length; i = i + 1) {
    var gridItem = gridItems[i];
    this.gridContents[gridItem.x][gridItem.y] = null;
  }

  this.bubbleEmpty();
};

TD.Grid.prototype.removeAllOfColor = function (color) {
  var self = this;

  this.eachItem(function (x, y, gridItem) {
    if (gridItem instanceof TD.DotItem && gridItem.color == color) {
      self.gridContents[x][y] = null;
    }
  });

  this.bubbleEmpty();
};

TD.Grid.prototype.getEmptyCount = function () {
  var empty = 0;

  this.eachItem(function (x, y, gridItem) {
    if (gridItem === null) {
      empty++;
    }
  });

  return empty;
};

TD.Grid.prototype.bubbleEmpty = function () {
  for (var x = 0; x < this.gridContents.length; x = x + 1) {
    this.gridContents[x].sort(function (a, b) {
      return b === null ? 1 : 0;
    });
  }

  this.updateItemPositions();
};

TD.Grid.prototype.fill = function (items) {
  var self = this;
  this.eachItem(function (x, y, gridItem) {
    if (gridItem == null) {
      self.gridContents[x][y] = items.pop();
    }
  });

  this.updateItemPositions();
};

TD.Grid.prototype.eachItem = function (callback) {
  for (var x = 0; x < this.gridContents.length; x = x + 1) {
    for (var y = 0; y < this.gridContents[x].length; y = y + 1) {
      callback(x, y, this.gridContents[x][y]);
    }
  }
};

TD.Grid.prototype.updateItemPositions = function () {
  this.eachItem(function (x, y, gridItem) {
    if (gridItem == null) {
      return;
    }

    gridItem.x = x;
    gridItem.y = y;
  });
};

TD.Grid.prototype.itemAt = function (x, y) {
  var gridX = Math.floor(x / TD.GRID_SIZE);
  var gridY = Math.floor(y / TD.GRID_SIZE);

  if (this.gridContents[gridX][gridY]) {
    return this.gridContents[gridX][gridY];
  }

  return null;
};