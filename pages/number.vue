<template lang="pug">
  v-form
    v-container
      v-row
        input-number(@setNumber="(value) => (first = value)")
        input-number(@setNumber="(value) => (second = value)")
        input-number(@setNumber="(value) => (third = value)")
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
import { defineComponent, ref, reactive } from '@vue/composition-api'
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

    // 計算終了時に算出される値
    const resultNum: number = 10

    // 10になる答えを入れる配列
    const results = reactive<string[]>([])
    // "計算実行"ボタン押下時に実行されるメソッド
    // ここでresultsに10になる答えを入れる
    // 小数点の計算などでバグる可能性あるので、big.jsをインストール済です
    // https://github.com/MikeMcl/big.js/

    // 2つの数値を与えた時に+の計算で期待する値にする計算式を求める関数
    const calcWishNumByPlus = (
      second: number,
      third: number,
      wishNum: number
    ): string | boolean => {
      if (second + third === wishNum) {
        return `(${second} + ${third})`
      } else {
        return false
      }
    }

    // 2つの数値を与えた時に-の計算で期待する値にする計算式を求める関数
    const calcWishNumByMinus = (
      second: number,
      third: number,
      wishNum: number
    ): string | boolean => {
      if (second - third === wishNum) {
        return `(${second} - ${third})`
      } else if (third - second === wishNum) {
        return `(${third} - ${second})`
      } else {
        return false
      }
    }

    // 2つの数値を与えた時に×の計算で期待する値にする計算式を求める関数
    const calcWishNumByTimes = (
      second: number,
      third: number,
      wishNum: number
    ): string | boolean => {
      if (second * third === wishNum) {
        return `(${second} × ${third})`
      } else {
        return false
      }
    }

    // 2つの数値を与えた時に÷の計算で期待する値にする計算式を求める関数
    const calcWishNumByDivide = (
      second: number,
      third: number,
      wishNum: number
    ): string | boolean => {
      if (second / third === wishNum) {
        return `(${second} ÷ ${third})`
      } else if (third / second === wishNum) {
        return `(${third} ÷ ${second})`
      } else {
        return false
      }
    }

    // 2つの数値を与えた時に期待する値にするための計算式を配列にまとめるための関数
    const getSucceedFormula = (
      second: number,
      third: number,
      wishNum: number
    ): Array<any> => {
      const resultArray = []

      const resultByPlus = calcWishNumByPlus(second, third, wishNum)
      if (resultByPlus) resultArray.push(resultByPlus)

      const resultByMinus = calcWishNumByMinus(second, third, wishNum)
      if (resultByMinus) resultArray.push(resultByMinus)

      const resultByTimes = calcWishNumByTimes(second, third, wishNum)
      if (resultByTimes) resultArray.push(resultByTimes)

      const resultByDivide = calcWishNumByMinus(second, third, wishNum)
      if (resultByDivide) resultArray.push(resultByDivide)

      return resultArray
    }

    const calc10ByPlus = (
      first: number,
      second: number,
      third: number
    ): void => {
      const wishNum: number = resultNum - first
      const resultArray = getSucceedFormula(second, third, wishNum)

      resultArray.forEach((result) => {
        results.push(`${result} + ${first}`)
      })
    }

    const calc10ByMinus = (
      first: number,
      second: number,
      third: number
    ): void => {
      const wishNum: number = resultNum + first
      const resultArray = getSucceedFormula(second, third, wishNum)

      resultArray.forEach((result) => {
        results.push(`${result} - ${first}`)
      })
    }

    const calc10ByTimes = (
      first: number,
      second: number,
      third: number
    ): void => {
      const wishNum: number = resultNum / first
      const resultArray = getSucceedFormula(second, third, wishNum)

      resultArray.forEach((result) => {
        results.push(`${result} × ${first}`)
      })
    }

    const calc10ByDivide = (
      first: number,
      second: number,
      third: number
    ): void => {
      const wishNum: number = first === 0 ? resultNum : resultNum * first
      const resultArray = getSucceedFormula(second, third, wishNum)

      resultArray.forEach((result) => {
        results.push(`${result} ÷ ${first}`)
      })
    }

    const execute = () => {
      results.splice(0)
      calc10ByPlus(first.value, second.value, third.value)
      calc10ByMinus(first.value, second.value, third.value)
      calc10ByTimes(first.value, second.value, third.value)
      calc10ByDivide(first.value, second.value, third.value)
      if (results.length === 0) results.push('あかーーーん')
    }

    return {
      first,
      second,
      third,
      results,
      calc10ByPlus,
      calcWishNumByPlus,
      calc10ByMinus,
      calcWishNumByMinus,
      calc10ByTimes,
      calcWishNumByTimes,
      calc10ByDivide,
      calcWishNumByDivide,
      execute,
    }
  },
})
</script>
