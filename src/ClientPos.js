export default class ClientPos {
  _pos = {};

  constructor(x, y) {
    this._pos.x = x;
    this._pos.y = y;
    console.log("ClientPos", this._pos);
  }

  restore() {
    return this._pos;
  }
}
