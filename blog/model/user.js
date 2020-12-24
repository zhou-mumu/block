//创建用户集合
//引入mongoose第三方模块
const mongoose = require('mongoose');
// 引入joi模块
const Joi = require('joi');


//创建用户集合规则
const userSchema = new mongoose.Schema({
   username: {
       type:String,
       required: true,
       minlength:2,
       maxlength:20 
   },
   email: {
       type:String,
       //保证邮箱地址唯一
       unique: true,
   },
   password: {
       type: String,
       required:true
   },
   //角色
   //定义admin为超级管理员 normal为普通用户
   role: {
       type:String,
       required:true
   },
   // 0 启用状态 1-禁用状态
   state: {
       type:Number,
       default: 0
   }
});

//创建集合
const User = mongoose.model('User',userSchema);

// User.create({
//     username: 'zhushumei',
//     email: '953474446@qq.com',
//     password: '123456',
//     role: 'admin',
//     state: 0
// }).then(() => {
//     console.log('用户创建成功');
// }).catch(() => {
//     console.log('用户创建失败');
// })

//验证用户信息
const validateUser = user => {
    //定义对象的验证规则
    const schema = {
        username: Joi.string().min(2).max(12).required().error(new Error('用户名不符合验证规则')),
        email: Joi.string().email().required().error(new Error('邮箱格式不符合验证规则')),
        password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required().error(new Error('密码格式不符合验证规则')),
        role: Joi.string().valid('normal','admin').required().error(new Error('角色值不符合验证规则')),
        state: Joi.number().valid(0,1).required().error(new Error('状态值非法'))
      };

      //实施验证
      return Joi.validate(user,schema);
}

//将用户集合作为模块成员进行导出
module.exports = {
    //也可以直接写为User
    User:User,
    validateUser
}