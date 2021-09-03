let Comment = require('../models/comment')
let Article = require('../models/article')

/**  
 * 添加评论 
 */
const add = async ctx =>{
   let comment = ctx.request.body

   let isComment =false 
   await Comment.create(comment).then(rel =>{
     if(rel){
       isComment =true
       ctx.body = {
         code: 200,
         msg:'发布成功'
       }
     }else{
      ctx.body = {
        code: 300,
        msg:'发布失败'
      }
     }
   }).catch(err =>{
    ctx.body = {
      code: 500,
      msg:'评论发布时出现异常',
      err
    }
   })

   if(isComment){
     await Article.updateOne({id},{$inc:{comment:1}})
   }
}

/** 
 * 删除评论 
 */
 const del = async ctx =>{
  let comment = ctx.request.body

  let isComment =false 
  await Comment.deleteOne(comment).then(rel =>{
    if(rel){
      isComment =true
      ctx.body = {
        code: 200,
        msg:'删除成功'
      }
    }else{
     ctx.body = {
       code: 300,
       msg:'删除失败'
     }
    }
  }).catch(err =>{
   ctx.body = {
     code: 500,
     msg:'评论删除时出现异常',
     err
   }
  })

  if(isComment){
    await Article.deleteOne({id},{$inc:{comment:1}})
  }
}

/**
 * 前台查询评论，通过文章ID查询
 */
const findById = async ctx =>{
   let {id} = ctx.query

   await Comment.find({articleId:ia}).then(rel =>{
      if(rel && rel.length > 0 ){
        ctx.body = {
          code: 200,
          msg: '评论查询成功',
          result: rel
        }
      }else{
        ctx.body = {
          code: 300,
          msg: '评论查询失败'
      }
    }
   }).catch(err =>{
    ctx.body = {
      code: 300,
      msg: '查询评论时出现异常',
      err
    }
   })
}

/**
 * 后台评论查询，根据文章作者查询
 */
const findByAuthor = async ctx =>{
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
  await Comment.find({author}).count().then(rel=>{
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

  await Comment.find({author}).skip(start).limit(pageSize).then(rel =>{
         if(rel && rel.length > 0 ){
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
            code: 200,
            msg: '查询失败'
          }
         }
  }).catch(err =>{
    ctx.body = {
      code: 500,
      msg: '查询时出现异常',
      err
    }
  })
}

module.exports = {
  add,
  del,
  findById,
  findByAuthor
}