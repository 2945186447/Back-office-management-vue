import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const state = {
    isCollapse: true,
    dialogVisible: false,
    breadCrumbList: [
        { path: '/home', name: "首页" },
    ]
}


export default new Vuex.Store({
    state

})