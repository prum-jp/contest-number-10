
import { shallowMount } from '@vue/test-utils'
import Component from '~/components/atoms/InputNumber.vue'

describe('inputNumber', () => {
  test('snapshot', () => {
    const wrapper = shallowMount(Component, {
      propsData: {},
      localVue,
    })
    expect(wrapper.element).toMatchSnapshot()
  })
})
