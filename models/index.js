const mongoose = require('mongoose')

// const schema = new mongoose.Schema({

// })

// const Obj = mongoose.model('naems',schema)

//系统用户模型对象
const userSchema = new mongoose.Schema({
   username:String,
   pwd: String
})
const User = mongoose.model('users',userSchema)

module.exports = {
  // Obj
  User
}