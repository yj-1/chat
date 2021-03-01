import { Router } from 'express'
// import { findUser } from '../mongo/user/query'
import { User } from '../mongo/user/index'
import { _404, _200, _500, _304 } from '../modal/send'
import { hash } from 'bcryptjs'
const route = Router()

route.post('/', (req, res) => {
  console.log(req.body)
  const { username, password, repass } = req.body

  User.findOne({username}, 'username')
    .then((user: object) => {
      if(!!user) {
        return res.json(_304('用户'))
      }
      hash(password, 10, (err, hash) => {
        if (err) {
          return res.json(_500('系统错误！'))
        }
        User.create({ username, password: hash })
          .then((data: any) => {
            console.log(data, '创建成功！')
            return res.json(_200(null, '注册'))
          })
          .catch(err => {
            const msg = err.errors?.username.properties.message
            if (msg) {
              return res.json(_500(msg))
            }
            return res.status(500).json(_500('创建失败！'))
          })
        
      })
    })
    .catch(err => {
      return res.status(500).json(_500())
    })
})
export default route