import { createStore } from 'vuex'

export default createStore({
  state: {
    pubId: null
  },
  mutations: {
    SET_AUTH_DATA(state, payload) {
      console.log(payload);
      state.userId = payload.isLoggedIn.userId;
      state.token = payload.isLoggedIn.token;
      console.log(state.userId);
      console.log(state.token);
    },
    SET_CURRENT_PUB_ID(state, pubId) {
      state.pubId = pubId;
    }
  },
  actions: {
    setAuthData(context, data) {
      try {
        context.commit('SET_AUTH_DATA', data);
        console.log(data);
        return "done";
      } catch {
        return "failed";
      }
      
    },
    setCurrentPubId(context, pubId) {
      try {
        context.commit('SET_CURRENT_PUB_ID', pubId);
        return "done";
      } catch {
        return "failed"
      }
    }
  },
  modules: {
  }
})
