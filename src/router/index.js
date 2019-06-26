import Vue from 'vue'
import Router from 'vue-router'
import api from '@/core/api/index'
// console.log(global.getParam())


Vue.use(Router)

const router = new Router({
  routes: [{
    path: '/',
    name: '/',
    component: resolve => require(['@/components/home'], resolve),
    redirect: "home_page",
    children: [{
        path: 'home_page',
        name: 'home_page',
        meta:{
          keepAlive:false,
          Msea:111
        },
        component: resolve => require(['@/components/main/home_page'], resolve)
      },
      {
        path: 'classify',
        name: 'classify',
        meta:{
          keepAlive:false,
        },
        component: resolve => require(['@/components/main/classify'], resolve)
      },
      {
        path: 'car',
        name: 'car',
        component: resolve => require(['@/components/main/car'], resolve),
      },
      {
        path: 'msea/:id',
        name: 'msea',
        component: resolve => require(['@/components/main/msea'], resolve),
      },
      {
        path: 'info',
        name: 'info',
        component: resolve => require(['@/components/main/info'], resolve),

      },
      //详情页
      {
        path: 'show',
        name: 'show',
        component: resolve => require(['@/components/main/show'], resolve),
      },
      //客户信息页
      {
        path: 'userInfo',
        name: 'userInfo',
        component: resolve => require(['@/components/main/userInfo'], resolve)
      }
    ]
  }]
});



export default router;
