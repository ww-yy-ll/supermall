<template>
  <div class="tab-bar-item" @click="itemClick">
    <div v-if="!isAcitive"><slot name="item-icon"></slot></div>
    <div v-else><slot name="item-icon-active"></slot></div>
    <div :style="activeStyle"><slot name="item-text"></slot></div>
  </div>
</template>

<script>
    export default {
      name: "TabBarItem",
      // 接收传过来的值，如path
      props: {
        path: String,
        activeColor: {
          type: String,
          default: 'red'
        }
      },
      data() {
          return {
            // isAcitive: false
        }
      },
      computed: {
        isAcitive() {
        // 哪个路由对象（子组件）处于活跃，$route就属于哪个路由对象
        // 传过来的path 和 $route中的path 进行比较，如果一样，为true，否则为false
        //  下面 !==-1 => 传过来的path 和 $route中的path 一样，也就是true
          return this.$route.path.indexOf(this.path) !== -1
        },
        activeStyle() {
        // 首先判断isAcitive是否处于活跃状态？ -> 活跃，则显示传过来的颜色值activeColor；不活跃则不做操作
          return this.isAcitive ? {color: this.activeColor} : {}
        }
      },
      methods: {
        itemClick() {
          // console.log('itemClick');
          this.$router.push(this.path)
        }
      }
    }
</script>

<style scoped>
  .tab-bar-item {
    /* 页面均等分，每个div占 1/4 */
    flex: 1;
    /*  水平居中  */
    text-align: center;
    /*  tab 的高度一般都是 49px  */
    height: 49px;
    font-size: 12px;
  }
  .tab-bar-item img {
    width: 24px;
    height: 24px;
    margin-top: 3px;
    /* 让图标和文字距离不那么大*/
    vertical-align: middle;
    margin-bottom: 2px;
  }
</style>
