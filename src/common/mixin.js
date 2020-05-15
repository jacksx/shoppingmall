import {debounce} from "./utils";

import BackTop from "components/content/backtop/BackTop";
export const itemListenerMixin = {
  mounted() {
    const detailRefresh = debounce(this.$refs.scroll.refresh, 100)
    this.detailImgListener = () => {
      detailRefresh()}

    this.$bus.$on('itemImageLoad',this.detailImgListener)
  }
}

export const backTopMixin = {
  components: {
    BackTop
  },
  data() {
    return {
      isShowBackTop: false
    }
  },
  methods: {
    backClick() {
      this.$refs.scroll.scrollTo(0, 0, 600)
    },
    demo(position) {
      this.isShowBackTop = (-position.y) > 1000
    },
  }
}
