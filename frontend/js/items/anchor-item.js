"use strict";

var TD = TD || {};

TD.AnchorItem = function () {
  TD.AbstractGridItem.call(this);
};

TD.AnchorItem.prototype = Object.create(TD.AbstractGridItem.prototype);
TD.AnchorItem.prototype.contructor = TD.AnchorItem;

TD.AnchorItem.prototype.draw = function (ctx) {
  ctx.save();
  ctx.beginPath();
  ctx.arc(0, 0, 10, 0, 2 * Math.PI, false);
  ctx.fillStyle = "#000000";
  ctx.fill();
  ctx.restore();
};

TD.AnchorItem.prototype.copy = function () {
  return new TD.AnchorItem();
};