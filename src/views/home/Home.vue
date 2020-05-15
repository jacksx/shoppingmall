<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <tab-control :titles="['流行', '新款', '精选']"
                 class="first-tab"
                 ref="tabControl1"
                 v-show="isTabFixed"
                 @tabClick="tabClick"></tab-control>
    <scroll class="content"
            ref="scroll"
            :probe-type="3"
            :pull-up-load="true"
            @scroll="contentScroll"
            @pullingUp="loadMore">
      <home-swiper :banners="banners" @imageLoad="swiperImageLoad" ></home-swiper>
      <recommend-view :recommends="recommends"></recommend-view>
      <feature-view></feature-view>
      <tab-control :titles="['流行', '新款', '精选']"
                   class="tab-control"
                   ref="tabControl2"
                   @tabClick="tabClick"></tab-control>
      <goods-list :goods="showGoods"></goods-list>
    </scroll>
    <back-top  @click.native="backClick" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>
  //视图小组件
  import HomeSwiper from "./childComponents/HomeSwiper";
  import RecommendView from "./childComponents/RecommendView";
  import FeatureView from "./childComponents/FeatureView";

  //公共组件
  import NavBar from "components/common/navbar/NavBar";
  import TabControl from "components/content/TabControl/TabControl";
  import GoodsList from "components/content/goods/GoodsList";
  import Scroll from "components/common/scroll/Scroll";
  import BackTop from "components/content/backtop/BackTop";

  //公共工具
  //import {debounce} from "common/utils";

  import {itemListenerMixin} from "common/mixin";
  //网络请求函数
  import {
    getHomeMultidata,
    getHomeGoods} from "network/home";

  export default {
      name: "Home",
      components: {
        NavBar,
        HomeSwiper,
        RecommendView,
        FeatureView,
        TabControl,
        GoodsList,
        Scroll,
        BackTop,
      },
      computed: {
        showGoods() {
          return this.goods[this.currentType].list
        }
      },
      mixins: [itemListenerMixin],
      data() {
        return {
          // result: null
          banners: [],
          recommends: [],
          taboffsettop: 0,
          goods: {
            pop: {page:0, list: []},
            new: {page:0, list: []},
            sell: {page:0, list: []},
          },
          currentType: 'pop',
          isShowBackTop: false,
          isTabFixed: false,
          itemImgListener: null
        }
      },
    //生命周期函数。组件创建好后就发送请求
      created() {
        this.getHomeMultidata()

        this.getHomeGoods('pop')
        this.getHomeGoods('new')
        this.getHomeGoods('sell')

      },
      mounted() {
      },
      destroyed() {
        console.log('home destroyed');
      },
    activated() {
      this.$refs.scroll.scroll.startY = this.position
      //刷新
      this.$refs.scroll.refresh()
    },
    deactivated() {
        //保存y值
      this.position = this.$refs.scroll.y
      //取消全局事件的监听
      this.$bus.$off('itemImageLoad', this.itemImgListener)
    },
    methods: {
        //监听轮播图片加载
        swiperImageLoad() {
          //console.log('sds');
          //console.log(this.$refs.tabControl.$el.offsetTop);
          this.taboffsettop = this.$refs.tabControl2.$el.offsetTop
          //console.log(this.taboffsettop);
        },
        //事件监听方法
        tabClick(index) {
          //console.log(index);
          switch (index) {
            case 0:
              this.currentType = 'pop'
                  break
            case 1:
              this.currentType = 'new'
                  break
            case 2:
              this.currentType = 'sell'
                  break
          }
          this.$refs.tabControl1.currentIndex = index;
          this.$refs.tabControl2.currentIndex = index;
        },
        backClick() {
          this.$refs.scroll.scrollTo(0, 0, 600)
        },
        contentScroll(position){
          //backtop
          //this.isShowBackTop = (-position.y) > 1000
          this.demo(position)
          //tabbar
          this.isTabFixed = (-position.y) > this.taboffsettop

        },
        demo(position) {
          this.isShowBackTop = (-position.y) > 1000
        },

        loadMore() {
          this.getHomeGoods(this.currentType)
        },

        //网络请求相关方法
        //请求多个数据
        getHomeMultidata() {
          getHomeMultidata().then(res => {
            //console.log(res);
            // this.result = res;
            this.banners = res.data.banner.list;
            this.recommends = res.data.recommend.list;
          })
        },
        getHomeGoods(type) {
          //请求goods
          const page = this.goods[type].page + 1
          getHomeGoods(type, page).then(res => {
            //console.log(res);
            this.goods[type].list.push(...res.data.list)
            this.goods[type].page = page

            this.$refs.scroll.finishPullUp()
          })
        }
      }
  }
</script>

<style scoped>

  #home {
    /*padding-top: 44px;*/

    height: 100vh;
    position: relative;
  }

  .tab-control {
    /*position: sticky;*/
    /*top: 44px;*/
    background-color: #ffffff;
    z-index: 1;
  }
  .first-tab{
    position: relative;
    z-index: 1;
  }
  .home-nav {
    background-color: var(--color-tint);
    color: #ffffff;

    /*position: fixed;*/
    /*left: 0;*/
    /*right: 0;*/
    /*top: 0;*/
    /*z-index: 1;*/
  }

  .content {
    /*height: 300px;*/
    overflow: hidden;

    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0px;
    right: 0px;
  }
</style>
