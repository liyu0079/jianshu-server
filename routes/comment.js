let {
  add,del,findById,findByAuthor
} = require('../controller/comment')
const router = require('koa-router')()
router.prefix('/comment')

//添加评论
router.post('/add',add)

//删除评论
router.post('/del',del)

//前台查询评论
router.get('/web/find',findById)

//后台查询评论
router.get('/admin/find',findByAuthor)

module.exports = router