const router = require('koa-router')()
const {
  login,
  reg,
  verify,
  updatePwd,
  updatePersonal
} = require('../controller/users')
router.prefix('/users')

//用户登录
router.post('/login',login)

//用户注册
router.post('/reg',reg)

//验证用户登录
router.get('/verify',verify)

//修改密码
router.post('/update/pwd',updatePwd)

//修改用户个人资料
router.post('/update/personal',updatePersonal)

module.exports = router