const Router = require('koa-router')
const fs = require('fs');

const router = new Router()

router.prefix('/socket')

router.get('/',(ctx, next)=>{
    ctx.response.type = 'html';
    ctx.response.body = fs.createReadStream('./index.html');
})

module.exports = router