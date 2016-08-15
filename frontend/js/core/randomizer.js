"use strict";

var TD = TD || {};

TD.Randomizer = function (options) {
  this.options = options;
};

TD.Randomizer.prototype.getItem = function () {
  return TD.Utils.arrayRandom(this.options).copy();
};

TD.Randomizer.prototype.getItems = function (count) {
  var items = [];
  
  while(count > 0) {
    items.push(this.getItem());
    count--;
  }

  return items;
};