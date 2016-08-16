"use strict";

var TD = TD || {};

TD.GRID_SIZE = 40;

TD.Grid = function (gridContents) {
  this.gridContents = gridContents;
  this.updateItemPositions();
};

TD.Grid.prototype.draw = function (ctx) {
  this.eachCell(function (x, y, gridCell) {
    if (gridCell.isEmpty()) {
      return;
    }

    var canvasCoords = TD.Utils.worldToCanvas(gridCell.content.x * TD.GRID_SIZE + TD.GRID_SIZE / 2, gridCell.content.y * TD.GRID_SIZE + TD.GRID_SIZE / 2);

    ctx.save();
    ctx.translate(canvasCoords.x, canvasCoords.y);
    gridCell.draw(ctx);
    ctx.restore();
  });
};

TD.Grid.prototype.animate = function (dt) {
  this.eachCell(function (x, y, gridCell) {
    gridCell.update(dt);
  });
};

TD.Grid.prototype.isAnimating = function () {
  var animating = false;

  this.eachCell(function (x, y, gridCell) {
    animating = animating || gridCell.isAnimating();
  });

  return animating;
};

TD.Grid.prototype.drop = function () {
  var cellContents = [];

  // Copy cell contents
  for (var x = 0; x < this.gridContents.length; x = x + 1) {
    cellContents.push([]);
    for (var y = 0; y < this.gridContents[x].length; y = y + 1) {
      var gridCell = this.gridContents[x][y];
      cellContents[x].push(gridCell.content);
    }
  }

  // Collapse
  for (var x = 0; x < cellContents.length; x = x + 1) {
    cellContents[x] = cellContents[x].filter(function (gridItem) {
      return gridItem !== null;
    });
  }

  // Refill grid
  for (var x = 0; x < this.gridContents.length; x = x + 1) {
    var contentY = 0;
    for (var y = 0; y < this.gridContents[x].length; y = y + 1) {
      var gridCell = this.gridContents[x][y];
      if (gridCell.isOccupiable()) {
        if (cellContents[x][contentY] !== undefined) {
          gridCell.setContent(cellContents[x][contentY]);
        } else {
          gridCell.setContent(null);
        }

        contentY++;
      }
    }
  }
};

TD.Grid.prototype.removeItems = function (gridItems) {
  for (var i = 0; i < gridItems.length; i = i + 1) {
    var gridItem = gridItems[i];
    var gridCell = this.gridContents[gridItem.x][gridItem.y];
    gridCell.setContent(null);
  }
};

TD.Grid.prototype.removeAllOfColor = function (color) {
  var self = this;

  this.eachCell(function (x, y, gridCell) {
    if ((gridCell.content instanceof TD.DotItem) && gridCell.content.color == color) {
      gridCell.setContent(null);
    }
  });
};

TD.Grid.prototype.getEmptyCount = function () {
  var empty = 0;

  this.eachCell(function (x, y, gridCell) {
    if (gridCell.isEmpty() && gridCell.isOccupiable()) {
      empty++;
    }
  });

  return empty;
};

TD.Grid.prototype.fill = function (items) {
  var self = this;
  this.eachCell(function (x, y, gridCell) {
    if (gridCell.isEmpty() && gridCell.occupiable) {
      gridCell.setContent(items.pop());
    }
  });

  this.updateItemPositions(true);
};

TD.Grid.prototype.eachCell = function (callback) {
  for (var x = 0; x < this.gridContents.length; x = x + 1) {
    for (var y = 0; y < this.gridContents[x].length; y = y + 1) {
      callback(x, y, this.gridContents[x][y]);
    }
  }
};

TD.Grid.prototype.updateItemPositions = function (animated) {
  this.eachCell(function (x, y, gridCell) {
    if (!gridCell.isEmpty()) {
      if (animated === true) {
        gridCell.content.animateTo(x, y);
      } else {
        gridCell.content.x = x;
        gridCell.content.y = y;
      }
    }
  });
};

TD.Grid.prototype.itemAt = function (x, y) {
  var gridX = Math.floor(x / TD.GRID_SIZE);
  var gridY = Math.floor(y / TD.GRID_SIZE);

  var gridCell = this.gridContents[gridX][gridY];

  if (!gridCell.isEmpty()) {
    return gridCell.content;
  }

  return null;
};