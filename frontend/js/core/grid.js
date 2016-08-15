"use strict";

var TD = TD || {};

TD.GRID_SIZE = 40;

TD.Grid = function (gridContents) {
  this.gridContents = gridContents;
  this.updateItemPositions();
};

TD.Grid.prototype.draw = function (ctx) {
  // this.drawConnections(ctx);

  this.eachItem(function (x, y, gridItem) {
    ctx.save();
    ctx.translate(x * TD.GRID_SIZE + TD.GRID_SIZE / 2, y * TD.GRID_SIZE + TD.GRID_SIZE / 2);
    gridItem.draw(ctx);
    ctx.restore();
  });
};

TD.Grid.prototype.drawConnections = function (ctx) {
  this.eachItem(function (x, y, gridItem) {
    if (typeof gridItem !== "DotItem" && gridItem.connection == null) {
      return;
    }

    ctx.save();
    ctx.translate(x * TD.GRID_SIZE + TD.GRID_SIZE / 2, y * TD.GRID_SIZE + TD.GRID_SIZE / 2);
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(40, 0);
    ctx.lineWidth = 6;
    ctx.strokeStyle = gridItem.color;
    ctx.stroke();
    ctx.restore();
  });
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