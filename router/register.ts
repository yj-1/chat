import { Router } from 'express'
// import { findUser } from '../mongo/user/query'
import { User } from '../mongo/user/index'
import { _404, _200, _500, _304 } from '../modal/send'
const route = Router()

route.post('/', (req, res) => {
  console.log(req.body)
  const { username, password, repass } = req.body

  if(!username || !password || !repass) {
    res.json({status: '400', text: '缺少参数！', msg:'缺少参数'})
  } else {
    User.create({name:username,password})
      .then(data => {
        console.log(data, '创建成功！')
      })
      .catch(err => {
        console.log(err.errors.name.properties.message)
      })
  }
})
export default route