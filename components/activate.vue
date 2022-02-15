<template>
	<!--输入交易密码-->
		<view class="delete-popup" v-show="show">
			<view class="activate" :class="{deleteActive:type == 1}">
				<text class='activate-txt' >请输入推荐人的钱包地址</text>
				<image class="userinfo-close" @tap='onClose' src="/static/userinfo/close.png" mode=""></image>
				<view class="activate-btn">
					<input class="activate-btn-txt" v-model="activate" @input='onInput' type="text" value=""/>
				</view>
				<view class="activate-btn2" @tap='getIsActivate'>
					<text class="activate-btn2-txt">立即激活</text>
				</view>
			</view>
	
		</view>
	
</template>

<script>
	const app = getApp().globalData;
	export default {
		watch:{
			getShow(val){
				const _this = this;
				if(val){
					this.show = val;
				}else{
					setTimeout(()=>{
						this.show = false;
					},200)
				}
			},
		},
		data(){
			return{
				la:{},
				type:0,
				childOpen:false,
				popupShow:false,
				width:0,
				windowHeight:0,
				open:false,
				show:false,
				num:0,
				tapNum:-1,
				activate:"",
				apiLock:true
			}
		},
		props:{
			getShow:{
				//用于接收
				default:false
			},
		},
		
		onShow(){
			this.getSystemHeight();
		},
	
		mounted(){
			this.getSystemHeight();
		},
		methods:{
			onInput(ev){
				this.activate = ev.detail.value;
			},
			getIsActivate(){
				//是否激活账号
				console.log(app.forestContract)
				if(this.activate == ''){
					app.$tips('请输入上级地址');
					return;
				};
				if(!this.apiLock) return;
				this.apiLock = false;
				app.forestContract.isActivate(this.activate).call()
				.then(res=>{
					console.log(res);
					if(!res){
						app.$tips('该地址并未激活')
					}else{
						this.onActivate()
					}
				})
			},
			onActivate(){
				uni.showLoading({mask:true});
				app.forestContract.activate(this.activate)
				.send((error, transactionHash)=>{
					console.log(transactionHash)
					if(!error){
						app.$tips('请等待激活交易完成');
						this.$emit('onActivateRefresh');
						this.onClose();
					}else{
						app.$tips('绑定失败')
						this.apiLock = true;
					};
					uni.hideLoading();
				})
				.catch(err=>{
					this.apiLock = true;;
					uni.hideLoading();
				})
			},
			onTapNum(index){
				this.tapNum = index;
			},
			onClose(){
				this.popupShow = false;
				setTimeout(()=>{
					this.childOpen = false;
				},200)
				this.$emit('onClose');
			},
			getSystemHeight(){
				//获取系统可用高度
				uni.getSystemInfo({
					success:(res)=>{
						this.windowHeight = res.windowHeight;
					}
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	.activate-btn2-txt{
		@include font($e,#FFFEFE);
		@include bold()
	}
	.activate-btn2{
		@include cen();
		@include size(218rpx,88rpx,none);
		background: url(@/static/btn.png) no-repeat;
		background-size: 100% 100%;
		margin-top: 30rpx;
	}
	.activate-btn-txt{
		@include size(420rpx,80rpx,none);
		@include font($e,#692A10);
		line-height: 80rpx;
		text-align: center;
	}
	.activate-btn{
		@include size(460rpx,80rpx,none);
		@include re();
		background: url(@/static/btn2.png) no-repeat;
		background-size: 100% 100%;
		@include cen();
		margin-top: 30rpx;
	}
	.activate-txt{
		@include font($el,#692A10);
		@include bold();
		margin-top: 30rpx;
	}
	.activate{
		@include size(600rpx,602rpx,none);
		background: url(@/static/bg13.png) no-repeat;
		background-size: 100% 100%;
		transform: scale(0);
		transition:.2s;
		display:flex;
		flex-direction:column;
		align-items: center;
		justify-content: center;
	}

	.delete-popup-box{
		position: fixed;
		width: 750rpx;
		@include cen();
		border-radius: 8rpx;
	}
	.delete-popup{
		width: 750rpx;
		height: 100vh;
		display: flex;
		flex-direction: column;
		align-items: center;
		border-radius: 10rpx;
		position: fixed;
		left: 0;
		top: 0;
		justify-content: center;
		z-index: 30;
	}
	.deleteActive{
		transform: scale(1);
	}
	.hide{
		transform: scale(0);
	}
	.userinfo-close{
		@include size(50rpx,50rpx,none);
		@include ab();
		top: 60rpx;
		right: 10rpx;
	}
	.popupShow{
		opacity :1
	}
</style>
