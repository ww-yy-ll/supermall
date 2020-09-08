export default {
    // mutations唯一的目的是修改state中的状态
    // mutations中的每个方法中尽可能完成的 事件或功能 比较单一，只做一件事
    addCounter(state, payload){
        payload.count++
    },
    addToCart(state, payload){
        // 设置默认选中
        payload.checked = true
        state.cartList.push(payload)
    }
}