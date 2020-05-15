<template>
  <div class="bottomBar">
    <div class="checkButton">
      <check-button class="allSelect"
                    :isSelect="changeAllSelect"
                    @click.native="allSelectClick"
                    ref="allSelect"/>
      <span>全选</span>
    </div>
    <div class="total-price">总价： {{totalPrice}}</div>
    <div class="calculate">去计算（{{checkLength}}）</div>
  </div>
</template>

<script>
    import CheckButton from "components/content/checkButton/CheckButton";
    export default {
      name: "CartBottomBar",
      data() {
        return {
          cartState: []
        }
      },
      components: {
        CheckButton
      },
      computed: {
        totalPrice() {
          return '￥'+ this.$store.getters.cartList.filter((item) => {
            return item.checked
          }).reduce((preValue, item) => {
            return preValue+item.price * item.count
          },0).toFixed(2)
        },
        checkLength() {
          return this.$store.state.cartList.filter((item) => {
            return item.checked
          }).length
        },
        changeAllSelect() {
            if (this.$store.getters.cartList.length === 0) return false
            return !this.$store.getters.cartList.find(item => !item.checked)
          }
        },
      methods: {
        allSelectClick() {
          //console.log(this.cartState);
          //状态为未全选时
          if (!this.changeAllSelect) {
            //保存全选之前的状态
            this.cartState = []
            this.$store.state.cartList.forEach(item => {
              //console.log(item.checked);
              this.cartState.push(item.checked)
              //设置为true
              item.checked = true
            })
          }
          //状态为全选时
          else {
            this.$store.state.cartList.forEach((item, index) => {
              item.checked = this.cartState[index]
            })
          }
        }
      }

    }
</script>

<style scoped>
  .bottomBar {
    height: 40px;
    background-color: #f6f6f6;
    position: relative;
    display: flex;
  }
  .checkButton {
    padding-top: 8px;
    margin-left: 10px;

    display: flex;
    align-items: center;
    left: 10px;
  }
  .total-price {
    font-size: 20px;
    margin-left: 30px;
    margin-top: 10px;
    flex: 1;
  }
  .calculate {
    background-color: darkorange;
    font-size: 22px;
  }
</style>
