---
to: test/<%= category %>/<%= h.changeCase.pascal(name) %>.spec.ts
---
<%
  cName = h.changeCase.camel(name)
  PName = h.changeCase.pascal(name)
-%>

import { shallowMount } from '@vue/test-utils'
import Component from '~/components/<%= category %>/<%= PName %>.vue'

describe('<%= cName %>', () => {
  test('snapshot', () => {
    const wrapper = shallowMount(Component, {
      propsData: {},
      localVue,
    })
    expect(wrapper.element).toMatchSnapshot()
  })
})
