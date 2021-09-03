let mongoose = require('mongoose')

//粉丝文档对象
let schema = new mongoose.Schema({
   username: String,
   author: String,
   createTime: String
})

let Fans = mongoose.model('fans', schema)

module.exports = Fans