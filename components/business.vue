<template>
	<!--输入交易密码-->
	<!-- <cover-view class="delete-popup-box"  :style="{height:windowHeight + 'px'}" v-if="show"> -->
		<view class="delete-popup" v-show="show">
			<view class="userinfo" :class="{deleteActive:type == 1}" v-show="userInfoDestroy">
				<text class="userinfo-title">用户中心</text>
				<view class="userinfo-list" style="margin-top: 140rpx;" @tap='toResults'>
					<image class="userinfo-list-icon" src="/static/userinfo/icon1.png" mode=""></image>
					<text class="userinfo-txt">推广业绩</text>
				</view>
				<view class="userinfo-list" @tap='toCollection'>
					<image class="userinfo-list-icon" src="/static/userinfo/icon2.png" mode=""></image>
					<text class="userinfo-txt">我的NFT藏品</text>
				</view>
				<view class="userinfo-list" @tap='toDraw'>
					<image class="userinfo-list-icon" src="/static/userinfo/icon3.png" mode=""></image>
					<text class="userinfo-txt">抽奖记录</text>
				</view>
				<view class="userinfo-list" @tap='toJackpot'>
					<image class="userinfo-list-icon" src="/static/userinfo/icon4.png" mode=""></image>
					<text class="userinfo-txt">奖池明细</text>
				</view>
				<view class="userinfo-list" @tap='toProfit' style="margin-top: 20rpx;">
					<image class="userinfo-list-icon" src="/static/userinfo/icon5.png" mode=""></image>
					<text class="userinfo-txt">分红明细</text>
				</view>
				<view class="userinfo-list" @tap='toBox' style="margin-top: 18rpx;">
					<image class="userinfo-list-icon" src="/static/index/manghe.png" mode=""></image>
					<text class="userinfo-txt">我的盲盒</text>
				</view>
				<view class="userinfo-list" @tap='openBox' style="margin-top: 18rpx;">
					<image class="userinfo-list-icon" src="/static/index/manghe.png" mode=""></image>
					<text class="userinfo-txt">开启盲盒</text>
				</view>
				<view class="userinfo-list" @tap='toAbout' style="margin-top: 18rpx;">
					<image class="userinfo-list-icon" src="/static/userinfo/icon6.png" mode=""></image>
					<text class="userinfo-txt">关于我们</text>
				</view>
				<image class="userinfo-close" @tap='onClose' src="/static/userinfo/close.png" mode=""></image>
			</view>
			<!--推广业绩-->
			<view class="results" :class="{deleteActive:type == 2}" v-if="resultsDestroy">
				<!-- <image class="results-bg" src="/static/result/bg.png" mode=""></image> -->
				<text class="userinfo-title" style="font-size: 36rpx;color: white;">推荐业绩</text>
				<view class="results-bg-c">
					<view class="receive-box">
						<view class="receive-left">
							<text class="receive-left-txt">可领取奖励: {{refNum}} USDT</text>
							<!-- <text class="receive-left-txt"></text> -->
						</view>
						<view class="popup-btn2" @tap='onRefTake'>
							<text class="popup-btn-txt">立即领取</text>
						</view>
					</view>
					<view class="results-taps">
						<view class="results-tap" @tap='onResultsIndex(0)' :class="{resultsActive:resultsIndex == 0}">
							<text class="results-tap-txt" :class="{resultsTextActive:resultsIndex==0}">直推业绩</text>
						</view>
						<view class="results-tap" @tap='onResultsIndex(1)' :class="{resultsActive:resultsIndex == 1}">
							<text class="results-tap-txt" :class="{resultsTextActive:resultsIndex==1}">间推业绩</text>
						</view>
					</view>
					<swiper class="resultSwiper" :autoplay="false" :duration="1000" :current="resultsIndex" @change='onSwiper'>
						<swiper-item class="resultSwiper-item">
							<view class="resultSwiper-item-c">
								<view class="result-total-box">
									<image class="result-icon" src="/static/result/icon1.png" mode=""></image>
									<view class="result-totle-mid">
										<text class="result-totle-mid-txt">直推总业绩</text>
										<text class="result-totle-mid-txt2">{{directTotal}}</text>
									</view>
								</view>
								<view class="result-scroll">
									<view class="result-titles">
										<view class="result-title-box" style="justify-content: flex-start;padding-left: 20rpx;">
											<text class="result-title">用户地址</text>
										</view>
										<view class="result-title-box">
											<text class="result-title">业绩</text>
										</view>
										<view class="result-title-box" style="justify-content: flex-end;padding-right: 20rpx;">
											<text class="result-title">时间</text>
										</view>
									</view>
									<scroll-view class="myScroll" ref='list' scroll-y="true"  @scrolltolower='getPages'>
										<view class="myScroll-list" v-for="(item,index) in directLists">
											<view class="result-title-box" style="height: 60rpx;justify-content: flex-start;padding-left: 20rpx;">
												<text class="myScroll-list-txt">{{getHideInfo(item.address)}}</text>
											</view>
											<view class="result-title-box" style="height: 60rpx;">
												<text class="myScroll-list-txt">{{item.amount}}</text>
											</view>
											<view class="result-title-box" style="height: 60rpx;justify-content: flex-end;padding-right: 20rpx;">
												<text class="myScroll-list-txt">{{getSickleTime(item.create_at)}}</text>
											</view>
										</view>
									</scroll-view>
								</view>
							</view>
						</swiper-item>
						<swiper-item class="resultSwiper-item">
							<view class="resultSwiper-item-c">
								<view class="result-total-box">
									<image class="result-icon" src="/static/result/icon2.png" mode=""></image>
									<view class="result-totle-mid">
										<text class="result-totle-mid-txt">间推总业绩</text>
										<text class="result-totle-mid-txt2">{{indirectTotal}}</text>
									</view>
								</view>
								<view class="result-scroll">
									<view class="result-titles">
										<view class="result-title-box" style="justify-content: flex-start;padding-left: 20rpx;">
											<text class="result-title">用户地址</text>
										</view>
										<view class="result-title-box">
											<text class="result-title">业绩</text>
										</view>
										<view class="result-title-box" style="justify-content: flex-end;padding-right: 20rpx;">
											<text class="result-title">时间</text>
										</view>
									</view>
									<scroll-view class="myScroll" ref='list' scroll-y="true" @scrolltolower='getPages'>
										<view class="myScroll-list" v-for="(item,index) in indirectLists">
											<view class="result-title-box" style="height: 60rpx;justify-content: flex-start;padding-left: 20rpx;">
												<text class="myScroll-list-txt">{{getHideInfo(item.address)}}</text>
											</view>
											<view class="result-title-box" style="height: 60rpx;">
												<text class="myScroll-list-txt">{{item.amount}}</text>
											</view>
											<view class="result-title-box" style="height: 60rpx;justify-content: flex-end;padding-right: 20rpx;">
												<text class="myScroll-list-txt">{{getSickleTime(item.create_at)}}</text>
											</view>
										</view>
									</scroll-view>
								</view>
							</view>
						</swiper-item>
					</swiper>
				</view>
				
				
				<image class="userinfo-close" @tap='onCloseChild' src="/static/userinfo/close.png" mode=""></image>
			</view>
		
			<!--NFT藏品-->
			<view class="collection" :class="{deleteActive:type ==3}" v-if="collectionDestroy">
				<view class="collection-title-box">
					<text class="collection-title">推荐NFT平台</text>
				</view>
				<view class="collection-taps">
					<view class="collection-tap" v-for="item in nftUrls" @tap='onChildOpen'>
						<image class="collection-tap-icon" :src="item.url" mode=""></image>
						<text class="collection-tap-txt">{{item.name}}</text>
					</view>
				</view>
				<view class="collection-title-box" style="margin-top: 20rpx;">
					<text class="collection-title">我的NFT藏品</text>
				</view>
				<scroll-view scroll-y="true" class="collection-scroll">
					<view class="collection-scroll-img-box" v-for="(item,index) in nftBoxs">
						<image class="collection-scroll-img" :src="item.image" mode=""></image>
					</view>
				</scroll-view>
				<image class="userinfo-close" @tap='onCloseChild' src="/static/userinfo/close.png" mode=""></image>
			</view>
			<!--抽奖记录-->
			<view class="drawRecord" :class="{deleteActive:type == 4}" v-if="drawDestroy">
				<!-- <image class="drawRecord-bg" src="/static/bg2.png" mode=""></image> -->
				<view class="drawRecord-box">
					<view class="jackpot-info">
						<image class="jackpot-info-icon3" src="/static/icon3.png" mode=""></image>
						<view class="jackpot-info-mid">
							<text class="jackpot-info-mid-txt1">抽奖总额</text>
							<text class="jackpot-info-mid-txt2">{{drawTotal}}</text>
						</view>
					</view>
					<view class="result-scroll" style="margin-top: 30rpx;">
						<view class="result-titles">
							<view class="result-title-box" style="justify-content: flex-start;padding-left: 20rpx;">
								<text class="result-title">中奖数额(USDT)</text>
							</view>
							<view class="result-title-box" style="justify-content: flex-end;padding-right: 20rpx;">
								<text class="result-title">中奖时间</text>
							</view>
						</view>
						<scroll-view class="myScroll" scroll-y="true" ref='list' @scrolltolower='getPages'>
							<view class="myScroll-list" v-for="(item,index) in drawLists">
								<view class="result-title-box" style="height: 60rpx;justify-content: flex-start;padding-left: 20rpx;">
									<text class="myScroll-list-txt">{{item.amount}}</text>
								</view>
								<view class="result-title-box" style="height: 60rpx;justify-content: flex-end;padding-right: 20rpx;">
									<text class="myScroll-list-txt">{{getSickleTime(item.create_at)}}</text>
								</view>
							</view>
						</scroll-view>
						
					</view>
					<text class="result-title-txt">{{drawTime}} 后将抽取 {{drawNum}} USDT</text>
				</view>
				<image class="userinfo-close" @tap='onCloseChild' src="/static/userinfo/close.png" mode=""></image>
			</view>
			<!--奖池明细-->
			<view class="drawRecord jackpot" :class="{deleteActive:type == 5}" v-if="jackpotDestroy">
				<!-- <image class="drawRecord-bg" src="/static/bg2.png" mode=""></image> -->
				<view class="drawRecord-box">
					<view class="jackpot-info">
						<image class="jackpot-info-icon2" src="/static/icon2.png" mode=""></image>
						<view class="jackpot-info-mid">
							<text class="jackpot-info-mid-txt1">我的奖励总额</text>
							<text class="jackpot-info-mid-txt2">{{jackpotTotal}}</text>
						</view>
					</view>
					<view class="result-inputs">
						<view class="result-input">
							<text class="result-input-txt">今日可领取 {{jackpotCanNum}}</text>
						</view>
						<view class="popup-btn2" @tap='onPoolTake2'>
							<text class="popup-btn-txt">立即领取</text>
						</view>
					</view>
					<view class="result-scroll" style="margin-top: 30rpx;height: 470rpx;">
						<view class="result-titles">
							<view class="result-title-box" style="justify-content: flex-start;padding-left: 20rpx;">
								<text class="result-title">奖池数额(USDT)</text>
							</view>
							<view class="result-title-box" style="justify-content: flex-end;padding-right: 20rpx;">
								<text class="result-title">获取时间</text>
							</view>
						</view>
						<scroll-view class="myScroll" scroll-y="true" style="height: 380rpx;" ref='list' @scrolltolower='getPages'>
							<view class="myScroll-list" v-for="(item,index) in jackpotLists">
								<view class="result-title-box" style="height: 60rpx;justify-content: flex-start;padding-left: 20rpx;">
									<text class="myScroll-list-txt">{{item.amount}}</text>
								</view>
								<view class="result-title-box" style="height: 60rpx;justify-content: flex-end;padding-right: 20rpx;">
									<text class="myScroll-list-txt">{{getSickleTime(item.create_at)}}</text>
								</view>
							</view>
						</scroll-view>
					</view>
				</view>
				<image class="userinfo-close" @tap='onCloseChild' src="/static/userinfo/close.png" mode=""></image>
			</view>
			<!--分红明细-->
			<view class="drawRecord profit" :class="{deleteActive:type == 6}" v-if="profitDestroy">
				<view class="drawRecord-box">
					<view class="jackpot-info">
						<image class="jackpot-info-icon4" src="/static/icon4.png" mode=""></image>
						<view class="jackpot-info-mid">
							<text class="jackpot-info-mid-txt1">分红累计总额</text>
							<text class="jackpot-info-mid-txt2">{{profitTotal}}</text>
						</view>
					</view>
					<view class="result-inputs">
						<view class="result-input">
							<text class="result-input-txt">今日可领取 {{profitCanNum}}</text>
						</view>
						<view class="popup-btn2" @tap='onPoolTake'>
							<text class="popup-btn-txt">立即领取</text>
						</view>
					</view>
					<view class="result-scroll" style="margin-top: 30rpx;height: 510rpx;">
						<view class="result-titles">
							<view class="result-title-box" style="justify-content: flex-start;padding-left: 20rpx;">
								<text class="result-title">分红数额(USDT)</text>
							</view>
							<view class="result-title-box" style="justify-content: flex-end;padding-right: 20rpx;">
								<text class="result-title">获取时间</text>
							</view>
						</view>
						
						<scroll-view class="myScroll" scroll-y="true" ref='list' style="height: 480rpx;" @scrolltolower='getPages'>
							<view class="myScroll-list" v-for="(item,index) in profitLists">
								<view class="result-title-box" style="height: 60rpx;justify-content: flex-start;padding-left: 20rpx;">
									<text class="myScroll-list-txt">{{item.amount}}</text>
								</view>
								<view class="result-title-box" style="height: 60rpx;justify-content: flex-end;padding-right: 20rpx;">
									<text class="myScroll-list-txt">{{getSickleTime(item.create_at)}}</text>
								</view>
							</view>
						</scroll-view>
					</view>
				</view>
				<image class="userinfo-close" @tap='onCloseChild' src="/static/userinfo/close.png" mode=""></image>
			</view>
			<!--关于我们-->
			<view class="drawRecord about-box" :class="{deleteActive:type == 7}" v-if="aboutDestroy">
				<text class="about-title">关于我们</text>
				<scroll-view scroll-y="true" class="about">
					<!-- <view class="abou-txt-box"> -->
					<view class="about-info" style="text-align: center;margin-top: 40rpx;">
						<text class="about-txt">疯狂森林游戏简介</text>
					</view>
					<view class="about-info" style="text-align: center;">
						<text class="about-txt" style="font-size: 18rpx;">GAME INTRODUCTION</text>
					</view>
					<!-- </view> -->
					<view class="about-info">
						<text class="about-info-title">背景</text>
						<text class="about-info-txt">疯狂森林游戏背景设计在2200年，人们因滥伐树木导致荒漠化非常严重，地球仅剩唯一的一块绿地供人类栖息生存，然而这块绿地也仅剩24小时左右的时间就要被沙漠完全侵袭，届时人类将失去赖以生存的家园。幸存的人类需要不断的种植树木来抵御沙漠化的侵袭，每棵树根据其贡献值不同，可以将沙漠化延迟一定时间。</text>
						<text class="about-info-txt">在“碳中和”的大背景下，人们需要为产碳行为付费，同时也可以通过吸碳来赚取受益。树苗的培育会产生大量“碳”，因此人们需要付费购买树苗，但当树苗成长为大树后，大树会吸“碳”，树的主人可以通过出售碳权来获取受益（每棵树最多可以产生三倍受益的碳）。随着沙漠化的日益严重，“碳”的价格也在不断提高，因此人们购买树苗的价格及产生的受益也会不断提高。此外，在这场抵御沙漠化的行动中，还会有抽奖、艺术品（NFT）派发等活动以鼓励为抵御沙漠化做出贡献的人们。</text>
						<text class="about-info-title">疯狂森林的设计逻辑</text>
						<text class="about-info-txt">疯狂森林在使用区块链智能合约保证游戏的公平性与去中心化性的同时，将GameFi与NFT相结合，使游戏由传统的负和博弈模式变成了正和博弈模式，实现了由PLAY-TO-WIN到PLAY-TO-EARN的转变，最终实现玩家共赢。</text>
						<text class="about-info-title">公平性与安全性</text>
						<text class="about-info-txt">疯狂森林在设计之初就将公平性与安全性放在了第一位，不仅利用智能合约保证了游戏的去中心化性，而且使用可验证随机函数来生成游戏中的随机数，保证了游戏的公平性与安全性。疯狂森林是一款完全去中心化游戏，游戏的运行不依赖于运营方，即运营方对游戏没有控制权。疯狂森林从游戏设计上就保证了游戏的公平性，不存在可以提高获胜率的作弊手段。</text>
					</view>
					<!-- <text class="consultingDetails-content-val">植树造林，防止土地沙漠化，如果沙漠化，就需要重启游戏（就是只要用户购买种子就重启了）</text> -->
					<!-- <rich-text class="consultingDetails-content-val"></rich-text> -->
				</scroll-view>
				<image class="userinfo-close" @tap='onCloseChild' src="/static/userinfo/close.png" mode=""></image>
			</view>
			<!--盲盒-->
			<view class="drawRecord blindBox" :class="{deleteActive:type == 8}" v-if="boxDestroy">
				<view class="blindBox-top">
					<view class="blindBox-img-box">
						<image class="blindBox-top-icon" src="/static/index/manghe.png" mode=""></image>
						<view class="blindBox-send">
							<image class="blindBox-send-icon" src="/static/index/icon5.png" mode=""></image>
							<text class="blindBox-img-txt">5</text>
						</view>
					</view>
					<view class="blindBtn" v-if="boxNum == 0" @tap='onBuyBox'></view>
					<view class="blindBtn2" v-if="boxNum > 0"></view>
				</view>
<!-- 				<view class="blind-tips" v-if="boxNum == 2">
					<text class="blind-tips-txt">盲盒已开启</text>
					<text class="blind-tips-txt2">未中奖</text>
				</view>
				<view class="blind-tips" v-if="boxNum == 3">
					<text class="blind-tips-txt">盲盒已开启</text>
					<text class="blind-tips-txt2">获得梭梭树</text>
				</view> -->
				<!-- <view class="blind-info">注意：<br/>一个地址只能购买一个盲盒，盲盒在7天之后系统自动 打开，有一定几率获得一颗梭梭树种子。</view> -->
				<image class="userinfo-close" @tap='onCloseChild' src="/static/userinfo/close.png" mode=""></image>
			</view>
			<view class="newPopup" v-show="childOpen" :class="{popupShow:popupShow}"></view>
			<view class="popupInfo" v-show="childOpen" :class="{popupShow:popupShow}">
				<image class="userinfo-close" @tap='onCloseChildOpen' src="/static/userinfo/close.png" mode=""></image>
				<view class="popupimg-box">
					<image class="popupimg" src="https://img11.360buyimg.com/n1/jfs/t22645/163/900353611/622611/9f832443/5b46f6ddN35a9e347.jpg" mode=""></image>
				</view>
				<view class="popup-btn" @tap='onSave'>
					<text class="popup-btn-txt">长按图片可保存</text>
				</view>
			</view>
		</view>
		<!--藏品内部弹窗-->
		
	<!-- </cover-view> -->
</template>

<script>
	const app = getApp().globalData;
	import popup from './popup2.nvue'
	export default {
		components:{popup},
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
				page:2,
				childOpen:false,
				popupShow:false,
				width:0,
				windowHeight:0,
				giveId:'',//赠送ID
				open:false,
				show:false,
				la:{},
				updataTxt:'检测到新版本...',
				loginNum:-1,
				userInfoShow:true,
				userInfoDestroy:true,
				resultsShow:false,//推广业绩
				resultsDestroy:false,//推广业绩
				resultsIndex:0,
				collectionShow:false,
				collectionDestroy:false,
				drawShow:false,//抽奖
				drawDestroy:false,//抽奖销毁
				jackpotShow:false,
				jackpotDestroy:false,
				profitShow:false,//分红
				profitDestroy:false,
				aboutShow:false,//分红
				aboutDestroy:false,
				boxDestroy:false,
				boxShow:false,
				drawTotal:'--',
				drawLists:[],//抽奖记录
				jackpotTotal:'--',
				jackpotLists:[],
				profitTotal:'--',
				profitLists:[],//分红列表
				directLists:[],
				directTotal:'--',
				indirectLists:[],
				indirectTotal:'--',
				apiLock:true,
				nftUrls:[
					{
						url:'/static/NFT/lolgo1.png',
						name:'nftone'
					}
				],//我NFT平台
			}
		},
		props:{
			// type:{
			// 	default:1,//类型
			// },
			refNum:{//推荐奖励
				default:'--'
			},
			boxNum:{
				default:0
			},
			isStart:{
				default:false
			},
			drawTime:{
				default:''
			},
			drawNum:{
				default:''
			},
			nftBoxs:{
				//我的NFT藏品
				default:[]
			},
			jackpotCanNum:{
				default:'--'
			},
			profitCanNum:{
				default:'--'
			},
			accredit:{
				default:'--'
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
			onRefTake(){
				//领取推荐奖励
				uni.showLoading({mask:true});
				app.forestContract.refTake()
				.send((error, transactionHash)=>{
					console.log(transactionHash)
					if(!error){
						// this.toWater();
						setTimeout(()=>{
							this.$emit('onRefresh')
						},3000)
						app.$tips('领取交易进行中,请等待交易完成');
					}else{
						app.$tips('交易失败')
						this.apiLock = true;
					};
					uni.hideLoading();
				})
				.catch(err=>{
					this.apiLock = true;;
					uni.hideLoading();
				})
			},
			async onBuyBox(){
				//购买盒子
				if(this.accredit == '--') return;
				uni.showLoading({mask:true});
				if(this.accredit>0){
					//已授权
					app.forestContract.buyBox()
					.send((error, transactionHash)=>{
						console.log(transactionHash)
						this.apiLock = true;
						if(!error){
							// this.toWater();
							setTimeout(()=>{
								this.$emit('onRefresh')
							},3000)
							app.$tips('交易进行中,请等待交易完成');
						}else{
							app.$tips('交易失败')
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
					uni.showLoading({mask:true});
					const num = new Number(2**255-1).toLocaleString().split(',').join('');
					app.usdtContract.approve(app.forest_Address,num)
					.send((error, transactionHash)=>{
						if(!error) {
						   console.log(transactionHash);
						   app.$tips('授权交易进行中，请等待交易完成');
						   setTimeout(()=>{
						   	this.$emit('onRefreshBusiness')
						   },3000)
						} else {
						   console.log(error);
						   uni.hideLoading();
						}
					})
				}
			},
			getHideInfo(str){
				//隐藏中间信息
				const newStr = str+'';
				return newStr.substring(0,2) + '**' + newStr.substring(newStr.length - 3)
			},
			onPoolTake(){
				//提取分红收益
				
				if(this.profitCanNum*1 >0){
					if(!this.apiLock) return;
					this.apiLock = false;
					app.forestContract.dividendTake()
					.send((error, transactionHash)=>{
						console.log(transactionHash)
						if(!error){
							// this.toWater();
							app.$tips('提取分红交易进行中,请等待交易完成');
							this.$emit('onRefresh');
						}else{
							app.$tips('提取失败')
							this.apiLock = true;
						};
						uni.hideLoading();
					})
					.catch(err=>{
						this.apiLock = true;
						uni.hideLoading();
					})
				}else{
					app.$tips('无收益可领取')
				}
				
			},
			onPoolTake2(){
				//提取奖池收益
				console.log(this.jackpotCanNum)
				if(this.jackpotCanNum*1 >0){
					if(!this.apiLock) return;
					this.apiLock = false;
					app.forestContract.poolTake()
					.send((error, transactionHash)=>{
						console.log(transactionHash)
						if(!error){
							// this.toWater();
							app.$tips('提取奖池交易进行中,请等待交易完成');
							this.$emit('onRefresh');
						}else{
							app.$tips('提取失败')
							this.apiLock = true;
						};
						uni.hideLoading();
					})
					.catch(err=>{
						this.apiLock = true;
						uni.hideLoading();
					})
				}else{
					app.$tips('无收益可领取')
				}
				
			},
			onSave(url){
				//保存图片
				uni.getImageInfo({
					 src: 'https://img2.doubanio.com/view/richtext/large/public/p188557852.jpg',
					 success: function(image) {
						 console.log(image)
						 uni.saveImageToPhotosAlbum({
							  filePath: image.path,
							  success: function(res) {
								  // uni.showToast({
									 //  title: '图片保存成功'
								  // });
							  }
						 })
					 },
				});
			},
			onChildOpen(){
				this.childOpen = true;
				setTimeout(()=>{
					this.popupShow = true;
				},200)
			},
			onCloseChildOpen(){
				this.popupShow = false;
				setTimeout(()=>{
					this.childOpen = false;
				},200)
			},
			onResultsIndex(index){
				this.resultsIndex = index;
				const data ={
					reward_type:this.resultsIndex+1,
					page:1,
					size:10,
				};
				if(!this.apiLock) return;
				this.apiLock = false;
				uni.showLoading({mask:true});
				app.$get('user/performance',data)
				.then(res=>{
					console.log(res);
					uni.hideLoading();
					this.apiLock = true;
					if(res.data.status == 1){
						this.page = 2;
						if(this.resultsIndex == 0){
							this.directTotal = res.data.result.total;
							this.directLists = res.data.result.data;
						}else{
							this.indirectTotal = res.data.result.total;
							this.indirectLists = res.data.result.data;
						}
						
					}
				})
				.catch(err=>{
					this.apiLock = true;
					uni.hideLoading();
				})
			},
			onSwiper(ev){
				this.resultsIndex = ev.detail.current;
			},
			toResults(){
				//业绩
				const data ={
					reward_type:this.resultsIndex+1,
					page:1,
					size:10,
				};
				if(!this.apiLock) return;
				this.apiLock = false;
				uni.showLoading({mask:true});
				app.$get('user/performance',data)
				.then(res=>{
					console.log(res);
					uni.hideLoading();
					this.apiLock = true;
					if(res.data.status == 1){
						this.directTotal = res.data.result.total;
						this.directLists = res.data.result.data;
						this.type= 0;
						this.page = 2;
						setTimeout(()=>{
							this.userInfoDestroy = false;
							this.resultsDestroy = true;
							this.$nextTick(()=>{
								setTimeout(()=>{
									this.type = 2;
								},60)
							})
						},200)
					}
				})
				.catch(err=>{
					this.apiLock = true;
					uni.hideLoading();
				})
				
			},
			toAbout(){
				//关于我们
				this.type= 0;
				setTimeout(()=>{
					this.userInfoDestroy = false;
					this.aboutDestroy = true;
					this.$nextTick(()=>{
						setTimeout(()=>{
							this.type = 7;
						},60)
					})
				},200)
			},
			toProfit(){
				//分红
				if(!this.isStart){
					app.$tips('请等待游戏开始')
					return
				}
				const data ={
					page:1,
					size:10,
				};
				if(!this.apiLock) return;
				this.apiLock = false;
				uni.showLoading({mask:true});
				app.$get('user/dividend',data)
				.then(res=>{
					console.log(res);
					uni.hideLoading();
					this.apiLock = true;
					if(res.data.status == 1){
						this.profitTotal = res.data.result.total;
						this.profitLists = res.data.result.data;
						this.type= 0;
						this.page = 2;
						setTimeout(()=>{
							this.userInfoDestroy = false;
							this.profitDestroy = true;
							this.$nextTick(()=>{
								setTimeout(()=>{
									this.type = 6;
								},60)
							})
						},200)
					}
				})
				.catch(err=>{
					this.apiLock = true;
					uni.hideLoading();
				})
			},
			toDraw(){
				//抽奖
				const data ={
					page:1,
					size:10,
				};
				if(!this.apiLock) return;
				this.apiLock = false;
				uni.showLoading({mask:true});
				app.$get('user/lottery',data)
				.then(res=>{
					console.log(res);
					uni.hideLoading();
					this.apiLock = true;
					if(res.data.status == 1){
						this.drawTotal = res.data.result.total;
						this.drawLists = res.data.result.data;
						this.type= 0;
						this.page = 2;
						setTimeout(()=>{
							this.userInfoDestroy = false;
							this.drawDestroy = true;
							this.$nextTick(()=>{
								setTimeout(()=>{
									this.type = 4;
								},60)
							})
						},200)
					}
				})
				.catch(err=>{
					this.apiLock = true;
					uni.hideLoading();
				})
				
			},
			getSickleTime(str){
				//时间切割
				return str.split(' ')[0];
			},
			getPages(){
				let api = '';
				const data ={
					page:this.page,
					size:10,
				};
				if(this.type == 2){
					api = 'user/performance';
					data.reward_type = this.resultsIndex+1;
				}else if(this.type == 4){
					api = 'user/lottery';
				}else if(this.type == 5){
					api = 'uuser/pool';
				}else if(this.type == 6){
					api = 'user/dividend';
				}
				if(!this.apiLock) return;
				this.apiLock = false;
				app.$get(api,data)
				.then(res=>{
					this.apiLock = true;
					console.log(res,this.page)
					if(res.data.result.data.length ==0) return;
					if(this.type == 2){
						if(this.resultsIndex == 0){
							this.directLists = this.directLists.concat(res.data.result.data)
						}else{
							this.indirectLists = this.indirectLists.concat(res.data.result.data)
						};
						this.page ++;
					}else if(this.type == 4){
						this.drawLists = this.drawLists.concat(res.data.result.data);
						this.page++
					}else if(this.type == 5){
						this.jackpotLists = this.jackpotLists.concat(res.data.result.data);
						this.page++
					}else if(this.type == 6){
						this.profitLists = this.profitLists.concat(res.data.result.data);
						this.page++
					}
				})
			},
			toJackpot(){
				//奖池记录
				if(!this.isStart){
					app.$tips('请等待游戏开始')
					return
				}
				const data ={
					page:1,
					size:10,
				};
				if(!this.apiLock) return;
				this.apiLock = false;
				uni.showLoading({mask:true});
				app.$get('user/pool',data)
				.then(res=>{
					console.log(res);
					uni.hideLoading();
					this.apiLock = true;
					if(res.data.status == 1){
						this.jackpotTotal = res.data.result.total;
						this.jackpotLists = res.data.result.data;
						this.type= 0;
						this.page = 2;
						setTimeout(()=>{
							this.userInfoDestroy = false;
							this.jackpotDestroy = true;
							this.$nextTick(()=>{
								setTimeout(()=>{
									this.type = 5;
								},60)
							})
						},200)
					}
				})
				.catch(err=>{
					this.apiLock = true;
					uni.hideLoading();
				})
				
				
			},
			toBox(){
				//盲盒
				if(this.isStart){
					app.$tips('请在游戏开始前购买')
					return
				}
				this.type= 0
				setTimeout(()=>{
					this.userInfoDestroy = false;
					this.boxDestroy = true;
					this.$nextTick(()=>{
						setTimeout(()=>{
							this.type = 8;
						},60)
					})
				},200)
			},
			async openBox(){
				// const res = await app.forestContract.openBox().send({feeLimit:tronWeb.toSun(5000),})
				const res = await app.forestContract.openBox().send((error, transactionHash) => {
						// console.log(transactionHash)
						this.apiLock = true;
						if (!error) {
							// this.toWater();
							setTimeout(() => {
								this.getUserBox();
							}, 3000)
							app.$tips('交易进行中,请等待交易完成');
						} else {
							app.$tips('交易失败')
							this.apiLock = true;
						};
						uni.hideLoading();
					}).catch(err => {
						console.log("交易进行中失败"+err)
					})
				// const res = await app.forestContract.openBox().call()
				console.log(res);
			},
			toCollection(){
				//藏品
				
				this.type= 0
				setTimeout(()=>{
					this.userInfoDestroy = false;
					this.collectionDestroy = true;
					this.$nextTick(()=>{
						setTimeout(()=>{
							this.type = 3;
						},60)
					})
				},200)
			},
			onClose(){
				setTimeout(()=>{
					//初始化
					this.type =0;
					this.userInfoShow = true;
					this.userInfoDestroy = true;
					this.resultsShow = false;
					this.resultsDestroy = false;
					this.collectionDestroy =false;
					this.collectionShow = false;
					this.drawDestro = false;
					this.drawShow = false;
					this.jackpotDestroy = false;
					this.jackpotShow = false;
					this.profitShow = false;//分红
					this.profitDestroy = false;
					this.aboutDestroy = false;
					this.aboutShow = false;
					this.boxDestroy = false;
					this.boxShow = false;
				},200)
				this.$emit('onClose');
			},
			onCloseChild(){
				this.type = 0;
				
				setTimeout(()=>{
					this.resultsDestroy = false;
					this.collectionDestroy = false;
					this.drawDestroy = false;
					this.jackpotDestroy = false;
					this.profitDestroy = false;
					this.aboutDestroy = false;
					this.boxDestroy = false;
					this.userInfoDestroy = true;
					this.$nextTick(()=>{
						setTimeout(()=>{
							this.type = 1
						},60)
					})
				},200)
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
	
	.blind-tips{
		@include size(507rpx,86rpx,none);
		display: flex;
		background: url(@/static/btn3.png) no-repeat;
		background-size: 100% 100%;
		align-items: center;
		justify-content: space-between;
		padding-left: 25rpx;
		padding-right: 25rpx;
		box-sizing: border-box;
		.blind-tips-txt{
			@include font($e,#5E2107);
			@include bold();
		}
		.blind-tips-txt2{
			@include font($e,#F40000);
			@include bold();
		}
	}
	.blindBox-top{
		width: 680rpx;
		height: 151rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		box-sizing: border-box;
		padding-left: 110rpx;
		padding-right: 110rpx;
		margin-top: 170rpx;
		
		.blindBtn{
			@include size(156rpx,70rpx,none);
			background: url(@/static/buy.png) no-repeat;
			background-size: 100% 100%;
		}
		.blindBtn2{
			@include size(156rpx,70rpx,none);
			background: url(@/static/btn4.png) no-repeat;
			background-size: 100% 100%;
		}
		.blindBox-send{
			@include size(125rpx,30rpx,none);
			@include re();
			display: flex;
			align-items: center;
			justify-content: center;
			margin-top: 106rpx;
		}
		.blindBox-send-icon{
			@include size(40rpx,40rpx,none);
			@include ab();
			left: 3rpx;
			bottom: 1rpx;
			z-index: 90;
		}
		.blindBox-top-icon{
			@include size(120rpx,120rpx,none);
			@include ab();
		}
		.blindBox-img-box{
			@include size(125rpx,151rpx,none);
			display: flex;
			flex-direction: column;
			align-items: center;
			@include re();
			.blindBox-img-txt{
				width: 100rpx;
				height: 35rpx;
				background-color: #FFDA9E;
				border-radius: 30rpx;
				border: 1rpx solid #5E2107;
				@include font($e,#5E2107);
				text-align: center;
				line-height: 35rpx;
				@include bold();
				@include ab();
				bottom: 0;
			}
		}
	}
	
	
	.newPopup{
		@include size(100%,100vh,none);
		background: rgba(0,0,0,.7);
		position: fixed;
		left: 0;
		top: 0;
		z-index: 30;
		opacity: 0;
		transition: .3s;
	}
	
	//关于我们
	.about-title{
		@include font($e,#FFFFFF);
		@include bold();
		margin-top: 30rpx;
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
	.consultingDetails-content-val{
		margin-left: 20rpx;
		background-color: rgba(255,255,255,0);
		@include font($m,#333);
	}
	//分红
	.result-inputs{
		width: 514rpx;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		margin-top: 20rpx;
	}
	.result-input{
		@include size(300rpx,76rpx,#FFD252);
		border-radius: 10rpx;
		text-align: center;
		@include cen();
		border-width: 1rpx;
		border-style: solid;
		border-color: #792800;
	}
	.result-input-txt{
		@include font($m,#792800);
		@include bold();
	}
	//奖池明细
	.drawRecord{
		@include size(680rpx,970rpx,none);
		background: url(@/static/bg3.png) no-repeat;
		background-size: 100% 100%;
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
	.profit{
		background: url(@/static/bg4.png) no-repeat;
		background-size: 100% 100%;
	}
	.jackpot{
		background: url(@/static/bg2.png) no-repeat;
		background-size: 100% 100%;
	}
	.drawRecord-box{
		width: 567rpx;
		height: 787rpx;
		border-radius: 10rpx;
		background-color: #FFDA9E;
		margin-top: 123rpx;
		display: flex;
		flex-direction: column;
		align-items:center ;
	}
	.drawRecord-bg{
		@include size(680rpx,970rpx,none);
		@include ab();
		left: 0;
		top: 0;
	}
	.jackpot-info{
		@include size(567rpx,100rpx,none);
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		margin-top: 40rpx;
	}
	.jackpot-info-icon1{
		@include size(118rpx,100rpx,none)
	}
	.jackpot-info-icon2{
		@include size(115rpx,100rpx,none)
	}
	.jackpot-info-icon3{
		@include size(119rpx,111rpx,none)
	}
	.jackpot-info-icon4{
		@include size(86rpx,109rpx,none)
	}
	.jackpot-info-mid{
		height: 100rpx;
		display: flex;
		flex-direction: column;
		justify-content: center;
		margin-left: 20rpx;
	}
	.jackpot-info-mid-txt1{
		@include font($s,#792800);
	}
	.jackpot-info-mid-txt2{
		@include font($e,#792800);
		@include bold();
		margin-top: 10rpx;
	}
	//藏品
	.popupInfo{
		@include size(650rpx,950rpx,none);
		opacity: 0;
		transition-property:opacity;
		transition-duration:.3s;
		@include ab();
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		z-index: 99999999;
	}
	.popup-btn{
		@include size(220rpx,88rpx,none);
		@include re();
		@include cen();
		margin-top: 75rpx;
	}
	.popup-btn2{
		@include size(175rpx,70rpx,none);
		background: url(@/static/btn.png) no-repeat;
		background-size: 100% 100%;
		@include re();
		@include cen();
	}
	.popup-btn-bg{
		@include size(220rpx,88rpx,none);
		@include ab();
		left: 0;
		top: 0;
	}
	.popup-btn-bg2{
		@include size(175rpx,70rpx,none);
		@include ab();
		left: 0;
		top: 0;
	}
	.popup-btn-txt{
		@include font($m,white);
		@include bold()
	}
	.popupimg-box{
		@include size(442rpx,531rpx,none);
	}
	.popupimg{
		@include size(442rpx,531rpx,none);
	}
	.popupShow{
		opacity :1
	}
	.collection-scroll{
		@include size(514rpx,370rpx,#F3BB62);
		border-radius: 10rpx;
		margin-top: 10rpx;
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
	}
	.collection-scroll-img-box{
		@include size(171rpx,151rpx,none);
		@include cen();
		margin-top: 20rpx;
		float: left;
	}
	.collection-scroll-img{
		@include size(125rpx,151rpx,none)
	}
	.collection-taps{
		width: 514rpx;
		height: 350rpx;
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		margin-top: 15rpx;
	}
	.collection-tap{
		width: 171rpx;
		height: 180rpx;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		margin-top: 20rpx;
		
	}
	.collection-tap-icon{
		@include size(100rpx,100rpx,none);
	}
	.collection-tap-txt{
		@include font($m,#333);
		@include bold();
		margin-top: 12rpx;
	}
	.collection-title-box{
		width: 514rpx;
		margin-top: 171rpx;
		padding-left: 20rpx;
	}
	.collection-title{
		@include font($m,#A33200);
		@include bold();
	}
	.blindBox{
		width: 688rpx;
		height: 701rpx;
		background: url(@/static/boxbg.png) no-repeat;
		background-size: 100% 100%;
		.blind-info{
			width: 471rpx;
			@include font(20rpx,#5E2107);
			margin-top: 60rpx;
		}
	}
	.collection{
		@include size(680rpx,1060rpx,none);
		background: url(@/static/bg.png) no-repeat;
		background-size: 100% 100%;
		transition-property:transform;
		transition-duration:.2s;
		transform: scale(0);
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	.collection-bg{
		@include size(680rpx,1060rpx,none);
		@include ab();
		left: 0;
		top: 0;
	}
	//推广业绩
	.myScroll{
		width: 514rpx;
		height: 520rpx;
	}
	.myScroll-list{
		@include size(514rpx,60rpx,none);
		display: flex;
		flex-direction: row;
		align-items: center;
		border-bottom-color: #B9731E;
		border-bottom-style: solid;
		border-bottom-width: 1rpx;
		justify-content: space-between;
		box-sizing: border-box;
	}
	.myScroll-list-txt{
		@include font($s,#822700);
		@include bold();
	}
	.resultSwiper{
		@include size(514rpx,685rpx,none)
	}
	.resultSwiper-item{
		@include size(514rpx,685rpx,none)
	}
	.resultSwiper-item-c{
		@include size(514rpx,685rpx,none)
	}
	.result-scroll{
		@include size(514rpx,620rpx,#FFCF80);
		border-radius: 10rpx;
		margin-top: 15rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	.result-titles{
		@include size(514rpx,90rpx,none);
		display: flex;
		flex-direction: row;
		align-items: center;
	}
	.result-title-box{
		height: 90rpx;
		flex: 1;
		@include cen();
	}
	.result-title{
		@include font($s,#7F592F);
		@include bold();
	}
	.result-title-txt{
		@include font(28rpx,white);
		@include bold();
		margin-top: 45rpx;
	}
	.result-total-box{
		@include size(514rpx,100rpx,none);
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		margin-top: 20rpx;
	}
	.result-icon{
		@include size(81rpx,75rpx,none);
	}
	.result-totle-mid{
		display: flex;
		flex-direction: column;
		justify-content: center;
		margin-left: 20rpx;
	}
	.result-totle-mid-txt{
		@include font($s,#792800);
	}
	.result-totle-mid-txt2{
		@include font($e,#792800);
		@include bold();
		margin-top: 10rpx;
	}
	.results{
		@include size(680rpx,1152rpx,none);
		background: url(@/static/bg5.png) no-repeat;
		background-size: 100% 100%;
		transition-property:transform;
		transition-duration:.2s;
		transform: scale(0);
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	.receive-box{
		width: 680rpx;
		margin-top: 34rpx;
		display: flex;
		justify-content: space-between;
		padding-left: 100rpx;
		padding-right: 100rpx;
		box-sizing: border-box;
		align-items: center;
	}
	.receive-left{
		display: flex;
		flex-direction: column;
		justify-content: center;
		@include font(18rpx,#792800)
	}
	.results-bg-c{
		@include size(560rpx,920rpx,#FFDA9E);
		border-radius: 20rpx;
		margin-top: 160rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	.results-bg{
		@include size(680rpx,892rpx,none);
		@include ab();
		left: 0;
		top: 0;
	}
	.results-taps{
		@include size(530rpx,70rpx,none);
		display: flex;
		box-sizing: border-box;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		padding-left: 20rpx;
		padding-right: 20rpx;
		margin-top: 30rpx;
	}
	.results-tap{
		@include size(240rpx,70rpx,#FFCF80);
		border-radius: 10rpx;
		@include cen();
		transition-property:background-color;
		transition-duration:.3s;
	}
	.resultsActive{
		background-color: #F3BB62;
	}
	
	.results-tap-txt{
		@include font($e,#CA7B48);
		@include bold();
	}
	.resultsTextActive{
		color: #792800;
	}
	.userinfo-title{
		@include font(42rpx,#FFEEC5);
		font-weight: bold;
		@include ab();
		top: 23rpx;
	}
	.userinfo-close{
		@include size(50rpx,50rpx,none);
		@include ab();
		top: 50rpx;
		right: 20rpx;
	}
	.userinfo-list{
		@include size(520rpx,110rpx,none);
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		margin-top: 15rpx;
	}
	.userinfo-list-icon{
		@include size(83rpx,85rpx,none);
		margin-right: 20rpx;
	}
	.userinfo-txt{
		@include font($e,#5E2107);
		@include bold();
	}
	.userinfo{
		@include size(622rpx,1111rpx,none);
		background: url(@/static/userinfo/bg.png) no-repeat;
		background-size: 100% 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		transform: scale(0);
		transition: .2s;
	}
	.userinfo-bg{
		@include size(622rpx,985rpx,none);
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
		display: flex;
		flex-direction: column;
		align-items: center;
		border-radius: 10rpx;
		position: fixed;
		left: 0;
		top: 0;
		justify-content: center;
		z-index: 25;
	}
	.deleteActive{
		transform: scale(1);
	}
	.hide{
		transform: scale(0);
	}
</style>
