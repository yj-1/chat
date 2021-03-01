import { sign, verify } from 'jsonwebtoken'

const secret = 'TEST-APP'

export const createToken = (json:object, time=30*60) => {
  return sign({ ...json, exp: Math.floor(Date.now() / 1000) + time}, secret)
}

export const verifyToken = (token:string):boolean|object => {
let result = undefined
 verify(token, secret, (err, json) => {
   if(err) { return result = false }
   return result = json
 })
 return result
}

export default {
  key: ''
}