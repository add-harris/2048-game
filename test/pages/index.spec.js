import { mount } from '@vue/test-utils'
import index from '@/pages/index.vue'

import Vue from 'vue'
import Vuetify from 'vuetify'

Vue.use(Vuetify)

describe('Pages / index.vue', () => {

  const wrapper = mount(index)

  test('is a Vue instance', () => {
    expect(wrapper.isVueInstance()).toBeTruthy()
  })

  test('slideLeft', () => {
    expect(wrapper.vm.slideLeft()).toBe(2)

  })

  test('slideLeft false', () => {
    expect(wrapper.vm.slideLeft()).toBe(3)

  })
})
