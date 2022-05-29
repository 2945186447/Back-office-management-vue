// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
//导入富文本
import VueQuillEditor from 'vue-quill-editor'

import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import Nprogress from 'nprogress'
import 'nprogress/nprogress.css'
Vue.use(VueQuillEditor)

//拦截axios请求加上token
import axios from 'axios'
axios.defaults.baseURL = 'http://106.55.14.142:8888/api/private/v1/'
axios.interceptors.request.use(config => {
    //实现顶部进度条 展示
    Nprogress.start()
    config.headers.Authorization = window.sessionStorage.getItem('token')
    return config
})

axios.interceptors.response.use(config => {
    //在respond 拦截器中隐藏进度条
    Nprogress.done()
    return config
})


import TreeTable from 'vue-table-with-tree-grid'
Vue.component('tree-table', TreeTable)

//全局过滤器改变时间格式
Vue.filter('dataFormat', function(date) {
    const dt = new Date(date)
    const y = dt.getFullYear()
    const m = (dt.getMonth() + 1 + '').padStart(2, '0')
    const d = (dt.getDate() + '').padStart(2, '0')

    const hh = (dt.getHours() + '').padStart(2, '0')
    const mm = (dt.getMinutes() + '').padStart(2, '0')
    const ss = (dt.getSeconds() + 1 + '').padStart(2, '0')

    return `${y}-${m}-${d} ${hh}-${mm}-${ss}`
})






//全局引入element-ui
import './assets/css/global.css'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

//vuex
import store from './store/index'

Vue.config.productionTip = false
    //设置路由守卫(前置)
router.beforeResolve((to, from, next) => {
    const token = window.sessionStorage.getItem('token')

    if (!token && to.name !== 'login') {

        next({ name: 'login' })
    } else if (token && to.name === 'login') {
        next({ name: 'Main' })
    } else {
        next()
    }
})



/* eslint-disable no-new */
new Vue({
    store,
    el: '#app',
    router: router,
    components: { App },
    template: '<App/>',
    beforeCreate() {
        Vue.prototype.$http = axios
        Vue.prototype.$bus = this
    }
})