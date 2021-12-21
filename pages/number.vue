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
import { Big } from 'big.js'
import InputNumber from '~/components/atoms/InputNumber.vue'

export default defineComponent({
  components: {
    InputNumber,
  },

  setup() {
    // 画面入力値
    const first = ref<number>(0)
    const second = ref<number>(0)
    const third = ref<number>(0)
    const fourth = ref<number>(0)
    // 10になる答えを入れる配列
    const results = ref<Array<String>>([])
    // "計算実行"ボタン押下時に実行されるメソッド
    // ここでresultsに10になる答えを入れる
    // 小数点の計算などでバグる可能性あるので、big.jsをインストール済です
    // https://github.com/MikeMcl/big.js/
    const execute = () => {
      results.value = []
      console.log('execute')
      const f: Big = Big(first.value)
      const s: Big = Big(second.value)
      const t: Big = Big(third.value)
      results.value.push(String(f.div(s).times(t).toFixed(0)))
    }

    const goalNum: number = 10
    let secondaryGaolNum: number | undefined

    // 入力された値を配列で保持
    const inputNums: Number[] = [first.value, second.value, third.value]

    // 1個値が入った時、goalNumになるために必要な値を配列形式で格納
    // 例:firstの値が入った時、secondとthirdの計算値が X になればgoalNumになり得るという値を格納
    const mustNums: Number[] = []

    const calc10ByPlus = (a: number, b: number): string | boolean => {
      if (a + b === goalNum) {
        return `${a} + ${b} = ${goalNum}`
      } else {
        return false
      }
    }

    const calcSecondaryGaolNumByPlus = (
      a: number,
      b: number
    ): string | boolean => {
      if (a + b === secondaryGaolNum) {
        return `${a} + ${b}`
      } else {
        return false
      }
    }

    const calc10ByMinus = (a: number, b: number): string | boolean => {
      if (a - b === goalNum) {
        return `${a} - ${b} = ${goalNum}`
      } else if (b - a === goalNum) {
        return `${b} - ${a} = ${goalNum}`
      } else {
        return false
      }
    }

    const calcSecondaryGaolNumByMinus = (
      a: number,
      b: number
    ): string | boolean => {
      if (a - b === secondaryGaolNum) {
        return `${a} - ${b}`
      } else if (b - a === secondaryGaolNum) {
        return `${b} - ${a}`
      } else {
        return false
      }
    }

    const calc10ByTimes = (a: number, b: number): string | boolean => {
      if (a * b === goalNum) {
        return `${a} × ${b} = ${goalNum}`
      } else {
        return false
      }
    }

    const calcSecondaryGaolNumByTimes = (
      a: number,
      b: number
    ): string | boolean => {
      if (a * b === secondaryGaolNum) {
        return `${a} × ${b}`
      } else {
        return false
      }
    }

    const calc10ByDivide = (a: number, b: number): string | boolean => {
      if (a / b === goalNum) {
        return `${a} ÷ ${b} = ${goalNum}`
      } else if (b / a === goalNum) {
        return `${b} ÷ ${a} = ${goalNum}`
      } else {
        return false
      }
    }

    const calcSecondaryGaolNumByDivide = (
      a: number,
      b: number
    ): string | boolean => {
      if (a / b === secondaryGaolNum) {
        return `${a} ÷ ${b}`
      } else if (b / a === goalNum) {
        return `${b} ÷ ${a}`
      } else {
        return false
      }
    }

    const calcMustNumber = (inputNum: any): void => {
      mustNums.push(goalNum - inputNum)
      mustNums.push(goalNum + inputNum)
      mustNums.push(goalNum / inputNum)
      mustNums.push(goalNum * inputNum)
    }

    inputNums.forEach((num) => calcMustNumber(num))

    return {
      first,
      second,
      third,
      fourth,
      results,
      execute,
      calc10ByPlus,
      calcSecondaryGaolNumByPlus,
      calc10ByMinus,
      calcSecondaryGaolNumByMinus,
      calc10ByTimes,
      calcSecondaryGaolNumByTimes,
      calc10ByDivide,
      calcSecondaryGaolNumByDivide,
    }
  },
})
</script>
