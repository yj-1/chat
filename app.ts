// 导包 开始
import * as express from 'express'
import { createServer } from 'http'
import { Server, Socket } from 'socket.io'
import { urlencoded, json } from 'body-parser'
// import mogno from './mongo/index'
import mongo from './mongo/index'
import getRoutes from './module/setRoute'
import socket from './module/socket'
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
app.use(socket(server))
// 使用中间件 结束

// 初始化

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