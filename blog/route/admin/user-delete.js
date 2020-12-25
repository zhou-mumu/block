const {User} =require('../../model/user');
module.exports = async(req,res) => {
    // 获取要删除的用户id
    //res.send(req.query.id) 
    //根据id删除用户
    await User.findOneAndDelete({_id: req.query.id})
    //删除成功重定向回用户列表页面
    res.redirect('/admin/user');
}