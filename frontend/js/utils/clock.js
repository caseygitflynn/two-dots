"use strict";

var TD = TD || {};

TD.Clock = function () {
  this.time = new Date();
  this.current = new Date();
  this.delta = 0;
};

TD.Clock.prototype.tick = function () {
  this.current = new Date();
  this.delta = (this.current - this.time) / 1000;
  this.time = this.current;
};