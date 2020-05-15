<template>
    <div class="check-button">
      <img src="~assets/images/cart/tick.svg"
           class="button"
           :class="{active: isSelect}"
           alt="">
    </div>
</template>

<script>
    export default {
        name: "CheckButton",
      props: {
          isSelect: {
            type: Boolean,
            default: false
          }
      }
    }
</script>

<style scoped>
  .button {
    border-radius: 50%;
    border: 2px solid gray;
  }

  .active {
    border-color: #ff5777;
    background-color: #ff5777;
  }
</style>
