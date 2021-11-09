<template lang="pug">
v-card(
  class="px-7 py-4 text-center"
)
  v-card-title(
    class="py-0 justify-center"
  )
    .headline
      | ログイン
  v-form
    v-container
      v-row
        v-col(
          cols="12"
          sm="12"
          md="3"
        )
          v-text-field(
            :rules="[rules.required]"
            v-model="email"
          )
      v-row
        v-col(
          cols="12"
          sm="12"
          md="3"
        )
          v-text-field(
            :rules="[rules.required]"
            v-model="password"
          )
      v-row(class="justify-center")
        v-btn(
          color="primary"
          @click="handleClick"
          :disabled="disabledBtn"
        ) ログイン
</template>

<script lang="ts">
import { defineComponent, computed, reactive, toRefs } from '@vue/composition-api'

type FieldValues = {
  email: string
  password: string
}

export default defineComponent({
  setup(_, { emit }) {
    const fieldValues = toRefs(reactive<FieldValues>({
      email: '',
      password: ''
    }))

    // FIXME: validate control modules の追加
    const rules = {
      required: (value: string) => !!value || 'Required.',
      email: (value: string) => {
        const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        return pattern.test(value) || 'Invalid e-mail.'
      }
    }

    const disabledBtn = computed<Boolean>(() => {
      return !fieldValues.email.value || !fieldValues.password.value
    })

    const handleClick = () => {
      emit('click-login')
    }

    return {
      ...fieldValues,
      rules,

      disabledBtn,
      handleClick
    }
  }
})
</script>
