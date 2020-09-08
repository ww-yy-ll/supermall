<template>
    <div id="detail">
    <!--顶部导航-->
<!--@要求必须严格一致，发送的事件名是titleClickTo，接收的事件名就是titleClickTo，不能写title-click-to -->
        <detail-nav-bar class="detail-nav" @titleClickTo="titleClick" ref="nav"/>
        <scroll class="content"
                ref="scroll"
                :probe-type="3"
                @scroll="contentScroll">
            <!--绑定数据时，属性是驼峰 topImages，传入值要写成 top-images-->
            <detail-swiper :top-images="topImages"/>
            <detail-base-info :goods="goods"/>
            <detail-shop-info :shop="shop"/>
            <detail-goods-info :detail-info="detailInfo" @imageload="imageLoad"/>
            <detail-param-info ref="params" :param-info="paramInfo"/>
            <detail-comment-info ref="comment" :comment-info="commentInfo"/>
            <goods-list ref="recommend" :goods="recomends"/>
        </scroll>
        <!--底部工具栏-->
        <detail-bottom-bar @addToCart="addToCart"/>
        <!-- 回到顶部 按钮 isShowBackTop为true时显示按钮 -->
        <back-top @click.native="backClick" v-show="isShowBackTop"/>
        <toast :message="toastMessage" :show="toastShow"/>
    </div>
</template>

<script>
    import DetailNavBar from './childComps/DetailNavBar'
    import DetailSwiper from './childComps/DetailSwiper'
    import DetailBaseInfo from './childComps/DetailBaseInfo'
    import DetailShopInfo from './childComps/DetailShopInfo'
    import DetailGoodsInfo from './childComps/DetailGoodsInfo'
    import DetailParamInfo from './childComps/DetailParamInfo'
    import DetailCommentInfo from './childComps/DetailCommentInfo'
    import DetailBottomBar from './childComps/DetailBottomBar'

    import Scroll from 'components/common/scroll/Scroll'
    import GoodsList from 'components/content/goods/GoodsList'
    import BackTop from 'components/content/backTop/BackTop'
    import Toast from 'components/common/toast/Toast'

    import {getDetail, Goods, Shop, GoodsParam, getRecommend} from 'network/detail'
    import {debounce} from 'common/utils'
    import {itemListenerMixin} from 'common/mixin'
    import { mapActions} from 'vuex'

    export default {
        name: "Detial",
        components:{
            DetailNavBar,
            DetailSwiper,
            DetailBaseInfo,
            DetailShopInfo,
            DetailGoodsInfo,
            DetailParamInfo,
            DetailCommentInfo,
            DetailBottomBar,
            Scroll,
            GoodsList,
            BackTop,
            Toast
        },
        mixin: [itemListenerMixin],
        data(){
            return {
                gid: null,
                // 保存顶部的轮播图
                topImages: [],
                goods: {},
                shop: {},
                detailInfo: {},
                paramInfo: {},
                commentInfo: {},
                recomends: [],
                // itemImgListener: null
                themeTopYs: [],
                getThemeTopY: null,
                currentIndex: 0,
                isShowBackTop: false,
                toastMessage: '',
                toastShow: false
            }
        },
        created() {
            // 1. 保存传入的iid，获取iid
            this.gid = this.$route.params.iid

            // 2. 根据iid请求详情页的数据
            getDetail(this.gid).then(res => {
                console.log(res);
                const data = res.result

                // 2.1 获取顶部的轮播图数据
                // console.log(data.itemInfo);
                this.topImages = data.itemInfo.topImages

                // 2.2 获取这个id的商品信息，将复杂的数据整合到一起
                this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)
                // console.log(this.goods);

                // 3. 创建店铺信息的对象
                this.shop = new Shop(data.shopInfo)
                // console.log(this.shop)

                // 4. 保存商品详情信息
                this.detailInfo = data.detailInfo

                // 5. 获取参数信息
                this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)

                // 6. 获取评论信息
                if(data.rate.cRate !== 0){
                    // 只获取一条评论信息
                    this.commentInfo = data.rate.list[0]
                }
                // 1. 不使用 this.$nextTick，$el就拿不到值，这段代码是错误的，获取的值不对，是因为this.$refs.params.$el未进行渲染
                /*// 先清空themeTopYs数据，再添加数据
                this.themeTopYs = []
                // 商品的offsetTop，就是0
                this.themeTopYs.push(0)
                // 参数的offsetTop
                this.themeTopYs.push(this.$refs.params.$el.offsetTop)
                // 评论的offsetTop
                this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
                // 推荐的offsetTop
                this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
                console.log(this.themeTopYs);*/

                // 2. 等到页面都渲染完，就会回调这个函数，$el就能拿到值，页面未渲染完则$el就拿不到值。但是获取的值依旧不对
                /*this.$nextTick(() => {
                    // this.$nextTick 会根据最新的数据，对应的DOM是已经被渲染处理，但是图片依然是未加载完，目前获取到的offsetTop是不包含图片的高度
                    // offsetTop值不对的时候，都是因为图片的问题
                    // 先清空themeTopYs数据，再添加数据
                    this.themeTopYs = []
                    // 商品的offsetTop，就是0
                    this.themeTopYs.push(0)
                    // 参数的offsetTop
                    this.themeTopYs.push(this.$refs.params.$el.offsetTop)
                    // 评论的offsetTop
                    this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
                    // 推荐的offsetTop
                    this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
                    console.log(this.themeTopYs);
                })*/
            })

            // 3. 详情页请求推荐商品的信息
            getRecommend().then(res => {
                // console.log(res);
                // 3.1 获取推荐商品的信息
                this.recomends = res.data.list
            })

            // 4. 给 getThemeTopY 赋值
            /*this.getThemeTopY = debounce(() => {
                // 先清空themeTopYs数据，再添加数据
                // this.themeTopYs = []
                // 商品的offsetTop，就是0
                this.themeTopYs.push(0)
                // 参数的offsetTop
                this.themeTopYs.push(this.$refs.params.$el.offsetTop)
                // 评论的offsetTop
                this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
                // 推荐的offsetTop
                this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
                console.log(this.themeTopYs);
            }, 100)*/

        },
        mounted(){
            const newFefresh = debounce(this.$refs.scroll.refresh, 500)
            this.itemImgListener =  ()=> {
                newFefresh()
            }
            this.$bus.$on('imageLoad', this.itemImgListener)
            // console.log('mounted');
        },
        updated(){
            // 先清空themeTopYs数据，再添加数据
            this.themeTopYs = []
            // 商品的offsetTop，就是0
            this.themeTopYs.push(0)
            // 参数的offsetTop
            this.themeTopYs.push(this.$refs.params.$el.offsetTop)
            // 评论的offsetTop
            this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
            // 推荐的offsetTop
            this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
            this.themeTopYs.push(Number.MAX_VALUE)
            // console.log(this.themeTopYs);
        },
        // 因为detail中没有做缓存
        destroyed(){
            this.$bus.$off('itemImgLoad', this.itemImgListener)
        },
        methods:{
            ...mapActions(['addCart']),
            imageLoad(){
                this.$refs.scroll.refresh()
                // 获取offsetTop值
                // this.getThemeTopY()

                /*// 先清空themeTopYs数据，再添加数据
                this.themeTopYs = []
                // 商品的offsetTop，就是0
                this.themeTopYs.push(0)
                // 参数的offsetTop
                this.themeTopYs.push(this.$refs.params.$el.offsetTop)
                // 评论的offsetTop
                this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
                // 推荐的offsetTop
                this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
                this.themeTopYs.push(Number.MAX_VALUE)
                console.log(this.themeTopYs);*/
            },
            titleClick(index){
                // console.log(index);
                // console.log(this.themeTopYs[index]);
                const height = this.themeTopYs[index]
                // console.log(height);
                this.$refs.scroll.scrollTo(0, -height, 100)
            },
            contentScroll(position){
                // 1.获取y值
                const positionY = -position.y
                // console.log(positionY);

                // 2.positionY和主题中的值进行对比
                // [0, 7389, 8284, 8521, 1.7976931348623157e+308 ]
                // positionY 在 0 和 7389 之间，index = 0
                // positionY 在 =7389 和 8284 之间，index = 1
                // positionY 在 8284 和 8521 之间，index = 2
                // positionY >= 1.7976931348623157e+308 时，index = 3
                let themeTopYslength = this.themeTopYs.length
                for (let i = 0; i <  themeTopYslength - 1; i++) {
                    // console.log(i);
                    // 这样写i最后会溢出，找不到最后一个，所以是错误的
                    /*if(positionY > this.themeTopYs[i] && positionY < this.themeTopYs[i+1] ){
                        console.log(i);
                    }*/
                    // 分成0-8521 和 1.7976931348623157e+308来判断
                    /*// this.currentIndex !== i 防止频繁打印i
                    if (this.currentIndex !== i &&
                        (i < themeTopYslength -1 && positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i+1] )
                        || ( i === themeTopYslength - 1 && positionY >= this.themeTopYs[i])) {
                        // console.log(i);
                        this.currentIndex = i ;
                        console.log(this.currentIndex);
                        this.$refs.nav.currentIndex = this.currentIndex
                    }*/
                    // 优化上面这段if判断代码
                    if(this.currentIndex !== i && (positionY >= this.themeTopYs[i] && positionY <= this.themeTopYs[i+1])) {
                        this.currentIndex = i ;
                        // console.log(this.currentIndex);
                        this.$refs.nav.currentIndex = this.currentIndex
                    }
                }

                // 3.是否显示回到顶部
                this.isShowBackTop = (-position.y) > 1000
            },
            // 回到顶部功能
            backClick(){
                // console.log('backClick');
                // this.$refs.scroll.scroll.scrollTo(0, 0, 5000)
                this.$refs.scroll.scrollTo(0, 0)
            },
            // 添加至购物车功能
            addToCart(){
                // console.log('addToCart');
                // 1.获取购物车需要展示商品信息
                const product = {};
                product.image = this.topImages[0];
                product.title = this.goods.title;
                product.desc = this.goods.desc;
                product.price = this.goods.realPrice;
                product.iid = this.gid;
                // 2.将商品添加到购物车中
                // 2.1 方法一：mutations中的方法
                // this.$store.commit('addCart', product)
                // 2.2 方法二： actions中的方法
                /*this.$store.dispatch('addCart', product).then(res => {
                    console.log(res);
                })*/
                // 2.3 方法三： 使用mapActions
                this.addCart(product).then(res => {
                    /*// 设置弹窗为true即显示弹窗
                    this.toastShow = true;
                    // 将返回的结果赋值给弹窗信息
                    this.toastMessage = res;
                    console.log(res);
                    // 1.5秒后弹窗消失
                    setTimeout(() => {
                        // 弹窗消失
                        this.toastShow = false;
                        // 内容清空
                        this.toastMessage = '';
                    }, 1500)*/

                    this.$toast.show(res, 1500)

                    // console.log(this.$toast);
                })
                // console.log(product);
            }
        }
    }
</script>

<style scoped>
    #detail {
        position: relative;
        z-index: 1;
        background-color: #fff;
        height: 100vh;
    }
    .detail-nav {
        position: relative;
        z-index: 9;
        background-color: #fff;
    }
    .content {
        height: calc(100% - 44px);
    }
</style>
