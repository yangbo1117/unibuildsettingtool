import "react-app-polyfill/ie11";  //如果您支持Internet Explorer 9或Internet Explorer 11，则应同时包含ie9或ie11和stable模块
import 'react-app-polyfill/stable';
import React from 'react';
import ReactDOM from 'react-dom';
import ERoute from './route/routes';
import 'antd/dist/antd.css'
import './assets/css/base.scss';
import './plugin/axios'



ReactDOM.render(
  <ERoute />, 
  document.getElementById('root')
);
