import { getUserInfo, setUserInfo } from '@/utils/storage'
export default {
  namespaced: true,
  state () {
    return {
      userInfo: getUserInfo()
    }
  },
  mutations: {
    setUserInfo (state, obj) {
      state.userInfo = obj
      setUserInfo(obj)
    }
  },
  actions: {
    logout (content) {
      content.commit('setUserInfo', [])
      content.commit('cart/setCartList', [], { root: true })
    }
  },
  getters: {

  }
}
