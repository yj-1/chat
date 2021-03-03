import { NextFunction, Request, Response } from "express"
import { verifyToken } from "../config/token"
import { _404 } from "../modal/send"
import { TS_Req } from "../router/chat"
const auth = function(req: TS_Req, res:Response, next:NextFunction) {
  const authorization = req.headers?.authorization
  if(authorization?.length < 30) {
    return res.json({status: '400', msg:'缺少token,无权限访问！', statusText:'缺少token!'})
  }
  const json = verifyToken(authorization)
  if(!json) {
    return res.json(_404('token'))
  } else {
    req.user = json
    next()
  }
}

export default auth
