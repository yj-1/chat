"use strict";
import { createTransport, SendMailOptions } from 'nodemailer'
import { Options, from } from './config';

const email = createTransport(Options) // Options ==> { service:'qq', auth:{ user:'开启POP3的qq邮箱',pass: '授权码' } }
export const sendMail = async function(options:SendMailOptions) {
  const { to } = options
  if(!to || typeof to === 'string') {
    return Promise.reject({ status: '400', statusText: '缺少参数to', msg: '发送失败！' })
  }
  if(!to) {
    return false
  }
  try {
    return email.sendMail(Object.assign(options, { from }))
              .then(data => {
                return Promise.resolve({status:'200',statusText:'ok', msg:'发送成功！'})
              })
              .catch(err => {
                return Promise.reject({status: '404', statusText:'发送失败!', msg: '发送失败！'})
              })
  } catch (err) {
    return {err,msg: '服务端错误'}
  }
}
// sendMail({
//   // to: 'xxx@qq.com',
//   text: '测试'
// }).then(data => {
//   console.log(data)
// })
// .catch(err => {
//   console.log(err)
// })
// export const sendMsg = async function(options:SendMailOptions) {
//   return await sendMail(Object.assign(options, {from}))
// }

/* 使用async/await将运行时内部的异步同步化
async function sendEmail(options: SendMailOptions) {
  const transporter = createTransport(Options) // 创建传输对象
  return transporter.sendMail(options) // 发送邮箱
 // 发送邮箱
}
sendEmail({
  from: 发送者邮箱,
  to: 接收者邮箱,
  subject: 标题,
  text: 内容,
  html: html格式的文本,不可整个为html的内容,qq邮箱会处理这个html，干掉有些多余的东西,只保留body内容，
  attchments: [
    {
      filename: 该附件的文件名,
      content: 附件内容,
      path: 文件路径,
      href: 文件的url
    contentType: 附件内容的类型，默认由文件生成,
      cid：在html消息源中使用嵌入式图像的可选内容ID,
      raw: 覆盖mime
    } // 附件  可以参考 https://nodemailer.com/message/attachments/
  ]
}) // 参数可以参考 https://nodemailer.com/message
.then(data=> {
  console.log('发送成功',data)
}).catch(console.error);
sendEmail({
  from: 'xxx@qq.com',
  to: 'xxx@qq.com',
  subject: '测试'
})
.then(data => {
  console.log('发送成功！',data)
})
.catch(err => {
  console.log('发送失败！')
}) */

export default email