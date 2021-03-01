// 导包 开始
import * as express from 'express'
import { createServer } from 'http'
import { Server } from 'socket.io'
import { urlencoded, json } from 'body-parser'
// import mogno from './mongo/index'
import mongo from './mongo/index'
import getRoutes from './module/setRoute'
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
  pingTimeout: 5000
}) // 启动socket.io 模块

io.on('connection', (socket) => {
  console.log('有用户连接')
  socket.on('r_message', (data) => { // 用户连接
    log(data)
    // data.id = socket.immediate
    io.emit('s_join', data)
  })
  .on('r_join', (data) => { // 加入聊天
    log(data)
    io.emit('s_person', data)
  })
  .on('r_say', (data:{name: string, msg: string}) => { // 发送消息
    log(data)
    io.emit('s_say', data)
  })
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
// app.use('/register', Register)
// app.use('/getUser', User)
// app.use('/login', Login)


// 监听服务
server.listen(3000, () => {
  console.log('服务器已经启动了\n http://localhost:3000')
})