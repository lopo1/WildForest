<template>
	<!--沙漠化-->
	<view class="delete-popup"  v-show="show">
		<!-- :class="{deleteActive:type == 1}"-->
		<view class="desert-box" :class="{deleteActive:type == 1}">
			<view class="desert">
				<text class="desert-time">--:--:--</text>
				<text class="desert-txt">土地已进入沙漠化，可查看奖池明细</text>
			</view>
			<view class="desert-btn" @tap='onClose'>
				<text class="desert-btn-txt">确认</text>
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
	.desert-btn{
		@include size(220rpx,80rpx,none);
		@include re();
		@include cen();
		margin-top: 50rpx;
		background: url(@/static/btn.png) no-repeat;
		background-size: 100% 100%;
	}
	.desert-btn-bg{
		@include size(220rpx,80rpx,none);
		@include ab();
		left: 0;
		top: 0;
	}
	.desert-btn-txt{
		@include font($e,#FDFFE7);
		@include bold()
	}
	.desert-box{
		width: 467rpx;
		@include re();
		display: flex;
		flex-direction: column;
		align-items: center;
		transition-property:transform;
		transition-duration:.2s;
		transform: scale(0);
	}
	.desert{
		@include size(467rpx,273rpx,none);
		@include re();
		background: url(@/static/bg10.png) no-repeat;
		background-size: 100% 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
	.desert-bg{
		@include size(467rpx,273rpx,none);
		@include ab();
		left: 0;
		top: 0;
	}
	.desert-time{
		@include font(60rpx,#E70606);
		margin-top: 30rpx;
	}
	.desert-txt{
		@include font($s,#333333);
		@include bold();
		margin-top: 20rpx;
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
