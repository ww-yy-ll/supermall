import axios from 'axios'
// 4.直接返回instance()
export function request(config) {
  // 1.创建axios实例
  const instance = axios.create({
    baseURL: 'http://152.136.185.210:8000/api/z8',
    timeout: 5000
  })
//  2. axios拦截器
  // 2.1 表示拦截请求
  instance.interceptors.request.use(config => {
    // console.log(config);
    return config
  }, err => {
    //  请求失败进入这里的函数
    console.log(err);
  });
  // 2.2 拦截响应
  instance.interceptors.response.use(res => {
    // console.log(res);
    return res.data
  }, err => {
    console.log(err);
  });

//  3. 发送真正的网络请求
  return instance(config)
}
