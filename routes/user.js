const Router = require('koa-router');
const router = new Router();
// 引入User数据模型
const User = require("../models/User");

router.get('/', (ctx, next) => {
    ctx.body = {
        msg: "user"
    };
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