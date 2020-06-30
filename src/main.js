// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import iView from 'iview';
import 'iview/dist/styles/iview.css';
import App from './App';
import routes from './routes';
import VueRouter from 'vue-router';
import Vuex from 'vuex';
import i18n from '@/locale'
import store from './vuex/store';
import OperatorUtils from './utils/OperatorUtils';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import './styles/index.scss';
import config from './config';
import http from './utils/HttpUtils';
import { canTurnTo,getTitleOrNameByName } from './utils/util'
import './styles/index.less';
import './styles/color.less'
import importDirective from '@/directive'
// import mock from './mock/index.js';

iView.Message.config({duration: 2});
iView.Notice.config({top: 55});
Vue.config.productionTip = false;
Vue.use(VueRouter);
Vue.use(Vuex);
Vue.use(iView, {
  i18n: (key, value) => i18n.t(key, value)
});
Vue.use(http);
importDirective(Vue);

window.OperatorUtils = OperatorUtils;
const router = new VueRouter({
  routes
});

router.beforeEach((to, from, next) => {
  NProgress.start(); // 开启Progress
  //console.log(to.path);

  if (OperatorUtils.isLogined(next)) { // 判断是否有token
    if (to.path === '/login') {
      next({path: '/'});
      NProgress.done();
    }
    else if (to.path === '/') {
      let main = OperatorUtils.getMain();
      next(main);
      NProgress.done();
    }
    else {
      if (canTurnTo(to.name)) {
    	  next() // 有权限，可访问
      } else{
    	  next({ replace: true, name: '404' }) // 无权限，重定向到404页面
      }
      NProgress.done();
    }
  } else {
    if (config.whiteList.indexOf(to.path) !== -1) { // 在免登录白名单，直接进入
      next();
    } else {
      next('/login'); // 否则全部重定向到登录页
      NProgress.done(); // 在hash模式下 改变手动改变hash 重定向回来 不会触发afterEach 暂时hack方案 ps：history模式下无问题，可删除该行！
    }
  }
});

router.afterEach(transition => {
  store.dispatch('showLoading', false);
  let title = getTitleOrNameByName(transition.name);
  if(title==='index'){
	  title='首页';
  }else if(title==='404'){
	  title='找不到页面';
  }
  document.title = config.name + ' - ' + title;
  NProgress.done();
});


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  i18n,
  template: '<App/>',
  components: {App}
});
