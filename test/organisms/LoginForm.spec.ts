import { shallowMount } from '@vue/test-utils'
import Component from '~/components/organisms/LoginForm.vue'

describe('<%= cName %>', () => {
  test('snapshot', () => {
    const wrapper = shallowMount(Component)
    expect(wrapper.element).toMatchSnapshot()
  })
})
