
import Vue from 'vue'
import App from './App'
import router from './router'

import "@/common/css/index.scss"
import 'lib-flexible/flexible.js'

// 引入core.config.js
import core from "@/core/core.config"
Vue.use(core);
Vue.config.productionTip = false

//引入vuex数据仓库
import store from "@/core/store/index"



/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
