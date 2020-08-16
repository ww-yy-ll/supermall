<template>
<!--
ref 绑定给子组件
    - ref如果是绑定在组件中的，那么通过【this.$refs.ref名称】获取到的是一个组件对象
	- ref如果是绑定在普通的元素中的，那么通过【this.$refs.ref名称】获取到的是一个元素对象
-->
    <div class="wrapper" ref="wrapper">
        <div class="content">
            <slot></slot>
        </div>
    </div>
</template>

<script>
    import BScroll from 'better-scroll'
    export default {
        name: "Scroll",
        props:{
            probeType: {
                type: Number,
                default: 0
            },
            pullUpLoad: {
                type: Boolean,
                default: false
            }
        },
        data(){
          return{
              scroll: null,
          }
        },
        mounted() {
            // 不建议使用  document.querySelector('.wrapper')获取对象
            // console.log(document.querySelector('.wrapper'));
            // 1.创建BScroll对象
            this.scroll = new BScroll(this.$refs.wrapper, {
                click: true,
                probeType: this.probeType,
                pullUpLoad: this.pullUpLoad
            })
             // 2.监听滚动的位置
            if (this.probeType === 2 || this.probeType === 3){
                this.scroll.on('scroll', (position) => {
                    // console.log(position);
                    // 把position传出去,使用 $emit('自定义事件',传出去的参数)
                    this.$emit('scroll', position)
                })
            }

            // console.log(this.scroll);
            // this.scroll.refresh()
            // 3. 监听scroll滚动到底部 上拉刷新-加载更多 事件
            if(this.pullUpLoad){
                this.scroll.on('pullingUp', () => {
                    console.log('监听到滚动到底部');
                    // 传送事件出去
                    this.$emit('pullingUp')
                })
            }
        },
        methods:{
            // 回到顶部
            scrollTo(x, y, time=300){
                this.scroll && this.scroll.scrollTo && this.scroll.scrollTo(x, y, time )
            },
            // 完成下拉加载更多
            finishPullUp(){
                this.scroll && this.scroll.finishPullUp()
            },
            // 刷新图片加载
            refresh() {
                this.scroll && this.scroll.refresh()
            },
            // 获取离开页面时的位置
            getScrollY(){
                return this.scroll? this.scroll.y : 0
            }
        }
    }
</script>

<style scoped>

</style>