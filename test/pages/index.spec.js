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
  let emptyPosition1 = new Position("position1", 0, 0, true, ["top"], null)
  let fullPosition1 = new Position("position2", 100, 100, false, ["bottom"], "some-id-1")
  let emptyPosition2 = new Position("position3", 200, 200, true, ["left"], null)
  let fullPosition2 = new Position("position4", 300, 300, false, ["right"], "some-id-2")

  let setPositionIsEmpty = jest.fn()
  let setPositionId = jest.fn()

  function createStore() {
    let getters = {
      "grid/getAll": () => [emptyPosition1, fullPosition1]
    }

    let mutations = {
      "grid/setPositionIsEmpty": () => setPositionIsEmpty,
      "grid/setPositionId": () => setPositionId
    }

    let newStore = new Vuex.Store({ getters, mutations })

    return newStore
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
    let positions = [emptyPosition1, fullPosition1, emptyPosition2, emptyPosition2]
    expect(wrapper.vm.getEmpty(positions)).toContain(emptyPosition1)
    expect(wrapper.vm.getEmpty(positions)).toContain(emptyPosition2)
    expect(wrapper.vm.getEmpty(positions)).not.toContain(fullPosition1)
    expect(wrapper.vm.getEmpty(positions)).not.toContain(fullPosition2)
  })

  test('getRandomEmpty() - gets a random empty slot', () => {
    expect(wrapper.vm.getRandomEmpty()).toBe(emptyPosition1)
  })


  test('createElement() - creates a new card element', () => {
    wrapper.vm.createElement()
    expect(wrapper.get("#sliding-card-1"))
    expect(setPositionIsEmpty).toBeCalled
  })

  test('createElement() - updates the store', () => {
    wrapper.vm.createElement()
    expect(setPositionIsEmpty).toBeCalled
    expect(setPositionId).toBeCalled
  })

})
