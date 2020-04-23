
class Position {
  name = ""
  top = 0;
  left = 0;
  isEmpty = true;
  edge = [];
  id = null;
  constructor(name, top, left, isEmpty, edge, id) {
    this.name = name;
    this.top = top;
    this.left = left;
    this.isEmpty = isEmpty;
    this.edge = edge;
    this.id = id;
  }
}

export { Position };
