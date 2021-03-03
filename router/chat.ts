import { Request, Router } from "express"
import auth from "../module/auth"
import { PrivateChat } from "../mongo/user"

const route = Router()

export interface TS_Req extends Request {
  user?: {
    id: string,
    username: string,
    exp: number,
    iat: number
  }
}

route.post('/msg', auth, (req: TS_Req, res) => {
  const { id, username } = req.user
  const { friendId } = req.body
  PrivateChat.findOne({userId: id,friendId})
    .then(data => {
      console.log(data)
    })
    .catch(err => {
      console.log(err)
    })
})

export default route