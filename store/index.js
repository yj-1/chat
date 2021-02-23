import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		index: 0
	},
	mutations: {
		setState(state, repold) {
			state[repold.key] = repold.value
		}
	},
	actions: {
		
	},
	getters: {
		
	}
})

export default store