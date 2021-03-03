import { User } from './index'

export const toggleStatus = (id:string, status:number = 0) => {
 return User.updateOne({_id:id},{online: status})
}