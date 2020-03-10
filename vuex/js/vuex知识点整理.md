## vuex定义：
	-- vuex做状态管理的工具，将项目中多个组件调用的状态统一管理在一个状态库中，供程序员使用
## vuex什么项目什么时候使用
	-- 大中型项目使用，如果你的项目中涉及到跨组件传参，多组件共用同一个状态时可以使用 vuex
	
## vuex的使用步骤
	-- 1.创建vuex对象
	var store = new Vuex.store({
		//2.初始化，给 state中的状态属性赋值
		state:{
			count:0
		}
	})
	
	-- 3.注册
	new Vue({
		el:"#app",
		store //注册
	})
	
	-- 4.在组件或根节点获取store中的state的状态值
		-- 一般在计算属性中获取状态值
		computed:{
			count(){
				return this.$store.state.count
			}
		}
	
	-- 5.将第4步的内容改写为mapState的写法
		//定义 mapState
		var mapState = Vuex.mapState;
		computed:{
			...mapState({
				count:state=>state.count
			})
		}
		
	-- 6.	修改state中的状态值
		--a.首先需要定义 mutations
		var store = new Vuex.store({
			//2.初始化，给 state中的状态属性赋值
			state:{
				count:0
			},
			mutations:{
				//参数是提交mutation时store中的旧的状态值
				changeCount(state){
					state.count++;
				}
			}
		})
		
		--b.在组件的函数中调用 mutation
		methods:{
			changeCountFun:function(){
				//提交mutation
				this.$store.commit('changeCount');
			}
		}
	--7. 使用载荷
	
	var store = new Vuex.store({
		//2.初始化，给 state中的状态属性赋值
		state:{
			count:0
		},
		mutations:{
			//参数是提交mutation时store中的旧的状态值
			changeCount(state,n){
				state.count += n;
			}
		}
	})
	
	--b.在组件的函数中调用 mutation
	methods:{
		changeCountFun:function(){
			//提交mutation
			//this.$store.commit('changeCount',5);	
		}
	}
	
	--8.传参使用对象的形式
		var store = new Vuex.store({
			//2.初始化，给 state中的状态属性赋值
			state:{
				count:0
			},
			mutations:{
				//参数是提交mutation时store中的旧的状态值
				changeCount(state,num){
					state.count += num.n;
				}
			}
		})
		
		--b.在组件的函数中调用 mutation
		methods:{
			changeCountFun:function(){
				//提交mutation
				this.$store.commit({
					type:'changeCount',
					n:5
				})
				
			}
		}
	
	
	--9.常量的使用
		-- a.定义常量
		const CHANGE_NUM = 'CHANGE_NUM';
		
		--b.定义 mutation的时候
		var store = new Vuex.store({
			//2.初始化，给 state中的状态属性赋值
			state:{
				count:0
			},
			mutations:{
				//参数是提交mutation时store中的旧的状态值
				[CHANGE_NUM](state,n){
					state.count += n;
				}
			}
		})
		--c. 提交mutation的时候
		methods:{
			changeCountFun:function(){
				//提交mutation
				//this.$store.commit(CHANGE_NUM,5);
			}
		}