
import InputNumber from '~/components/atoms/InputNumber.vue'

export default {
  title: 'Atoms/InputNumber',
  }

export const Basic = () => {
  return {
    components: { InputNumber },
    template: `
      <InputNumber />
    `,
  }
}
