"use strict";

var TD = TD || {};

TD.Game = function (canvas, level) {
  this.canvas = canvas;
  this.ctx = canvas.getContext('2d');
  this.level = level;
  this.itemRandomizer = new TD.ItemRandomizer(level.itemSet);
  this.input = new TD.Input(this.canvas);
  this.clock = new TD.Clock();
  this.grid = new TD.Grid(level.cells);
  this.connections = new TD.Connections();

  this.initGrid();
  this.loop();
};

TD.Game.prototype.clear = function () {
  this.ctx.save();
  this.ctx.fillStyle = "#F8F2E6";
  this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
  this.ctx.restore();
};

TD.Game.prototype.initGrid = function () {
  this.grid.fill(this.itemRandomizer.getItems(this.grid.getEmptyCount()));
};

TD.Game.prototype.loop = function () {
  window.requestAnimationFrame(this.loop.bind(this));
  this.clock.tick();

  this.grid.update(this.clock.delta);

  if (!this.grid.isAnimating()) {
    if (this.input.current !== null) {
      this.connections.add(this.grid.itemAt(this.input.current.x, this.input.current.y));
    } else {
      if (this.connections.hasClears()) {
        if (this.connections.hasSquare()) {
          this.grid.removeAllOfColor(this.connections.color);
        } else {
          this.grid.removeItems(this.connections.getClears());
        }

        var refillCount = this.grid.getEmptyCount();
        this.grid.drop();
        this.grid.fill(this.itemRandomizer.getItems(refillCount));
        this.connections.reset();
      }
    }
  }

  this.clear();
  this.connections.draw(this.ctx);
  this.connections.drawTail(this.input.current, this.ctx);
  this.grid.draw(this.ctx);
};