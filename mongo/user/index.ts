import { Schema, model } from 'mongoose'
type ts_validate = (val: boolean, str?:string) => boolean
// const _validate = (validator: (val:string, cb:ts_validate) => Promise<boolean>, message='缺少参数',isAsync=true) => {
//   return {
//     isAsync,
//     validator,
//     message
//   }
// }
export type ts_user = {
  _id: Schema.Types.ObjectId,
  username: string,
  password: string,
  sex?: number,
  avatar: string,
  date: Date,
  [key:string]: any
}
export const User = model('User', new Schema({
  username: {
    type: String,
    message: '缺少userusername！',
    required: true
  }, // 用户名
  password: {
    type: String,
    message: '缺少password',
    required: true
  }, // 密码
  sex: { // 性别
    type: Number,
    default: 2
  },
  avatar: {
    type: String,
    default: 'user.jpg'
  }, // 头像
  online: { // 是否在线
    type: Number,
    default: 2, // 0代表在线
  },
  socketId: { // socketId
    type: String,
  },
  date: {
    type: Date,
    default: Date.now()
  }
}), 'user') // 用户表

export type ts_friend = {
  userId: Schema.Types.ObjectId,
  friendId: Schema.Types.ObjectId,
  status?: number,
  date?: Date
}
export const Friend = model('Friend', new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true }, // 用户id
  friendId: { type: Schema.Types.ObjectId, ref: 'User' }, // 好友id
  status: { type: Number, default: 2 }, // 好友状态
  date: { type: Date, default: Date.now() }
})) // 好友表

export const PrivateChat = model('PrivateChat', new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User' },
  friendId: { type: Schema.Types.ObjectId, ref: 'User' },
  msg: { type: String }, // 消息内容
  types: { type: String }, // 消息类型
  date: { type: Date, default: Date.now() }
})) // 一对一消息表

export const Group = model('Group', new Schema({
  name: { type: String }, // 群名称
  groupLeader: { type: Schema.Types.ObjectId, ref: 'User' }, // 群主
  groupAvatar: { type: String, default: 'group.png' }, // 群头像
  notice: { type: String }, // 公告
})) // 群表

export const GroupUser = model('GroupUser', new Schema({
  groupId: { type: Schema.Types.ObjectId, ref: 'Group' },
  userId: { type: Schema.Types.ObjectId, ref: 'User' }, // 用户ID
  tip: { type: Number, default: 0 }, // 未读消息数
  role: { type: String, default: 0 }, // 身份
  date: { type: Date, default: Date.now() }
})) // 群成员

export const GroupMsg = model('GroupMsg', new Schema({
  groupId: { type: Schema.Types.ObjectId, ref: 'Group' },
  userId: { type: Schema.Types.ObjectId, ref: 'User' },
  msg: { type: String }, // 消息内容
  types: { String }, // 消息类型
  date: { type: Date, default: Date.now() }
})) // 群消息


export default {
  User,
  Friend,
  Group,
  GroupUser,
  PrivateChat,
  GroupMsg
}