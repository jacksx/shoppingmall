<template>
  <swiper class="detailSwiper">
    <swiper-item v-for="(item, index) in images" :key="index">
      <img :src="item" alt="">
    </swiper-item>
  </swiper>
</template>

<script>
  import {Swiper, SwiperItem} from "components/common/swiper/index";

    export default {
      name: "DetailSwiper",
      components: {SwiperItem, Swiper},
      props: {
        images:{
          type: Array,
          default() {
            return []
          }
        }
      }
    }
</script>

<style scoped>
  .detailSwiper {
    height: 320px;
    overflow: hidden;
  }

</style>
