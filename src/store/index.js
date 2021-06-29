import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    idToken: null
    ,userName: 'sayoko'
    ,localId:'testLocalId'
  },
  getters:{
    idToken: state => state.idToken,
    userName: state => state.userName,
    localId: state => state.localId
  },
  mutations: {
    updateIdToken(state,idToken){
      state.idToken = idToken;
    },
    updateUserName(state,userName){
      state.userName = userName;
    },
    updateLocalId(state,localId){
      state.localId = localId;
    }
  },
  actions: {
  },
  modules: {
  }
})
