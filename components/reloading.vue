<template>
	<!--领取果实-->
	<view class="delete-popup"  v-show="show">
		<view class="get-box" :class="{deleteActive:type == 1}">
			<scroll-view scroll-y="true" class="lists">
			<!-- 	<view class="list">
					<view class="list-bg-box">
						<image class="list-bg" src="@/static/bg/00.png" mode=""></image>
					</view>
					<text class="list-txt">默认森林</text>
					<view class="list-btn" @tap='onChildOpen(-1)'>
						<text class="list-btn-txt" :style="{color:userBgIndex == -1? '#FFF':'#562115'}">{{userBgIndex == -1? '正在使用':'立即使用'}}</text>
					</view>
				</view> -->
				<view class="list" v-for="(item,index) in bgs">
					<view class="list-bg-box">
						<image class="list-bg" :src="item.url" mode=""></image>
					</view>
					<text class="list-txt">{{item.name}}</text>
					<view class="list-btn" @tap='onChildOpen(index)'>
						<text class="list-btn-txt" :style="{color:item.have&&userBgIndex == index? '#FFF':'#562115'}">{{item.have && userBgIndex == index? '正在使用': item.have && userBgIndex != index? '立即使用':'立即购买'}}</text>
					</view>
				</view>
			</scroll-view>
			<image class="userinfo-close" @tap='onClose' src="/static/userinfo/close.png" mode=""></image>
		</view>
		<view class="newPopup" v-show="childOpen" :class="{popupShow:popupShow}"></view>
		<view class="popupInfo" v-show="childOpen" :class="{popupShow:popupShow}">
			<view class="popupInfo-img-box">
				<view class="popupInfo-imgs">
					<image class="popupInfo-img" :src="showImg" mode=""></image>
				</view>
				<view class="popupInfo-mid">
					<text class="popupInfo-mid-txt">{{bgName}}</text>
					<view class="popupInfo-right">
						<image class="popupInfo-right-icon" src="@/static/index/icon5.png" mode=""></image>
						<text class="popupInfo-right-txt">X{{price}}</text>
					</view>
				</view>
			</view>
			<view class="popupInfo-btn" @tap='onBuy'>
				<text class="popupInfo-btn-txt">确认购买</text>
			</view>
			<image class="userinfo-close" @tap='onCloseChildOpen' src="/static/userinfo/close.png" mode=""></image>
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
				type:0,
				la:{},
				childOpen:false,
				popupShow:false,
				width:0,
				windowHeight:0,
				open:false,
				show:false,
				apiLock:true,
				index:0,
				price:0,
				showImg:'',
				bgName:""
			}
		},
		props:{
			bgs:{
				default:[]
			},
			userBgIndex:{
				default:-1
			},
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
			onCloseChildOpen(){
				this.popupShow = false;
				setTimeout(()=>{
					this.childOpen = false;
				},200)
			},
			onClose(){
				this.popupShow = false;
				setTimeout(()=>{
					this.childOpen = false;
				},200)
				this.$emit('onClose');
			},
			onBuy(){
				if(app.accredit>0){
					//已授权
					if(!this.apiLock) return;
					this.apiLock = false;
					uni.showLoading({mask:true});
					app.forestContract.buyBg(this.index)
					.send((error, transactionHash)=>{
						console.log(transactionHash)
						if(!error){
							// this.toWater();
							app.$tips('交易进行中,请等待交易完成');
							setTimeout(()=>{
								this.$emit('@onRefresh')
							},2500)
							this.onCloseChildOpen();
						}else{
							app.$tips('购买失败')
							this.apiLock = true;
						};
						uni.hideLoading();
					})
					.catch(err=>{
						this.apiLock = true;;
						uni.hideLoading();
					})
				}else{
					//未授权
					if(!this.apiLock) return;
					this.apiLock = false;
					uni.showLoading({mask:true});
					const num = new Number(2**255-1).toLocaleString().split(',').join('');
					app.usdtContract.approve(app.forest_Address,num)
					.send((error, transactionHash)=>{
						if(!error) {
						   console.log('transactionHash is :' + transactionHash);
						   app.$tips('授权交易进行中，请等待交易完成');
						   this.onCloseChildOpen();
						} else {
						   console.log(error);
						   uni.hideLoading();
						}
					})
				}
				   
				   
				
			},
			onChildOpen(index){
				if(index>=0){
					this.bgName = this.bgs[index].name;
					console.log(this.bgName)
				}
				if(index == -1 && index != this.userBgIndex){
					//默认图片,并且用户并未使用
					console.log(index)
					app.$post('user/use',{index:index,address:app.account})
					.then(res=>{
						console.log(res);
						app.$tips(res.data.info)
						if(res.data.status == 1){
							this.$emit('onRefresh')
						}
					})
				}else if(index != -1){
					//用户需要切换图片
					if(this.bgs[index].have){
						//用户已经拥有，切换图片
						console.log('dasdasd')
						app.$post('user/use',{index:index,address:app.account})
						.then(res=>{
							console.log(res);
							app.$tips(res.data.info)
							if(res.data.status == 1){
								this.$emit('onRefresh')
							}
						})
					}else{
						this.index = index;
						this.price = this.bgs[index].price/10**app.usdtDec;
						this.showImg = this.bgs[index].url;
						console.log(this.bgs[index].price)
						this.childOpen = true;
						setTimeout(()=>{
							this.popupShow = true;
						},200)
					}
				}
				
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
	.popupInfo-mid{
		display: flex;
		flex-direction: column;
		margin-left: 20rpx;
		.popupInfo-mid-txt{
			@include font($e,#792800);
			@include bold();
		}
		.popupInfo-right{
			display: flex;
			flex-direction: row;
			align-items: center;
			margin-top: 10rpx;
			.popupInfo-right-icon{
				@include size(40rpx,40rpx,none);
			}
			.popupInfo-right-txt{
				@include font($e,#792800);
				@include bold();
				margin-left: 10rpx;
			}
		}
	}
	.popupInfo-img-box{
		@include size(500rpx,108rpx,none);
		display: flex;
		align-items: center;
		justify-content: center;
		margin-top: 80rpx;
	}
	.popupInfo-imgs{
		@include size(108rpx,108rpx,#792800);
		@include cen();
	}
	.popupInfo-img{
		@include size(95rpx,95rpx,#792800);
	}
	.newPopup{
		@include size(100%,100vh,none);
		background: rgba(0,0,0,.7);
		position: fixed;
		left: 0;
		top: 0;
		z-index: 9999999;
		opacity: 0;
		transition: .3s;
	}
	.popupInfo-title{
		@include font($m,#5E2107);
		@include bold();
		@include ab();
		top: 10rpx;
		margin-right: 20rpx;
	}
	.popupInfo-txt{
		@include font($m,#1B1B1B);
		margin-top: 90rpx;
	}
	.popupInfo-btn{
		@include size(132rpx,60rpx,none);
		@include re();
		@include cen();
		background: url(@/static/btn.png) no-repeat;
		background-size: 100% 100%;
		margin-top: 30rpx;
	}
	.popupInfo-btn-bg{
		@include size(132rpx,60rpx,none);
		@include ab();
		left: 0;
		top: 0;
	}
	.popupInfo-btn-txt{
		@include font($l,#FDFFE7);
		@include bold();
	}
	.popupInfo{
		@include size(504rpx,354rpx,none);
		background: url(@/static/bg12.png) no-repeat;
		background-size: 100% 100%;
		opacity: 0;
		transition-property:opacity;
		transition-duration:.3s;
		@include ab();
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		z-index: 9999999;
	}
	.popupInfo-bg{
		@include size(477rpx,275rpx,none);
		@include ab();
		left: 0;
		top: 0;
	}
	
	
	
	.lists{
		@include size(530rpx,450rpx,none);
		margin-top: 30rpx;
	}
	.list{
		@include size(176rpx,220rpx,none);
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		margin-top: 20rpx;
		float: left;
		box-sizing: border-box;
		.list-bg-box{
			@include size(108rpx,108rpx,#792800);
			border-radius: 10rpx;
			@include cen();
			.list-bg{
				@include size(95rpx,95rpx,none);
				border-radius: 5rpx;
			}
		};
		.list-txt{
			@include font($m,#FFFFFF);
			@include bold();
			margin-top:15rpx ;
		}
		.list-btn{
			@include size(134rpx,60rpx,none);
			background: url(@/static/btn.png) no-repeat;
			background-size: 100% 100%;
			@include cen();
			margin-top: 10rpx;
		}
		.list-btn-txt{
			@include font(20rpx,#562115);
			@include bold();
		}
	}
	.get-box{
		width: 695rpx;
		height: 664rpx;
		background: url(@/static/bg11.png) no-repeat;
		background-size: 100% 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		transition-property:transform;
		transition-duration:.2s;
		transform: scale(0);
	}
	.delete-popup-box{
		position: fixed;
		width: 750rpx;
		@include cen();
		border-radius: 8rpx;
	}
	.delete-popup{
		width: 750rpx;
		height: 100%;
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
		top: 50rpx;
		right: 10rpx;
	}
	.popupShow{
		opacity :1
	}
</style>
