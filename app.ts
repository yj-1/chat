// 导包 开始
import * as express from 'express'
import { createServer } from 'http'
import { Server, Socket } from 'socket.io'
import { urlencoded, json } from 'body-parser'
// import mogno from './mongo/index'
import mongo from './mongo/index'
import getRoutes from './module/setRoute'
import { updateLanguageServiceSourceFile } from 'typescript'
import { verifyToken } from './config/token'
// import Register from './router/register'
// import User from './router/user'
// import Login from './router/login'
// 定义变量
const app = express()
const server = createServer(app)
const { log } = console
let db = undefined
// 导包 结束

app.all('*', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*') // 允许访问的地址
  res.header('Access-Control-Allow-Headers','X-Requested-with')
  // res.header('Access-Control-Allow-Headers', 'Content-Type')
  res.header('Content-Type', "application/json;charset=utf-8")
  res.header('Access-Control-Allow-Methods', 'GET,POST,UPDATE,DELETE') // 允许请求类型
  // res.header('Access-Control-Allow-Credentials', 'true')
  res.header('X-Powered-By', '3.2.1')
  next()
})

// mongo.getMongo()
mongo().then(data=> {
  db = data
})

// 使用中间件 开始
app.use(urlencoded({extended: false}))
app.use(json())

app.use(express.static('./public'))
// 使用中间件 结束

// 初始化
const io = new Server(server,{
  pingInterval: 10000,
  pingTimeout: 5000,
  cors: {
    methods: ['GET', 'POST'],
    origin: 'http://localhost:3000'
  }
}) // 启动socket.io 模块
const task = []
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
      err.data = { content: '请稍后重试！' }
      next(err)
      socket.disconnect(true)
} // 鉴权方法
const isAuth = (socket: TS_socket, next: Function) => {
  const { token } = socket.handshake.auth
  console.log(token)
  if(!token||token.length < 30) {
    console.log(token,234)
    noAuth(socket, next)
  } else {
    const isAuth = verifyToken(token)
    if(isAuth) {
      console.log(234)
      socket.user = isAuth
      next()
    } else {
      noAuth(socket, next)
    }
  }
} // 鉴权中间件
io.use(isAuth)
io.on('connection', (socket) => {
  console.log('有用户连接',socket.id)
  if(task.length) {
    task.forEach((ele, i) => {
      if(i < task.length) {
        clearTimeout(ele)
        task.shift()
      }
    })
  }

  socket.on('r_message', (data: any) => { // 用户连接
    log(data)
    io.emit('s_join', data)
  })
})
.on('r_sendMsg', data => {
  console.log(data)
  io.emit('s_sendMsg', data)
})
.on('r_createGroup', (data) => {
  console.log(data)
})
.on('r_joinGroup', (data) => {

})

const room = [{
  id: '唯一ID',
  name: '测试群',
  groupLeader: '', // 群主
  member: [
    {id: '234'}
  ] // 成员
}]
// 路由
getRoutes()
.then((data:any) => {
  if(data?.length) {
    for(const r of data) {
      app.use(r.path, r.fn)
    }
  }
})
.catch(err => {
  console.log(err)
})


// 监听服务
server.listen(3000, () => {
  console.log('服务器已经启动了\n http://localhost:3000')
})