<template>
  <div id="app">
<!--    exclude 是因为跳转详情页时也会keep-alive，导致数据不能重新请求，所以把Detail剔除-->
    <keep-alive exclude="Detail">
      <router-view></router-view>
    </keep-alive>
    <main-tar-bar></main-tar-bar>
  </div>
</template>

<script>
  import MainTarBar from "components/content/mainTabbar/MainTarBar";

export default {
  name: 'App',
  components: {
    MainTarBar
  }
}
</script>

<style>
  @import "assets/css/base.css";
</style>
