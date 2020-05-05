
class Position {
  name = ""
  top = 0;
  left = 0;
  isEmpty = true;
  edge = [];
  ref = null;
  constructor(name, top, left, isEmpty, edge, ref) {
    this.name = name;
    this.top = top;
    this.left = left;
    this.isEmpty = isEmpty;
    this.edge = edge;
    this.ref = ref;
  }
}

export { Position };
