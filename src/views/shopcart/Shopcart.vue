<template>
  <div class="cart">
    <!--导航-->
    <nav-bar class="nav-bar">
      <!--替换掉封装好的NavBar组件 中间的插槽-->
      <div slot="center">购物车({{cartLength}})</div>
      <!--<div slot="center">购物车({{length}})</div>-->
    </nav-bar>
    <!--商品列表-->
    <cart-list/>
    <!--底部汇总-->
    <cart-bottom-bar/>
  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar'
  import CartList from './childComps/CartList'
  import CartBottomBar from './childComps/CartBottomBar'

  import { mapGetters } from 'vuex'

    export default {
        name: "Shopcart",
      components:{
        NavBar,
        CartList,
        CartBottomBar
      },
      computed:{
          cartLength(){
            return this.$store.state.cartList.length
          }
          // vuex中getters的2种语法
        // 第一种
        // ...mapGetters['cartLength', 'cartList']
        // 第二种
        /*...mapGetters({
          length: 'cartLength',
          list: 'cartList'
        })*/
      }
    }
</script>

<style scoped>
  .cart {
    height: 100vh;
  }
  .nav-bar {
    background-color: var(--color-tint);
    color: #fff;
  }
</style>
