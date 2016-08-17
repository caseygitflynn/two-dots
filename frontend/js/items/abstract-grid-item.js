"use strict";

var TD = TD || {};

TD.AbstractGridItem = function () {
  this.x = 0;
  this.y = 20;
  this.speed = 0.1;
  this.animation = null;
};

TD.AbstractGridItem.prototype.draw = function (ctx) {
  throw new Error('GridItem must implement draw().');
};

TD.AbstractGridItem.prototype.copy = function () {
  throw new Error('GridItem must implement copy().');
};

TD.AbstractGridItem.prototype.animateTo = function (x, y) {
  this.animation = new TD.Animation(this.y, y, 0.5);
  this.x = x;
  var self = this;
  this.animation.onComplete = function () {
    self.animation = null;
  };
};

TD.AbstractGridItem.prototype.update = function (dt) {
  if (this.animation) {
    this.y = this.animation.update(dt);
  }
};

TD.AbstractGridItem.prototype.isAnimating = function () {
  return !(this.animation == null);
};