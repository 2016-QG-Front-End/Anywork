import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'


Vue.use(VueRouter)

const router = new VueRouter({
 // mode: 'history',
  mode: 'hash',
  linkActiveClass: 'u-link--Active',
  base: '',
  routes,
})

/*router.beforeEach((to, from, next) => {
  let titleStr = ''
  if (to.name !== 'Home') {
    for (let i = to.matched.length - 1; i >= 0; i--) {
      titleStr += `${to.matched[i].meta.title} - `
    }
  }
  titleStr += title
  document.title = titleStr
  next()
})
*/
export default router
