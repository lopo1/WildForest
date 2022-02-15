<template>
	<!--NFT-->
	<view class="delete-popup" v-show="show">
		<view class="drawRecord about-box" :class="{deleteActive:type == 1}">
			<text class="about-title">游戏规则</text>
			<scroll-view scroll-y="true" class="about">
				<view class="about-info" style="text-align: center;margin-top: 40rpx;">
					<text class="about-txt">疯狂森林游戏规则</text>
				</view>
				<view class="about-info">
					<text class="about-info-txt">用户通过购买树苗来获取贡献值(C)，贡献值是计算抽奖、分红、游戏结束时间的基本单位，目前共有8种树可供购买，每种树具有不同的贡献值与初始价格，每种树的初始价格与贡献值如下表所示。</text>
					<view class="about-info-grid">
						<view class="about-info-grid-c-box">
							<view class="about-info-grid-c">
								树种
							</view>
							<view class="about-info-grid-c">
								梭梭树
							</view>
							<view class="about-info-grid-c">
								沙柳
							</view>
							<view class="about-info-grid-c">
								榆树
							</view>
							<view class="about-info-grid-c">
								柏树
							</view>
							<view class="about-info-grid-c">
								樟子松
							</view>
							<view class="about-info-grid-c">
								云杉
							</view>
							<view class="about-info-grid-c">
								胡杨
							</view>
							<view class="about-info-grid-c" style="border-right: none;">
								冷杉
							</view>
						</view>
						<view class="about-info-grid-c-box">
							<view class="about-info-grid-c">
								贡献值
							</view>
							<view class="about-info-grid-c">
								1C
							</view>
							<view class="about-info-grid-c">
								2C
							</view>
							<view class="about-info-grid-c">
								5C
							</view>
							<view class="about-info-grid-c">
								10C
							</view>
							<view class="about-info-grid-c">
								20C
							</view>
							<view class="about-info-grid-c">
								50C
							</view>
							<view class="about-info-grid-c">
								100C
							</view>
							<view class="about-info-grid-c" style="border-right: none;">
								200C
							</view>
						</view>
						<view class="about-info-grid-c-box">
							<view class="about-info-grid-c" style="border-bottom: none;">
								初始价格
							</view>
							<view class="about-info-grid-c" style="border-bottom: none;">
								158 USDT
							</view>
							<view class="about-info-grid-c" style="border-bottom: none;">
								316 USDT
							</view>
							<view class="about-info-grid-c" style="border-bottom: none;">
								632 USDT
							</view>
							<view class="about-info-grid-c" style="border-bottom: none;">
								1580 USDT
							</view>
							<view class="about-info-grid-c" style="border-bottom: none;">
								3160 USDT
							</view>
							<view class="about-info-grid-c" style="border-bottom: none;">
								6320 USDT
							</view>
							<view class="about-info-grid-c" style="border-bottom: none;">
								15800 USDT
							</view>
							<view class="about-info-grid-c" style="border-right: none;border-bottom: none;">
								31600 USDT
							</view>
						</view>
					</view>
					<text class="about-info-txt">树苗的价格会随着游戏中总贡献值的增加而上涨，上涨规律为每增加1000个贡献值，树苗的价格上涨初始价格的0.5%。</text>
					<text class="about-info-title">经济模型</text>
					<text class="about-info-title" style="text-align: left;">游戏内价值:</text>
					<text class="about-info-txt">（1）推荐奖励(15%)：稳定收益，用户购买树苗资金的15%用于推荐奖励，其中直推占10%，间推占5%。</text>
					<text class="about-info-txt">（2）分红(38%)：稳定收益，用户购买树苗资金的38%用于分红，分红由智能合约在每天24:00 (UTC+8) 进行结算，其中时间采用区块时间，收益最高为本金的3倍。</text>
					<text class="about-info-txt">（3）抽奖(5%) ：概率收益，收益用户购买树苗资金的5%用于抽奖，抽奖每2小时进行一次，用户中奖概率和其持有的有效贡献值成正比，贡献值越大，中奖概率越高。</text>
					<text class="about-info-txt">（4）终极奖池(15%)：用户购买树苗资金的15%会放入终极奖池，游戏结束后合约将会对终极奖池中的奖金进行派发，派发规则为:最后一个买入的贡献值对应的账户将获得奖池总奖金的40%，倒数第2-101个买入的贡献值对应的账户平分奖池总奖金的40%，剩下的20%奖金将按照贡献值分发给所有游戏账户。</text>
					<text class="about-info-txt">（5）社区运营(15%)：用户购买树苗资金的15%用于社区运营，用以游戏社区建设、游戏宣传、游戏系统的开发及维护、合约代码审计等工作。</text>
					<text class="about-info-txt">（6）生态基金(12%)：用户购买树苗贫金的12%用于生态基金建设，用以组织环保为主题的活动、支持环保相关的社会工作等。</text>
					<text class="about-info-title" style="text-align: left;">游戏外价值:</text>
					<text class="about-info-txt">NFT:用户购买树苗时有一定的概率产生神奇果树，游戏中每新增500个贡献值时，会产生一颗神奇果树， 每20颗神奇果树，会产生一个NFT大奖。</text>
					<text class="about-info-title" style="text-align: left;">游戏终止条件:</text>
					<text class="about-info-txt">游戏开始即进入24小时倒计时，倒计时结束后游戏终止，但用户可以通过种植树木提供贡献值来推迟游戏终止时间。系统每增加一个贡献值，倒计时时间会相应的增加:</text>
					<view class="about-info-grid" style="height: 131rpx;">
						<view class="about-info-grid-c-box">
							<view class="about-info-grid-c" style="line-height: 65.5rpx;">
								总贡献值
							</view>
							<view class="about-info-grid-c" style="line-height: 65.5rpx;">
								＜50000
							</view>
							<view class="about-info-grid-c">
								50000-100000
							</view>
							<view class="about-info-grid-c">
								100000-200000
							</view>
							<view class="about-info-grid-c" style="border-right: none;line-height: 65.5rpx;">
								＞200000
							</view>
						</view>
						<view class="about-info-grid-c-box">
							<view class="about-info-grid-c" style="border-bottom: none;line-height: 65.5rpx;">
								贡献值
							</view>
							<view class="about-info-grid-c" style="border-bottom: none;line-height: 65.5rpx;">
								1C
							</view>
							<view class="about-info-grid-c" style="border-bottom: none;line-height: 65.5rpx;">
								2C
							</view>
							<view class="about-info-grid-c" style="border-bottom: none;line-height: 65.5rpx;">
								4C
							</view>
							<view class="about-info-grid-c" style="border-right: none;border-bottom: none;line-height: 65.5rpx;">
								10C
							</view>
						</view>
					</view>
					<text class="about-info-txt">倒计时时间有上限值，超过上限值后倒计时时间将不再增加。游戏初始上限值为192个小时，当累计到10000个贡献值时上限值减半为96小时，到20000个贡献值时上限值减半为48小时，到50000个贡献值时上限值减半为24小时。</text>
					<text class="about-info-txt">游戏在每日的凌晨1:00-凌晨7:00(UTC+8)会停止倒计时。</text>
					<text class="about-info-txt">注:区块链系统中不存在统一的全局时钟，游戏中所采用的时间均取自区块时间戳，与现实中的时间可能会存在一定的误差。</text>
				</view>
				<!-- <text class="consultingDetails-content-val">植树造林，防止土地沙漠化，如果沙漠化，就需要重启游戏（就是只要用户购买种子就重启了）</text> -->
				<!-- <rich-text class="consultingDetails-content-val"></rich-text> -->
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
	.about-info-grid{
		@include size(520rpx,200rpx,none);
		border: 1rpx solid #333;
		box-sizing: border-box;
		margin-top: 20rpx;
		.about-info-grid-c-box{
			width: 520rpx;
			height: 66.5rpx;
			display: flex;
			.about-info-grid-c{
				flex: 1;
				border-right: 1rpx solid #333;
				border-bottom: 1rpx solid #333;
				@include font(20rpx,#333);
				text-align: center;
			}
		}
		
	}
	.about-info{
		width: 520rpx;
		margin-left: 20rpx;
		display: flex;
		flex-direction: column;
		.about-info-title{
			@include font($el,#333);
			@include bold();
			text-align: center;
			margin-top: 20rpx;
		}
		.about-info-txt{
			@include font($m,#333);
			text-align: justify;
			text-indent:60rpx;
			margin-top: 20rpx;
		}
	}
	.about{
		@include size(567rpx,738rpx,#FFDA9E);
		border-radius: 10rpx;
		margin-top: 80rpx;
		display: flex;
		flex-direction: column;
	}
	.abou-txt-box{
		width: 567rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		
	}
	.about-txt{
		@include font(48rpx,#792800);
		@include bold();
	}
	.about-title{
		@include font($e,#FFFFFF);
		@include bold();
		margin-top: 30rpx;
	}
	//奖池明细
	.drawRecord{
		@include size(680rpx,970rpx,red);
		transition-property:transform;
		transition-duration:.2s;
		transform: scale(0);
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	.about-box{
		background: url(@/static/bg5.png) no-repeat;
		background-size: 100% 100%;
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
		background: url(@/static/get/bg.png) no-repeat;
		background-size: 100% 100%;
		@include cen();
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
