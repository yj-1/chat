import { Router } from 'express'
import { findUser } from '../mongo/user/query'
const route = Router()

route.get('/', (req, res) => {
  console.log(req.params)
  findUser(res)
})

export default route