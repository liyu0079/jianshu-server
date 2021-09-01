const router = require('koa-router')()
const {
  login
} = require('../controller/user')

router.prefix('/users',login)

module.exports = router