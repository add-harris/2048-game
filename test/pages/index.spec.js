import { createLocalVue, mount } from '@vue/test-utils'
import index from '@/pages/index.vue'

import Vue from 'vue'
import Vuex from "vuex"
import Vuetify from 'vuetify'

describe('Pages / index.vue', () => {

  // without this line test will throw a warning, see: https://github.com/vuejs/vue-test-utils/issues/1138
  Vue.use(Vuetify)
  const localVue = createLocalVue()
  localVue.use(Vuex)
  localVue.use(Vuetify)

  let NuxtStore
  let store

  beforeAll(async () => {
    // note the store will mutate across tests
    const storePath = `${process.env.buildDir}/store.js`
    NuxtStore = await import(storePath)
  })

  beforeEach(async () => {
    store = await NuxtStore.createStore()
  })

  test('creates a card', () => {
    const wrapper = mount(index, {attachToDocument: true, localVue, store})
    wrapper.vm.createElement()
    expect(wrapper.get("#sliding-card-1"))
  })

  test('store', () => {
    const x = store.getters['grid/getFirstRow']
    console.log(x)
    console.log(x[0])
    console.log(x[0].name)
  })


  test('gets a random empty slot', () => {
    const wrapper = mount(index, {attachToDocument: true, localVue, store})
    let x = wrapper.vm.getRandomEmpty()
    console.log(x)
    console.log(x.name)

  })



})
