const Router = require('koa-router');
const router = new Router();
const Article = require('../models/Article');
module.exports = (app) => {
    
    router.get('/', async (ctx) => {
        let articles = await Article.find();
        console.log(articles);
        console.log(ctx.session);
        await ctx.render('index', {
            title: 'Blogs',
            articles: articles,
            pages:[1,2,3]
        });
        console.log(ctx.flash);
    });
    router.use('/signup', require('./signup'))
    router.use('/signin', require('./signin'))
    router.use('/signout', require('./signout'))
    router.use('/posts', require('./posts'))
    // router.use('/comments', require('./comments'))
    app.use(router.routes()).use(router.allowedMethods());
}