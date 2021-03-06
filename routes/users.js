const router = require('koa-router')()
const User = require('../model/user')
const crypto = require('crypto')
router.prefix('/users')

router.post('/login', async (ctx, next) => {
  let data = ctx.request.body

  let res = await User.findOne({
    username: data.username
  })
  if(res == null) {
    ctx.body = { code: -1, msg: '找不到这个用户', data: [] }
    return
  } 
  const password =  crypto.createHash('md5').update(data.password + res.slat).digest('hex')
  
  if(password === res.password) {
    // 登陆成功
    
  } else {
    ctx.body = { code: -1, msg: '密码错误', data: [] }
  }
})

// 创建一个用户
router.post('/', async (ctx, next) => {
  let user = ctx.request.body

  const slat = crypto.randomBytes(8).toString('hex');
  const password =  crypto.createHash('md5').update(user.password + slat).digest('hex')
  let users = new User({
    username: user.username,
    password,
    slat
  })

  let res = await users.save()
  ctx.body = { code: 1, msg: 'success', data: [] }
})

// 删除一个用户
router.delete('/', async (ctx, next) => {
  let username = ctx.query.name
  let res = await User.remove({
    username: username
  })
  if(res.ok) {
    console.log('删除成功')
    ctx.body = {msg: 'success'}
  } else {
    console.log('删除失败')
    ctx.body = {msg: 'error'}
  }
})

// 更新用户信息
router.put('/', async (ctx, next) => {
  let user = ctx.request.body

  /** 
   * Model.update(更新数据的条件查询, 更新的数据, 可选参数, [callback])
   * Model.update(conditions, doc, [options], [callback])
  */
  let res = await User.update({
    username: user.username
  },{
    password: user.password
  })
  if(res.nModified === 1 && res.ok === 1) {
    console.log('更新成功')
    ctx.body = { msg: 'success' }
  } else {
    console.log('更新失败')
    ctx.body = { msg: 'error' }
  }
})

// 根据名字查询一个用户
router.get('/', async (ctx, next) => {
  let name = ctx.query.name
  if(name) {
    let res = await User.findOne({
      username: name
    })
  
    // 不能把密码返回去
    let temp = JSON.parse(JSON.stringify(res))
    delete temp['password']
    delete temp['slat']
  
    ctx.body = temp
  } else {
    ctx.body = 'test'
  }
})

module.exports = router
