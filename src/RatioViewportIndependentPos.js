const viewPortOffset = {};

export function setMouseEvent(event) {
  const ratio = window.devicePixelRatio / 1.25;
  viewPortOffset.x = event.screenX - event.clientX * ratio;
  viewPortOffset.y = event.screenY - event.clientY * ratio;
}

export default class RatioViewportIndependentPos {
  _pos = {};

  constructor(x, y, systemRatio) {
    this._systemRatio = systemRatio;
    const ratio = window.devicePixelRatio / this._systemRatio;
    const offset = {
      x: window.screenX + viewPortOffset.x,
      y: window.screenY + viewPortOffset.y,
    };
    this._pos.x = x * ratio + offset.x;
    this._pos.y = y * ratio + offset.y;
    console.log("RatioViewportIndependentPos", this._pos);
  }

  restore() {
    const ratio = window.devicePixelRatio / this._systemRatio;
    const offset = {
      x: window.screenX + viewPortOffset.x,
      y: window.screenY + viewPortOffset.y,
    };
    return {
      x: (this._pos.x - offset.x) / ratio,
      y: (this._pos.y - offset.y) / ratio,
    };
  }
}
