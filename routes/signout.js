const Router = require('koa-router');
const router = new Router()


router.get('/', async (ctx) => {
    ctx.session.user = null;
    ctx.flash = {
        msg: '退出登录'
    }
    ctx.redirect('/')
});

module.exports = router.routes();