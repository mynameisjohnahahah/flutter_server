const Router = require('koa-router')
const FriendsList = require('../model/friendsList')
const Friends = require('../model/friends')

const router = new Router()

router.prefix('/friendsList')

// 查询某个人的好友申请列表
router.get('/', async (ctx, next) => {
    let beInvited = ctx.query.beInvited

    let res = await FriendsList.find({
        beInvited
    })

    if(res) {
        console.log(res)
        ctx.body = { code: 0, msg: 'success', data: res }
    } else {
        console.log('无')
        ctx.body = { code: 0, msg: 'success', data: [] }
    }
})

// 添加好友申请
router.post('/save', async (ctx, next) => {
    let data = ctx.request.body

    let Friends = new FriendsList({
        applyId: data.applyId,
        beInvited: data.beInvited,
        applyRemarks: data.applyRemarks,
        rejectRemarks: data.rejectRemarks,
        status: 0
    })

    Friends.save((err, res) => {
        if(err) {
            console.log('添加失败')
            ctx.body = { code: -1, msg: 'error' }
        } else {
            console.log('添加成功')
            ctx.body = { code: 0, msg: 'success' }
        }
    })
})

// 更新好友申请状态
router.put('/update', async (ctx, next) => {
    let data = ctx.request.body

    let res = await FriendsList.update({
        applyId: data.applyId,
        beInvited: data.beInvited,
    },{
        applyRemarks: data.applyRemarks,
        rejectRemarks: data.rejectRemarks,
        status: data.status
    })

    if(res.nModified === 1 && res.ok === 1) {
        if(data.status === 1) {
            // 同意添加好友的话 还需要产生好友关联
            let Friend = new Friends({
                userId: data.applyId,
                friendId: data.beInvited,
                userName: ''
            })
        
            Friend.save((err, res) => {
                if(err) {
                    console.log('添加失败')
                    ctx.body = { code: -1, msg: 'error' }
                } else {
                    console.log('添加成功')
                    ctx.body = { code: 0, msg: 'success' }
                }
            })
            // 并且创建一个聊天记录
            
        } else {
            console.log('更新成功')
            ctx.body = { msg: 'success' }
        }
    } else {
        console.log('更新失败')
        ctx.body = { msg: 'error' }
    }
})

module.exports = router