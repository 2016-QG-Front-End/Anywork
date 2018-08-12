import Vue from 'vue'
import App from './App'
import iView from 'iview'
import './style/main.less'
Vue.use(iView)
new Vue({
  el: '#app',
  template: '<App/>',
  components: { App }
})