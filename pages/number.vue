<template lang="pug">
v-form
  v-container
    v-row
      input-number(@setNumber="(value) => (first = value)")
      input-number(@setNumber="(value) => (second = value)")
      input-number(@setNumber="(value) => (third = value)")
      input-number(@setNumber="(value) => (fourth = value)")
    v-btn.mt-5.mb-10(color='accent', elevation='2', x-large, @click='execute') 計算実行
    v-row.mb-5 以下、10になる答え表示
    v-row(v-for="(result, index) in results", :key="`result-${index}`")
    v-col(cols="1", md="3") {{ result }}
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

    // 導出する正解の値
    // const answerNumber = <number>(10)

    // 10になる式を格納する
    // const formula = ref<String>('')

    // 四則演算記号
    const symbols = ['+', '-', '*', '/']

    // 四則演算記号の全バリエーション格納用配列
    // 各要素内の記号はカンマで区切る
    const symbolVariations = ref<Array<String>>([])

    // "計算実行"ボタン押下時に実行されるメソッド
    // ここでresultsに10になる答えを入れる
    // 小数点の計算などでバグる可能性あるので、big.jsをインストール済です
    // https://github.com/MikeMcl/big.js/
    const execute = () => {
      results.value = []
 
      // // 入力数字格納用配列
      const inputNumberArray = ref<Array<Big>>([])
      // // 入力数字を１要素ごと配列へ格納
      inputNumberArray.value.push(Big(first.value))
      inputNumberArray.value.push(Big(second.value))
      inputNumberArray.value.push(Big(third.value))
      inputNumberArray.value.push(Big(fourth.value))
      
      // 四則演算記号の全バリエーションを配列へ設定
      setSymbolVariations()

      // 計算を実行
      if(calculation(inputNumberArray.value)){
        // true：正解の式が導出できた
        // results.value.push(String(formula + ' = ' + answerNumber + ' ...え！？' + answerNumber + 'なったかも！！'))
      } else {
        // false：正解の式が導出できなかった
        // results.value.push(String(answerNumber + 'になりませんでしたぁ'))
      }
    }

    // 四則演算記号の全バリエーションを配列へ設定
    const setSymbolVariations = () => {
      for(let i = 0; i < symbols.length; i++){
        for(let j = 0; j < symbols.length; j++){
          for(let k = 0; k < symbols.length; k++){
            // カンマ区切りで設定
            symbolVariations.value.push(symbols[i] + ',' +  symbols[j] + ',' + symbols[k])
          }
        }
      }
    }

    // 計算実行
    // 引数1：入力数字の配列
    const calculation = (inputNumberArray: Array<Big>) => {
      // 試算用の計算順数値格納配列（ループ処理の中で要素の順番を入れ替える）
      let calcNumberArray = inputNumberArray
      
      // 配列入れ替え時の数字退避用変数
      let tmpNum: Big = Big(0) 

      // 入力数字から並び順のバリエーションを作成しながら試算
      for( let i = 0; i < calcNumberArray.length; i++ ){
        // 次のループ用に初期配列を作成（初回は処理不要だが･･･処理しても問題ない）
        calcNumberArray = inputNumberArray
        tmpNum = inputNumberArray[i]
        calcNumberArray[i] = inputNumberArray[0]
        calcNumberArray[0] = tmpNum

        // 先頭数字を固定し、2〜4桁目を順に入れ替えていく
        for(let j = 0; j < 6; j++ ){

          // 初回
          if( j === 0 ){
            // 初回は並び替えずに処理させる

          // 奇数回目
          }else if( j % 2 === 1 ){
            // 2桁目と3桁目を入れ替える
            calcNumberArray.splice(1, 2, calcNumberArray[2], calcNumberArray[1])
            
          // 偶数回目
          }else{
            // 3桁目と4桁目を入れ替える
            calcNumberArray.splice(2, 2, calcNumberArray[3], calcNumberArray[2])
          }

          // 四則演算記号のバリエーションを作成しながら試算
          for(let i = 0; i < symbolVariations.value.length; i++ ){
            // 四則演算記号のバリエーションを１つずつ取得し、カンマで区切って今回処理用の配列へ格納
            const symbolVariation = symbolVariations.value[i].split(',')

            // 途中計算結果格納用（初期値として先頭数字を設定）
            let tmpCalcResult:Big = Big(calcNumberArray[0])

            // 計算式をクリア（初期値として先頭数字を設定）
            // formula.value = String(calcNumberArray[0])

            // 数字・記号の前から順に計算
            for(let j = 0; j < symbolVariation.length; j++){
              // 記号によって計算用メソッドを振り分ける
              switch (symbolVariation[j]) {
                case '+':
                  tmpCalcResult=tmpCalcResult.add(calcNumberArray[j+1]) 
                  // formula.value += ' + ' + (String)(calcNumberArray[j+1])
                  break;
                case '-':
                  tmpCalcResult=tmpCalcResult.minus(calcNumberArray[j+1]) 
                  // formula.value += ' - ' + (String)(calcNumberArray[j+1])
                  break;
                case '*':
                  tmpCalcResult=tmpCalcResult.times(calcNumberArray[j+1]) 
                  // formula.value += ' * ' + (String)(calcNumberArray[j+1])
                  break;
                case '/':
                  // ゼロ割になる場合はスキップ
                  if(calcNumberArray[j+1].eq(0)){
                    continue;
                  }else{
                    tmpCalcResult=tmpCalcResult.div(calcNumberArray[j+1]) 
                    // formula.value += ' / ' + (String)(calcNumberArray[j+1])
                  }
                  break;
                default:
                  break;
              }
            }

            // 正解の値が導き出せたらtrueを返却して処理終了
            // if(tmpCalcResult.eq(answerNumber)){
              // return true
            // }
          }
        }
      }

      return false
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
