export default class RatioWindowIndependentPos {
  _pos = {};

  constructor(x, y, systemRatio) {
    this._systemRatio = systemRatio;
    const ratio = window.devicePixelRatio / this._systemRatio;
    const offset = { x: window.screenX, y: window.screenY };
    this._pos.x = x * ratio + offset.x;
    this._pos.y = y * ratio + offset.y;
    console.log("RatioWindowIndependentPos", this._pos);
  }

  restore() {
    const ratio = window.devicePixelRatio / this._systemRatio;
    const offset = { x: window.screenX, y: window.screenY };
    return {
      x: (this._pos.x - offset.x) / ratio,
      y: (this._pos.y - offset.y) / ratio,
    };
  }
}
