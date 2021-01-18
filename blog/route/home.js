//引用express框架
const express = require('express');
//创建博客展示页面路由
const home = express.Router();
//博客前台页面的展示页面
home.get('/',require('./home/index'));

//博客前台文章详情展示页面 
home.get('/article',require('./home/article'));

//将路由对象作为模块成员进行导出
module.exports = home;