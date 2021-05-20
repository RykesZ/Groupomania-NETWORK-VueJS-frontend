import { createStore } from 'vuex'

export default createStore({
  state: {
    userId: "",
    token: "",
    test: "oui"
  },
  mutations: {
    SET_AUTH_DATA(state, payload) {
      console.log(payload);
      state.userId = payload.isLoggedIn.userId;
      state.token = payload.isLoggedIn.token;
      console.log(state.userId);
      console.log(state.token);
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
      
    }
  },
  modules: {
  }
})
