"use strict";

var TD = TD || {};

TD.COLORS = [
  "#FFCF64", // Yellow
  "#79BDCA", // Light Blue
  "#20AC72", // Green
  "#EB4B5D" // Red
];

TD.DotItem = function (color) {
  TD.AbstractGridItem.call(this);
  this.color = color;
};

TD.DotItem.prototype = Object.create(TD.AbstractGridItem.prototype);
TD.DotItem.prototype.contructor = TD.DotItem;

TD.DotItem.prototype.draw = function (ctx) {
  ctx.save();
  ctx.beginPath();
  ctx.arc(0, 0, 10, 0, 2 * Math.PI, false);
  ctx.fillStyle = TD.COLORS[this.color];
  ctx.fill();
  ctx.restore();
};

TD.DotItem.prototype.copy = function () {
  return new TD.DotItem(this.color);
};