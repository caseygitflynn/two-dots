"use strict";

var TD = TD || {};

TD.ROWS = 10;
TD.COLS = 10;

TD.Level = function (fileUrl, loadCallback) {
  this.cells = TD.Utils.gridOfSize(TD.ROWS, TD.COLS);
  this.itemSet = [];
  this.loadCallback = loadCallback;

  this._loadLevel(fileUrl);
};

TD.Level.prototype._loadLevel = function (fileUrl) {
  var self = this;

  var xhr = new XMLHttpRequest();
  xhr.open('GET', fileUrl, true);

  xhr.addEventListener("readystatechange", function(e) {
    if (xhr.readyState == xhr.DONE) {
      var data = JSON.parse(xhr.responseText);
      self._fillCells(data.cells);
      self._fillItemSet(data.itemSet);

      if (typeof self.loadCallback === "function") {
        self.loadCallback(self);
      }
    }
  }, false);

  xhr.send();
};

TD.Level.prototype._fillCells = function (cells) {
  var self = this;
  TD.Utils.gridEach(cells, function (x, y, cell) {
    var cellX = TD.COLS - x - 1;


    switch (cell) {
      case 0 :
        self.cells[y][cellX] = new TD.EmptyCell();
        break;
      case 1 :
        self.cells[y][cellX] = new TD.PlainCell();
        break;
      case 2 :
        self.cells[y][cellX] = new TD.IceCell();
        break;
      default :
        self.cells[y][cellX] = new TD.PlainCell();
        break;
    } 

  });

};

TD.Level.prototype._fillItemSet = function (itemTypes) {
  this.itemSet = [];

  for (var i = 0; i < itemTypes.length; i = i + 1) {
    var type = itemTypes[i];

    this.itemSet.push(new TD.DotItem(type));
  }

  this.itemSet.push(new TD.AnchorItem());
};