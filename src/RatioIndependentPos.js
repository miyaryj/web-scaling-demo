export default class RatioIndependentPos {
  _pos = {};

  constructor(x, y, systemRatio) {
    this._systemRatio = systemRatio;
    const ratio = window.devicePixelRatio / this._systemRatio;
    this._pos.x = x * ratio;
    this._pos.y = y * ratio;
    console.log("RatioIndependentPos", this._pos);
  }

  restore() {
    const ratio = window.devicePixelRatio / this._systemRatio;
    return {
      x: this._pos.x / ratio,
      y: this._pos.y / ratio,
    };
  }
}
