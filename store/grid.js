import {Position} from "../utils/Position";

export const state = () => ({
  position1: new Position("position1",0, 0, true, ["up", "left"], null),
  position2: new Position("position2",0, 80, true, ["up"], null),
  position3: new Position("position3",0, 160, true, ["up"], null),
  position4: new Position("position4",0, 240, true, ["up", "right"], null),
  position5: new Position("position5",80, 0, true, ["left"], null),
  position6: new Position("position6",80, 80, true, [], null),
  position7: new Position("position7",80, 160, true, [], null),
  position8: new Position("position8",80, 240, true, ["right"], null),
  position9: new Position("position9",160, 0, true, ["left"], null),
  position10: new Position("position10",160, 80, true, [], null),
  position11: new Position("position11",160, 160, true, [], null),
  position12: new Position("position12",160, 240, true, ["right"], null),
  position13: new Position("position13",240, 0, true, ["down", "left"], null),
  position14: new Position("position14",240, 80, true, ["down"], null),
  position15: new Position("position15",240, 160, true, ["down"], null),
  position16: new Position("position16",240, 240, true, ["down", "right"], null),

  cards: {}

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
  getFirstColumn (state) {
    return [state.position1, state.position5, state.position9, state.position13]
  },
  getSecondColumn (state) {
    return [state.position2, state.position6, state.position10, state.position14]
  },
  getThirdColumn (state) {
    return [state.position3, state.position7, state.position11, state.position15]
  },
  getForthColumn (state) {
    return [state.position4, state.position8, state.position12, state.position16]
  },
  getAll (state) {
    return [state.position1, state.position2, state.position3, state.position4,
            state.position5, state.position6, state.position7, state.position8,
            state.position9, state.position10, state.position11, state.position12,
            state.position13, state.position14, state.position15, state.position16]
  }
}

// multiple parameters must be passed to mutations as a payload object
export const mutations = {
  setPositionIsEmpty (state, obj) {
    state[obj.name].isEmpty = obj.bool
  },
  setPositionId (state, obj) {
    state[obj.name].id = obj.id
  }
}



