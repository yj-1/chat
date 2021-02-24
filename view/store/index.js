import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		index: 0,
		chat: {
			name: '测试'
		}
	},
	mutations: {
		setState(state, repold) {
			state[repold.key] = repold.value
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