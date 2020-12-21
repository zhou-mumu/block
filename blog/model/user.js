//创建用户集合
//引入mongoose第三方模块
const mongoose = require('mongoose');

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

//将用户集合作为模块成员进行导出
module.exports = {
    //也可以直接写为User
    User:User 
}