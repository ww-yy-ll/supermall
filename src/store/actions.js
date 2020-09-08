export default {
    addCart(context, payload){
        return new Promise((resolve, reject) => {
            // 数组常用的方法：push、pop、shift、unshift、sort、reserve、map、filter、reduce、join
            /* 查找之前数组中是否有该商品 方法一
            let oldProducet = null
            // payload：新添加的商品。同一件商品多次添加，是数量增加
            for (let item of state.cartList) {
                if(item.iid === payload.iid){
                    oldProducet = item
                }
            }*/
            // 查找之前数组中是否有该商品 方法二 find()：找到时将item返回给product
            /*let product = state.cartList.find(function (item) {
                return item.iid === payload.iid
            })*/
            // 查找之前数组中是否有该商品 方法三： 查找之前数组中是否有该商品
            let product = context.state.cartList.find(item => item.iid === payload.iid)
            // 2.判断oldProducet是否有值
            /*方法一
            if(oldProducet){
                oldProducet.count += 1
            }else {
                payload.count = 1
                state.cartList.push(payload)
            }*/
            // 方法二
            if(product){ // 数量+1
                // product.count += 1
                context.commit('addCounter', product)
                resolve('当前的数量+1')
            }else { // 添加新的商品
                payload.count = 1
                // context.state.cartList.push(payload)
                context.commit('addToCart', payload)
                resolve('添加新的商品')
            }
        })
    }
}
