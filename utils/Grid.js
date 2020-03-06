class Grid {
  #position1 = new Position(0, 0, false);
  #position2 = new Position(0, 100, false);
  #position3 = new Position(0, 200, false);
  #position4 = new Position(0, 300, false);

  get position1() {
    return this.#position1;
  }

  set position1(newValue) {
    this.#position1 = newValue;
  }

  get position2() {
    return this.#position2;
  }

  set position2(newValue) {
    this.#position2 = newValue;
  }

  get position3() {
    return this.#position3;
  }

  set position3(newValue) {
    this.#position3 = newValue;
  }

  get position4() {
    return this.#position4;
  }

  set position4(newValue) {
    this.#position4 = newValue;
  }

  get firstRow() {
    return [this.#position1, this.#position2, this.#position3, this.#position4]
  }

}

class Position {
  top = 0;
  left = 0;
  isEmpty = true;
  constructor(top, left, isEmpty) {
    this.top = top;
    this.left = left;
    this.isEmpty = isEmpty;
  }

  // get top() {
  //   return this.top
  // }
  //
  // set top(x) {
  //   this.top = x
  // }
}



export { Grid, Position };
