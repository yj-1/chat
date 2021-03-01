import { Router } from 'express'
import { _200, _400, _500 } from '../modal/send'
import { Friend, User } from '../mongo/user'
const route = Router()

// route.get('/:username', (req, res) => {
//   console.log(req.params)
//   findUser(req.params.username, res)
// })

route.post('/friends', async (req, res) => {
  const { username, skip, limit, id } = req.body
  if(!id) {
    return res.json(_400('id'))
  }

   const _skip = skip || 0, _limit = limit || 10
   const result: any = await User.find({ username: new RegExp(username, 'i') }, 'username avatar')
     .skip(_skip)
     .limit(_limit)

   if (!Array.isArray(result) || result.length) {
     return res.json(_500())
   }
   const data = []
   for (let i in result) {
     const obj: any = await Friend.findOne({ userId: id, friendId: result[i]._id }, 'status')

     data.push({
       _id: result[i]?._id,
       avatar: result[i]?.avatar,
       username: result[i]?.username,
       status: obj?.status || 2
     })
   }
   const total = await User.countDocuments({ $or: [{ "username": username }] })
   res.json(_200({ list: data, total, skip: _skip, limit: _limit }, '查询'))


}) // 搜索好友

export default route