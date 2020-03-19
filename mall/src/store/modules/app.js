import Cookies from 'js-cookie'
//!+hideNotice 逻辑非运算，当数字为 0 或者 NaN 时返回 true。
const app = {
  state: {
    sidebar: {
      opened: true//!+Cookies.get('sidebarStatus')
    }
  },
  mutations: {
    TOGGLE_SIDEBAR: state => {
      // if (state.sidebar.opened) {
      //   Cookies.set('sidebarStatus', 1)
      // } else {
      //   Cookies.set('sidebarStatus', 0)
      // }
      state.sidebar.opened = !state.sidebar.opened
    }
  },
  actions: {
    ToggleSideBar: ({ commit }) => {
      commit('TOGGLE_SIDEBAR')
    }
  }
}
export default app
