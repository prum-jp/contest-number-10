---
to: src/components/<%= category %>/<%= h.changeCase.pascal(name) %>/index.spec.ts
---
<%
  cName = h.changeCase.camel(name)
  PName = h.changeCase.pascal(name)
-%>

import Component from '~/components/<%= category %>/<%= PName %>'

describe('<%= cName %>', () => {
  test('snapshot', () => {
    const wrapper = shallowMount(Component, {
      propsData: {},
      localVue,
    })
    expect(wrapper.element).toMatchSnapshot()
  })
})
