import { action } from '@storybook/addon-actions'
import { withKnobs } from '@storybook/addon-knobs'
import LoginForm from '~/components/organisms/LoginForm.vue'

export default {
  title: 'Organisms/LoginForm',
  decorators: [withKnobs],
}

export const Basic = () => {
  return {
    components: { LoginForm },
    methods: {
      onClick: action('click'),
    },
    template: `
      <LoginForm @click-login="onClick" />
    `,
  }
}
