import { User } from './index'

export const toggleStatus = (id:string, status:number = 2) => {
  User.updateOne({_id:id},{online: status})
    .then(data => {
      console.log(data)
    })
    .catch(err => {
      console.log(err)
    })
}