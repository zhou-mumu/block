//导入用户集合构造函数
const{User} = require('../../model/user');

const login = async (req,res) => {
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
            //将用户名放到请求列表中
            req.session.username = user.username;
            // res.send('ok');
            //将用户角色存储在session对象中
            req.session.role = user.role;
            req.app.locals.userInfo = user;
            //对用户的角色进行判断
            if (user.role == 'admin') {
                //重定向到用户列表页面
                res.redirect('/admin/user');
            }else {
                //重定向到博客首页
                res.redirect('/home/');
            }
            
        }else {
            res.status(400).send('<h4>邮件地址或者密码错误</h4>');
        }
    }else {
        //没有查询到用户
        res.status(400).send('<h4>邮件地址或者密码错误</h4>');
    }
}
module.exports = login;