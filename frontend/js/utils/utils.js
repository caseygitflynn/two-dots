"use strict";

var TD = TD || {};

TD.Utils = TD.Utils || {};

TD.Utils.arrayRandom = function (array) {
  return array[Math.floor(Math.random() * array.length)];
};

TD.Utils.worldToCanvas = function (x, y) {
  return {
    x : x,
    y : -y + 400,
  };
};

TD.Utils.canvasToWorld = function (x, y) {
  return {
    x : x,
    y : 400 -y,
  };
};

TD.Utils.gridEach = function (grid, callback) {
  for (var x = 0; x < grid.length; x = x + 1) {
    for (var y = 0; y < grid[x].length; y = y + 1) {
      callback(x, y, grid[x][y]);
    }
  }
};