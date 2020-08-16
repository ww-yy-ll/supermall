<template>
    <div>
        <nav-bar>
            <div slot="left" class="back" @click="backClick">
                <img src="~assets/img/common/back.svg" alt="">
            </div>
            <div slot="center" class="title">
                 <div v-for="(item, index) in titles"
                      class="title-item"
                      :class="{active: index === currentIndex}"
                      @click="titleClick(index)">
                     {{item}}
                 </div>
            </div>
        </nav-bar>
    </div>
</template>

<script>
    import NavBar from 'components/common/navbar/NavBar'
    export default {
        name: "DetailNavBar",
        components:{
            NavBar
        },
        data(){
            return{
                titles: ['商品', '参数', '评论', '推荐', ],
                currentIndex: 0
            }
        },
        methods:{
            // 点击标题切换
            titleClick(index){
                // 点击标题切换
                this.currentIndex = index
                this.$emit('titleClickTo', index)
            },
            // 返回图标按钮
            backClick(){
                // 使用 go（-1表示返回上一层页面）或back 都可以返回
                // this.$router.go(-1)
                this.$router.back()
            }
        }
    }
</script>

<style scoped>
    .title {
        display: flex;
        font-size: 12px;
    }
    .title-item {
        flex: 1;
    }
    .active {
        color: var(--color-high-text);
    }
    .back img {
        margin-top: 12px;
    }
</style>