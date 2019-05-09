const Router = require('koa-router');
const router = new Router();
// 引入User数据模型
const User = require("../models/User");

router.get('/:userId', async (ctx, next) => {
    if (!ctx.session.user) {
        ctx.flash = {
            msg: "请登录"
        };
        ctx.redirect('/signin');
    }
    let user = await User.findById(ctx.params.userId);
    let articles = await Article.find({writer:user.name});
    console.log(articles);
    console.log(ctx.session);
    await ctx.render('usercenter', {
        title: 'My Blogs',
        articles: articles,
        pages: [1, 2, 3]
    });
});

router.get('/register', (ctx, next) => {
    ctx.body = {
        msg: "user register"
    };
});
router.get('/login', (ctx, next) => {
    ctx.body = {
        msg: "user login"
    };
});

module.exports = router.routes();