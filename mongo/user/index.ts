import { Schema, model } from 'mongoose'

export const User = model('User', new Schema({
  name: {
    type: String,
    required: true
  },
  pwd: {
    type: String,
    required: true
  },
  sex: { // 性别
    type: Number,
    default: 2
  },
  avatar: {
    type: String,
    default: 'user.png'
  },
  date: {
    type: Date,
    default: Date.now()
  }
})) // 用户表

export const Friend = model('Friend', new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User' }, // 用户id
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