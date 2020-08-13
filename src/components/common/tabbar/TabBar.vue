<template>
  <div id="tab-bar">
    <!--  插槽  -->
    <slot></slot>
  </div>
</template>

<script>
    export default {
        name: "TabBar"
    }
</script>

<style scoped>
  /* id选择器使用 #  */
  #tab-bar {
    /*  横向排列  */
    display: flex;
    background-color: #f6f6f6;
    position: fixed;
    bottom: 0;
    /*  一定要写left和right等于0，这样4个div才能占据屏幕的整个宽度  */
    left: 0;
    right: 0;
    /*  盒子阴影 X偏移量，Y偏移量，模糊范围大小，模糊颜色 */
    box-shadow: 0px -3px 10px rgba(0,0,0,0.3); /*  阴影在盒子的上面 Y = -3px；阴影在盒子的下面 Y = 3px */
  }

</style>
