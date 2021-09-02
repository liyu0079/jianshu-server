let {
  add,del
} = require('../controller/comment')
const router = require('koa-router')()
router.prefix('/comment')

//添加评论
router.post('/add',add)

//删除评论
router.post('/del',del)

module.exports = router