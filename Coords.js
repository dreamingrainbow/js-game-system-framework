export class Coords {
  constructor({
    width = 480,
    height = 270,
    x = 0,
    y = 0
  } = {}) {
    this._width = width;
    this._height = height;
    this._x = x;
    this._y = y;
  }

  get width() {
    return this._width
  }
  set width(value) {
    this._width = value
  }

  get height() {
    return this._height
  }
  set height(value) {
    this._height = value
  }

  get x() {
    return this._x
  }
  set x(value) {
    this._x = value
  }

  get y() {
    return this._y
  }
  set y(value) {
    this._y = value
  }

  toObject() {
    return {
      x: this._x,
      y: this._y,
      width: this._width,
      height: this._height
    }
  }
}
