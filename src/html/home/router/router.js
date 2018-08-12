import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'

const title = 'Czs'

Vue.use(VueRouter)

/* eslint-disable no-new */
const router = new VueRouter({
 // mode: 'history',
  mode: 'hash',
  linkActiveClass: 'u-link--Active',
  base: '',
  routes,
})


export default router
