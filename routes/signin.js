const Router = require('koa-router');
const router = new Router()
const User = require("../models/User");
const tools = require('../config/tools');

router.get('/', async (ctx) => {
    await ctx.render('signin');
});
router.post('/', async (ctx) => {
    const {
        name,
        password
    } = ctx.request.body
    const user = await User.findOne({
        name:name
    })
    if (user && await tools.comparePassword(password, user.password)) {
        ctx.session.user = {
            _id: user._id,
            name: user.name,
        }
        ctx.session.flash = {
            msg: '登录成功'
        }
        console.log("signin");
        console.log(ctx.flash);
        ctx.redirect('/')
    } else {
        ctx.session.flash = {
            msg: '账号或密码错误'
        };
        ctx.redirect('back');
    }
});

module.exports = router.routes();