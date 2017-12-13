import axios from 'axios'

export function newExp (data) {
   return axios({
     method: 'post',  // 方式一定是post
     url: '你的后台接收函数路径',
     timeout: 20000,
     data: data        // 参数需要是单一的formData形式
   })
 }