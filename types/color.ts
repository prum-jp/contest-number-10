import { PropType } from '@vue/composition-api'

type Color =
  | 'primary'
  | 'accent'
  | 'secondary'
  | 'info'
  | 'warning'
  | 'error'
  | 'success'

export const colorProps = {
  type: String as PropType<Color>,
  required: false,
  default: 'primary',
}
