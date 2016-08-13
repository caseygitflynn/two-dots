"use strict";

var TD = TD || {};

TD.AbstractGridItem = function () {

};

TD.AbstractGridItem.prototype.draw = function (ctx) {
  throw new Error('GridItem must implement draw().');
};