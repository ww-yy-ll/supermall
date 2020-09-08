<template>
    <div class="bottom-bar">
        <div class="check-content">
            <check-button
                    :is-checked="isSelectAll"
                    class="check-button" @click.native="checkClick"/>
            <span>全选</span>
        </div>
        <div class="price">
            合计：{{totalPrice}}
        </div>
        <div @click="calcClick" class="calculate">
            去结算({{checkLength}})
        </div>
    </div>
</template>

<script>
    import CheckButton from 'components/content/checkButton/CheckButton'

    export default {
        name: "CartBottomBar",
        components:{
            CheckButton
        },
        computed:{
            // 计算总价
            totalPrice(){
                return '￥' + this.$store.state.cartList.filter(item => {
                    // checked=true才返回数据
                    return item.checked
                }).reduce((preValue, item) => {
                    // 过滤后计算总价。toFixed(2)保留2位小数
                    return preValue + item.price * item.count
                }, 0).toFixed(2)
            },
            // 去结算部分
            checkLength(){
                return this.$store.state.cartList.filter(item => item.checked).length
            },
            // 全选状态显示
            isSelectAll(){
                // 未添加任何商品时，设置为不选中状态
                if(this.$store.state.cartList.length === 0) return false

                // 方法一：使用 filter过滤器函数
                // 判断商品列表是否全被选中，返回不选中的数组长度
               //  先从cartList中找有没有不被选中的，有的话就返回数组的长度，是一个数字，数字再取反就返回布尔值，如果有长度在取反就返回false
               // return !(this.$store.state.cartList.filter(item => !item.checked).length)

                // 方法二：使用 find函数。比filter过滤器函数 性能高
                // 查找不选中的，发现有不选中，全选按钮就显示不选中，前面要加取反符号！
                // return !this.$store.state.cartList.find(item => !item.checked)

                // 方法三：使用 普通的遍历
                for(let item of this.$store.state.cartList){
                    if (!item.checked) {
                        return false
                    }
                }
                return true
            }
        },
        methods:{
            // 全选按钮的点击事件
            checkClick(){
                // console.log('checkClick');
                // 方法一
                if (this.isSelectAll) {  // 如果全部选中
                    // 设置为全不选
                    this.$store.state.cartList.forEach(item => item.checked = false)
                } else {    // 如果全部不选中或某些不选中
                    // 设置为全选
                    this.$store.state.cartList.forEach(item => item.checked = true)
                }
                // 下面代码不能实现全选点击，因为在遍历过程中，checked会发生变化，然后isSelectAll也会变化
                // this.$store.state.cartList.forEach(item => item.checked = !this.isSelectAll)
            },
            calcClick(){
                if(!this.isSelectAll){
                    this.$toast.show('请选择购买的商品', 2000)
                }
            }
        }
    }
</script>

<style scoped>
    .bottom-bar {
        position: relative;
        display: flex;
        justify-content: space-between;

        height: 40px;
        line-height: 40px;

        background-color: #eee;
        font-size: 14px;
    }
    .check-content {
        display: flex;
        align-items: center;
        margin-left: 5px;
    }
    .check-button {
        width: 20px;
        height: 20px;
        line-height: 20px;
        margin-right: 5px;
    }
    .price {
        margin-left: 25px;
    }
    .calculate {
        background-color: pink;
        color: #fff;
        padding: 0 5px;
    }
</style>