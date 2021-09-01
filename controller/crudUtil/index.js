/**  
 * 用于添加数据的公共方法
 * @param {*} model
 * @param {*} params
 * @param {*} ctx
 * @returns
 */
 const add = (model, params, ctx) => {
  model.create(params).then(rel => {
    if (rel) {
      ctx.body = {
        code: 200,
        msg: '添加成功',
        data: rel
      }
    } else {
      ctx.body = {
        code: 300,
        msg: '添加失败'
      }
    }

  }).catch(err => {
    ctx.body = {
      code: 400,
      msg: '添加时出现异常'
    }
    console.error(err)
  })
}

/**
 * 用于修改数据的公共方法
 * @param {*} model
 * @param {*} where
 * @param {*} params
 * @param {*} ctx
 * @returns
 */
const update = (model, where, params, ctx) => {
  model.updateOne(where,params).then(rel => {
    ctx.body = {
      result: rel
    }
  }).catch(err => {
    ctx.body = {
      code: 400,
      msg: '修改时出现异常'
    }
    console.error(err)
  })
}

/**
 * 用于删除数据的公共方法
 * @param {*} model
 * @param {*} where
 * @param {*} ctx
 * @returns
 */
const del = (model, where, ctx) => {
  model.findOneAndDelete(where).then(rel => {
    ctx.body = {
      result: rel
    }
  }).catch(err => {
    ctx.body = {
      code: 400,
      msg: '删除时出现异常'
    }
    console.error(err)
  })
}

/**
 * 用于查询所有数据的公共方法
 * @param {*} model
 * @param {*} where
 * @param {*} ctx
 * @returns
 */
const find = (model, where, ctx) => (
  model.find(where).then(rel => {
    ctx.body = {
      result: rel
    }
  }).catch(err => {
    ctx.body = {
      code: 400,
      msg: '查询时出现异常'
    }
    console.error(err)
  })
)

/**
 * 用于查询单个数据的公共方法
 * @param {*} model
 * @param {*} where
 * @param {*} ctx
 * @returns
 */
const findOne = (model, where, ctx) => (
  model.findOne(where).then(rel => {
    ctx.body = {
      result: rel
    }
  }).catch(err => {
    ctx.body = {
      code: 400,
      msg: '查询时出现异常'
    }
    console.error(err)
  })
)

module.exports = {
  find,
  findOne,
  add,
  del,
  update
}