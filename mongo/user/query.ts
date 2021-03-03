import { Schema, SchemaTypeOptions } from 'mongoose'
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

export const isOnLine = async (id: Schema.Types.ObjectId) => {
  console.log(id,234)
 const _id = await User.findOne({_id:id}, '')
 console.log(_id)
 return _id
}