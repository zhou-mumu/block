//导入文章集合构造函数
const { Article } = require('../../model/article');
//导入评论集合构造函数
const { Comment } = require('../../model/comment');

module.exports = async (req,res) => {
    // res.send('欢迎来到博客首页');
    const id = req.query.id;

    let article = await Article.findOne({_id:id}).populate('author');
    
    //查询当前文章所对应的评论信息
    let comments = await Comment.find({aid: id}).populate('uid');

    article = JSON.parse(JSON.stringify(article));
    comments = JSON.parse(JSON.stringify(comments));
    // res.send(article);
    res.render('home/article.art', {
        article: article,
        comments: comments
    });
     
}