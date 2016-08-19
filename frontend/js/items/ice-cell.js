"use strict";

var TD = TD || {};

TD.IceCell = function () {
  TD.AbstractGridCell.call(this);
  this.breakCount = 3;
};

TD.IceCell.prototype = Object.create(TD.AbstractGridCell.prototype);
TD.IceCell.prototype.contructor = TD.IceCell;

TD.IceCell.prototype.draw = function (ctx) {
  var alpha = (this.breakCount + 1) / 5;

  ctx.save();
  ctx.globalAlpha = alpha;
  ctx.fillStyle = "#FFFFFF";
  ctx.fillRect(-TD.GRID_SIZE / 2, -TD.GRID_SIZE / 2, TD.GRID_SIZE, TD.GRID_SIZE);
  ctx.restore();
}

TD.IceCell.prototype.onDotClear = function () {
  if (this.breakCount > 0) {
    this.breakCount--;
  }
};