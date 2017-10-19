import Vue from 'vue'
import Router from 'vue-router'

const Common = resolve => require(['../views/Common'], resolve)//懒加载


Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            name: 'Common',
            component: Common,
        }
    ]
})
