"use strict";

var TD = TD || {};

TD.AbstractGridItem = function () {
  this.x = null;
  this.y = null;
};

TD.AbstractGridItem.prototype.draw = function (ctx) {
  throw new Error('GridItem must implement draw().');
};

TD.AbstractGridItem.prototype.copy = function () {
  throw new Error('GridItem must implement copy().');
};