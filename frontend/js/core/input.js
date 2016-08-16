"use strict";

var TD = TD || {};

TD.Input = function (element) {
  this.element = element;
  this.start = null;
  this.current = null;
  this._isDown = false;

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

  return TD.Utils.canvasToWorld(x, y);
};

TD.Input.prototype._mouseDown = function (e) {
  this.current = this._getElementCoordinates(e);
  this._isDown = true;
};

TD.Input.prototype._mouseMove = function (e) {
  if (!this._isDown) {
    this.current = null;
    return;
  }

  this.current = this._getElementCoordinates(e);
};

TD.Input.prototype._mouseUp = function (e) {
  this.current = null;
  this._isDown = false;
};