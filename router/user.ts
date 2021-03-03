import { Router } from 'express'
import { verifyToken } from '../config/token'
import { _200, _304, _400, _404, _500 } from '../modal/send'
import auth from '../module/auth'
import { Friend, User } from '../mongo/user'
import { isOnLine } from '../mongo/user/query'
import { TS_Req } from './chat'
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

route.get('/', auth, function(req:any, res) {
  console.log(req.user)
  const { id } = req.user
  User.updateOne({_id:id}, {online: 0})
  .then(data => {
    console.log(data)
  })
  .catch(err => {
    console.log(err)
  })
})
route.post('/addFriend', auth, (req:TS_Req, res) => {
  const { id, username } = req.user
  const { friendId } = req.body
  const data = { userId: id, friendId }
  Friend.findOne(data, 'status')
    .then(result => {
      if(result) {
        return res.json(_304('申请'))
      } else {
        Friend.create(data)
          .then((_result) => {
            console.log(_result)
            isOnLine(friendId)
            return res.json({result:_result, msg:'已成功发送申请！'})
          })
          .catch(err => {
            console.log(err)
            return res.status(500).json(_500('添加失败,未知原因！'))
          })
      }
    })
    .catch(err => {
      res.status(500).json({msg: '程序出错！'})
    })
})

export default route