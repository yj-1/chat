import io from 'socket.io-client'
import { Toast } from 'vant'

const url = 'http://127.0.0.1:3000'

export let socket = undefined
console.log(io.prototype.on)
export const connect = (url = url, options) => { // socket连接方法
	let option = null 
	if(options) {
		option = options
	} else {
	  const	token = uni.getStorageSync('token')
		option = {
			transports: ['websocket'],
			autoConnect: true,
			auth: {
				token
			}
		}
	}
	const ws = io(url, option) 
	ws.on('connect_error', data => {
		console.log(data,234)
		Toast('断开连接！')
		ws.close()
	})
	.on('disconnect', data => {
		console.log(data,234345)
		Toast('断开连接！')
		ws.close()
	})
	return io(url, option)
}
export const t = io
export default {
	connect,socket,t
}
