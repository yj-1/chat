import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		index: 0,
		chat: {
			name: '测试'
		},
		user: {
			username: ''
		},
		list: []
	},
	mutations: {
		setState(state, payload) { // 设置state键值对
			state[payload.key] = payload.value
		},
		setUser(state, user) { // 设置user对象
			console.log(23423)
			state.user = user
		},
		setUserKey(state, payload) { // 设置user键值对
			state.user[payload.key] = payload.value
		},
		list(state, payload) { // 设置首页消息列表
			const { key, value } = payload
			if(key) {
				state.list[key](value)
			} else {
				state.list = value
			}
		},
		chat(state, val) {
			
		}
	},
	actions: {
		
	},
	getters: {
		
	}
})

export default store