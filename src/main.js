import "babel-polyfill"
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import Util from './libs/util'
import Filters from './libs/filters'
import './registerServiceWorker'

router.beforeEach((to, from, next) => {
  /* 路由发生变化修改页面title */
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next();
});

Filters(Vue);
Vue.config.productionTip = false;
Vue.use(ElementUI, { size: 'small' });
Vue.use(Util);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
