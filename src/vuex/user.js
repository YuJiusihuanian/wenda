import Vue from 'vue';
import Vuex from 'vuex'
Vue.use(Vuex);

const userStore = new Vuex.Store({
  strict: true,
  state:{
    userInfo:{}
  },
  getters:{
    getUserInfo(state){
      return state.userInfo;
    }
  },
  mutations:{
    setUserInfo(state,userInfo){
      state.userInfo = userInfo;
    },
    clearUserInfo(state){
      state.userInfo = '';
    }
  },
  actions:{
    //ES6语法，调用mutation
    setUserInfo({ commit },user){
      commit('setUserInfo', user);
    }
  }
})

export default userStore;
