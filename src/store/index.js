import Vue from 'vue'
import Vuex from 'vuex'

import mutations from './mutations'
import actions from './actions'

// 1.安装Vuex插件
Vue.use(Vuex)
// 2.创建 Store对象
const state = {
    cartList: []
}
const store = new Vuex.Store({
    state,
    mutations,
    actions
})
// 3.挂载到Vue实例上
export default store
