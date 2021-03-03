import Vue from 'vue'
import App from './App'
import store from 'store/index.js'
// import  'https://lib.baomitu.com/socket.io/3.1.1/socket.io.min.js'
import vant from 'vant'
import {
	io
} from 'socket.io-client'

Vue.config.productionTip = false
Vue.prototype.socket = undefined
Vue.prototype.io = io

Vue.prototype.setSocket = (token, url = 'http://127.0.0.1:3000') => Vue.prototype.socket = Vue.prototype.io(url, {
	transports: ['websocket'],
	autoConnect: true,
	auth: {
		token
	}
})

App.mpType = 'app'

Vue.use(vant)
const app = new Vue({
	...App,
	store
})
app.$mount()
