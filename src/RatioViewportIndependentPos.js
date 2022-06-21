let _event;

export function setMouseEvent(event) {
  _event = event;
}

export default class RatioViewportIndependentPos {
  _pos = {};

  constructor(x, y, systemRatio) {
    this._systemRatio = systemRatio;
    const ratio = window.devicePixelRatio / this._systemRatio;
    const viewportOffset = this.viewportOffset();
    this._pos.x = x * ratio + viewportOffset.screenX;
    this._pos.y = y * ratio + viewportOffset.screenY;
    console.log("RatioViewportIndependentPos", this._pos);
  }

  restore() {
    const ratio = window.devicePixelRatio / this._systemRatio;
    const viewportOffset = this.viewportOffset();
    return {
      x: (this._pos.x - viewportOffset.screenX) / ratio,
      y: (this._pos.y - viewportOffset.screenY) / ratio,
    };
  }

  viewportOffset() {
    const ratio = window.devicePixelRatio / this._systemRatio;
    return {
      screenX: _event.screenX - _event.clientX * ratio,
      screenY: _event.screenY - _event.clientY * ratio,
    };
  }
}
