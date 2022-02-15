<template>
	<!--输入交易密码-->
	<view class="delete-popup"  v-show="show">
		<view class="store-box" :class="{deleteActive:type == 1}">
			<scroll-view scroll-y="true" class="stores">
				<view class="store" v-for="(item,index) in userTrees" v-show="item.total>0">
					<image class="store-icon" 
					:src="item.index== 0? '/static/buy/junjun.png':item.index==1? 
					'/static/buy/shaliu.png':item.index== 2? 
					'/static/buy/yu.png':item.index== 3? 
					'/static/buy/bais.png':item.index== 4? 
					'/static/buy/zhangzi.png':item.index== 5? 
					'/static/buy/yunshan.png':item.index== 6? 
					'/static/buy/huyang.png':'/static/buy/lengshan.png'"></image>
					<text class="store-txt">{{item.index== 0? '梭梭树':item.index== 1? "沙柳":item.index== 2?'榆树':item.index== 3? '柏树':item.index== 4? '樟子松':item.index== 5? '云杉':item.index== 6? '胡杨':'冷杉'}}x{{item.total}}</text>
				</view>
			</scroll-view>
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
				la:{},
				type:0,
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
			userTrees:{
				default:[]
			}
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
	.stores{
		@include size(517rpx,350rpx,none);
		margin-top: 15rpx;
	}
	.store{
		height: 83rpx;
		width: 258rpx;
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		margin-top: 20rpx;
		float: left;
		@include re()
	}
	.store-icon{
		@include size(83rpx,83rpx,none);
		@include ab();
		left: 20rpx;
	}
	.store-txt{
		@include font($m,#FFFFFF);
		@include bold();
		margin-left: 15rpx;
		@include ab();
		left: 100rpx;
	}
	.store-box{
		@include size(700rpx,572rpx,none);
		// position: absolute;
		// left: 50%;
		// top: 50%;
		// transform: translateX(-50%);
		// transform: translate(-50%,-50%);
		background: url(@/static/bg6.png) no-repeat;
		background-size: 100% 100%;
		@include cen();
		transform: scale(0);
		transition: .2s;
	}
	.store-bg{
		@include size(700rpx,572rpx,none);
		@include ab();
		left: 0;
		top: 0;
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
		// display: flex;
		// flex-direction: column;
		// align-items: center;
		border-radius: 10rpx;
		position: fixed;
		left: 0;
		top: 0;
		@include cen();
		// justify-content: center;
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
