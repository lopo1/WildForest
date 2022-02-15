export default {
	data(){
		return{
			getHide:false,
			hide:false,
			refreshLock:false,//是否刷新
			myloading:"",//刷新文案
			scrollLock:true,//加载锁
			isMsg:false,
			loadingMsg:'正在努力更新',
			page:2,
			apiLock:true,
		}
	},
	methods:{
		onSkeleton(page){
			this.hide = true;
			this.$nextTick(()=>{
				this.onOpacityOn(page);
			})
		},
		onOpacityOff(){
			//渐变动画
			const app = getApp().globalData;
			// const Binding = uni.requireNativePlugin('bindingx');
			const el = this.$refs[app.refName].ref;
			const opacity = Binding.bind({
				eventType:'timing',
				exitExpression:'t>300',
				props:[
					{
						element: el,
						property: 'opacity',
						expression: 'linear(t,1,-1,300)'
					},
					{
						element: el,
						property: 'transform.translateY',
						expression: 'linear(t,0,-50,300)'
					},
				]
			},(res)=>{
				if (res.state === 'exit') {
					Binding.unbind({
						token: el
					})
				}
			});
		},
		onOpacityOn(page){
		 	//渐变动画
			const app = getApp().globalData;
			// const Binding = uni.requireNativePlugin('bindingx');
			let el;
			if(page && page == 1){
				el = this.$refs[app.page1].ref;
			}else if(page && page == 2){
				el = this.$refs[app.page2].ref;
			}else if(page && page == 3){
				el = this.$refs[app.page3].ref;
			}else if(page && page == 4){
				el = this.$refs[app.page4].ref;
			}else{
				el = this.$refs[app.refName].ref;
			}
			const opacity = Binding.bind({
				eventType:'timing',
				exitExpression:'t>300',
				props:[
					{
						element: el,
						property: 'opacity',
						expression: 'linear(t,0,+1,300)'
					},
					{
						element: el,
						property: 'transform.translateY',
						expression: 'linear(t,50,-50,300)'
					},
				]
			},(res)=>{
				if (res.state === 'exit') {
				    Binding.unbind({
				        token: el
				    })
				}
			});
		},
		onRefresh(){
			//s刷新
			this.refreshLock = true;
			this.myloading = this.la.loading2;
			this.getAll();
		},
		onPullingdown(ev){
			//下拉距离
			if (Math.abs(ev.pullingDistance) > Math.abs(ev.viewHeight)) {
				this.myloading = this.la.loading3;
			} else {
				this.myloading = this.la.loading4;
			};
		},
	}
}