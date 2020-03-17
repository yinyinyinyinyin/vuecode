import Vue from 'vue'
import Vuex from 'vuex'
/*
vuex流程:在组件中dispatch 动作到 actions中,在 actions里面 commit 状态到 mutations中,在mutations中
修改store中的state值,值修改后会自动触发render重新渲染页面;

actions和mutations的区别:actions 可以做异步操作,mutations 只能做同步操作

vuex什么时候使用:一般比较大型的项目,或者需要很多组件间传参的项目,多个组件共用同样的状态时我们需要使用vuex

vuex工具方法:
mapState 获取state状态 computed
mapMutations 操作mutations的 methods
mapActions   操作actions的   methods
mapGetters   操作getters的   computed

vuex和缓存的区别: vuex 刷新时数据会重置,缓存不会;
vuex状态如果发生变化,会自动触发渲染;缓存如果发生变化需要手动更新状态
*/
Vue.use(Vuex)
//将 app的分支引入进来
import app from './modules/app';
import getters from './getters';

/*
modules分成两个模块:第一个模块 做登录状态的user;第二个模块 做这款app的组件间传参的模块,例如:左侧菜单;
第三个模块:将所有获取的数据保存在vuex中
*/
export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  getters,
  modules: {
	  app
  }
})
