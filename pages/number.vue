<template lang="pug">
  v-form
    v-container
      v-row.mb-5 下記数字が結果となる計算式を出す
      v-row
        input-number(@setNumber="(value) => (sum = value)")
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
      v-row.mb-5 以下、{{ sum }}になる答え表示
      v-row(
        v-for="(result, index) in results"
        :key="`result-${index}`"
      )
        v-col(
          cols="2"
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
    const sum = ref<number>(0)
    const first = ref<number>(0)
    const second = ref<number>(0)
    const third = ref<number>(0)
    const fourth = ref<number>(0)
    // 10になる答えを入れる配列
    const results = ref<Array<String>>([])

    // ループできるように関数をラップする
    const funPlus = (x: Big, y: Big) => {
      return x.plus(y)
    }

    const funMinus = (x: Big, y: Big) => {
      return x.minus(y)
    }

    const funTimes = (x: Big, y: Big) => {
      return x.times(y)
    }

    const funDiv = (x: Big, y: Big) => {
      // Division by zero対策      
      if(y.eq(Big(0))) return undefined
      return x.div(y)
    }

    // 24通りの並びを作成するメソッド
    const genArray = (numbers: Array<Big>, permutation: Array<any>) => {
      let i, j, k, l,array1,array2,array3;

      for(i = 0;i < numbers.length; i++){
        array1 = numbers.slice(0)
        array1.splice(i, 1);
        for(j = 0; j < array1.length; j++) {
          array2 = array1.slice(0)
          array2.splice(j, 1)
          for(k = 0; k < array2.length; k++) {
            array3 = array2.slice(0)
            array3.splice(k, 1)
            for(l = 0;l < array3.length; l++) {
              permutation.push([numbers[i]].concat([array1[j]]).concat([array2[k]]).concat([array3[l]]))
            }
          }
        }
      }
    }

    // 式を整形できるメソッド
    const genResult = (oparate: Function) => {
      switch(oparate) {
        case funPlus:
          return '+'
        case funMinus:
          return '-'
        case funTimes:
          return '*'
        case funDiv:
          return '/'
      } 
    }

    // "計算実行"ボタン押下時に実行されるメソッド
    // ここでresultsに10になる答えを入れる
    // 小数点の計算などでバグる可能性あるので、big.jsをインストール済です
    // https://github.com/MikeMcl/big.js/
    const execute = () => {
      results.value = []
      const m: Big = Big(sum.value)
      const f: Big = Big(first.value)
      const s: Big = Big(second.value)
      const t: Big = Big(third.value)
      const fo: Big = Big(fourth.value)

      // 今回求めるもの
      const master = m

      // 数字の順番は24通り
      const numbers: Array<Big> = [f, s, t, fo];
      const permutation: Array<any> = [];
      genArray(numbers, permutation)

      // 64通り計算やってみる
      const operators = [funPlus, funMinus, funTimes, funDiv]
      permutation.forEach(item => {
        // itemの0の計算
        operators.forEach(firstOperator => {
          // itemの1の計算
          const sum1 = firstOperator(item[0], item[1])
          if(!sum1) return
          operators.forEach(secondOperator => {
            // item2と3の計算
            const sum2 = secondOperator(sum1, item[2])
            if(sum2 !== undefined) {
              operators.forEach(thirdOperator => {
                const sum3 = thirdOperator(sum2, item[3])
                if(!sum3) return
                if(sum3.eq(master)) {
                  // 式を整形
                  const result = `((${item[0]}${genResult(firstOperator)}${item[1]})${genResult(secondOperator)}${item[2]})${genResult(thirdOperator)}${item[3]}`
                  results.value.push(result)
                }
              })
            }
          })
        })
      })
      if(!results.value.length) {
        results.value.push('結果なし')
      }
    }

    return {
      sum,
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
