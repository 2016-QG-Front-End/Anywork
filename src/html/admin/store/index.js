import Vue from 'vue'
import Vuex from 'vuex'

import user from './modules/user'
import organization from './modules/organization'
import paper from './modules/paper'
import student from './modules/student'

Vue.use(Vuex)

export default new Vuex.Store({
	modules: {
		user,
		organization,
		paper,
		student
	}
})