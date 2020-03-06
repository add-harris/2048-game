import {Grid, Position} from "../utils/Grid";

export const state = () => ({
  text: "sometext"
})

export const getters = {
  getFirstRow (state) {
    return [state.text, state.text]
  }
}



