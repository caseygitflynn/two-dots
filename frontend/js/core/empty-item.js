"use strict";

var TD = TD || {};

TD.EmptyItem = function () {
  TD.AbstractGridItem.call(this);
  this.type = "EmptyItem";
};

TD.EmptyItem.prototype = Object.create(TD.AbstractGridItem.prototype);
TD.EmptyItem.prototype.contructor = TD.EmptyItem;

TD.EmptyItem.prototype.draw = function (ctx) {
  ctx.save();
  ctx.fillStyle = "#DDD";
  ctx.fillRect(-TD.GRID_SIZE / 2, -TD.GRID_SIZE / 2, TD.GRID_SIZE, TD.GRID_SIZE);
  ctx.restore();
};

TD.EmptyItem.prototype.copy = function () {
  return new TD.EmptyItem();
};