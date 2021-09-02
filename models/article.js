let mongoose = require('mongoose')

//文章文档对象
let schema = new mongoose.Schema({
      id: Number,
      title: String,
      createTime: String,
      content: String,
      stemfrom: String,
      read: {
          type: Number,
          default: 0
      },
      star: {
          type: Number,
          default: 0
      },
      comment: {
           type: String,
           default: 0
      },
      author: String  
})

let Article = mongoose.model('articles',schema)

module.exports = Article