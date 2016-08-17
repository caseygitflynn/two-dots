"use strict";

var TD = TD || {};

TD.Connections = function () {
  this.connections = [];
  this.color = null;
  this.pathClosed = false;
};

TD.Connections.prototype.add = function (gridItem) {
  if (!(gridItem instanceof TD.DotItem)) {
    return;
  }

  // Add first
  if (this.getRoot() === null) {
    this.connections.push(gridItem);
    this.color = gridItem.color;
    return;
  };

  // Back up
  if (this.getPrevious() == gridItem) {
    this.connections.pop();
    this.pathClosed = false;
    return;
  }

  if (this.pathClosed) {
    return;
  }

  if (this.closesPath(gridItem)) {
    this.pathClosed = true;
    this.connections.push(gridItem);
    return;
  } else {
    this.pathClosed = false;
  }

  // Don't allow existing
  if (this.connections.indexOf(gridItem) !== -1) {
    return;
  }

  // Add subsequent
  if (this.color === gridItem.color && this.isNeighbor(this.getEnd(), gridItem)) {
    this.connections.push(gridItem);
  }
};

TD.Connections.prototype.getRoot = function () {
  if (this.connections.length > 0) {
    return this.connections[0];
  }

  return null;
};

TD.Connections.prototype.getPrevious = function () {
  if (this.connections.length < 2) {
    return null;
  }

  return this.connections[this.connections.length - 2];
};

TD.Connections.prototype.getEnd = function () {
  if (this.connections.length > 0) {
    return this.connections[this.connections.length -1];
  }

  return null;
};

TD.Connections.prototype.isNeighbor = function (first, second) {
  if (Math.abs(first.x - second.x) + Math.abs(first.y - second.y) == 1) {
    return true;
  }

  return false;
};

TD.Connections.prototype.closesPath = function (gridItem) {
  if (this.connections.length >= 4 && this.isNeighbor(this.getEnd(), gridItem) && this.getRoot() == gridItem) {
    return true;
  }

  return false;
};

TD.Connections.prototype.hasSquare = function () {
  return this.pathClosed;
};

TD.Connections.prototype.hasClears = function () {
  return this.connections.length > 1;
};

TD.Connections.prototype.getClears = function () {
  return this.connections;
};

TD.Connections.prototype.reset = function () {
  this.connections = [];
  this.pathClosed = false;
};

TD.Connections.prototype.draw = function (ctx) {
  if (this.connections.length < 2) {
    return;
  }

  for (var i = 0; i < this.connections.length - 1; i = i +1) {
    var first = this.connections[i];
    var second = this.connections[i + 1];

    var firstCanvasCoords = TD.Utils.worldToCanvas(first.x * TD.GRID_SIZE + TD.GRID_SIZE / 2, first.y * TD.GRID_SIZE + TD.GRID_SIZE / 2);
    var secondCanvasCoords = TD.Utils.worldToCanvas(second.x * TD.GRID_SIZE + TD.GRID_SIZE / 2, second.y * TD.GRID_SIZE + TD.GRID_SIZE / 2);

    ctx.save();
    ctx.beginPath();
    ctx.moveTo(firstCanvasCoords.x, firstCanvasCoords.y);
    ctx.lineTo(secondCanvasCoords.x, secondCanvasCoords.y);
    ctx.lineWidth = 5;
    ctx.strokeStyle = TD.COLORS[this.color];
    ctx.stroke();
    ctx.restore();
  }
};

TD.Connections.prototype.drawTail = function (position, ctx) {
  if (position == null || this.connections.length < 1 || this.pathClosed) {
    return;
  }

  var end = this.getEnd();

  var canvasCoordsEnd = TD.Utils.worldToCanvas(end.x * TD.GRID_SIZE + TD.GRID_SIZE / 2, end.y * TD.GRID_SIZE + TD.GRID_SIZE / 2);
  var canvasCoordsPos = TD.Utils.worldToCanvas(position.x, position.y);

  ctx.save();
  ctx.beginPath();
  ctx.moveTo(canvasCoordsEnd.x, canvasCoordsEnd.y);
  ctx.lineTo(canvasCoordsPos.x, canvasCoordsPos.y);
  ctx.lineWidth = 5;
  ctx.strokeStyle = TD.COLORS[this.color];
  ctx.stroke();
  ctx.restore();
};