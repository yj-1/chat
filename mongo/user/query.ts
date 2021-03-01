import { _200, _500 } from '../../modal/send'
import { User } from './index'

export const findUser = async (username, res) => {
  User.find({$or: [{'username': username},{count: ''}]},'_id username avatar')
    .limit(10)
    .then(data => {
      console.log(data)
        if (!data) {
          console.log('查找失败！')
          return res.json(_500('暂无数据！', '502'))
        } else {
         return res.json(_200(data))
        }
    })
    .catch(err => {
      return res.json(_500())
    })
}

