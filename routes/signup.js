const Router = require('koa-router');
const router = new Router();
const User = require("../models/User");
const tools = require('../config/tools');

router.get('/', async (ctx, next) => {
    await ctx.render('signup');
});

router.post('/', async (ctx, next) => {
    ctx.body = ctx.request.body;
    let registerBody = ctx.request.body;
    // 检查用户是否已存在
    const findResutl = await User.find({
        name: registerBody.name
    });
    console.log(findResutl);
    if (findResutl.length > 0) {
        ctx.status = 500;
        ctx.body = {
            name: 'email exist'
        };
    } else {
                const newUser = new User({
            name: registerBody.name,
            password: tools.enBcrypt(registerBody.password), // 加密密码
        });

        // 存储到数据库
        await newUser.save().then((user) => {
            console.log(user);
            ctx.session.user = {
                _id: user._id,
                name: user.name,
            }
            ctx.flash = {msg: "注册成功"};
            ctx.redirect('/');
        }).catch((err) => {
            ctx.body = err;
        });
    }
});

module.exports = router.routes();