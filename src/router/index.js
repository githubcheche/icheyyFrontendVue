import Vue from 'vue'
import store from '../store'
import Router from 'vue-router'
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

const Common = resolve => require(['../views/Common'], resolve)//懒加载
const Login = resolve => require(['../views/account/Login'], resolve) //懒加载
const Register = resolve => require(['../views/account/Register'], resolve)
const VerifyEmail = resolve => require(['../views/account/VerifyEmail'], resolve)


const ArticleIndex = resolve => require(['../views/article/Index'], resolve)
const ArticleShow = resolve => require(['../views/article/Show'], resolve)
const ArticleCreate = resolve => require(['../views/article/Create'], resolve)
const ArticleEdit = resolve => require(['../views/article/Edit'], resolve)

const About = resolve => require(['../views/other/About'], resolve)
const Payment = resolve => require(['../views/other/Payment'], resolve)
const Error404 = resolve => require(['../views/error/404'], resolve)

const UserInfo = resolve => require(['../views/account/UserInfo'], resolve)
const UserArticles = resolve => require(['../views/account/UserArticles'], resolve)
const UserReplies = resolve => require(['../views/account/UserReplies'], resolve)
const UserLikesUsers = resolve => require(['../views/account/UserLikesUsers'], resolve)
const UserLikesArticles = resolve => require(['../views/account/UserLikesArticles'], resolve)

const EditCommon = resolve => require(['../views/editUserInfo/Common'], resolve)
const EditAvatar = resolve => require(['../views/editUserInfo/EditAvatar'], resolve)
const EditPassword = resolve => require(['../views/editUserInfo/EditPassword'], resolve)
const EditUserInfo = resolve => require(['../views/editUserInfo/EditUserInfo'], resolve)

const Search = resolve => require(['../views/Search'], resolve)


Vue.use(Router)

const router = new Router({
  // mode: 'history',
  routes: [
    {
      path: '/user/login',//登入
      name: 'Login',
      component: Login,
    },
    {
      path: '/user/register',//注册
      name: 'Register',
      component: Register
    },
    {
      path: '/verify_email/:slug',
      name: 'VerifyEmail',
      component: VerifyEmail// 验证邮箱
    },
    {
      path: '/',
      name: 'Common',
      component: Common,// Common模板组件
      children: [
        {
          path: '/',
          redirect: {name: 'ArticleIndex'}//重定向到文章列表
        },
        {
          path: '/articles',
          name: 'ArticleIndex',
          component: ArticleIndex//文章列表
        },
        {
          path: '/articles/:slug',
          name: 'ArticleShow',
          component: ArticleShow//文章详情
        },
        {
          path: '/article/create',
          meta: {
            requireAuth: true//需要检查用户是否登录，详见下面record => record.meta.requireAuth
          },
          component: ArticleCreate//创建文章
        },
        {
          path: '/articles/:slug/edit',
          name: 'ArticleEdit',
          meta: {
            requireAuth: true
          },
          component: ArticleEdit//编辑文章
        },
        {
          path: '/users/:slug',
          component: UserInfo,// 用户个人信息框架
          children: [
            {
              path: '/',
              component: UserArticles//用户所有文章
            },
            {
              path: 'articles',
              name: 'UserArticles',
              component: UserArticles//用户所有文章
            },
            {
              path: 'replies',
              name: 'UserReplies',
              component: UserReplies//用户所有评论
            },
            {
              path: 'likes_users',
              name: 'UserLikesUsers',
              component: UserLikesUsers//用户所有关注的用户
            },
            {
              path: 'likes_articles',
              name: 'UserLikesArticles',
              component: UserLikesArticles//用户所有点赞的文章
            }
          ]
        },
        {
          path: 'users/:slug',
          component: EditCommon,// 用户编辑界面框架
          children: [
            {
              path: 'edit',
              name: 'EditUserInfo',
              component: EditUserInfo//用户信息编辑
            },
            {
              path: 'edit_password',
              name: 'EditPassword',
              component: EditPassword//用户密码修改
            },
            {
              path: 'edit_avatar',
              name: 'EditAvatar',
              component: EditAvatar//用户头像修改
            },
          ]
        },
        {
          path: 'search',
          name: 'Search',
          component: Search,// 搜索结果展示
        },
        {
          path: '/about',
          name: 'About',
          component: About//关于
        },
        {
          path: '/payment',
          name: 'Payment',
          component: Payment//打赏
        },
      ]
    },
    {
      path: '*',
      component: Error404,//错误页面
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
