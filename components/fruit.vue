<template>
	<!--领取果实-->
	<view class="delete-popup"  v-show="show">
		<view class="get-box" :class="{deleteActive:type == 1}">
			<view class="get">
				<image class="get-icon" src="/static/gs.png" mode=""></image>
				<text class="get-txt">正在摘取神奇果实，请等待交易完成</text>
			</view>
	
			<view class="get-btn" @tap='onClose'>
				<text class="get-btn-txt">好的</text>
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
			onClose(){
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
	.get-btn{
		@include size(220rpx,88rpx,none);
		background: url(@/static/btn.png) no-repeat;
		background-size: 100% 100%;
		@include re();
		@include cen();
		margin-top: 40rpx;
	}
	.get-btn-bg{
		@include size(220rpx,88rpx,none);
		@include ab();
		left: 0;
		top: 0;
	}
	.get-btn-txt{
		@include font($e,#FDFFE7);
		@include bold();
	}
	.get-icon-box{
		@include size(460rpx,66rpx,none);
		flex-direction: row;
		align-items: center;
		justify-content: center;
	}
	.get-icon2{
		@include size(66rpx,66rpx,none)
	}
	.get-icon-txt{
		@include font(44rpx,#FFFFFF);
		@include bold();
		margin-left: 10rpx;
	}
	.get-box{
		width: 460rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		transition-property:transform;
		transition-duration:.2s;
		transform: scale(0);
	}
	.get{
		@include size(460rpx,466rpx,none);
		@include re();
		@include cen();
		background: url(@/static/get/bg.png) no-repeat;
		background-size: 100% 100%;
	}
	.get-bg{
		@include size(460rpx,466rpx,none);
		@include ab();
		left: 0;
		top: 0;
	}
	.get-icon{
		@include size(241rpx,209rpx,none);
	}
	.get-txt{
		@include font($el,#FFFFFF);
		@include bold();
		@include ab();
		bottom: 25rpx;
		text-align: center;
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
</style>
