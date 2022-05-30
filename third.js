const Koa = require('koa');
const Router = require('koa-router');
const app = new Koa();
const router = new Router();

router.get('/', (ctx, next) => {
  console.log('check auth headers')
  next()
}, async (ctx, next) => {
    console.log('check auth headers')
    await next()
  }, async (ctx, next) => {
    let date = new Date;
    setTimeout(() => {
        console.log(date + '# we found the date');
    }, 1000);
    console.log('some tricky db operation')
    await next();
  },(ctx, next) => {
    ctx.body = "hello world"
    console.log("final");
  } );

app
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(3000); 