import Vue from 'vue';
import Vuex from 'vuex'
Vue.use(Vuex);

const userStore = new Vue.Store({
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
    }
  },
  action:{
    //ES6语法，调用mutation
    srtUserInfo({ commit },user){
      commit('setUserInfo',user);
    }
  }
})
