import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import store from './store/'
import router from './router/router.js'
import iView from 'iview'
import 'assets/my-theme/admin.less'
import 'src/utils/test.js'

Vue.use(iView)

const bus = new Vue()

Vue.prototype.$bus = bus

new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: { App }
})

