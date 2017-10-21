import Vue from 'vue'
import Router from 'vue-router'

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

export default new Router({
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
                        requireAuth: true
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
})
