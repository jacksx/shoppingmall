<template>
  <div class="bottom-bar">
    <h2 @click="addToCart">购物车</h2>
  </div>
</template>

<script>
    export default {
        name: "DetailBottomBar",
      methods: {
        addToCart() {
          this.$emit('addCart')
        }
      }
    }
</script>

<style scoped>
  .bottom-bar {
    height: 49px;
    background-color: #42b983;
    position: fixed;

    right: 0;
    left: 0;
    bottom: 0;
  }
</style>
