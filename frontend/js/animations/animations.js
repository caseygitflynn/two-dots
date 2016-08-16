"use strict";

var TD = TD || {};

TD.AnimationTiming = {
  bounceOut : function (x) {
    var n1 = 7.5625,
      d1 = 2.75;
    if ( x < 1/d1 ) {
      return n1*x*x;
    } else if ( x < 2/d1 ) {
      return n1*(x-=(1.5/d1))*x + .75;
    } else if ( x < 2.5/d1 ) {
      return n1*(x-=(2.25/d1))*x + .9375;
    } else {
      return n1*(x-=(2.625/d1))*x + .984375;
    }
  },
};

TD.Animation = function (from, to, time) {
  this.from = from;
  this.to = to;
  this.time = time;
  this.currentTime = 0;
};

TD.Animation.prototype.update = function (dt) {
  this.currentTime += dt;

  if (this.currentTime >= this.time) {
    this.onComplete();
    return this.to;
  }

  return (TD.AnimationTiming.bounceOut(this.currentTime / this.time) *  (this.to - this.from) + this.from);
};

TD.Animation.prototype.onComplete = function () {
  console.info("Animation complete.");
};