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

    const goalNum: number = 10
    // 10になる答えを入れる配列
    const results = reactive<any[]>([])
    // "計算実行"ボタン押下時に実行されるメソッド
    // ここでresultsに10になる答えを入れる
    // 小数点の計算などでバグる可能性あるので、big.jsをインストール済です
    // https://github.com/MikeMcl/big.js/

    const calcSecondaryGaolNumByPlus = (
      second: number,
      third: number,
      secondaryGaolNum: number
    ): string | boolean => {
      if (second + third === secondaryGaolNum) {
        return `(${second} + ${third})`
      } else {
        return false
      }
    }

    const calcSecondaryGaolNumByMinus = (
      second: number,
      third: number,
      secondaryGaolNum: number
    ): string | boolean => {
      if (second - third === secondaryGaolNum) {
        return `(${second} - ${third})`
      } else if (third - second === secondaryGaolNum) {
        return `(${third} - ${second})`
      } else {
        return false
      }
    }

    const calcSecondaryGaolNumByTimes = (
      second: number,
      third: number,
      secondaryGaolNum: number
    ): string | boolean => {
      if (second * third === secondaryGaolNum) {
        return `(${second} × ${third})`
      } else {
        return false
      }
    }

    const calcSecondaryGaolNumByDivide = (
      second: number,
      third: number,
      secondaryGaolNum: number
    ): string | boolean => {
      if (second / third === secondaryGaolNum) {
        return `(${second} ÷ ${third})`
      } else if (third / second === secondaryGaolNum) {
        return `(${third} ÷ ${second})`
      } else {
        return false
      }
    }

    const calc10ByPlus = (
      first: number,
      second: number,
      third: number
    ): void => {
      const secondaryGaolNum: number = goalNum - first
      const secondaryResultArray = []

      const resultByPlus = calcSecondaryGaolNumByPlus(
        second,
        third,
        secondaryGaolNum
      )
      if (resultByPlus) secondaryResultArray.push(resultByPlus)

      const resultByMinus = calcSecondaryGaolNumByMinus(
        second,
        third,
        secondaryGaolNum
      )
      if (resultByMinus) secondaryResultArray.push(resultByMinus)

      const resultByTimes = calcSecondaryGaolNumByTimes(
        second,
        third,
        secondaryGaolNum
      )
      if (resultByTimes) secondaryResultArray.push(resultByTimes)

      const resultByDivide = calcSecondaryGaolNumByMinus(
        second,
        third,
        secondaryGaolNum
      )
      if (resultByDivide) secondaryResultArray.push(resultByDivide)

      secondaryResultArray.forEach((result) => {
        results.push(`${result} + ${first}`)
      })
    }

    const calc10ByMinus = (
      first: number,
      second: number,
      third: number
    ): void => {
      const secondaryGaolNum: number = goalNum + first
      const secondaryResultArray = []

      const resultByPlus = calcSecondaryGaolNumByPlus(
        second,
        third,
        secondaryGaolNum
      )
      if (resultByPlus) secondaryResultArray.push(resultByPlus)

      const resultByMinus = calcSecondaryGaolNumByMinus(
        second,
        third,
        secondaryGaolNum
      )
      if (resultByMinus) secondaryResultArray.push(resultByMinus)

      const resultByTimes = calcSecondaryGaolNumByTimes(
        second,
        third,
        secondaryGaolNum
      )
      if (resultByTimes) secondaryResultArray.push(resultByTimes)

      const resultByDivide = calcSecondaryGaolNumByMinus(
        second,
        third,
        secondaryGaolNum
      )
      if (resultByDivide) secondaryResultArray.push(resultByDivide)

      secondaryResultArray.forEach((result) => {
        results.push(`${result} - ${first}`)
      })
    }

    const calc10ByTimes = (
      first: number,
      second: number,
      third: number
    ): void => {
      const secondaryGaolNum: number = goalNum / first
      const secondaryResultArray = []

      const resultByPlus = calcSecondaryGaolNumByPlus(
        second,
        third,
        secondaryGaolNum
      )
      if (resultByPlus) secondaryResultArray.push(resultByPlus)

      const resultByMinus = calcSecondaryGaolNumByMinus(
        second,
        third,
        secondaryGaolNum
      )
      if (resultByMinus) secondaryResultArray.push(resultByMinus)

      const resultByTimes = calcSecondaryGaolNumByTimes(
        second,
        third,
        secondaryGaolNum
      )
      if (resultByTimes) secondaryResultArray.push(resultByTimes)

      const resultByDivide = calcSecondaryGaolNumByMinus(
        second,
        third,
        secondaryGaolNum
      )
      if (resultByDivide) secondaryResultArray.push(resultByDivide)

      secondaryResultArray.forEach((result) => {
        results.push(`${result} × ${first}`)
      })
    }

    const calc10ByDivide = (
      first: number,
      second: number,
      third: number
    ): void => {
      const secondaryGaolNum: number = goalNum * first
      const secondaryResultArray = []

      const resultByPlus = calcSecondaryGaolNumByPlus(
        second,
        third,
        secondaryGaolNum
      )
      if (resultByPlus) secondaryResultArray.push(resultByPlus)

      const resultByMinus = calcSecondaryGaolNumByMinus(
        second,
        third,
        secondaryGaolNum
      )
      if (resultByMinus) secondaryResultArray.push(resultByMinus)

      const resultByTimes = calcSecondaryGaolNumByTimes(
        second,
        third,
        secondaryGaolNum
      )
      if (resultByTimes) secondaryResultArray.push(resultByTimes)

      const resultByDivide = calcSecondaryGaolNumByMinus(
        second,
        third,
        secondaryGaolNum
      )
      if (resultByDivide) secondaryResultArray.push(resultByDivide)

      secondaryResultArray.forEach((result) => {
        results.push(`${result} ÷ ${first}`)
      })
    }

    const execute = () => {
      calc10ByPlus(first.value, second.value, third.value)
      calc10ByMinus(first.value, second.value, third.value)
      calc10ByTimes(first.value, second.value, third.value)
      calc10ByDivide(first.value, second.value, third.value)
    }

    return {
      first,
      second,
      third,
      results,
      calc10ByPlus,
      calcSecondaryGaolNumByPlus,
      calc10ByMinus,
      calcSecondaryGaolNumByMinus,
      calc10ByTimes,
      calcSecondaryGaolNumByTimes,
      calc10ByDivide,
      calcSecondaryGaolNumByDivide,
      execute,
    }
  },
})
</script>
