import { sign, verify } from 'jsonwebtoken'

const secret = 'TEST-APP'

export const createToken = (json:object, time=30*60000) => { // 创建token
  return sign({ ...json, exp: Math.floor(Date.now() / 1000) + time}, secret)
}
type TS_token = {
  id: string,
  username: string,
  exp: number,
  iat: number
}
export const verifyToken = (token:string):TS_token => { // 验证token
let result = undefined
 verify(token, secret, (err, json) => {
   if(err) { return result = undefined }
   return result = json
 })
 return result
}

export default {
  key: ''
}