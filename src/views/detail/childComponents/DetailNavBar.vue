<template>
  <div>
    <nav-bar class="detailNarBar">
      <div slot="left" class="back" @click="backClick">
        <img src="~assets/images/common/back.svg" alt="">
      </div>
      <div slot="center" class="title">
        <div v-for="(item, index) in titles"
             :key="index"
             :class="{active:currentIndex == index}"
             @click="getIndex(index)"
             class="title-item">{{item}}</div>
      </div>
    </nav-bar>
  </div>
</template>

<script>
  import NavBar from "components/common/navbar/NavBar";
    export default {
      name: "DetailNavBar",
      data() {
        return{
          titles: ['商品', '参数', '评论', '推荐'],
          currentIndex: 0
        }
      },
      components: {
        NavBar
      },
      methods: {
        getIndex(index) {
          this.currentIndex = index;
          this.$emit('titleClick', index);
        },
        backClick() {
          this.$router.back()
        }
      }
    }
</script>

<style scoped>
  .detailNarBar{
    position: relative;
    z-index: 2;
    background-color: var(--color-background);
  }
  .title {
    display: flex;
    font-size: 15px;
  }

  .title-item {
    flex: 1;
  }
  .active {
    color: var(--color-high-text);
  }

  .back img {
    margin-top: 10px;
  }
</style>
