//引用express框架
const express = require('express');
//处理路径模块
const path = require('path');
//引入body-parser模块 用来处理post请求参数
const bodyPaser = require('body-parser');
//导入express-session模块
const session = require('express-session');
//创建网站服务器
const app = express();
//数据库连接
require('./model/connect');
//处理post请求参数
app.use(bodyPaser.urlencoded({extended:false}))

app.use(session({secret:'secret key'}));
// require('./model/user');

//告诉express框架模板所在位置
//app.set为express框架下的设置方法,前一个views为固定写法，后一个参数为模板所在路径
app.set('views',path.join(__dirname,'views'));
//告诉express框架模板的默认后缀是什么
app.set('view engine','art');
//当渲染的后缀为art的模板时 所使用的的模板引擎是什么
app.engine('art',require('express-art-template'));

//开放静态资源文件
app.use(express.static(path.join(__dirname,'public')));

const home = require('./route/home');
const admin = require('./route/admin');
const { nextTick } = require('process');

//拦截请求 判断用户登录状态
app.use('/admin',require('./middleware/loginGuard'));

//为路由匹配请求路径，使用use拦截请求,接收/home请求后连接home路由
app.use('/home',home);
app.use('/admin',admin);


//监听端口
app.listen(80);
console.log('网站服务器启动成功，请访问localhost');