<template lang="pug">
  v-col(
    cols="1"
    md="1"
  )
    v-text-field(
      v-model="numValue"
      type="number"
      min="0"
      max="9"
    )
</template>

<script lang="ts">
import { defineComponent, ref, computed } from '@vue/composition-api'

export default defineComponent({
  setup(_, { emit }) {
    const num = ref<number>(0)
    const numValue = computed({
      get: () => num.value,
      set: (value: number) => (emit('setNumber', Number(value)))
    })
    return {
      numValue
    }
  }
})
</script>

