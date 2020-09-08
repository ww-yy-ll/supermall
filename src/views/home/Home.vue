<template>
    <div id="home">
        <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
        <tab-control :titles="['流行', '新款', '精选']"
                     @tabClick="tabClick"
                     ref="tabControla"
                     class="tab-control" v-show="isTabFixed"/>

        <scroll class="content"
                ref="scroll"
                :probe-type="3"
                @scroll="contentScroll"
                :pull-up-load="true" @load="loadMore">
            <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"/>
            <recommend-view :recommends="recommends"/>
            <feature-view/>
            <tab-control :titles="['流行', '新款', '精选']"
                         @tabClick="tabClick"
                         ref="tabControlb"/>
            <goods-list :goods="showGoods"/>
        </scroll>
        <!-- 回到顶部 按钮 isShowBackTop为true时显示按钮 -->
        <back-top @click.native="backClick" v-show="isShowBackTop"/>
    </div>
</template>

<script>
    // 导入子组件
    import HomeSwiper from './childComps/HomeSwiper'
    import RecommendView from './childComps/RecommendView'
    import FeatureView from './childComps/FeatureView'
    // 导入公共组件
    import NavBar from 'components/common/navbar/NavBar'
    import TabControl from 'components/content/tabControl/TabControl'
    import GoodsList from 'components/content/goods/GoodsList'
    import Scroll from 'components/common/scroll/Scroll'
    import BackTop from 'components/content/backTop/BackTop'
    // 导入封装的方法
    import { getHomeMultiData, getHomeGoods } from 'network/home'
    import {debounce} from 'common/utils'
    import {itemListenerMixin} from 'common/mixin'

    export default {
        name: "Home",
        components: {
            HomeSwiper,
            RecommendView,
            FeatureView,
            NavBar,
            TabControl,
            GoodsList,
            Scroll,
            BackTop
        },
        mixin: [itemListenerMixin],
        data() {
            return {
                // result: null
                banners: [],
                recommends: [],
                goods: {
                    'pop': {page: 0, list: []},
                    'new': {page: 0, list: []},
                    'sell': {page: 0, list: []},
                },
                currentType: 'pop',
                isShowBackTop: false,
                tabOffsetTop: 0,
                isTabFixed: false,
                saveY: 0,
                // itemImgListener: null
            }
        },
        // home组件一创建好就发送请求
        created() {
        // 1.请求多个数据
            /*getHomeMultiData().then( res => {
                // console.log(res);
                // this.result = res;
                this.banners = res.data.banner.list;
                this.recommends = res.data.recommend.list;
                // console.log(this.banners);
            })*/
            this.getHomeMultiData()
        // 2. 请求商品数据
            /*getHomeGoods('pop', 1).then(res => {
                console.log(res);
                return res
            })*/
            this.getHomeGoods('pop')
            this.getHomeGoods('new')
            this.getHomeGoods('sell')

        //    在 created() 中可能是拿不到 this.$refs.scroll的，就会报错，
        //      所以在 mounted()中监听图片加载完成
        // 3. 监听GoodsItem中图片加载完成
            /*this.$bus.$on('itemImageLoad', () => {
                console.log('-------');
                this.$refs.scroll.refresh()
            })*/

        },
        mounted(){

            // 使用防抖函数,定义 refresh 接收防抖函数debounce的返回值
            const refresh = debounce(this.$refs.scroll.refresh, 500)
            // 对监听的事件进行ba保存
            this.itemImgListener = () => {
                // console.log('-------');
                // 使用防抖函数,因为里层使用了外层定义的refresh，里层就会产生闭包，refresh就不会被销毁
                refresh()
                // this.$refs.scroll.refresh()
            },
            // 1. 监听GoodsItem中图片加载完成
            this.$bus.$on('itemImageLoad', this.itemImgListener)
            // console.log('mounted');
        },
        destroyed(){
            // console.log('home destroyed');
        },
        // 进入页面时调用
        activated(){
            // console.log('activated');
            // 回到离开前的状态
            this.$refs.scroll.scrollTo(0, this.saveY, 0)
            // 注意要刷新，否则频繁切换页面时会有问题
            this.$refs.scroll.refresh()
        },
        // 离开页面时调用
        deactivated(){
            // console.log('deactivated');
            // 1.保存Y值
            this.saveY = this.$refs.scroll.getScrollY();
            // console.log(this.saveY);
            // 2.取消全局事件的监听
            // this.$bus.$off('事件名', 监听的函数)
            this.$bus.$off('itemImgLoad', this.itemImgListener)
        },
        computed: {
            showGoods() {
                return this.goods[this.currentType].list
            }
        },
        methods: {
            // 事件监听相关方法
            // 防抖函数，需要传2个参数：函数和等待时间。告诉传进来的这个函数要等多久。
            /*debounce(func, delay){
                let timer = null;
                return function (...args) {
                   //  判断 timer 是否有值（即是否有传timer），有值就清除掉
                   if(timer) clearTimeout(timer)
                    // 清除timer后重新开始计时
                    timer = setTimeout(() =>{
                        func.apply(this, args)
                    }, delay)
                }
            },*/
            // 商品列表tab功能
            tabClick(index) {
                switch (index) {
                    case 0:
                        this.currentType = 'pop'
                        break;
                    case 1:
                        this.currentType = 'new'
                        break;
                    case 2:
                        this.currentType = 'sell'
                        break;
                }
                // 让2个 tabControl 保持一致
                this.$refs.tabControla.currentIndex = index;
                this.$refs.tabControlb.currentIndex = index;
            },
            // 回到顶部功能
            backClick(){
                // console.log('backClick');
                // this.$refs.scroll.scroll.scrollTo(0, 0, 5000)
                this.$refs.scroll.scrollTo(0, 0)
            },
            contentScroll(position){
                // console.log(position);
                // 1. 判断backTop是否显示
                // 因为打印的y值都是负值,加负号变成正值才能和1000比,否则永远都是小于1000
                // y < 1000 则 isShowBackTop=false, y > 1000 则 isShowBackTop=true
                this.isShowBackTop = (-position.y) > 1000
                // 2. 判断tabControl是否吸顶（是否有属性position：fixed）
                this.isTabFixed = (-position.y) > this.tabOffsetTop
            },
            // 上拉加载更多函数
            loadMore(){
                console.log('加载更多的方法');
                // 根据传入的type(pop/new/sell)来决定哪个页面的商品要刷新和上拉加载更多
                // 每次上拉刷新,都会调用 getHomeGoods(),页码+1,实现上拉加载更多
                this.getHomeGoods(this.currentType)
                // 每个程序中的图片都是异步加载,开始时 better-scroll 计算可滚动的区域不包含图片的高度,这时已经计算出可滚动区域高度
                // 当图片加载完成后,实际可滚动区域高度要加上图片的高度,而 better-scroll 还是原来的可滚动区域高度,
                // 所以要进行刷新,就会重新计算可滚动区域高度
                this.$refs.scroll.refresh()
            },
            // 监听 轮播图 图片加载完成
            swiperImageLoad() {
                // 获取tabControl的offsetTop值，来判断tabControl的吸顶
                // 所有的组件都有一个属性 $el ：用于获取 组件 中的元素
                this.tabOffsetTop = this.$refs.tabControlb.$el.offsetTop
                // console.log(this.$refs.tabControl.$el.offsetTop);
            },
            // 网络请求相关方法
            getHomeMultiData() {
                // 1.请求多个数据
                getHomeMultiData().then( res => {
                    // console.log(res);
                    // this.result = res;
                    this.banners = res.data.banner.list;
                    this.recommends = res.data.recommend.list;
                    // console.log(this.banners);
                })
            },
            // 网络请求相关方法
            getHomeGoods(type) {
                const page = this.goods[type].page + 1
                // 动态传入type和页码
                getHomeGoods(type, page).then(res => {
                    this.goods[type].list.push(...res.data.list)
                    this.goods[type].page += 1
                    // console.log(res);
                    // 必须加上这行代码,上拉刷新才能执行多次
                    this.$refs.scroll.finishPullUp()
                })
            }
        }
    }
</script>

<style scoped>
    #home {
        /*padding-top: 44px;*/
        /* vh -> viewport height 视口高度*/
        height: 100vh;
        /* 子绝父相 */
        position: relative;
    }
    .home-nav {
        background-color: var(--color-tint);
        color: #fff;
        /* 在使用浏览器原生滚动时，为了让导航不跟随一起滚动
        position: fixed;
        left: 0;
        right: 0;
        top: 0;
        z-index: 9;
        */
    }
    .tab-control {
        /* 浏览器原生滚动 */
        /*position: sticky;*/
        /*top: 43px;*/
        position: relative;
        /* 固定在最上层 */
        z-index: 9;
    }
    /*
    .content {
        44px + 49px =  93px
        height: calc(100% - 93px);
        overflow: hidden;
        margin-top: 44px;
    }*/
    .content {
        overflow: hidden;
        /* 绝对定位 */
        position: absolute;
        top: 44px;
        bottom: 49px;
        left: 0;
        right: 0;
    }
</style>
