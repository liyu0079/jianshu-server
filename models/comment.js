let mongoose = require('mongoose')

//文章评论文档对象
let schema = new mongoose.Schema({
     username: String,
     author: String,
     articleTitle: String,
     artileId: Number,
     content: String,
     createTime: String
})

let Comment = mongoose.model('comments', schema)

module.exports = Comment