let {
  add,
  findAll,
  findOne,
  update,
  del
} = require('../controller/article')
const router = require('koa-router')()
router.prefix('/article')

//发布文章
router.post('/add', add)

//查询所有文章（分页）
router.get('/findAll',findAll)

//查询单个文章
router.get('/findOne',findOne)

//修改文章
router.post('/update',update)

//删除文章
router.post('/del',del)

module.exports = router
