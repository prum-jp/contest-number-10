---
to: stories/<%= category %>/<%= h.changeCase.pascal(name) %>.stories.ts
---
<%
  Name = h.changeCase.pascal(name)
-%>

import <%= Name %> from '~/components/<%= category %>/<%= Name %>'

export default {
  title: 'Components/<%= h.changeCase.camelCase(category) %>/<%= Name %>',
  <% if(category === 'templates') { -%>
  layout: 'fullscreen',
  <% } -%>
}

const Template = (_args: any, { argTypes }: any) => ({
  component: <%= Name %>,
  props: Object.keys(argTypes),
  template: `<<%= Name %>/>`,
})

export const Primary: any = Template.bind({})
Primary.args = {}
