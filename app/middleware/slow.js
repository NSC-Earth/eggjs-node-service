module.exports = (options, app) => {
  //计算请求时间中间件
  return async function (ctx, next) {
    const startTime = Date.now();
    await next();
    const consume = Date.now() - startTime;
    const { threshold = 0 } = options || {};
    if (consume > threshold) {
      console.log(`${ctx.url}请求耗时${consume}毫秒`);
    }
  };
};
