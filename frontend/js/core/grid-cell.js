"use strict";

var TD = TD || {};

TD.GridCell = function (x, y, content) {
  this.x = x;
  this.y = y;
  this.content = null;
  this.occupiable = true;

  this.setContent(content);
};

TD.GridCell.prototype.setContent = function (content) {
  if (content !== null && !this.occupiable) {
    throw new Error('This cell cannot be occupide.');
    return;
  }

  if (content !== null && !(content instanceof TD.AbstractGridItem)) {
    throw new Error('Content must be an instance of AbstractGridItem or null.');
    return
  }

  this.content = content;
};

TD.GridCell.prototype.isEmpty = function () {
  return this.content === null;
};

TD.GridCell.prototype.isOccupiable = function () {
  return this.occupiable;
};

TD.GridCell.prototype.draw = function (ctx) {
  if (this.content !== null) {
    this.content.draw(ctx);
  }
};

TD.GridCell.prototype.update = function (dt) {
  if (!this.isEmpty()) {
    this.content.update(dt);
  }
};

TD.GridCell.prototype.isAnimating = function () {
  if (this.isEmpty()) {
    return false;
  }

  return this.content.isAnimating();
};