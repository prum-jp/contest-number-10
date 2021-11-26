<template lang="pug">
  v-form
    v-container
      v-row
        input-number(@setNumber="(value) => (first = value)")
        input-number(@setNumber="(value) => (second = value)")
        input-number(@setNumber="(value) => (third = value)")
        input-number(@setNumber="(value) => (fourth = value)")
      v-btn.mt-5.mb-10(
        color="accent"
        elevation="2"
        x-large
        @click="execute"
      ) 計算実行
      v-row.mb-5 以下、10になる答え表示
      v-row(
        v-for="(result, index) in results"
        :key="`result-${index}`"
      )
        v-col(
          cols="1"
          md="3"
        ) {{ result }}
</template>

<script lang="ts">
import { defineComponent, ref } from '@vue/composition-api'
// import { Big } from 'big.js'
import InputNumber from '~/components/atoms/InputNumber.vue'

export default defineComponent({
  components: {
    InputNumber
  },

  setup() {
    // 画面入力値
    const first = ref<number>(0)
    const second = ref<number>(0)
    const third = ref<number>(0)
    const fourth = ref<number>(0)
    // 10になる答えを入れる配列
    const results = ref<Array<String>>([])

    const resultUntil2Digit = ref<number>(4)

    // 3番目の値を四則計算する関数
    const calcUntil3 = (resultUntil2Digit: number, third: number, fourth: number) => {
      if (calcUntil4((resultUntil2Digit + third), fourth)) return true
      if (calcUntil4((resultUntil2Digit - third), fourth)) return true
      if (calcUntil4((resultUntil2Digit * third), fourth)) return true
      if (calcUntil4((resultUntil2Digit / third), fourth)) return true
    }

    // 4番目の値を四則計算する関数
    const calcUntil4 = (resultUntil3Digit: number, fourth: number) => {
      const goalNum = 10
      if (resultUntil3Digit + fourth === goalNum) {
        console.log('happy1!')
      } else if (resultUntil3Digit - fourth === goalNum) {
        console.log('happy2!')
      } else if (resultUntil3Digit * fourth === goalNum) {
        console.log('happy3!')
      } else if (resultUntil3Digit / fourth === goalNum) {
        console.log('happy4!')
      } else {
        console.log('false!!!')
        return false
      }
    }

    // "計算実行"ボタン押下時に実行されるメソッド
    // ここでresultsに10になる答えを入れる
    // 小数点の計算などでバグる可能性あるので、big.jsをインストール済です
    // https://github.com/MikeMcl/big.js/
    const execute = () => {
      // results.value = []
      // const f: Big = Big(first.value)
      // const s: Big = Big(second.value)
      // const t: Big = Big(third.value)
      // console.log(f.div(s).times(s).toFixed(0))
      // results.value.push(String(f.div(s).times(t).toFixed(0)))

      calcUntil3(resultUntil2Digit.value, third.value, fourth.value)
    }

    return {
      first,
      second,
      third,
      fourth,
      results,
      execute
    }
  }
})
</script>
