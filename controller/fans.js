let Fans = require('../models/fans')

/**
 * 关注作者 
 */
const follow = async ctx =>{
    let fans = ctx.request.body

    await Fans.create(fans).then(rel =>{
        if(rel){
            ctx.body = {
              code: 200,
              msg: '关注成功'
            }
        }else{
          ctx.body = {
            code: 300,
            msg: '关注失败'
          }
        }
    }).catch(err =>{
      ctx.body = {
        code: 500,
        msg: '关注时出现异常',
        err
      }
    })
}

/**
 * 取关作者 
 */
 const unfollow = async ctx =>{
  let {username,author} = ctx.request.body

  await Fans.findOneAndDelete({username,author}).then(rel =>{
      if(rel){
          ctx.body = {
            code: 200,
            msg: '取关成功'
          }
      }else{
        ctx.body = {
          code: 300,
          msg: '取关失败'
        }
      }
  }).catch(err =>{
    ctx.body = {
      code: 500,
      msg: '取关时出现异常',
      err
    }
  })
}

/**
 * 查询粉丝 
 */
 const findAll = async ctx =>{
  let {page,author} = ctx.query

  //判断页码
  if(!page|| isNaN(Number(page))){
    page = 1
  }else{
    page = Number(page)
  }

  //每页条数
  let pageSize =10

  //计算总页数
  let count = 0
  await Fans.find({author}).count().then(rel=>{
         count = rel
  })
  let totalPage = 0 
  if(count>0){
    totalPage = Math.ceil(count / pageSize)
  }

  //判断当前页码的范围
  if(totalPage > 0 && page > totalPage){
    page = totalPage
  }else if(page < 1){
    page = 1
  }

  //计算起始位置
  let start = (page -1) / pageSize  

  await Fans.find({author}).skip(start).limit(pageSize).then(rel=>{
       if(rel && rel.length > 0){
         ctx.body = {
          code: 200,
          msg: '查询成功',
          result: rel,
          page,
          pageSize,
          count
         }
       }else{
        ctx.body = {
          code: 300,
          msg: '查询失败'
          }
       }
  }).catch(err=>{
    ctx.body = {
      code: 500,
      msg: '查询时出现异常',
      err
      }
  })
}

module.exports = {
  follow,
  unfollow,
  findAll
}
