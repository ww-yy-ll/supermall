import Toast from './Toast'

const obj ={}

obj.install = function (Vue) {
    // 项目一运行就会执行这里的代码
    // 先预备代码
    // console.log('执行了obj的install函数');
    // Vue.prototype.$toast = 对象;
    // Vue.extend(Toast) 创建组件构造器
    // document.body.appendChild(Toast.$el) Toast.$el返回undefined，拿不到el里面的东西
    // 1.创建组件构造器
    const toastConstructor = Vue.extend(Toast)
    // 2.new的方式，根据组件构造器，可以创建出一个组件对象
    const toast = new toastConstructor()
    // 3.将组件构造器对象，手动挂载到某一个元素上
    toast.$mount(document.createElement('div'))
    // 4.此时 toast.$el 对应的就是 div
    document.body.appendChild(toast.$el)
    Vue.prototype.$toast = toast;
}

export default obj

