
class Position {
  name = ""
  top = 0;
  left = 0;
  isEmpty = true;
  edge = ["not"];
  constructor(name, top, left, isEmpty, edge) {
    this.name = name;
    this.top = top;
    this.left = left;
    this.isEmpty = isEmpty;
    this.edge = edge
  }
}

export { Position };
