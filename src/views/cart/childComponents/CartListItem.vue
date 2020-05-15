<template>
  <div class="item">
    <check-button class="check-button"
                  @click.native="checkClick"
                  :is-select="cartItem.checked"/>
    <img :src="cartItem.image" class="img">
    <div>
      <div>{{cartItem.title}}</div>
      <h2>X {{cartItem.count}}</h2>
      <div class="price">{{cartItem.price}}</div>
    </div>
  </div>
</template>

<script>
    import CheckButton from "components/content/checkButton/CheckButton";
    export default {
      name: "CartListItem",
      components: {CheckButton},
      props: {
          cartItem: {
            type: Object
          }
      },
      methods: {
        checkClick() {
          this.cartItem.checked = !this.cartItem.checked
        }
      }
    }
</script>

<style scoped>
  .item {
    margin: 5px;
    border-bottom: #666666 solid 2px;
    display: flex;
  }
  .price {
    color: var(--color-tint);
  }
  .img {
    width: 40%;
    height: 40%;
    padding: 5px;
  }
  .check-button {
    width: 20px;
    justify-content: center;
    align-items: center;
    display: flex;
  }
</style>
