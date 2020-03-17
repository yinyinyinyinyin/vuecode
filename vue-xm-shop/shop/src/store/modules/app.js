//管理项目的组件间传值的状态
//左侧菜单的状态
const app={
	state:{//状态的初始值
		sidebar:{
			opened:false  //左侧菜单是打开状态
		}
	},
	mutations:{//修改状态值
		TOGGLE_SIDEBAR:state=>{
			state.sidebar.opened = !state.sidebar.opened;
		}
	},
	actions:{//动作 ,调用 mutations
		ToggleSideBar:({commit})=>{
			commit('TOGGLE_SIDEBAR');
		}
	}
}

export default app;