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