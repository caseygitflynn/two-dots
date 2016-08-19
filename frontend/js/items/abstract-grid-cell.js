"use strict";

var TD = TD || {};

TD.AbstractGridCell = function () {
  this.occupiable = true;
};

TD.AbstractGridCell.prototype.draw = function (ctx) {
  throw new Error('GridCell must implement draw().');
};

TD.AbstractGridCell.prototype.onDotClear = function () {
  console.info('Dot cleared');
};