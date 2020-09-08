<template>
    <div class="goods-item" @click="itemClick">
<!--   图片地址在返回的data数据的show里面     -->
<!--        <img v-lazy="shoeImages" alt="" @load="imageLoad">-->
        <img :src="showImages" alt="" @load="imageLoad">
        <div class="goods-info">
            <p>{{goodsItem.title}}</p>
            <span class="price">{{goodsItem.price}}</span>
            <span class="collect">{{goodsItem.cfav}}</span>
        </div>
    </div>
</template>

<script>
    export default {
        name: "GoodsListItem",
        props: {
            goodsItem: {
                type: Object,
                default() {
                    return {};
                }
            }
        },
        computed:{
            showImages(){
                // 接口不同，图片地址所在位置可能不同，还是要看接口中图片存放的位置
                return this.goodsItem.image || this.goodsItem.show.img
            }
        },
        methods:{
            // 监听每张图片加载
            imageLoad(){
                // console.log('imageLoad');
                // 将图片加载事件发射出去
                // this.$bus.$emit('itemImageLoad')

                // 方法一：各自刷新自己所在的页面，进入详情页则不刷新首页的东西
                /*
                if(this.$route.path.indexOf('/home')){
                    this.$bus.$emit('homeItemImageLoad')
                }else if (this.$route.path.indexOf('/detail')){
                    this.$bus.$emit('detailItemImageLoad')
                }*/
                // 方法二：
                this.$bus.$emit('itemImageLoad')

            },
            // 监听列表项点击，跳转到对应的详情页
            itemClick() {
                // console.log('跳转到对应的详情页');
                // 需要返回上一页用push，不需要返回上一页用replace
                this.$router.push('/detail/' + this.goodsItem.iid)
            }
        }
    }
</script>

<style scoped>
    .goods-item {
        padding-bottom: 40px;
        /* 子绝父相 */
        position: relative;
        width: 48%;
    }
    .goods-item img {
        width: 100%;
        border-radius: 5px;
    }
    .goods-info {
        font-size: 12px;
        /* 绝对定位 */
        position: absolute;
        bottom: 5px;
        left: 0;
        right: 0;
        overflow: hidden;
        text-align: center;
    }
    .goods-info p {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        margin-bottom: 3px;
    }
    .goods-info .price {
        color: var(--color-high-text);
        margin-right: 20px;
    }
    .goods-info .collect {
        position: relative;
    }
    .goods-info .collect::before {
        content: '';
        position: absolute;
        left: -15px;
        top: -1px;
        width: 14px;
        height: 14px;
        background: url("~assets/img/common/collect.svg") 0 0/14px 14px;
    }
</style>