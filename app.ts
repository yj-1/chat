// 导包 开始
import * as express from 'express'
import { createServer } from 'http'
import { Server } from 'socket.io'
import { urlencoded, json } from 'body-parser'

// 定义变量
const app = express()
const server = createServer(app)
// 导包 结束

app.all('*', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*') // 允许访问的地址
  res.header('Access-Control-Allow-Headers','X-Requested-with')
  res.header('Access-Control-Allow-Headers', 'Content-Type')
  res.header('Access-Control-Allow-Methods', 'GET,POST,UPDATE,DELETE') // 允许请求类型
  res.header('Access-Control-Allow-Credentials', 'true')
  res.header('X-Powered-By', '3.2.1')
  next()
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
  socket.on('sendMessage', (data) => {
    console.log(234,data)
    // data.id = socket.immediate
    io.emit('receiveMessage', data)
  })
  .on('say', (data) => {
    console.log(data)
    io.emit('f', data)
  })
})

app.get('/getUser', (req, res) => {
  // res.send('234')
  res.sendFile('./public/index.html')
})



// 监听服务
server.listen(3000, () => {
  console.log('服务器已经启动了')
})