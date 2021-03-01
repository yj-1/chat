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
		}
	},
	mutations: {
		setState(state, payload) {
			state[payload.key] = payload.value
		},
		setUser(state, user) {
			console.log(23423)
			state.user = user
		},
		setUserKey(state, payload) {
			state.user[payload.key] = payload.value
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