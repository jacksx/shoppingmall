<template>
    <div class="cart">
      <nav-bar class="nav-bar">
        <div slot="center">购物车({{length}})</div>
      </nav-bar>
      <cart-list/>
      <cart-bottom-bar/>
    </div>
</template>

<script>
  import NavBar from "components/common/navbar/NavBar";
  import CartList from "./childComponents/CartList";
  import CartBottomBar from "./childComponents/CartBottomBar";

  import {mapGetters} from 'vuex'

    export default {
        name: "Cart",
      components: {
        CartBottomBar,
        CartList,
        NavBar
      },
      computed:{
          ...mapGetters({
            length: "cartLength",
          })
      }
    }
</script>

<style scoped>
  .cart {
    height: 100vh;
  }
  .nav-bar {
    background-color: var(--color-tint);
    color: var(--color-background);
    font-weight: 800;
  }
</style>
