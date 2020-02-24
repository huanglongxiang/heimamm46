// 导入vuex 
import Vuex from 'vuex'
// 导入vue
import Vue from 'vue'
// 在vue中使用vuex
Vue.use(Vuex);
// 初始化vuex
const store = new Vuex.Store({
    state:{
        userlogin:{},
        role: ""
    },
    mutations:{
        // 改变 userlogin
        changeUserLogin(state, userlogin) {
            state.userlogin = userlogin;
        },
        // 改变 角色
        changRole(state, newRole) {
            state.role = newRole
        }
    }
})
// 暴露初始化对象
export default store;