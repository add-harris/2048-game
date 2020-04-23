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
  let position1 = new Position("position1", 0, 0, true, ["up"], null)
  let position2 = new Position("position2", 100, 100, false, ["down"], "some-id-1")
  let position3 = new Position("position3", 200, 200, true, ["left"], null)
  let position4 = new Position("position4", 300, 300, false, ["right"], "some-id-2")

  let row = [position1, position2, position3, position4]

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

    mockGetFirstRow = jest.fn(() => row)
    mockGetSecondRow = jest.fn(() => row)
    mockGetThirdRow = jest.fn(() => row)
    mockGetForthRow = jest.fn(() => row)
    mockGetFirstColumn = jest.fn(() => row)
    mockGetSecondColumn = jest.fn(() => row)
    mockGetThirdColumn = jest.fn(() => row)
    mockGetForthColumn = jest.fn(() => row)
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
    expect(wrapper.vm.getEmpty(row)).toContain(position1)
    expect(wrapper.vm.getEmpty(row)).toContain(position3)
    expect(wrapper.vm.getEmpty(row)).not.toContain(position2)
    expect(wrapper.vm.getEmpty(row)).not.toContain(position4)
  })

  test('getRandomEmpty() - gets a random empty slot', () => {
    let possibleEmpties = [position1, position3]
    for (let i = 0; i < 10; i++) {
      expect(possibleEmpties.includes(wrapper.vm.getRandomEmpty())).toBeTruthy()
    }
  })

  test('getAllRows() - get arr of all rows from the store', () => {
    wrapper.vm.getAllRows().forEach(row => {
      expect(row).toBe(row)
    })
    expect(mockGetFirstRow).toHaveBeenCalledTimes(1)
    expect(mockGetSecondRow).toHaveBeenCalledTimes(1)
    expect(mockGetThirdRow).toHaveBeenCalledTimes(1)
    expect(mockGetForthRow).toHaveBeenCalledTimes(1)
  })

  test('getAllColumns() - get arr of all rows from the store', () => {
    wrapper.vm.getAllColumns().forEach(row => {
      expect(row).toBe(row)
    })
    expect(mockGetFirstColumn).toHaveBeenCalledTimes(1)
    expect(mockGetSecondColumn).toHaveBeenCalledTimes(1)
    expect(mockGetThirdColumn).toHaveBeenCalledTimes(1)
    expect(mockGetForthColumn).toHaveBeenCalledTimes(1)
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

  test('canMove() - return false if position is already at the edge', () => {
    expect(wrapper.vm.canMove(position1, row, "up")).toBeFalsy()
    expect(wrapper.vm.canMove(position2, row, "down")).toBeFalsy()
    expect(wrapper.vm.canMove(position3, row, "left")).toBeFalsy()
    expect(wrapper.vm.canMove(position4, row, "right")).toBeFalsy()
  })

  test('canMove() - return false if next position is already full', () => {
    let cantMoveRow = [position2, position4, position1, position3]
    expect(wrapper.vm.canMove(position4, cantMoveRow, "any")).toBeFalsy()
  })

  test('canMove() - return true if position can move', () => {
    expect(wrapper.vm.canMove(position2, row, "any")).toBeTruthy()
    expect(wrapper.vm.canMove(position4, row, "any")).toBeTruthy()
  })

  test('shuffleUp() - triggers slide to new position', () => {
    // replace function with a mock
    wrapper.vm.slide = jest.fn()
    // replace function with a mock & provide return value or mock implementation
    wrapper.vm.getEmpty = jest.fn(() => [position1])
    wrapper.vm.shuffleUp(position2, row)
    expect(wrapper.vm.slide).toBeCalledWith(position2.id, position1.top, position1.left)

  })

  test('shuffleUp() - updates new position in the store', () => {
    // replace function with a mock
    wrapper.vm.slide = jest.fn()
    // replace function with a mock & provide return value or mock implementation
    wrapper.vm.getEmpty = jest.fn(() => [position1])
    wrapper.vm.shuffleUp(position2, row)
    expect(mockSetPositionIsEmpty).toHaveBeenCalledTimes(2)
    expect(mockSetPositionId).toHaveBeenCalledTimes(2)
    // first parameter of setters is actually 'state', so here expect.anything() is used
    expect(mockSetPositionIsEmpty).toHaveBeenNthCalledWith(2, expect.anything(), { "name": position1.name, "bool": false })
    expect(mockSetPositionId).toHaveBeenNthCalledWith(2, expect.anything(), { "name": position1.name, "id": position2.id })
  })

  test('shuffleUp() - clears old position in the store', () => {
    // replace function with a mock
    wrapper.vm.slide = jest.fn()
    // replace function with a mock & provide return value or mock implementation
    wrapper.vm.getEmpty = jest.fn(() => [position1])
    wrapper.vm.shuffleUp(position2, row)
    expect(mockSetPositionIsEmpty).toHaveBeenCalledTimes(2)
    expect(mockSetPositionId).toHaveBeenCalledTimes(2)
    // first parameter of setters is actually 'state', so here expect.anything() is used
    expect(mockSetPositionIsEmpty).toHaveBeenNthCalledWith(1, expect.anything(), { "name": position2.name, "bool": true })
    expect(mockSetPositionId).toHaveBeenNthCalledWith(1, expect.anything(), { "name": position2.name, "id": null })
  })

  test('getRowsToMove() - returns rows from right to left if direction is right i.e. pos4, pos3, pos2, pos1', () => {
    let positionsRightToLeft = [position4, position3, position2, position1]

    wrapper.vm.getRowsToMove("right").forEach(row => {
      expect(row).toEqual(positionsRightToLeft)
    })
  })

  test('getRowsToMove() - returns rows from left to right if direction is left i.e. pos1, pos2, pos3, pos4', () => {
    let positionsLeftToRight = [position1, position2, position3, position4]

    wrapper.vm.getRowsToMove("left").forEach( row => {
      expect(row).toEqual(positionsLeftToRight)
    })
  })

  test('getRowsToMove() - returns rows from top to bottom if direction is up i.e. pos1, pos2, pos3, pos4', () => {
    let positionsTopToBottom = [position1, position2, position3, position4]

    wrapper.vm.getRowsToMove("up").forEach(row => {
      expect(row).toEqual(positionsTopToBottom)
    })
  })

  test('getRowsToMove() - returns rows from bottom to top if direction is down i.e. pos1, pos2, pos3, pos4', () => {
    let positionsBottomToTop = [position4, position3, position2, position1]

    wrapper.vm.getRowsToMove("down").forEach(row => {
      expect(row).toEqual(positionsBottomToTop)
    })
  })

  test('calculateMovement() - gets all rows to move', () => {
    wrapper.vm.getRowsToMove = jest.fn(() => [])
    wrapper.vm.calculateMovement("right")
    expect(wrapper.vm.getRowsToMove).toHaveBeenCalledTimes(1)
    expect(wrapper.vm.getRowsToMove).toHaveBeenCalledWith("right")
  })

  test('calculateMovement() - gets all rows to move', () => {
    wrapper.vm.getRowsToMove = jest.fn(() => [])
    wrapper.vm.calculateMovement("up")
    expect(wrapper.vm.getRowsToMove).toHaveBeenCalledTimes(1)
    expect(wrapper.vm.getRowsToMove).toHaveBeenCalledWith("up")
  })

  test('calculateMovement() - cycles through all non-empty positions to check if they can move', () => {
    wrapper.vm.getRowsToMove = jest.fn(() => [ row ])
    wrapper.vm.canMove = jest.fn()
    wrapper.vm.calculateMovement("right")
    expect(wrapper.vm.canMove).toHaveBeenCalledTimes(2)
    expect(wrapper.vm.canMove).toHaveBeenNthCalledWith(1, position2, row, "right")
    expect(wrapper.vm.canMove).toHaveBeenNthCalledWith(2, position4, row, "right")
  })

  test('calculateMovement() - triggers any positions that can move to move (shuffle up)', () => {
    wrapper.vm.getRowsToMove = jest.fn(() => [ row, row ])
    wrapper.vm.canMove = jest.fn(() => true)
    wrapper.vm.shuffleUp = jest.fn()
    wrapper.vm.calculateMovement("left")
    expect(wrapper.vm.shuffleUp).toHaveBeenCalledTimes(4)
    expect(wrapper.vm.shuffleUp).toHaveBeenNthCalledWith(1, position2, row, "left")
    expect(wrapper.vm.shuffleUp).toHaveBeenNthCalledWith(2, position4, row, "left")
    expect(wrapper.vm.shuffleUp).toHaveBeenNthCalledWith(3, position2, row, "left")
    expect(wrapper.vm.shuffleUp).toHaveBeenNthCalledWith(4, position4, row, "left")
  })

})
