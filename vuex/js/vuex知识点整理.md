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

## mutations中不可以有异步数据，mutations如果有异步数据也不能跟踪，
## 异步数据的调用需要使用 actions
	-- 1.在vuex的对象中添加 actions
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
		},
		actions:{
			addNum:function(context){
				setTimeout(()=>{
					context.commit('changeCount');
				},1000);
			}
		}
	})
	
	--2.调用 actions
	methods:{
		changeCount:function(){
			//派发
			this.$store.dispatch('addNum');
		}
	}
	
	--3.调用 actions的工具函数
	methods:{
		...mapActions(['addNum'])
	}
	
## getters ,作用 ：当多个页面或组件都需要从store中的 state 中派生出一些状态，需要将这种状态封装到 getters中

	-- 1.在vuex的对象中添加 getters
	var store = new Vuex.store({
		//2.初始化，给 state中的状态属性赋值
		state:{
			arr:[1,5,9,2,4,5]
		},
		getters:{
			sortArr(state){
				var rs = [...state.arr];
				rs = rs.sort(function(a,b){return a-b});
				return rs;
			}
		}
		
	})
	
	--2.调用 getters
	computed:{
		sortArr:function(){
			//调用getters
			return this.$store.getters.sortArr
		}
	}
	
	--3.调用 getters的工具函数
	computed:{
		...mapGetters(['sortArr'])
	}
	
## vuex 和 localstorage的区别
	1.vuex 是响应式的，当某个组件调用store中的状态值发生变化时，
	其他组件中获取该状态值也会跟着发生变化；vuex 当页面刷新时，会重置vuex中的state的数据
	2.localstorage特点是，非响应式的，所以，当缓存中的值发生变化时，不会主动通知界面尽心更新，
	需要手动调用或者刷新页面；localstorage当刷新页面时对他没任何影响
	
	注意：
	A.创建vuex的对象
	new Vuex.Store({
		state:{},//初始化状态
		getters:{},//派生状态
		mutations:{},//修改 store中的state的值
		actions:{}//做异步处理，提交到mutations的  commit
		
	})
	
	B.使用
	1.this.$store.state.***                 获取状态值 ，                     在计算属性中获取  computed 
	2.this.$store.getters.***               获取的getters中的数据，            在计算属性中获取  computed 
	3.this.$store.commit('mutation的名称');  将store中的状态值提交到mutations， 在methods中提交状态
	4.this.$store.dispatch('action的名称');  将store中的状态值派发到 actions，  在methods中派发状态
	
	C.使用工具函数
	1.state
	...mapSate({
		count:state=>state.count
	})
	2.getters
	...mapGetters(['getters的名称']);
	3.mutations
	...mapMutations(['mutation的名称']);
	4.actions
	...mapActions(['action的名称'])
	
	
	
	
	