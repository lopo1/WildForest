<template>
	<!--领取果实-->
	<view class="delete-popup"  v-show="show">
		<image class="water" src="/static/water.gif" mode=""></image>
		<text class="water-txt">浇水中...</text>
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
			onCloseChildOpen(){
				this.popupShow = false;
				setTimeout(()=>{
					this.childOpen = false;
				},200)
			},
			onClose(){
				this.$emit('onClose');
			},
			onChildOpen(){
				this.childOpen = true;
				setTimeout(()=>{
					this.popupShow = true;
				},200)
			},
			getTransaction(txId){
				//查看交易讯息
				setTimeout(()=>{
					tronWeb.trx.getTransaction(txId)
					.then(res=>{
						console.log(res);
						if(res.ret[0].contractRet == "SUCCESS"){
							this.$emit('onWaterRefresh')
						}
					})
				},1500)
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
	.water{
		@include size(120rpx,120rpx,none);
	}
	.water-txt{
		@include font($e,white);
		@include bold();
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
		z-index: 999999;
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
