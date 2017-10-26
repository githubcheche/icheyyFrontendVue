import Vue from 'vue'
import store from '../store'
import Router from 'vue-router'
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

const Common = resolve => require(['../views/Common'], resolve)//懒加载
const Login = resolve => require(['../views/account/Login'], resolve) //懒加载
const Register = resolve => require(['../views/account/Register'], resolve)

const ArticleIndex = resolve => require(['../views/article/Index'], resolve)
const ArticleShow = resolve => require(['../views/article/Show'], resolve)
const ArticleCreate = resolve => require(['../views/article/Create'], resolve)
const ArticleEdit = resolve => require(['../views/article/Edit'], resolve)

const About = resolve => require(['../views/other/About'], resolve)
const Payment = resolve => require(['../views/other/Payment'], resolve)
const Error404 = resolve => require(['../views/error/404'], resolve)

Vue.use(Router)

const router = new Router({
  // mode: 'history',
  routes: [
    {
      path: '/user/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/user/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/',
      name: 'Common',
      component: Common,
      children: [
        {
          path: '/',
          component: ArticleIndex,
        },
        {
          path: '/articles',
          name: 'ArticleIndex',
          component: ArticleIndex
        },
        {
          path: '/articles/:slug',
          name: 'ArticleShow',
          component: ArticleShow
        },
        {
          path: '/article/create',
          meta: {
            requireAuth: true//需要检查用户是否登录，详见下面record => record.meta.requireAuth
          },
          component: ArticleCreate
        },
        {
          path: '/articles/:slug/edit',
          name: 'ArticleEdit',
          meta: {
            requireAuth: true
          },
          component: ArticleEdit
        },
        {
          path: '/about',
          name: 'About',
          component: About
        },
        {
          path: '/payment',
          name: 'Payment',
          component: Payment
        },
      ]
    },
    {
      path: '*',
      component: Error404,
    }
  ]
});

/**
 * 路由加载前回调
 */
router.beforeEach((to, from, next) => {
  NProgress.start();//进度条开启
  // to.matched数组，包含当前匹配的路径中所包含的所有片段所对应的配置参数对象。
  // some 检测数组
  if (to.matched.some(record => record.meta.requireAuth)) {
    //需要检查用户是否登录
    const auth = store.state.account.auth;//获取本地存储用户
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (!auth.check()) {
      //如果用户没登录
      next({
        path: '/user/login',
        query: {redirect_url: to.fullPath}
      });
      return;
    }
  }
  next();
});

/**
 * 路由后置钩子
 */
router.afterEach(() => {
  NProgress.done();//进度条停止
});

export default router;
