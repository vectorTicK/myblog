const Router = require('koa-router');
const router = new Router();
const Article = require("../models/Article");

    router.get('/', (ctx) => {
        ctx.body = {msg:"blog list"};
    });
    router.get('/new', async (ctx) => {
        if(!ctx.session.user){
            ctx.flash = {
            msg: "请登录"
            };
            ctx.redirect('/signin');
        } else 
        {
            await ctx.render('new');
        }
        
    });
    router.post('/new', async (ctx) => {
        if (!ctx.session.user) {
            ctx.flash = {
                msg: "请登录"
            };
            ctx.redirect('/signin');
        } else {
            let postdata = ctx.request.body;
             const newArticle = new Article({
                 title: postdata.title,
                 content: postdata.content, 
                 writer:ctx.session.user.name
             });

             // 存储到数据库
             await newArticle.save().then((article) => {
                 console.log(article);
                 
                 ctx.flash = {
                     msg: "发表成功"
                 };
                 ctx.redirect('/');
             }).catch((err) => {
                 ctx.body = err;
             });
        }

    });
    router.get('/:postId', ctx => {
        ctx.body = {msg:`blog ${ctx.params.postId} content`};
    });
    

    // router.use('/comments', require('./comments'))
module.exports = router.routes();