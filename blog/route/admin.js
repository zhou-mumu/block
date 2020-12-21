//引用express框架
const express = require('express');
//导入用户集合构造函数
const{User} = require('../model/user');
//创建博客管理路由
const admin = express.Router();

admin.get('/login',(req,res) => {
    res.render('admin/login')
});

//实现登录功能
admin.post('/login',async (req,res) => {
    //接受请求参数
    const {email,password} = req.body;
    if(email.trim().length == 0 || password.trim().length == 0) {
        return res.status(400).send("<h4>邮件地址或者密码错误</h4>");
    }
    //根据邮箱地址查询用户信息
    //如果查询到了用户 user变量的值是对象类型
    //如果没有查询到用户 user变量为空
    let user = await User.findOne({email:email});
    if(user) {
        //将客户端传递过来的密码和用户信息中密码对比
        if (password == user.password) {
            res.send('ok');
        }else {
            res.status(400).send('<h4>邮件地址或者密码错误</h4>');
        }
    }else {
        //没有查询到用户
        res.status(400).send('<h4>邮件地址或者密码错误</h4>');
    }
})

//创建用户列表路由
admin.get('/user',(req,res) => {
    res.render('admin/user');
})

//将路由对象作为模块成员进行导出
module.exports = admin;