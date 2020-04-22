import {createLocalVue, mount} from '@vue/test-utils'
import index from '@/pages/index.vue'

import Vue from 'vue'
import Vuex from "vuex"
import Vuetify from 'vuetify'
import {Position} from "../../utils/Position";

describe('Pages / index.vue', () => {

  // without this line test will throw a warning, see: https://github.com/vuejs/vue-test-utils/issues/1138
  Vue.use(Vuetify)

  // setup stuff
  const localVue = createLocalVue()
  localVue.use(Vuex)
  localVue.use(Vuetify)
  let store
  let wrapper

  // test variables
  let emptyPosition1 = new Position("position1", 0, 0, true, ["up"], null)
  let fullPosition1 = new Position("position2", 100, 100, false, ["down"], "some-id-1")
  let emptyPosition2 = new Position("position3", 200, 200, true, ["left"], null)
  let fullPosition2 = new Position("position4", 300, 300, false, ["right"], "some-id-2")

  let row = [emptyPosition1, fullPosition1, emptyPosition2, fullPosition2]

  // test helpers
  let mockGetFirstRow
  let mockGetSecondRow
  let mockGetThirdRow
  let mockGetForthRow
  let mockGetFirstColumn
  let mockGetSecondColumn
  let mockGetThirdColumn
  let mockGetForthColumn
  let mockGetAll

  let mockSetPositionIsEmpty
  let mockSetPositionId

  function createStore() {

    mockGetFirstRow = jest.fn()
    mockGetSecondRow = jest.fn()
    mockGetThirdRow = jest.fn()
    mockGetForthRow = jest.fn()
    mockGetFirstColumn = jest.fn()
    mockGetSecondColumn = jest.fn()
    mockGetThirdColumn = jest.fn()
    mockGetForthColumn = jest.fn()
    mockGetAll = jest.fn(() => row)

    let getters = {
      'grid/getFirstRow': mockGetFirstRow,
      'grid/getSecondRow': mockGetSecondRow,
      'grid/getThirdRow': mockGetThirdRow,
      'grid/getForthRow': mockGetForthRow,
      'grid/getFirstColumn': mockGetFirstColumn,
      'grid/getSecondColumn': mockGetSecondColumn,
      'grid/getThirdColumn': mockGetThirdColumn,
      'grid/getForthColumn': mockGetForthColumn,
      "grid/getAll": mockGetAll
    }

    mockSetPositionIsEmpty = jest.fn()
    mockSetPositionId = jest.fn()

    let mutations = {
      "grid/setPositionIsEmpty": mockSetPositionIsEmpty,
      "grid/setPositionId": mockSetPositionId
    }

    return new Vuex.Store({ getters, mutations })
  }

  function createDummyCard() {
    let dummyCard = document.createElement("DIV")
    dummyCard.id = "dummy-card"
    dummyCard.top = "0px"
    dummyCard.left = "0px"
    return dummyCard
  }

  // hooks
  beforeEach(async () => {
    store = createStore()
    wrapper = mount(index, {attachToDocument: true, localVue, store})
  })

  afterEach(async () => {
    wrapper.destroy()
  })


  test('getEmpty() - returns only empty positions', () => {
    expect(wrapper.vm.getEmpty(row)).toContain(emptyPosition1)
    expect(wrapper.vm.getEmpty(row)).toContain(emptyPosition2)
    expect(wrapper.vm.getEmpty(row)).not.toContain(fullPosition1)
    expect(wrapper.vm.getEmpty(row)).not.toContain(fullPosition2)
  })

  test('getRandomEmpty() - gets a random empty slot', () => {
    let possibleEmpties = [emptyPosition1, emptyPosition2]
    for (let i = 0; i < 10; i++) {
      expect(possibleEmpties.includes(wrapper.vm.getRandomEmpty())).toBeTruthy()
    }
  })


  test('generateCard() - creates a new card element', () => {
    wrapper.vm.generateCard()
    expect(wrapper.get("#sliding-card-1"))
    expect(mockSetPositionIsEmpty).toHaveBeenCalledTimes(1)
  })

  test('generateCard() - updates the store', () => {
    wrapper.vm.generateCard()
    expect(mockSetPositionIsEmpty).toHaveBeenCalledTimes(1)
    expect(mockSetPositionId).toHaveBeenCalledTimes(1)
  })

  test('slide() - updates position values of target', () => {
    wrapper.element.querySelector("#grid-background")
      .appendChild(createDummyCard())

    wrapper.vm.slide("dummy-card", 110, 120)
    expect(wrapper.find("#dummy-card").attributes().style).toContain("top: 110px")
    expect(wrapper.find("#dummy-card").attributes().style).toContain("left: 120px")
  })

  test('calculateMovement()', () => {

  })

  test('canMove() - return false if position is already at the edge', () => {
    expect(wrapper.vm.canMove(emptyPosition1, row, "up")).toBeFalsy()
    expect(wrapper.vm.canMove(fullPosition1, row, "down")).toBeFalsy()
    expect(wrapper.vm.canMove(emptyPosition2, row, "left")).toBeFalsy()
    expect(wrapper.vm.canMove(fullPosition2, row, "right")).toBeFalsy()
  })

  test('canMove() - return false if next position is already full', () => {
    let cantMoveRow = [fullPosition1, fullPosition2, emptyPosition1, emptyPosition2]
    expect(wrapper.vm.canMove(fullPosition2, cantMoveRow, "any")).toBeFalsy()
  })

  test('canMove() - return true if position can move', () => {
    expect(wrapper.vm.canMove(fullPosition1, row, "any")).toBeTruthy()
    expect(wrapper.vm.canMove(fullPosition2, row, "any")).toBeTruthy()
  })

  test('shuffleUp() - triggers slide to new position', () => {
    // replace function with a mock
    wrapper.vm.slide = jest.fn()
    // replace function with a mock & provide return value or mock implementation
    wrapper.vm.getEmpty = jest.fn(() => [emptyPosition1])
    wrapper.vm.shuffleUp(fullPosition1, row)
    expect(wrapper.vm.slide).toBeCalledWith(fullPosition1.id, emptyPosition1.top, emptyPosition1.left)

  })

  test('shuffleUp() - updates new position in the store', () => {
    // replace function with a mock
    wrapper.vm.slide = jest.fn()
    // replace function with a mock & provide return value or mock implementation
    wrapper.vm.getEmpty = jest.fn(() => [emptyPosition1])
    wrapper.vm.shuffleUp(fullPosition1, row)
    expect(mockSetPositionIsEmpty).toHaveBeenCalledTimes(2)
    expect(mockSetPositionId).toHaveBeenCalledTimes(2)
    // first parameter of setters is actually 'state', so here expect.anything() is used
    expect(mockSetPositionIsEmpty).toHaveBeenNthCalledWith(2, expect.anything(), { "name": emptyPosition1.name, "bool": false })
    expect(mockSetPositionId).toHaveBeenNthCalledWith(2, expect.anything(), { "name": emptyPosition1.name, "id": fullPosition1.id })
  })

  test('shuffleUp() - clears old position in the store', () => {
    // replace function with a mock
    wrapper.vm.slide = jest.fn()
    // replace function with a mock & provide return value or mock implementation
    wrapper.vm.getEmpty = jest.fn(() => [emptyPosition1])
    wrapper.vm.shuffleUp(fullPosition1, row)
    expect(mockSetPositionIsEmpty).toHaveBeenCalledTimes(2)
    expect(mockSetPositionId).toHaveBeenCalledTimes(2)
    // first parameter of setters is actually 'state', so here expect.anything() is used
    expect(mockSetPositionIsEmpty).toHaveBeenNthCalledWith(1, expect.anything(), { "name": fullPosition1.name, "bool": true })
    expect(mockSetPositionId).toHaveBeenNthCalledWith(1, expect.anything(), { "name": fullPosition1.name, "id": null })
  })

  test('getRowsToMove() - returns rows from right to left if direction is right i.e. pos4, pos3, pos2, pos1', () => {
    // expect(wrapper.vm.getRowsToMove("right")).
  })

})
