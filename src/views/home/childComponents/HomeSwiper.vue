<template>
  <swiper>
    <swiper-item v-for="item in banners" :key="item.index">
      <a :href="item.link">
        <img :src="item.image" alt="" @load="imgLoad">
      </a>
    </swiper-item>
  </swiper>
</template>

<script>

  import  {Swiper, SwiperItem} from 'components/common/swiper'

  export default {
    name: "HomeSwiper",
    props: {
      banners: {
        type: Array,
        data() {
          return {
            isSwpload: false
          }
        },
        default() {
          return []
        }
      }
    },
    methods: {
      imgLoad() {
        if (!this.isSwpload) {
          this.$emit('imageLoad');
          this.isSwpload = true
        }
      }
    },
    components: {
      Swiper,
      SwiperItem
    }

  }
</script>

<style scoped>

</style>
