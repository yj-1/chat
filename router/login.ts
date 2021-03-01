import { compare } from 'bcryptjs'
import { Router } from 'express'
import { createToken } from '../config/token'
import { _200, _304, _400, _404, _500 } from '../modal/send'
import { User } from '../mongo/user'

const route = Router()

route.post('/', (req, res) => {
  console.log(34)
  const { username, password } = req.body
  User.findOne({username}, 'password username sex avatar')
    .then((data:any) => {

      if(!data) { return res.json(_404('用户')) }
      compare(password, data.password, (err, bool) => {
        if(err) { return res.json(_500('程序出错！')) }
        else if(bool) {
          const token = createToken({id: data._id, username})
          
          const result = Object.assign({ username: data.username, sex: data.sex, avatar: data.avatar }, { token })

          return res.json(_200(result, '登陆'))
        } else {
          return res.json(_400('密码'))
        }
      })
    })
    .catch(err => {
      return res.json(_500())
    })
})

export default route