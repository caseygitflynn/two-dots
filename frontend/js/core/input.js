"use strict";

var TD = TD || {};

TD.Input = function (element) {
  this.element = element;
  this.currentCoords = null;
  this.isDown = false;

  this._initEvents();
};

TD.Input.prototype._initEvents = function () {
  this.element.addEventListener('mousedown', this._mouseDown.bind(this), false);
  this.element.addEventListener('mousemove', this._mouseMove.bind(this), false);
  document.addEventListener('mouseup', this._mouseUp.bind(this), false);
};

TD.Input.prototype._getElementCoordinates = function (e) {
  var x;
  var y;

  if (e.pageX || e.pageY) { 
    x = e.pageX;
    y = e.pageY;
  }
  else { 
    x = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft; 
    y = e.clientY + document.body.scrollTop + document.documentElement.scrollTop; 
  }

  x -= this.element.offsetLeft;
  y -= this.element.offsetTop;

  return {
    x : x,
    y : y,
  };
};

TD.Input.prototype._mouseDown = function (e) {
  var cords = this._getElementCoordinates(e);
  this.currentCoords = cords;
  this.isDown = true;
};

TD.Input.prototype._mouseMove = function (e) {
  if (!this.isDown) {
    this.currentCoords = null;
    return;
  }

  this.currentCoords = this._getElementCoordinates(e);
};

TD.Input.prototype._mouseUp = function (e) {
  this.currentCoords = null;
  this.isDown = false;
};