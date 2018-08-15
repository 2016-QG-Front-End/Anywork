import Vue from 'vue'
import App from './App'
import iView from 'iview'
import './style/main.less'
import store from './store/'
Vue.use(iView)
new Vue({
  el: '#app',
  store,
  template: '<App/>',
  components: { App }
})