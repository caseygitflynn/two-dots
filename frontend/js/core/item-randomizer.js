"use strict";

var TD = TD || {};

TD.ItemRandomizer = function (options) {
  this.options = options;
};

TD.ItemRandomizer.prototype.getItem = function () {
  return TD.Utils.arrayRandom(this.options).copy();
};

TD.ItemRandomizer.prototype.getItems = function (count) {
  var items = [];
  
  while(count > 0) {
    items.push(this.getItem());
    count--;
  }

  return items;
};