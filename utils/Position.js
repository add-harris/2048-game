
class Position {
  name = ""
  top = 0;
  left = 0;
  isEmpty = true;
  constructor(name, top, left, isEmpty) {
    this.name = name;
    this.top = top;
    this.left = left;
    this.isEmpty = isEmpty;
  }
}

export { Position };
