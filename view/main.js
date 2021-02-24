import Vue from 'vue'
import App from './App'
import store from 'store/index.js'
import vant from 'vant'

Vue.config.productionTip = false

App.mpType = 'app'
Vue.use(vant)
const app = new Vue({
    ...App,
		store
})
app.$mount()
