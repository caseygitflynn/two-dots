"use strict";

var TD = TD || {};

TD.EMPTY_ITEM = 0;

TD.EmptyItem = function () {
  TD.AbstractGridItem.call(this);
  this.type = "EmptyItem";
};

TD.EmptyItem.prototype = Object.create(TD.AbstractGridItem.prototype);
TD.EmptyItem.prototype.contructor = TD.EmptyItem;

TD.EmptyItem.prototype.draw = function (ctx) {
  ctx.save();
  // Do nothing
  ctx.restore();
};