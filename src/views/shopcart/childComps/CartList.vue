<template>
    <div class="cart-list">
        <scroll class="content" >
<!--            <div v-for="item in cartList">{{item}}</div>-->
            <cart-list-item v-for="(item, index) in cartList" :key="index" :item-info="item"/>
        </scroll>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex'
    import Scroll from 'components/common/scroll/Scroll'
    import CartListItem from './CartListItem'

    export default {
        name: "CartList",
        components:{
            Scroll,
            CartListItem
        },
        computed:{
            // ...mapGetters(['cartList'])
            cartList(){
                return this.$store.state.cartList
            }
        }
    }
</script>

<style scoped>
    .cart-list {
        height: calc(100% - 44px - 49px - 40px);
    }
    .content {
        height: 100%;
        overflow: hidden;
    }
</style>