import Vue from 'vue'
import App from './App'
import store from 'store/index.js'
// import  'https://lib.baomitu.com/socket.io/3.1.1/socket.io.min.js'
import vant from 'vant'
import { connect, io } from 'socket.io-client'

const socket = io('http://192.168.0.100:3000',{
  transports: ['websocket']
})
socket.on('connect', () => {
	console.log('连接成功！')
	socket.emit("r_message", navigator.userAgent);
})

Vue.config.productionTip = false

App.mpType = 'app'
Vue.use(vant)
const app = new Vue({
    ...App,
		store
})
app.$mount()
