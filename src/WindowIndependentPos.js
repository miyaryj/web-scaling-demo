export default class WindowIndependentPos {
  _pos = {};
  _systemRatio;

  constructor(x, y, systemRatio) {
    this._systemRatio = systemRatio;
    const ratio = window.devicePixelRatio / this._systemRatio;
    const offset = { x: window.screenX / ratio, y: window.screenY / ratio };
    this._pos.x = x + offset.x;
    this._pos.y = y + offset.y;
    console.log("WindowIndependentPos", this._pos);
  }

  restore() {
    const ratio = window.devicePixelRatio / this._systemRatio;
    const offset = { x: window.screenX / ratio, y: window.screenY / ratio };
    return {
      x: this._pos.x - offset.x,
      y: this._pos.y - offset.y,
    };
  }
}
