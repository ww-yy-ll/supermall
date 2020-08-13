import Vue from 'vue'
import VueRouter from 'vue-router'

// 路由懒加载
const Home = () => import('../views/home/Home')
const Category = () => import('../views/category/Category')
const Shopcart = () => import('../views/shopcart/Shopcart')
const Profile = () => import('../views/profile/Profile')
// 1. 安装插件
Vue.use(VueRouter)
// 2. 创建路由对象
const routes = [
    {
        //  默认路由
        path: '',
        redirect: '/home'
    },
    {
        path: '/home',
        component: Home
    },
    {
        path: '/category',
        component: Category
    },
    {
        path: '/shopcart',
        component: Shopcart
    },
    {
        path: '/profile',
        component: Profile
    }
]
const router = new VueRouter({
    routes,
    mode: 'history'
})
// 3. 导出路由对象
export default router
