const Koa = require("koa");
const app = new Koa();

// x-response-time for client dev

app.use(async (ctx, next) => {
  const start = Date.now();
  console.log("first next out");
  await next();
  console.log("first next back");
  const ms = Date.now() - start;
  ctx.set("X-Response-Time", `${ms}ms`);
});

// logger for server dev

app.use(async (ctx, next) => {
  const start = Date.now();
  console.log("second next out");
  await next();
  console.log("second next back");
  const ms = Date.now() - start;
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});

// response

app.use(async ctx => {
  console.log("send text to client");
  ctx.body = "Hello World";
});

app.listen(3000);
