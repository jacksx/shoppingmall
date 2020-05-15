<template>
<div class="detail">
  <detail-nav-bar @titleClick="fTitleClick" ref="nav"></detail-nav-bar>
<!--  scroll 必须设置高度，才有效-->
  <scroll class="content" ref="scroll" :probeType="3" @scroll="scrollPosition">
    <ul>
      <li v-for="(item, index) in $store.state.cartList" :key="index">{{item}}</li>
    </ul>
    <detail-swiper :images="topImages"/>
    <detail-base-info :goods-info="goodsInfo"/>
    <params ref="params"></params>
    <detail-comment-info ref="comment" :comment-info="commentInfo"></detail-comment-info>
    <h2>1212331</h2>
    <h2>1212331</h2>
    <h2>1212331</h2>
    <h2>1212331</h2>
    <h2>1212331</h2>
    <h2>1212331</h2>
    <h2>1212331</h2>
    <goods-list ref="recommend" :goods="recommend"></goods-list>
  </scroll>
  <toast :message="message" :show="isShow" />
  <detail-bottom-bar @addCart="addCart"/>
  <back-top  @click.native="backClick" v-show="isShowBackTop"/>
</div>
</template>

<script>
    import DetailSwiper from "./childComponents/DetailSwiper";
    import DetailNavBar from "./childComponents/DetailNavBar";
    import DetailBaseInfo from "./childComponents/DetailBaseInfo";
    import DetailCommentInfo from "./childComponents/DetailCommentInfo";
    import GoodsList from "components/content/goods/GoodsList";

    import Scroll from "components/common/scroll/Scroll";
    //网络请求，使用default 导出时，只能导出一个，且导入不需要{}，
    // 否则需要{}
    import {getDetail, GoodsInfo, getRecommend} from "network/detail"
    import {itemListenerMixin, backTopMixin} from "common/mixin"
    import Params from "./childComponents/Params";
    import DetailBottomBar from "./childComponents/DetailBottomBar";

    import Toast from "components/common/toast/Toast";

    export default {
      name: "Detail",
      components: {
        DetailBottomBar,
        Params,
        GoodsList,
        DetailCommentInfo,
        DetailNavBar,
        DetailSwiper,
        DetailBaseInfo,
        Scroll,
        Toast
      },
      mixins: [itemListenerMixin, backTopMixin],
      data() {
        return {
          iid: null,
          topImages: [],
          goodsInfo: {},
          detailInfo: {},
          commentInfo: {},
          recommend: [],
          detailImgListener: null,
          themeTopYs: [],
          currentIndex: 0,
          message: '',
          isShow: false
        }
      },
      methods: {
        fTitleClick(index) {
          //console.log(index);
          this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 100)
        },
        scrollPosition(position) {
          let length = this.themeTopYs.length
          let positionY = -position.y;

          for (let i = 0; i < length; i++) {
           if (this.currentIndex !== i && ((i < length-1 && positionY > this.themeTopYs[i] && positionY <= this.themeTopYs[i+1]) || (i === length -1 && positionY > this.themeTopYs[i] ))) {
             this.currentIndex = i
             console.log(this.currentIndex);
             this.$refs.nav.currentIndex = this.currentIndex
           }
          }
          this.demo(position)
        },
        addCart() {
          //获取购车需要展示数据
          const product = {}
          product.image = this.topImages[0]
          product.title = this.goodsInfo.title
          product.desc = this.goodsInfo.desc
          product.price = this.goodsInfo.realPrice
          product.iid = this.iid
          //将商品添加到购物车, 用commit
          //this.$store.cartList.push(product)
          //mutation 的调用方法
          //this.$store.commit('addCart', product)
          //action的调用
          this.$store.dispatch('addCart', product).then(res => {
            this.message =res
            this.isShow = true
            setTimeout(() => {
              this.message = ''
              this.isShow = false
            }, 1500)
          }).catch(err => {
            console.log(err);
          })
        }
      },
      created() {
        //$route 是当前激活的路由对象
        this.iid = this.$route.params.iid
        //获取详细数据
        getDetail(this.iid).then(res => {
          const data = res.result
          //console.log(res);
          this.topImages = data.itemInfo.topImages
          //获取商品信息
          this.goodsInfo = new GoodsInfo(data.itemInfo, data.columns, data.shopInfo.services)

          //获取商品展示详细信息
          this.detailInfo = data.detailInfo

          //取评价
          if (data.rate.cRate != 0) {
            this.commentInfo = data.rate.list[0]
          }
          // //渲染完后，执行其中的回调函数
          // //根据最新的数据，对应的DOM是已经被渲染，但是图片仍然未加载完
            //  应该放在图片数据加载完，这里没有写图片，所以放这里
          this.$nextTick(() => {
            this.themeTopYs = []
            this.themeTopYs.push(0);
            this.themeTopYs.push(this.$refs.params.$el.offsetTop)
            this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
            this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
            // console.log(this.themeTopYs)
          })
        })
        //获取推荐数据
        getRecommend().then(res => {
          this.recommend = res.data.list
        })
      },
      mounted() {
      },

      destroyed() {
      this.$bus.$off('itemImageLoad',this.detailImgListener)
      }
    }
</script>

<style scoped>

  .detail {
    position: relative;
    z-index: 2;
    background-color: var(--color-background);
    height: 100vh;
  }
  .content {
    height: calc(100% - 44px - 49px);
  }

</style>
