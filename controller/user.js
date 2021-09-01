let jwt =require('jsonwebtoken')

const login = async ctx=>{
    let user = {
      username: 'admin',
      pwd: '123'
    }

    let token = jwt.sign({
      username:user.username
    },'jianshu-server-jwt',{
      expiresIn: 3600*24*7
    })

    ctx.body={
      token
    }
}


module.exports={
  login
}