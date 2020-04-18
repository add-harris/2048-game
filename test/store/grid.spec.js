import {createLocalVue} from '@vue/test-utils'
import Vuex from "vuex"

describe('Store test / grid.js', () => {

  // setup stuff
  const localVue = createLocalVue()
  localVue.use(Vuex)
  let NuxtStore
  let store

  // test variables
  const POSITION_NAMES = ["position1", "position2", "position3", "position4",
                          "position5", "position6", "position7", "position8",
                          "position9", "position10", "position11", "position12",
                          "position13", "position14", "position15", "position16",]

  // hooks
  beforeAll(async () => {
    const storePath = `${process.env.buildDir}/store.js`
    NuxtStore = await import(storePath)
  })

  beforeEach(async () => {
    store = await NuxtStore.createStore()
  })

  afterEach(async () => {
    //
  })


  test('getFirstRow', () => {
    let firstRowNames = POSITION_NAMES.slice(0, 4)
    const getFirstRow = store.getters['grid/getFirstRow']

    getFirstRow.forEach( (position, index) => {
      expect(position.name).toBe(firstRowNames[index])
    })
  })


  test('getSecondRow', () => {
    let secondRowNames = POSITION_NAMES.slice(4, 8)
    const getSecondRow = store.getters['grid/getSecondRow']

    getSecondRow.forEach( (position, index) => {
      expect(position.name).toBe(secondRowNames[index])
    })
  })


  test('getThirdRow', () => {
    let thirdRowNames = POSITION_NAMES.slice(8, 12)
    const getThirdRow = store.getters['grid/getThirdRow']

    getThirdRow.forEach( (position, index) => {
      expect(position.name).toBe(thirdRowNames[index])
    })
  })

  test('getFourthRow', () => {
    let forthRowNames = POSITION_NAMES.slice(12, 16)
    const getForthRow = store.getters['grid/getForthRow']

    getForthRow.forEach( (position, index) => {
      expect(position.name).toBe(forthRowNames[index])
    })
  })

  test('getAll', () => {
    const getAllPositions = store.getters['grid/getAll']

    getAllPositions.forEach( (position, index) => {
      expect(position.name).toBe(POSITION_NAMES[index])
    })
  })


})
