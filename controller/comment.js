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


module.exports = {
  add,
  del
}