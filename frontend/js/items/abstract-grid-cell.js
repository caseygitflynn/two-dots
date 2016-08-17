"use strict";

var TD = TD || {};

TD.AbstractGridCell = function () {
};

TD.AbstractGridCell.prototype.draw = function (ctx) {
  throw new Error('GridCell must implement draw().');
};