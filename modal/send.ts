export const _200 = function(result: any, msg:string = '获取' , text = 'ok') {
  return { status: '200', text, msg: `${msg}成功！`, result }
} // 成功

export const _304 = function(msg = '数据', text = 'repeat') {
  return {status: '304', text, msg: `该${msg}已存在！`}
} // 重复

export const _500 = function(msg = '服务器错误！', text='error') {
  return {status: '500', text, msg}
} // 服务器出错

export const _400 = function (msg:string, text = 'error') {
  return { status: '400', text, msg:`${msg}错误！` }
} // 服务器出错

export const _404 = function(msg = '该数据不存在！',text = 'not found') {
  return {status: '404', text, msg}
} // 未找到