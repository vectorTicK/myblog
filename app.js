const Koa = require('koa');
const Router = require('koa-router');
const staticFiles = require('koa-static');
const path = require('path');
const views = require('koa-views');
const bodyParser = require('koa-bodyparser');
const mongoose = require('mongoose');
const session = require('koa-session')
const flash = require('./middlewares/flash')
const port = require("./config/default").port;

const app = new Koa();

app.use(bodyParser());
app.use(staticFiles(path.resolve(__dirname,'./public'),{
    maxage: 30*24*60*60*1000
}));
app.use(views(path.join(__dirname, 'views'), {
    map: {
        html: 'nunjucks'
    }
}));

app.keys = ['somethings']
const CONFIG = {
    key: 'koa:sess',
    maxAge: 'session',
    signed: false
};
app.use(session(CONFIG, app));

app.use(async (ctx, next) => {
    ctx.state.ctx = ctx;
    await next()
})
app.use(flash());
// 配置路由
const index = require('./routes/index');
index(app);
// app
//     .use(router.routes())
//     .use(router.allowedMethods());

// 连接数据库

// 引入配置文件
const dbURI = require("./config/default").mongodbURI;

mongoose.connect(dbURI, {
        useNewUrlParser: true
    })
    .then(() => {
        console.log("Mongodb connected...");
    })
    .catch((err) => {
        console.log("Mongodb connect failed:" + err);
    })


app.listen(port, () => {
    console.log(`server is running on http://localhost:${port}`);
});