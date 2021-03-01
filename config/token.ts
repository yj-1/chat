import { sign, verify } from 'jsonwebtoken'

const secret = 'TEST-APP'

export const createToken = (json:object, time=30*60) => {
  return sign({ ...json, exp: Math.floor(Date.now() / 1000) + time}, secret)
}

export const verifyToken = (token:string) => {
 return verify(token, secret, (err, json) => {
   if(err) { return false }
   return json
 })
}

export default {
  key: ''
}