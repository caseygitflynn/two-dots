"use strict";

var TD = TD || {};

TD.EmptyCell = function () {
  TD.AbstractGridCell.call(this);
  this.occupiable = false;
};

TD.EmptyCell.prototype = Object.create(TD.AbstractGridCell.prototype);
TD.EmptyCell.prototype.contructor = TD.EmptyCell;

TD.EmptyCell.prototype.draw = function (ctx) {
  // Do nothing
}