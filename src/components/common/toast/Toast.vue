<template>
    <div class="toast" v-show="isShow">
        <div>{{message}}</div>
    </div>
</template>

<script>
    export default {
        name: "Toast",
        props:{
            /*message:{
                type: String,
                default: ''
            },
            show:{
                type: Boolean,
                default: false
            }*/
        },
        data(){
            return{
                message: '',
                isShow: false
            }
        },
        methods:{
            // 可以设置默认参数值为多少
            show(message='默认弹窗提示信息', duration=1500){
                this.isShow = true;
                this.message = message
                console.log(this.message);
                setTimeout(() => {
                    this.isShow = false;
                    this.message = '';
                }, duration)
            }
        }
    }
</script>

<style scoped>
    .toast {
        position: fixed;
        top: 50%;
        left: 50%;
        /*margin-left: -70px;*/
        /* 弹窗居中，不用知道和计算 width */
        transform: translate(-50%, -50%);
        padding: 8px 10px;

        z-index: 999;

        background-color: rgba(0,0,0,0.8);
        color: #fff;
    }
</style>