"use strict";

var TD = TD || {};

TD.Utils = TD.Utils || {};

TD.Utils.arrayRandom = function (array) {
  return array[Math.floor(Math.random() * array.length)];
};