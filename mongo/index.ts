import { connect } from 'mongoose'
import cfg from '../config/db'

export default async function() {

return await connect(cfg.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
  }).then(data => {
    console.log('连接数据库成功')
  }).catch(err => {
    console.log(2,err)
  })
}