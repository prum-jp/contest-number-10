---
to: stories/<%= category %>/<%= h.changeCase.pascal(name) %>.stories.ts
---
<%
  Name = h.changeCase.pascal(name)
  Category = h.changeCase.pascal(category)
-%>

import <%= Name %> from '~/components/<%= category %>/<%= Name %>/index.vue'

export default {
  title: '<%= Category %>/<%= Name %>',
  <% if(category === 'templates') { -%>
  layout: 'fullscreen',
  <% } -%>
}

export const Basic = () => {
  return {
    components: { <%= Name %> },
    template: `
      <<%= Name %> />
    `,
  }
}
