let Article = require('../models/article')

/**
 * 发布文章 
 */
const add = async ctx => {
   let article = ctx.request.body
   await Article.create(article).then(rel=>{
     if(rel){
       ctx.body = {
         code: 200,
         msg: '文章发布成功'
       }
     }else{
      ctx.body = {
        code: 300,
        msg: '文章发布失败'
      }
     }
   }).catch(err=>{
    ctx.body = {
      code: 500,
      msg: '文章发布时出现异常',
      err
    }
   })
}

/**
 * 查询所有文章(分页)
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
   await Article.find({author}).count().then(rel=>{
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


   await Article.find({author}).skip().limit().then(rel =>{
         if(rel && rel.length > 0){
           ctx.body = {
             code: 200,
             msg: '文章查询成功',
             result: rel,
             page,
             pageSize,
             count
           }
         }else{
           ctx.body = {
             code: 300,
             msg: '没有查询到文章'
           }
         }
   }).catch(err =>{
         ctx.body = {
           code: 500,
           msg: '文章查询时出现异常',
           err
         }
   })
}

/**
 * 查询单个文章
 */
 const findOne = async ctx =>{
    let {id} = ctx.query
    let isRead = false
    await Article.findOne({id}).then(rel =>{
      if(rel){
        isRead = true
        ctx.body = {
          code: 200,
          msg: '文章查询成功',
          result: rel
        }
      }else{
        ctx.body = {
          code: 300,
          msg: '没有查询到文章'
        }
      }
    }).catch(err =>{
      ctx.body = {
        code: 500,
        msg: '文章查询时出现异常',
        err
      }
    })

    if(isRead){
        await Article.updateOne({id},{$inc: {read:1}})
    }
}


/** 
 * 修改文章
 */
 const update =async ctx =>{
  let article = ctx.request.body

  await Article.updateOne(
    {id: article.id},
    {
        title: article.title,
        stemfrom: article.stemfrom,
        content: article.content
    }
  ).then(rel =>{
    if(rel.n > 0){
      ctx.body = {
        code: 200,
        msg: '文章更新成功'
      }
    }else{
      ctx.body = {
        code: 300,
        msg: '文章更新失败'
      }
    }
  }).catch(err =>{
    ctx.body = {
      code: 500,
      msg: '文章更新时出现异常',
      err
    }
  })
}

/** 
 * 删除文章
 */
 const del =async ctx =>{
  let {id} = ctx.request.body

  await Article.findOneAndDelete({id}).then(rel =>{
    if(rel){
      ctx.body = {
        code: 200,
        msg: '文章删除成功'
      }
    }else{
      ctx.body = {
        code: 300,
        msg: '文章删除失败'
      }
    }
  }).catch(err =>{
    ctx.body = {
      code: 500,
      msg: '文章删除时出现异常',
    }
  })
}



module.exports = {
  add,
  findAll,
  findOne,
  update,
  del
}