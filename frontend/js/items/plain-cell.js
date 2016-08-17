"use strict";

var TD = TD || {};

TD.PlainCell = function () {
  TD.AbstractGridCell.call(this);
};

TD.PlainCell.prototype = Object.create(TD.AbstractGridCell.prototype);
TD.PlainCell.prototype.contructor = TD.PlainCell;

TD.PlainCell.prototype.draw = function (ctx) {
  // Do nothing
}