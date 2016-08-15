"use strict";

var TD = TD || {};

TD.COLORS = {
  YELLOW : "#FFCF64",
  LIGHT_BLUE : "#79BDCA",
  GREEN : "#20AC72",
  RED : "#EB4B5D"
};

TD.DotItem = function (color) {
  TD.AbstractGridItem.call(this);
  this.color = color;
  this.connection = 1;
};

TD.DotItem.prototype = Object.create(TD.AbstractGridItem.prototype);
TD.DotItem.prototype.contructor = TD.DotItem;

TD.DotItem.prototype.draw = function (ctx) {
  ctx.save();
  ctx.beginPath();
  ctx.arc(0, 0, 10, 0, 2 * Math.PI, false);
  ctx.fillStyle = this.color;
  ctx.fill();
  ctx.restore();
};

TD.DotItem.prototype.connect = function (dotItem) {
  this.connection = dotItem;
};

TD.DotItem.prototype.disconnect = function () {
  this.connection = null;
};