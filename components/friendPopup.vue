<template>
	<!--输入交易密码-->
	<view class="delete-popup" v-show="show">
		<view class="friendPopup" :class="{deleteActive:type == 1}">
			<text class="friendPopup-txt">我的钱包地址</text>
			<view class="friendPopup-address-box">
				<!-- <image class="friendPopup-address-box-bg" src="/static/btn2.png" mode=""></image> -->
				<text class="friendPopup-address">{{account}}</text>
			</view>
			<text class="friendPopup-address-txt" style="margin-top: 40rpx;">钱包地址用于好友激活账户</text>
			<text class="friendPopup-address-txt">赶快去分享给小伙伴吧</text>
			<view class="friend-btn" @tap='onCopy'>
				<text class="friend-btn-txt">复制地址</text>
			</view>
			<image class="userinfo-close" @tap='onClose' src="/static/userinfo/close.png" mode=""></image>
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
			account:{
				default:""
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
			onClose(){
				this.$emit('onClose');
			},
			onCopy(){
				const _this = this;
				uni.setClipboardData({
					data:this.account,
					success(res) {
						app.$tips('复制成功')
					},
					fail(err) {
						console.log(err)
					}
				});
				uni.hideKeyboard();
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
	.friend-btn{
		@include size(218rpx,88rpx,none);
		background: url(@/static/btn.png) no-repeat;
		background-size: 100% 100%;
		@include re();
		@include cen();
		margin-top: 30rpx;
	}
	.friend-btn-bg{
		@include size(218rpx,88rpx,none);
		@include ab();
		left: 0;
		top: 0;
	}
	.friend-btn-txt{
		@include font($e,#FDFFE7);
		@include bold();
	}
	.friendPopup-address-box{
		background: url(@/static/btn2.png) no-repeat;
		background-size: 100% 100%;
		@include size(460rpx,80rpx,none);
		@include re();
		@include cen();
		margin-top: 30rpx;
		@include tH();
		padding-left: 20rpx;
		padding-right: 20rpx;
		box-sizing: border-box;
	}
	.friendPopup-address-box-bg{
		@include size(460rpx,80rpx,none);
		@include ab();
		left: 0;
		top: 0;
	}
	.friendPopup-address-txt{
		@include font($m,#692A10)
	}
	.friendPopup-address{
		
		@include font($l,#692A10);
		@include bold();
		@include tH();
	}
	.friendPopup{
		@include size(570rpx,572rpx,none);
		@include re();
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		transition-property:transform;
		transition-duration:.2s;
		transform: scale(0);
		background: url(@/static/bg9.png) no-repeat;
		background-size: 100% 100%;
	}
	.friendPopup-bg{
		@include size(570rpx,572rpx,none);
		@include ab();
		left: 0;
		top: 0;
	}
	.friendPopup-txt{
		@include font($e,#562115);
		@include bold();
		margin-top: 80rpx;
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
</style>
