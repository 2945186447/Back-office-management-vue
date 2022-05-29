import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router)

const routes = [

    {
        path: '/',
        redirect: '/login',
        component: () =>
            import ('../components/login')
    }, {
        path: '/Main',
        name: 'Main',
        redirect: '/home',
        component: () =>
            import ('../view/Main'),
        children: [{
                path: '/home',
                name: 'home',
                component: () =>
                    import ('../view/Home')
            }, {
                path: '/users',
                name: 'users',
                component: () =>
                    import ('../view/users')
            }, {
                path: '/roles',
                name: 'roles',
                component: () =>
                    import ('../view/roleList')
            },
            {
                path: '/rights',
                name: 'rights',
                component: () =>
                    import ('../view/roleList/rights.vue')
            },
            {
                path: '/categories',
                name: 'goodsClassify',
                component: () =>
                    import ('../view/goodsManage/goodsClassify.vue')
            },
            {
                path: '/goods',
                name: 'goodsList',
                component: () =>
                    import ('../view/goodsManage/goodsList.vue')
            },
            {
                path: '/addGoods',
                name: 'addGoods',
                component: () =>
                    import ('../view/goodsManage/addGoods.vue')
            },
            {
                path: '/params',
                name: 'classifyParam',
                component: () =>
                    import ('../view/goodsManage/classifyParam.vue')
            },
            {
                path: '/orders',
                name: 'orderList',
                component: () =>
                    import ('../view/orderManagement/orderList.vue')
            },
            {
                path: '/reports',
                name: 'dataReport',
                component: () =>
                    import ('../view/Statistics/dataReport.vue')
            }
        ]

    },
    {
        path: '/login',
        name: 'login',
        component: () =>
            import ('../components/login'),
    },


]



export default new Router({

    routes: routes,
    mode: 'hash',

})