<template lang="pug">
  v-form
    v-container
      v-row
        //- <h2>問題：4つの数字を計算して、合計が10になるようにしてください</h2>
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
import { Big } from 'big.js'
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
    let ans = ref<any>(0)


    // "計算実行"ボタン押下時に実行されるメソッド
    // ここでresultsに10になる答えを入れる
    // 小数点の計算などでバグる可能性あるので、big.jsをインストール済です
    // https://github.com/MikeMcl/big.js/
    const execute = () => {
      results.value = []
      console.log('execute')
      const a: Big = Big(first.value)
      const b: Big = Big(second.value)
      const c: Big = Big(third.value)
      const d: Big = Big(fourth.value)
      ans = results.value.push(String(a.div(b).times(c).times(d).toFixed(0)))
      if (ans === 10){
        alert("10になります。おめでとうございます")
      } else {
        alert("10ではないです。出直してください")
      }
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
