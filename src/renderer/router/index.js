import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [

    //主页
    {
      path: '/',
      name: 'home',
      component: require('@/view/home').default
    },
    //直播界面
    {
      path: '/live',
      name: 'live',
      component: require('@/view/live/live').default,
    },
    //404界面
    {
      path: '*',
      redirect: '/404'
    }
  ]
})
