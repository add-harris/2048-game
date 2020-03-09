import {Position} from "../utils/Position";

export const state = () => ({
  position1: new Position("position1",0, 0, true),
  position2: new Position("position2",0, 100, true),
  position3: new Position("position3",0, 200, true),
  position4: new Position("position4",0, 300, true),
  position5: new Position("position5",100, 0, true),
  position6: new Position("position6",100, 100, true),
  position7: new Position("position7",100, 200, true),
  position8: new Position("position8",100, 300, true),
  position9: new Position("position9",200, 0, true),
  position10: new Position("position10",200, 100, true),
  position11: new Position("position11",200, 200, true),
  position12: new Position("position12",200, 300, true),
  position13: new Position("position13",300, 0, true),
  position14: new Position("position14",300, 100, true),
  position15: new Position("position15",300, 200, true),
  position16: new Position("position16",300, 300, true)
})

export const getters = {
  getFirstRow (state) {
    return [state.position1, state.position2, state.position3, state.position4]
  },
  getSecondRow (state) {
    return [state.position5, state.position6, state.position7, state.position8]
  },
  getThirdRow (state) {
    return [state.position9, state.position10, state.position11, state.position12]
  },
  getForthRow (state) {
    return [state.position13, state.position14, state.position15, state.position16]
  },
  getAll (state) {
    return [state.position1, state.position2, state.position3, state.position4,
            state.position5, state.position6, state.position7, state.position8,
            state.position9, state.position10, state.position11, state.position12,
            state.position13, state.position14, state.position15, state.position16]
  }
}

export const mutations = {
  setPositionIsEmpty (state, name, bool) {
    state[name].isEmpty = bool
  }
}



