import { User } from './index'

export const findUser = (res) => {
  User.find((err, val) => {
    if(err) {
      console.log('查找失败！')
    } else {
      res.send(val)
    }
  })
}

