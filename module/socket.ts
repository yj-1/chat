import { NextFunction, Request, Response } from 'express'
import { Server as SV } from 'http'
import { Server, Socket } from 'socket.io'
import { verifyToken } from '../config/token'
import { User } from '../mongo/user'
interface TS_Err extends Error {
  data?: {
    content?: string,
    [key: string]: any
  }
}
interface TS_socket extends Socket {
  user?: object | boolean
}
const noAuth = (socket: TS_socket, next: Function) => {
  const err: TS_Err = new Error('缺少token，未经授权！')
  err.data = { content: '请稍后重试！', status: 404 }
  next(err)
  console.log(socket.id)
  // socket.disconnect(true)
} // 鉴权方法

const isAuth = (socket: TS_socket, next: Function) => {
  const { token } = socket.handshake.auth
  console.log(token)
  if (!token || token.length < 30) {
    console.log('没有token')
    noAuth(socket, next)
  } else {
    const isAuth = verifyToken(token)
    if (isAuth) {
      console.log(isAuth, '有权限')
      socket.user = isAuth
      next()
    } else {
      noAuth(socket, next)
    }
  }
} // 鉴权中间件

// const io = new Server(server, {
//   pingInterval: 10000,
//   pingTimeout: 5000
// }) // 启动socket.io 模块
export let io: Server = null
export default (server: SV) => {
   io = new Server(server, {
    pingInterval: 10000,
    pingTimeout: 5000,
    // cors: {
    //   methods: ['GET', 'POST'],
    //   origin: 'http://localhost:3000'
    // }
  }) // 启动socket.io 模块

  io.use(isAuth)
  io.on('connection', (socket) => {
    console.log('有用户连接', socket.id)
    socket.emit('system', {
      url: '/image/system.jpg',
      name: '测试系统',
      message: '欢迎加入！',
      tip: 0,
      time: Date.now()
    })
  })
  return (req: Request, res: Response, next: NextFunction) => {
    (<any>res).socket = io
    next()
  }
}
