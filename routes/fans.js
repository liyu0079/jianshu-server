let {
  follow,unfollow,findAll
} = require('../controller/fans')
const router = require('koa-router')()
router.prefix('/fans')

//点击关注
router.post('/follow',follow)

//点击取关
router.post('/unfollow',unfollow)

//查询粉丝
router.get('/findAll',findAll)

module.exports = router