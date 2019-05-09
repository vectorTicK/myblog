const Router = require('koa-router');
const router = new Router();
const Article = require("../models/Article");

router.get('/', (ctx) => {
    ctx.body = {
        msg: "blog list"
    };
});
router.get('/new', async (ctx) => {
    if (!ctx.session.user) {
        ctx.flash = {
            msg: "请登录"
        };
        ctx.redirect('/signin');
    } else {
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
            writer: ctx.session.user.name
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
router.get('/:postId', async ctx => {
    await Article.findById(ctx.params.postId).then(async (article) => {
        await ctx.render('article', {
            article
        });
    }).catch((err) => {
        ctx.flash = {
            msg: "读取失败"
        };
        ctx.redirect('/');
    })

});

router.get('/:postId/edit', async ctx => {
    await Article.findById(ctx.params.postId).then(async (article) => {
        console.log(ctx.session.user.name+'==='+article.writer);
        if(ctx.session.user.name !== article.writer){
            ctx.flash = {
            msg: "只能编辑自己的文章"
            };
            ctx.redirect('/user/'+ctx.session.user._id);
        }else{
            await ctx.render('edit', {
            article
        });
        }
        
    }).catch((err) => {
        
        ctx.redirect('/');
    })

});


module.exports = router.routes();