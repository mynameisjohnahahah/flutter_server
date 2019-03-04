const Router = require('koa-router')

const router = new Router()

router.prefix('/login')

router.get('/',(ctx,next)=>{
    ctx.body = "hello A module router"
})

module.exports = router