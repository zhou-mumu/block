const {User} = require('../../model/user');
module.exports = async (req,res,next) => {
    //接受客户端传递过来的请求参数
    const body = req.body;
    //即将要修改的用户id
    const id = req.query.id;

    let user = await User.findOne({_id:id})
    
    if(req.body.password == user.password) {
        //res.send('密码正确');
        //将用户信息更新到数据库中
        await User.updateOne({_id:id}, {
            username: req.body.username,
            email: req.body.email,
            role: req.body.role,
            state: req.body.state
        });

        //将页面重定向到用户列表页面
        res.redirect('/admin/user');
    }else {
        //密码对比失败
        let obj = {path: '/admin/user-edit',message: '密码比对失败，不能进行用户信息的修改',id:id};
        //触发错误处理中间件
        next(JSON.stringify(obj));
    }

    //密码比对
    // res.send(user);
}