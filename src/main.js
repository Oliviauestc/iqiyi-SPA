import Vue from 'vue'
import App from './App.vue'
import VueRouter from "vue-router";
 
//开启debug模式
// Vue.config.debug = true;
 
Vue.use(VueRouter);
 
// 定义组件, 也可以像教程之前教的方法从别的文件引入
import index from './component/index.vue'
import top from './component/top.vue'
import so from './component/so.vue'
 
// 创建一个路由器实例
// 并且配置路由规则
const router = new VueRouter({
  mode: 'history',
  base: __dirname,
  routes: [
  	{
      path: '/',
      component: index
    },
    {
      path: '/top',
      component: top
    },
    {
      path: '/so',
      component: so
    }
  ]
})

const app = new Vue({
  router: router,
  render: h => h(App)
}).$mount('#app')