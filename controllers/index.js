var fn_index = async (ctx, next) => {
    ctx.response.body = 'nihao'
};

var fn_signin = async (ctx, next) => {
    ctx.response.body = 'nihao2'
};

module.exports = {
    'GET /': fn_index,
    'POST /signin': fn_signin
};