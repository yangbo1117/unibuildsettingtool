import React from 'react';
import axios from 'axios';


// axios.defaults.headers.common['Authorization'] = localStorage.getItem('token') //请求头里加入token
//添加一个请求的拦截
axios.interceptors.request.use(function (config) {

  if (localStorage.getItem('token')) {
    // config.headers = localStorage.getItem('token')
    let token = localStorage.getItem('token')
    for(var k in token){
      config.headers.common[`${k}`] = token[k]
    }
  }
  return config;
}, function (error) {
  return Promise.reject(error);
});

// 添加一个响应的拦截
axios.interceptors.response.use(function (response) {

  return response;
}, function (error) {
  // Do something with response error
  if (error.response) {
    switch (error.response.status) {
      case 401:
      case 500:
        // localStorage.setItem('access_token', null);
     
    }
  }
  return Promise.reject(error);
});


React.axios = axios;//实例属性

export default axios;