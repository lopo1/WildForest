<template>
	<view class="content" style="background-color: #6CC610;" :class="{isDesert:userUseBg== ''}" @touchstart='onPlayMp3'>
		<scroll-view ref='list' scroll-y="true" class="box">
			<view class="view-bg-box">
				<image class="view-bg" :src="userUseBg"></image>
				<view class="notice-box">
					<view class="notice" @tap='onPlayMp3'>
						<view class="notice-t-box">
							<view ref='notice-t' class="notice-t" id="notice-t">
								<view class="noticeTxt-box"
									:style="{transform: 'translateX('+chrendWidth+'px)',transition:transition}">
									<text ref='noticeTxt' class="notive-v">{{notice}}</text>
								</view>
							</view>
						</view>
						<image class="notice-icon" src="/static/index/icon1.png"></image>
					</view>
				</view>
				<view class="tree-box" :class="{desertBg:isDesert}">
					<!-- <image src="/static/index/treebg.png" class="tree-bg" mode=""></image> -->
					<text class="tree-num" :class="{treeActive:showText}">{{treeName}}</text>
					<view class="trees" v-for="(item,index) in userTreeDetails">
						<view class="tree">
							<!--神奇果树-->
							<image class="tree-magic" @tap='onShowText(0,-1)'
								v-show="userMagicTreeMax >= ((index*1+1)*2 -1)" src="/static/index/magic.png" mode="">
							</image>
							<!-- <text class="tree-shit">{{(index*1)*2}}</text> -->
							<!-- <text class="tree-shit" v-if="userMagicTrees[(index*1)*2]">{{userMagicTrees[(index*1)*2].tokenId}}</text> -->
							<image class="tree-shit" src="/static/index/shit.png"
								@tap='onOpenMagic(userMagicTrees[(index*1)*2].index)'
								v-show="userMagicTrees[(index*1)*2] && userMagicTrees[(index*1)*2].tokenId>0 && !userMagicTrees[(index*1)*2].status">
							</image>
						</view>
						<view class="tree" @tap='onShowText(0,index)'>
							<!--树苗-->
							<image class="tree-icon1" src="/static/index/tree1.png" v-show="item.one >0" mode="">
							</image>
						</view>
						<view class="tree" @tap='onShowText(0,index)'>
							<!--树苗-->
							<image class="tree-icon1" src="/static/index/tree1.png" v-show="item.one >1" mode="">
							</image>
						</view>
						<view class="tree" @tap='onShowText(0,index)'>
							<!--树苗-->
							<image class="tree-icon1" src="/static/index/tree1.png" v-show="item.one >2" mode="">
							</image>
						</view>
						<view class="tree" @tap='onShowText(1,index)'>
							<!--第二阶段-->
							<image class="two0" src="/static/index/jun2.png" v-show="index == 0 && item.two>0" mode="">
							</image>
							<image class="two1" src="/static/index/sha2.png" v-show="index == 1 && item.two>0" mode="">
							</image>
							<image class="two2" src="/static/index/yu2.png" v-show="index == 2 && item.two>0" mode="">
							</image>
							<image class="two3" src="/static/index/bai2.png" v-show="index == 3 && item.two>0" mode="">
							</image>
							<image class="two4" src="/static/index/zhang2.png" v-show="index == 4 && item.two>0"
								mode=""></image>
							<image class="two5" src="/static/index/yun2.png" v-show="index == 5 && item.two>0" mode="">
							</image>
							<image class="two6" src="/static/index/hu2.png" v-show="index == 6 && item.two>0" mode="">
							</image>
							<image class="two7" src="/static/index/leng2.png" v-show="index == 7 && item.two>0" mode="">
							</image>
						</view>
						<view class="tree" @tap='onShowText(2,index)'>
							<!--第三阶段-->
							<image class="three0" src="/static/index/jun3.png" v-show="index == 0 && item.three>0"
								mode=""></image>
							<image class="three1" src="/static/index/sha3.png" v-show="index == 1 && item.three>0"
								mode=""></image>
							<image class="three2" src="/static/index/yu3.png" v-show="index == 2 && item.three>0"
								mode=""></image>
							<image class="three3" src="/static/index/bai3.png" v-show="index == 3 && item.three>0"
								mode=""></image>
							<image class="three4" src="/static/index/zhang3.png" v-show="index == 4 && item.three>0"
								mode=""></image>
							<image class="three5" src="/static/index/yun3.png" v-show="index == 5 && item.three>0"
								mode=""></image>
							<image class="three6" src="/static/index/hu3.png" v-show="index == 6 && item.three>0"
								mode=""></image>
							<image class="three7" src="/static/index/leng3.png" v-show="index == 7 && item.three>0"
								mode=""></image>
						</view>
						<view class="tree">
							<!--神奇果树-->
							<image class="tree-magic" @tap='onShowText(0,-1)'
								v-show="userMagicTreeMax > ((index*1+1)*2)" src="/static/index/magic.png" mode="">
							</image>
							<!-- <text class="tree-shit">{{(index*1)*2+1}}</text> -->
							<image class="tree-shit" src="/static/index/shit.png"
								@tap='onOpenMagic(userMagicTrees[(index*1)*2+1].index)'
								v-show="userMagicTrees[(index*1)*2+1] && userMagicTrees[(index*1)*2+1].tokenId>0 && !userMagicTrees[(index*1)*2+1].status">
							</image>
						</view>
					</view>
				</view>
			</view>
			<!--公告-->
			<view class="draws">
				<view class="draw">
					<!-- <image class="draw-bg" src="/static/index/icon3.png"></image> -->
					<text
						class="draw-time">{{drawTimeInfo.h<10? '0'+drawTimeInfo.h:drawTimeInfo.h}}:{{drawTimeInfo.m<10? '0'+drawTimeInfo.m:drawTimeInfo.m}}:{{drawTimeInfo.s<10? '0'+drawTimeInfo.s:drawTimeInfo.s}}</text>
					<view class="draw-title-box">
						<text class="draw-title">抽奖奖池</text>
						<image class="draw-icon" src="/static/index/icon5.png"></image>
						<text class="draw-title2">{{drawNum}}</text>
					</view>
				</view>
				<view class="draw draw2">
					<!-- <image class="draw-bg" src="/static/index/icon4.png"></image> -->
					<text class="draw-time">{{desertTime}}</text>
					<view class="draw-title-box">
						<text class="draw-title">终极奖池</text>
						<image class="draw-icon" src="/static/index/icon5.png"></image>
						<text class="draw-title2">{{endUsdt}}</text>
					</view>
				</view>
			</view>

			<view class="info" @tap='onActivate'>
				<!-- <image class="info-bg" src="/static/index/bg1.png" mode=""></image> -->
				<view class="info-msg">
					<text class="info-msg-txt1">我的贡献值</text>
					<text class="info-msg-txt2">{{contribution}}</text>
					<view class="info-msg-txt3-box">
						<text class="info-msg-txt3">{{isActivate? '已激活':'未激活'}}</text>
					</view>
				</view>
			</view>
			<view class="address">
				<text class="address-txt">{{showAccount}}</text>
			</view>
			<view class="guide">
				<image class="guide-bg" src="/static/index/bg3.png" mode="" @tap='toRule'></image>
			</view>
			<view class="balance">
				<view class="balance-box">
					<text class="balance-txt">{{jackpotTotal}}</text>
				</view>
				<image class="balance-icon" src="/static/index/icon2.png" mode=""></image>
			</view>
			<image class="balance-title" src="/static/index/title.png" mode=""></image>
			<view class="water" @tap='onWater'>
				<image class="water-bg" src="@/static/index/bg4.png" mode=""></image>
				<!-- 	<view class="water-txt-box">
					<text class="water-txt">今日已浇水{{waterCount}}次</text>
				</view> -->
			</view>
			<view class="contribute">
				<image class="contribute-icon" src="/static/icon6.png" mode=""></image>
				<view class="contribute-right">
					<text class="contribute-right-txt">{{allContribution}}</text>
				</view>
			</view>
			<view style="width:750rpx;height: 180rpx;"></view>
		</scroll-view>

		<view class="tabs">
			<image class="tab-bg" src="/static/index/tab.png" mode=""></image>
			<view class="tab-box">
				<image class="tab1" @tap='toBuy' src="/static/index/tab1.png" mode=""></image>
				<image class="tab2" @tap='toStore' src="/static/index/tab2.png" mode=""></image>
				<image class="tab3" @tap='toNft' src="/static/index/tab3.png" mode=""></image>
				<image class="tab4" @tap='toFriend' src="/static/index/tab4.png" mode=""></image>
				<image class="tab5" @tap='toReloading' src="/static/index/tab5.png" mode=""></image>
			</view>
		</view>
		<popup
			:open='open || ruleOpen || activateOpen || storeOpen || nftOpen || buyOpen || friendOpen || desertOpen || getOpen || fruitOpen || nftOpen2 || reloadingOpen || waterOpen' />
		<business ref='business' :boxNum='boxNum' :refNum='refNum' :accredit='accredit' :isStart='isStart'
			:drawNum='drawNum' :drawTime='drawTimeInfoStr' :getShow='open' @onClose='onClose'
			:jackpotCanNum='jackpotCanNum' :profitCanNum='profitCanNum' @onRefresh='onRefreshBusiness'
			:nftBoxs='nftBoxs' />
		<activate ref='activate' :getShow='activateOpen' @onClose='onClose' @onActivateRefresh='onActivateRefresh' />
		<buy ref='buy' :getShow='buyOpen' @onClose='onClose' :usdt='usdtBalance' :accredit='accredit'
			:treePrices='treePrices' @onBuyRefresh='onBuyRefresh' />
		<store ref='store' :getShow='storeOpen' @onClose='onClose' :userTrees='userTrees' />
		<aboutNFT ref='aboutnft' :getShow='nftOpen' @onClose='onClose' :nfts='nfts' :nftTotal='nftTotal' />
		<friendPopup ref='friendPopup' :getShow='friendOpen' @onClose='onClose' :account='account' />
		<desert ref='desert' :getShow="desertOpen" @onClose='onClose' />
		<getAward ref='get' :getShow="getOpen" @onClose='onClose' />
		<fruit ref='fruit' :getShow="fruitOpen" @onClose='onClose' />
		<nft ref='nft' :getShow="nftOpen2" @onClose='onClose' />
		<rule ref='rule' :getShow="ruleOpen" @onClose='onClose' />
		<reloading ref='reloading' :getShow="reloadingOpen" @onClose='onClose' :bgs='bgs' :userBgIndex='userBgIndex'
			@onRefresh='onRefreshBgs' />
		<water ref='water' :getShow="waterOpen" @onClose='onClose' @onWaterRefresh='onWaterRefresh' />
		<view class="title-view" v-show="isDApp">
			<view class="title">
				{{dappMsg}}
			</view>
		</view>
	</view>
</template>

<script>
	const app = getApp().globalData;
	import popup from '@/components/popup.vue';
	import business from '@/components/business.vue';
	import activate from '@/components/activate.vue';
	import store from '@/components/store.vue';
	import buy from '@/components/buy.vue';
	import aboutNFT from '@/components/aboutNFT.vue';
	import friendPopup from '@/components/friendPopup.vue';
	import desert from '@/components/desert.vue';
	import getAward from '@/components/getAward.vue';
	import fruit from '@/components/fruit.vue';
	import nft from '@/components/nft.vue';
	import reloading from '@/components/reloading.vue'; //换装
	import water from '@/components/watering.vue'; //换装
	import rule from '@/components/rule.vue'; //换装
	export default {
		components: {
			popup,
			business,
			activate,
			buy,
			store,
			aboutNFT,
			friendPopup,
			desert,
			getAward,
			fruit,
			nft,
			reloading,
			water,
			rule
		},
		data() {
			return {
				type: 1,
				open: false,
				apiLock: true,
				activateOpen: false,
				storeOpen: false,
				nftOpen: false,
				buyOpen: false,
				friendOpen: false,
				desertOpen: false,
				getOpen: false,
				fruitOpen: false,
				nftOpen2: false,
				reloadingOpen: false,
				waterOpen: false,
				ruleOpen: false,
				osHeight: '',
				notice: "",
				noticeWidth: 0,
				chrendWidth: 0,
				noticeLock: true,
				noticeMoveLock: false,
				transition: '',
				tronWeb: "",
				account: "",
				balance: "",
				showAccount: "", //展示账号,
				waterCount: "--", //今日浇水次数
				isActivate: false, //是否激活
				jackpotTotal: "--", //累计分红奖池
				jackpotCanNum: "--", //用户可领取的奖池
				profitCanNum: "--", //用户可领取的分红
				usdtDec: "",
				contribution: "--", //我的贡献值
				allContribution: "--",
				usdtBalance: "",
				accredit: '', //授权数量
				userTrees: [],
				showText: false,
				timer: '',
				treeIndex: 0,
				treeName: '',
				treeNum: 0,
				userTreeDetails: [{
						one: 0,
						two: 0,
						three: 0
					},
					{
						one: 0,
						two: 0,
						three: 0
					},
					{
						one: 0,
						two: 0,
						three: 0
					},
					{
						one: 0,
						two: 0,
						three: 0
					},
					{
						one: 0,
						two: 0,
						three: 0
					},
					{
						one: 0,
						two: 0,
						three: 0
					},
					{
						one: 0,
						two: 0,
						three: 0
					},
					{
						one: 0,
						two: 0,
						three: 0
					},
				],
				userMagicTrees: [], //用户神奇树
				userMagicTreeMax: 0, //一共有多少颗神奇树
				endUsdt: "--", //终极奖池
				bgs: [], //背景列表
				drawNum: '--', //抽奖奖池
				userBgIndex: '', //用户使用的背景下标
				drawTimeInfo: { //抽奖倒计时
					h: '--',
					m: '--',
					s: '--'
				},
				drawTimeInfoStr: "",
				drawTime: '',
				desertTimer: "", //沙漠化计时器
				desertTime: '--:--:--',
				isDesert: true, //是否沙漠化
				userUseBg: '', //用户正在使用的背景图
				nfts: [],
				nftTotal: '--',
				isDApp: false,
				nftBoxs: [], //我的NFT藏品
				dappMsg: "请前往DAPP浏览器",
				treePrices: [],
				cyclicTime: "",
				max: 0,
				startTime: 0,
				remainTime: 0,
				mp3: {},
				isStart: false,
				boxNum: 0,
				refNum: '--',
			}
		},
		mounted() {
			// this.toDesert();
			this.noticeWidth = this.$refs['notice-t'].$el.offsetWidth
			// console.log(this.$refs['notice-t'].$el.offsetWidth)
			// console.log(this.$refs.noticeTxt.$el.offsetWidth);
			this.getWinInfo();
			uni.showLoading({
				mask: true
			});
			setTimeout(() => {
				this.getTronweb();
			}, 1200);
			// this.getBGMusic();
		},
		onLoad() {
			// this.getCount();

			this.getNFTs();
			// this.osHeight = app.osHeight;
		},
		methods: {
			getRefOf() {
				app.forestContract.refOf(this.account).call()
					.then(res => {
						console.log('用户的推荐奖励:', tronWeb.toDecimal(res._hex) / 10 ** this.usdtDec);
						this.refNum = tronWeb.toDecimal(res._hex) / 10 ** this.usdtDec
					})
			},
			getTreeOf() {
				app.forestContract.treeOf(this.account).call()
					.then(res => {
						console.log('用户的树', res)
					})
			},
			toRule() {
				console.log('dasdsa1212')
				this.ruleOpen = true;
				this.$nextTick(() => {
					setTimeout(() => {
						this.$refs.rule.type = 1;
					}, 100)
				})
			},
			getCalDura(start, end) {
				console.log(start, end)
				app.forestContract.calDura(start, end).call()
					.then(res => {
						console.log('过去的秒数:', tronWeb.toDecimal(res._hex));
						const past = tronWeb.toDecimal(res._hex);
						app.forestContract.remainTime().call()
							.then(res => {
								// console.log('剩余时间',tronWeb.toDecimal(res._hex));
								// this.getCount(time,tronWeb.toDecimal(res._hex));
								// this.getTime(time,tronWeb.toDecimal(res._hex));
								this.getTimer(tronWeb.toDecimal(res._hex) - past);
							})
					})
			},
			onBuyBox() {
				//购买盒子
				uni.showLoading({
					mask: true
				});
				app.forestContract.buyBox()
					.send((error, transactionHash) => {
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
					})
					.catch(err => {
						this.apiLock = true;;
						uni.hideLoading();
					})
			},
			getUserBox() {
				//获取用户盲盒
				app.forestContract.boxOf(this.account).call()
					.then(res => {
						console.log('用户的盲盒:', res);
						this.boxNum = tronWeb.toDecimal(res._hex)
					})
			},
			openBox() {
				//获取用户盲盒
				app.forestContract.openBox(this.account).call()
					.then(res => {
						console.log('openBox:', res);
					})
			},
			getStart() {
				//用户时候可操作
				app.forestContract.isStart().call()
					.then(res => {
						console.log('用户是否可操作:', res);
						this.isStart = res;
					})
			},
			onPlayMp3() {
				// this.mp3.play();
			},
			getBGMusic() {
				this.mp3 = uni.createInnerAudioContext();
				this.mp3.autoplay = true; //自动播放
				this.mp3.loop = true; //循环播放
				this.mp3.src = '/static/bg.mp3';
				this.mp3.onPlay(() => { //可以播放事件
					console.log('开始播放');
					this.onPlayMp3();
					// this.playing = !innerAudioContext.paused;//查看是否可以自动播放
				});
				this.mp3.onError((res) => {
					console.log(res.errMsg);
					console.log(res.errCode);
				});
			},
			onActivateRefresh() {
				//刷新激活
				setTimeout(() => {
					this.getIsActivate();
				}, 3000)
			},
			onBuyRefresh() {
				//购物更新
				// this.getUserMagicTrees();

				this.getUserTreesDetail();
				this.getJackpot(); //今日累积的分红
				this.getAllContribution(); //全平台贡献值
				this.getRemainTime(); //终极奖池倒计时
				this.getEnd(); //终极奖池
				this.getDrawNum();
				// this.getMyContribution();//我的贡献值
				this.getPoolOf(); //用户未领取奖池
				this.getDividendOf(); //用户未领取分红
				// this.getDesert();
			},
			onWaterRefresh() {
				// this.getWaterCountOf();
			},
			getTransaction(txId) {
				//查看交易讯息
				tronWeb.trx.getTransaction(txId)
					.then(res => {
						console.log(res)
					})
			},
			getCount(num, remainS) {
				// const date = new Date('2021/11/27 21:00:00');//9结束，29号
				const date = new Date(num);
				const curDate = new Date();
				// const remain = 86400;//一天
				const remain = remainS;
				const h6 = 21600;
				const h18 = 64800;
				const startH = date.getHours();
				const startM = date.getMinutes();
				const startS = date.getSeconds();
				const startMS = date.getMilliseconds();
				const startTime = date.getTime();
				const curTime = curDate.getTime();
				// console.log(startTime,curTime);
				// console.log(curTime - startTime);
				const curH = curDate.getHours();
				// console.log('开始时间:',startH+':'+startM+':'+startS+':'+startMS,'当前小时:',curH,)
				const H25Time = 90000000; //25小时时间戳
				const startPasrTime = startH * 60 * 60 * 1000 + startM * 60 * 1000 + startMS * 1000 +
				startMS; //开始当天开始时间戳(毫秒)
				const startDiffTime = H25Time - startPasrTime; //过去的当天时间，例如21点，1点停止倒计时，那么不仅仅要计算过去的天数，还要计算21点到1点这段时间；
				// console.log(startDiffTime)
				// const startDiffTime = ((25-startH)*60*60);//过去的当天时间，例如21点，1点停止倒计时，那么不仅仅要计算过去的天数，还要计算21点到1点这段时间；
				// const day = Math.floor((upTime - startTime)/1000/60/60/24);
				let endSec = 0;
				if (curH >= 1 && curH <= 7) {
					//当前在1到7点
					curDate.setHours(1); //设置到1点
					curDate.setMinutes(0);
					curDate.setSeconds(0);
					curDate.setMilliseconds(0);
					//取得当前0点时间戳
					const upTime = curDate.getTime();
					const day = Math.floor((upTime - startTime) / 1000 / 60 / 60 / 24);
					const past = (day * 18 * 60 * 60); //已过去的天数(秒数)
					// console.log('剩余时间:',remain - past - startDiffTime/1000);
					endSec = remain - past - startDiffTime / 1000;

				} else {
					// console.log(curTime);
					const day = Math.floor((curTime - startTime) / 1000 / 60 / 60 / 24);
					const past = (day * 18 * 60 * 60); //已过多少天的时间秒
					const curM = curDate.getMinutes();
					const curS = curDate.getSeconds();
					const curPastDay = curH == 0 ? 25 - 7 : curH - 7;
					let curPastTime = 0;
					if (day > 0) { //超过一天
						curPastTime = (curPastDay * 60 * 60) + (curM * 60) + curS;
						endSec = remain - past - curPastTime - startDiffTime / 1000;
					} else {
						curPastTime = (curTime - startTime) / 1000;
						endSec = remain - past - curPastTime;
						console.log(past)
					}
					//const curPastTime = (curPastDay*60*60) + (curM*60) + curS;//当天已过的时间秒
					// console.log(curPastDay,curPastTime);
					// console.log('剩余时间:',remain - past - curPastTime -startDiffTime/1000);
					// endSec = remain - past - curPastTime -startDiffTime/1000;
					// console.log(day,past,curH%7*60*60,curM*60)
					// console.log('剩余时间:',remain - past - pastCurDay)
				}
				console.log('hwh已过去的秒数:', endSec)
				this.getTimer(endSec); //设置倒计时


				// const upTime = curDate.getTime();
				// const day = Math.floor((upTime - startTime)/1000/60/60/24);
				// const past = (day*18*60*60);//一过去的天树
				// const pastCurDay = ((25-d)*60*60);//过去的当天时间，例如21点，1点停止倒计时，那么不仅仅要计算过去的天数，还要计算21点到1点这段时间；
				// console.log('剩余时间:',remain - past - pastCurDay)


				// const upTime = curDate.getTime();
				// const actualUse = upTime - startTime;
				// const day = Math.floor((upTime - startTime)/1000/60/60/24);
				// const vitualUse = actualUse - day*3600*6*1000;
				// console.log('已过:',actualUse,'理论已过:',vitualUse,day);
				// const actualRemain = remain*1000 - vitualUse;
				// console.log('剩余时间:',actualRemain/1000)
				//3600,11/29，

				// const date = new Date();
				// let curH = date.getHours();
				// if(curH >= 1 && curH <= 7){
				// 	date.setHours(1);

				// }else{

				// }
				// const curTime = date.getTime();
				// const ba = curTime - this.startTime;
				// console.log(ba)
				// console.log(ba/1000/60/60/24)
			},
			getTreesPrice() {
				//获取树的价格
				for (let i = 0; i < 8; i++) {
					app.forestContract.treePrice(i).call()
						.then(res => {
							// console.log('树的价格：',res);
							const data = {
								price: tronWeb.toDecimal(res._hex) / 10 ** this.usdtDec,
								url: i == 0 ? '/static/buy/junjun.png' : i == 1 ? '/static/buy/shaliu.png' : i ==
									2 ? '/static/buy/yu.png' : i == 3 ? '/static/buy/bais.png' : i == 4 ?
									'/static/buy/zhangzi.png' : i == 5 ? '/static/buy/yunshan.png' : i == 6 ?
									'/static/buy/huyang.png' : '/static/buy/lengshan.png',
								name: i == 0 ? '梭梭树' : i == 1 ? '沙柳' : i == 2 ? '榆树' : i == 3 ? '柏树' : i == 4 ?
									'樟子松' : i == 5 ? '云杉' : i == 6 ? '胡杨' : '冷杉',
								contribute: i == 0 ? 1 : i == 1 ? 2 : i == 2 ? 5 : i == 3 ? 10 : i == 4 ? 20 : i ==
									5 ? 50 : i == 6 ? 100 : 200
							}
							this.treePrices[i] = data;
						})
				}
			},
			async getNFTContract() {
				app.nftContract = await tronWeb.contract().at(app.nft_Address);
				// console.log('NFT合约实例：',app.nftContract);
				//获取NFT余额
				app.nftContract.balanceOf(this.account).call()
					.then(res => {
						// console.log('NFT数量',tronWeb.toDecimal(res._hex))
						const nftNum = tronWeb.toDecimal(res._hex);
						for (let i = 0; i < nftNum; i++) {
							//循环获取NFTID
							app.nftContract.tokenOfOwnerByIndex(this.account, i).call()
								.then(res => {
									// console.log('NFTId:',tronWeb.toDecimal(res._hex))
									//用NFTID去拿到JSON文件
									app.nftContract.tokenURI(tronWeb.toDecimal(res._hex)).call()
										.then(res => {
											// console.log('NFTJSON:',res)
											uni.request({
												url: res,
												method: 'GET',
												success: (res) => {
													// console.log('NFTJSON数据:',res)
													this.nftBoxs.push(res.data)
												},
												fail(err) {
													// console.log('请求失败')
												}
											})
										})
								})
						}
					})
			},
			getPoolOf() {
				//用户未领取奖池
				app.forestContract.poolOf(this.account).call()
					.then(res => {
						this.jackpotCanNum = tronWeb.toDecimal(res._hex) / 10 ** this.usdtDec;
						// console.log('用户未领取奖池:',this.jackpotCanNum);
					});
			},
			getDividendOf() {
				//用户未领取分红
				app.forestContract.dividendOf(this.account).call()
					.then(res => {
						this.profitCanNum = tronWeb.toDecimal(res._hex) / 10 ** this.usdtDec;
						console.log('用户未领取分红:', this.profitCanNum);
					});
			},
			onPoll() {
				setInterval(() => {
					this.getRemainTime();
					this.getWinInfo()
				}, 3000)
			},
			getTime(num, remainS) {
				//获取开始时间的日期
				const date = new Date(num);
				//当前日期
				const curDate = new Date();
				//获取开始时间的时间戳 
				const startTimestamp = date.getTime();
				//获取当前时间的时间戳
				const curTimestamp = curDate.getTime();
				const startMon = date.getMonth() + 1;
				const startDay = date.getDate();
				const startM = date.getMinutes();
				const curMon = curDate.getMonth() + 1;
				const curDay = curDate.getDate();
				const curH = curDate.getHours(); //当前小时
				const curM = curDate.getMinutes(); //当前分钟
				// console.log('开始时间的时间戳:',startTimestamp,'当前时间戳:',curTimestamp)
				//实际需要跑的时间
				// const startH = 5;
				const startH = date.getHours(); //开始时间(小时)
				const remaiH = remainS / 60 / 60; //理想要跑的时间(小时)
				// console.log('开始的小时:',startH+'点',' 理想跑的小时:',remaiH+'小时');
				const s = remaiH <= 17 ? 0 : Math.ceil((remaiH - startH % 17) / 17); //小于17小时
				const tealTime = startH > 0 && startH < 7 ? s * 7 + remaiH + 7 - startH : s * 7 + remaiH; //这是真实需要跑的时间(小时)
				const endTimestamp = startTimestamp + tealTime * 60 * 60 * 1000;
				// console.log('实际需要跑的小时:',tealTime+'小时');
				// console.log('结束时间的时间戳:',endTimestamp);
				const endDate = new Date(endTimestamp);
				const endMon = endDate.getMonth() + 1;
				const endDay = endDate.getDate();
				const endH = endDate.getHours(); //结束小时
				const endM = endDate.getMinutes();
				console.log('开始年月日:', startMon + '月' + startDay + '日' + startH + '点' + startM + '分');
				console.log('当前年月日:', curMon + '月' + curDay + '日' + curH + '点' + curM + '分');
				console.log('结束年月日:', endMon + '月' + endDay + '日' + endH + '点' + endM + '分');
				if (curTimestamp >= endTimestamp) {
					// console.log('已沙漠化')
				} else {
					// console.log('未沙漠化');
					//用结束的时间戳减去当前时间戳，产生还需等待的时间，用于倒计时
					const waitTimestamp = endTimestamp - curTimestamp;

					// this.getTimer(waitTimestamp)
				}
				////////////////////////////////////////////////////////////////////////////////////////
			},
			getTimer(waitTimestamp) {
				//倒计时
				clearTimeout(this.desertTimer);
				let tempTimestamp = waitTimestamp;
				let waitH = Math.floor(waitTimestamp / 60 / 60);
				let waitM = Math.floor(waitTimestamp / 60 % 60);
				let waitS = Math.floor(waitTimestamp % 60);
				// console.log()
				// console.log('还需等待:',waitH+'小时'+waitM+'分钟'+waitS+'秒');
				this.desertTimer = setInterval(() => {
					const curDate = new Date();
					const curH = curDate.getHours();
					if (waitS == 0) {
						if (waitM == 0) {
							waitM == 59;
							if (waitH == 0) {
								if (waitH == 0 && waitM == 0 && waitS == 0) {
									console.log('已沙漠化')
									clearTimeout(this.desertTimer);
									return;
								}
							} else {
								waitH--
							}
						} else {
							waitM--;
						};
						waitS = 59;
					} else {
						waitS--;
						tempTimestamp -= 1000;
					};
					// if(curH >= 0 && curH < 7){
					// 	clearTimeout(this.desertTimer);
					// 	//当前时间静止，不能进行倒计时
					// 	// console.log('当前处于0-7点，时间静止');
					// 	const curM = curDate.getMinutes();
					// 	const curS = curDate.getSeconds();
					// 	const stopTimestamp = (curH*60*60*1000 + curM*60*1000 + curS *1000)+tempTimestamp;
					// 	let stopH = Math.floor(stopTimestamp/1000/60/60);
					// 	let stopM = Math.floor(stopTimestamp/1000/60%60);
					// 	let stopS = Math.floor(stopTimestamp/1000%60);
					// 	// console.log('静止时间:',stopH+'小时'+stopM+'分钟'+stopS+'秒');
					// 	const showH = stopH < 10? '0'+stopH:stopH;
					// 	const showM = stopM < 10? '0'+stopM:stopM;
					// 	const showS = stopS < 10? '0'+stopS:stopS;
					// 	this.desertTime = showH+':'+showM+':'+showS
					// 	return;
					// };

					const showH = waitH < 10 ? '0' + waitH : waitH;
					const showM = waitM < 10 ? '0' + waitM : waitM;
					const showS = waitS < 10 ? '0' + waitS : waitS;
					this.desertTime = showH + ':' + showM + ':' + showS;
					if (curH >= 1 && curH < 7) {
						clearTimeout(this.desertTimer);
					}
				}, 1000)
			},

			onRefreshBusiness() {
				//用户点击business后更新
				this.getRefOf();
				this.getPoolOf();
				this.getDividendOf();
				this.getUserBox();
				this.getAllowance()
			},
			onRefreshBgs() {
				//用户切换背景后，更新
				this.getBgs();
			},
			getUserUseBg() {
				//用户使用的背景
				app.$get('user/use_bg', {
						address: this.account
					})
					.then(res => {
						if (res.data.status == 1) {
							console.log('用户使用的背景:', res);
							this.userBgIndex = res.data.result.use_bg;
							if (this.userBgIndex != -1) {
								this.userUseBg = this.bgs[this.userBgIndex].url;
								console.log('路径:', this.userUseBg)
							} else {
								this.userUseBg = '';
							}
						}
					})
			},
			getBgs() {
				//背景列表
				app.$get('user/background', {
						address: this.account
					})
					.then(res => {
						console.log('背景列表:', res);
						if (res.data.status == 1) {
							this.bgs = res.data.result;
							this.getUserUseBg();
						}
					})
			},
			getYMDHMS(timestamp) {
				let time = new Date(timestamp)
				let year = time.getFullYear()
				const month = (time.getMonth() + 1).toString().padStart(2, '0')
				const date = (time.getDate()).toString().padStart(2, '0')
				const hours = (time.getHours()).toString().padStart(2, '0')
				const minute = (time.getMinutes()).toString().padStart(2, '0')
				const second = (time.getSeconds()).toString().padStart(2, '0')

				return year + '-' + month + '-' + date + ' ' + hours + ':' + minute + ':' + second
			},
			getNFTs() {
				//NFT产品
				app.$get('user/nft', {
						page: 1,
						size: 10
					})
					.then(res => {
						// console.log('nft产品:',res);
						if (res.data.status == 1) {
							this.nftTotal = res.data.result.total;
							this.nfts = res.data.result.data;
							this.$refs.aboutnft.page = 2;
						}
					})
			},
			getDesert() {
				//是否否沙漠化
				app.forestContract.desert().call()
					.then(res => {
						// console.log('是否沙漠化:',res);
						if (res) {
							//已沙漠化
							console.log('沙漠化');
							this.isDesert = true;
						} else {
							console.log('未沙漠化');
							this.isDesert = false;
							this.getDrawTime(0);
							this.getDrawNum();
							this.getCheckPoint(); //开始时间
						}
					})
			},
			getCheckPoint() {
				app.forestContract.checkPoint().call()
					.then(res => {
						// console.log('CheckPoint开始时间:',tronWeb.toDecimal(res._hex))
						// this.getRemainTime(tronWeb.toDecimal(res._hex)*1000);//剩余时间
						const date = new Date();
						this.getCalDura(tronWeb.toDecimal(res._hex), Math.floor(date.getTime() / 1000))
						// this.startTime = tronWeb.toDecimal(res._hex)*1000;
					})
			},
			getRemainTime(time) {
				app.forestContract.remainTime().call()
					.then(res => {
						console.log('剩余时间', tronWeb.toDecimal(res._hex));
						this.getTimer(tronWeb.toDecimal(res._hex)); //设置倒计时
						// this.getCount(time,tronWeb.toDecimal(res._hex));
						// this.getTime(time,tronWeb.toDecimal(res._hex));
					})
			},
			getDrawNum() {
				//抽奖奖池
				app.forestContract.totalLottery().call()
					.then(res => {
						console.log('抽奖奖池:', tronWeb.toDecimal(res._hex) / 10 ** this.usdtDec);
						this.drawNum = tronWeb.toDecimal(res._hex) / 10 ** this.usdtDec;
					})
			},
			getWinInfo() {
				//获取中奖者信息
				app.$get('user/lottery_news')
					.then(res => {
						// console.log('中奖者信息:',res)
						if (res.data.status == 1) {
							if (res.data.result.address) {
								this.notice = '恭喜用户' + app.getHideInfo(res.data.result.address) + '抽到大奖，获取' + res.data
									.result.amount + ' USDT';

							} else {
								this.notice = '暂无公告信息';
							}
							this.$nextTick(() => {
								this.getNotices();
							})
						}
					})
			},
			getCyclicTime() {
				if (this.max >= 3) return;
				this.cyclicTime = setTimeout(() => {
					this.getWinInfo();
					this.max++;
				}, 60000)
			},
			getDrawTime(type) {
				//抽奖奖池倒计时
				clearTimeout(this.drawTime);
				if (type == 0) {
					//初始化
					const date = new Date();
					this.drawTimeInfo.h = date.getHours() % 2 == 0 ? 1 : 0;
					this.drawTimeInfo.m = 59 - date.getMinutes();
					this.drawTimeInfo.s = 59 - date.getSeconds();
				} else {
					this.drawTimeInfo.h = 1;
					this.drawTimeInfo.m = 59;
					this.drawTimeInfo.s = 59
				}

				// console.log(this.drawTimeInfo);
				this.drawTime = setInterval(() => {
					if (this.drawTimeInfo.s == 0) {
						if (this.drawTimeInfo.m == 0) {
							this.drawTimeInfo.m == 59;
							if (this.drawTimeInfo.h == 0) {
								// console.log(this.drawTimeInfo.h,this.drawTimeInfo.m,this.drawTimeInfo.s)
								if (this.drawTimeInfo.h == 0 && this.drawTimeInfo.m == 0 && this.drawTimeInfo.s ==
									0) {
									this.getDrawTime(1);
									this.max = 0;
									this.getWinInfo();
									this.getCyclicTime();
									return;
								}
							} else {
								this.drawTimeInfo.h--
							}
						} else {
							this.drawTimeInfo.m--;
						};
						this.drawTimeInfo.s = 59;
					} else {
						this.drawTimeInfo.s--;
					};
					const showH = this.drawTimeInfo.h < 10 ? '0' + this.drawTimeInfo.h : this.drawTimeInfo.h;
					const showM = this.drawTimeInfo.m < 10 ? '0' + this.drawTimeInfo.m : this.drawTimeInfo.m;
					const showS = this.drawTimeInfo.s < 10 ? '0' + this.drawTimeInfo.s : this.drawTimeInfo.s;
					this.drawTimeInfoStr = showH + ':' + showM + ':' + showS
				}, 1000)
			},
			getEnd() {
				//终极奖池
				app.forestContract.totalPool().call()
					.then(res => {
						this.endUsdt = tronWeb.toDecimal(res._hex) / 10 ** this.usdtDec;
						console.log('终极奖池:', this.endUsdt);
					})
			},
			onOpenMagic(index) {
				//摘果子
				console.log('果子下标:', index);
				console.log(this.userMagicTrees)
				if (!this.apiLock) return;
				this.apiLock = false;
				uni.showLoading({
					mask: true
				});
				app.forestContract.openMagicTree(index)
					.send((error, transactionHash) => {
						console.log(transactionHash)
						if (!error) {
							// this.toWater();
							// app.$tips('交易进行中,请等待交易完成');
							setTimeout(() => {
								this.getNFTs();
								this.getUserTreesDetail();
							}, 3000)
							this.toFruit();
						} else {
							app.$tips('摘取失败')
							this.apiLock = true;
						};
						uni.hideLoading();
					})
					.catch(err => {
						this.apiLock = true;;
						uni.hideLoading();
					})

			},
			onWater() {
				//浇水
				this.toWater(); //
				return
				if (!this.isStart) {
					app.$tips('请等待游戏开始')
					return
				}
				if (!this.isActivate) {
					this.toActivate();
					return;
				}
				if (this.contribution <= 0 || this.contribution == '--') {
					app.$tips('请购买树苗');
					return;
				}
				if (this.waterCount == '--') return
				if (this.waterCount >= 2) {
					app.$tips('今天已浇水两次，明天再来吧');
					return;
				};
				if (!this.apiLock) return;
				this.apiLock = false;
				uni.showLoading({
					mask: true
				});
				app.forestContract.water()
					.send((error, transactionHash) => {
						// console.log(transactionHash)
						if (!error) {
							this.toWater();
							//查看交易讯息
							this.apiLock = true;;
							setTimeout(() => {
								tronWeb.trx.getTransaction(transactionHash)
									.then(res => {
										console.log(res);
										if (res.ret[0].contractRet == "SUCCESS") {
											this.onWaterRefresh()
										}
									})
							}, 3000)
						} else {
							app.$tips('浇水失败')
							this.apiLock = true;
						};
						uni.hideLoading();
					})
					.catch(err => {
						this.apiLock = true;;
						uni.hideLoading();
					})
			},
			onShowText(level, index) {
				console.log(index)
				const treeTitle = index == -1 ? '神奇果树X' : index == 0 ? '梭梭树X' : index == 1 ? '沙柳X' : index == 2 ? '榆树X' :
					index == 3 ? '柏树X' : index == 4 ? '樟子松X' : index == 5 ? '云杉X' : index == 6 ? '胡杨X' : '冷杉X'
				console.log(treeTitle)
				if (!this.showText) {
					if (index == -1) {
						this.treeName = treeTitle + this.userMagicTreeMax
					} else {
						this.treeName = level == 0 ? treeTitle + this.userTreeDetails[index].one : level == 1 ? treeTitle +
							this.userTreeDetails[index].two : treeTitle + this.userTreeDetails[index].three;
					}
					this.showText = true;
					clearTimeout(this.timer);
					this.timer = setTimeout(() => {
						this.showText = false;
					}, 1500)
				} else {

					this.showText = false;
					clearTimeout(this.timer);
					this.timer = setTimeout(() => {
						if (index == -1) {
							this.treeName = treeTitle + this.userMagicTreeMax
						} else {
							this.treeName = level == 0 ? treeTitle + this.userTreeDetails[index].one : level == 1 ?
								treeTitle + this.userTreeDetails[index].two : treeTitle + this.userTreeDetails[
									index].three;
						}
						// this.treeName = level ==0? treeTitle+this.userTreeDetails[index].one :level ==1? treeTitle+this.userTreeDetails[index].two:treeTitle+this.userTreeDetails[index].three;
						this.showText = true;
						clearTimeout(this.timer);
						this.timer = setTimeout(() => {
							this.showText = false;
						}, 1500)
					}, 310)
				}
			},
			getUserMagicTrees() {
				//获取神奇果树
				app.$get('user/magic_tree', {
						address: this.account
					})
					.then(res => {
						// console.log(res)
						// if(res.data.status == 1){//正式要打开
						// res.data.result.data = [
						// 	{
						// 	   "index":0,
						// 	   "status":false,
						// 	   "timestamp":12312398,
						// 	   "tokenId":2
						// 	},
						// 	{
						// 	   "index":1,
						// 	   "status":false,
						// 	   "timestamp":12312398,
						// 	   "tokenId":0
						// 	},
						// 	{
						// 	   "index":2,
						// 	   "status":false,
						// 	   "timestamp":12312398,
						// 	   "tokenId":2
						// 	},
						// 	{
						// 	   "index":3,
						// 	   "status":false,
						// 	   "timestamp":12312398,
						// 	   "tokenId":0
						// 	},
						// 	{
						// 	   "index":4,
						// 	   "status":false,
						// 	   "timestamp":12312398,
						// 	   "tokenId":9
						// 	}
						// ];
						const len = res.data.result.data.length;
						if (len > 0) {
							const left = [];
							const mid = [];
							const right = [];
							for (let i = 0; i < len; i++) {
								if (res.data.result.data[i].tokenId != 0 && !res.data.result.data[i].status) {
									//有果实并且可以摘取
									left.push(res.data.result.data[i]);
								} else if (res.data.result.data[i].tokenId != res.data.result.data[i].status) {
									mid.push(res.data.result.data[i]);
								} else {
									right.push(res.data.result.data[i])
								}
							};
							const tempLists = left.concat(mid)
							this.userMagicTrees = tempLists.concat(right);
						}
						// console.log(this.userMagicTrees)
						this.getUserTreesDetail();
						this.userMagicTreeMax = res.data.result.count;
						// console.log('用户的神奇果树',this.userMagicTrees)
						// }
					})
			},
			getUserTreesDetail() {
				//用户树状态阶段
				app.$get('user/tree_info', {
						address: this.account
					})
					.then(res => {
						console.log('用户树详情:', res);
						if (res.data.status == 1) {
							// this.userTreeDetails = res.data.result;
							this.userMagicTreeMax = 0;
							this.contribution = 0;
							this.userTreeDetails = [{
									one: 0,
									two: 0,
									three: 0
								},
								{
									one: 0,
									two: 0,
									three: 0
								},
								{
									one: 0,
									two: 0,
									three: 0
								},
								{
									one: 0,
									two: 0,
									three: 0
								},
								{
									one: 0,
									two: 0,
									three: 0
								},
								{
									one: 0,
									two: 0,
									three: 0
								},
								{
									one: 0,
									two: 0,
									three: 0
								},
								{
									one: 0,
									two: 0,
									three: 0
								},
							];
							this.userTrees = [{
									index: 0,
									total: 0
								},
								{
									index: 1,
									total: 0
								},
								{
									index: 2,
									total: 0
								},
								{
									index: 4,
									total: 0
								},
								{
									index: 3,
									total: 0
								},
								{
									index: 5,
									total: 0
								},
								{
									index: 6,
									total: 0
								},
								{
									index: 7,
									total: 0
								},
							];
							const len = res.data.result.length;
							console.log(res.data.result)
							for (let i = 0; i < len; i++) {
								this.contribution += res.data.result[i][6];
								this.userTrees[res.data.result[i][3]].total += res.data.result[i][5] - res.data.result[
									i][0]
								if (res.data.result[i][0] > 0) {
									//存在魔法树或者果实
									this.userMagicTreeMax += res.data.result[i][0];
									if (res.data.result[i][1] > 0 && res.data.result[i][2] == 0) {
										//有果实
										this.userMagicTrees.push({
											index: i,
											tokenId: res.data.result[i][1]
										})
									}
								}
								//不是魔法树
								// this.userTreeDetails[res.data.result[i][3]one
								const date = new Date();
								const cur = Math.floor(date.getTime() / 1000);
								if (cur - res.data.result[i][4] > 172800) {
									this.userTreeDetails[res.data.result[i][3]].three += res.data.result[i][5] - res
										.data.result[i][0];;
								} else if (cur - res.data.result[i][4] > 86400) {
									this.userTreeDetails[res.data.result[i][3]].two += res.data.result[i][5] - res.data
										.result[i][0];;
								} else {
									this.userTreeDetails[res.data.result[i][3]].one += res.data.result[i][5] - res.data
										.result[i][0];
								}
							}
							console.log(this.userTrees)
						}
					})
					.catch(err => {
						console.log(err)
					})
			},
			getUserTrees() {
				//获取用户树苗
				this.storeOpen = true;
				setTimeout(() => {
					this.$refs.store.type = 1;
				}, 100)
				// uni.showLoading({mask:true});
				// app.$get('user/tree',{address:this.account})
				// .then(res=>{
				// 	console.log('用户树苗：',res);
				// 	uni.hideLoading();
				// 	if(res.data.status == 1){
				// 		this.userTrees = res.data.result;

				// 	}
				// })
				// .catch(err=>{
				// 	uni.hideLoading();
				// })
			},
			onActivate() {

				if (this.isActivate) {
					this.toUserInfo()
				} else {
					this.toActivate()
				}
			},
			getAllowance() {
				//查看当前授权数量
				app.usdtContract.allowance(this.account, app.forest_Address).call({
						_isConstant: true
					})
					.then(res => {
						//查看授权数量是否够拿去质押
						// console.log(res)
						this.accredit = tronWeb.toDecimal(res._hex);
						app.accredit = tronWeb.toDecimal(res._hex);
						// console.log('已授权USDT:',this.accredit)
						// if(this.accredit <= 0){
						// 	//质押前必须授权，不够
						// 	uni.showToast({
						// 		title:'请授权',
						// 		icon:'none'
						// 	})
						// }

					})
			},
			getTronweb() {
				// console.log(!!window.tronWeb,window.tronWeb);
				if (window.tronWeb && window.tronWeb.defaultAddress.base58) {
					this.isDApp = false;
					try {
						// tronWeb.setHeader({"TRON-PRO-API-KEY": '155e0a37-6313-4a59-98a0-655b73235eb7'});
					} catch (err) {
						this.dappMsg = '请前往DAPP浏览器';
						this.isDApp = true;
						return
					}
					this.tronWeb = tronWeb;
					this.account = tronWeb.defaultAddress.base58;
					uni.setStorageSync('token', this.account);
					app.account = tronWeb.defaultAddress.base58;
					this.showAccount = app.getHideInfo(this.account);
					this.getUSDTContract();
					// this.getUserMagicTrees();
					// this.getForestContract();
					// this.getAccounts();;
					// this.onLogin();
					// this.getHTUContract();
					// this.getFEFContract();
					// this.getFEF_TRXContract();
					// this.getBlock();
					// this.getTime();
					// // this.getPower();

					// this.getContract();
					// this.getWegContract();
				} else {
					this.dappMsg = '请切换至波场链';
					this.isDApp = true;
				}
			},
			getWaterCountOf() {
				//获的浇水次数
				app.forestContract.waterCountOf(this.account).call()
					.then(res => {
						// console.log('进入浇水次数:',res);
						this.waterCount = tronWeb.toDecimal(res._hex);
						if (tronWeb.toDecimal(res._hex) == 0) {
							this.waterCount = 0;
						} else if (tronWeb.toDecimal(res._hex) == 1 || tronWeb.toDecimal(res._hex) == 2) {
							this.waterCount = 1;
						} else {
							this.waterCount = 2;
						}
					})
			},

			async getIsActivate() {
				//是否激活账号
				await app.forestContract.isActivate(this.account).call()
					.then(res => {
						console.log(res);
						if (!res) {
							app.$tips('请前往激活账号')
						} else {
							this.isActivate = true;
						};
						uni.hideLoading();
					})
			},
			async getUSDTContract() {
				//获取USDT合约
				// app.forestContract = await tronWeb.contract(app.forestAbi,app.forest_Address)
				app.usdtContract = await tronWeb.contract().at(app.USDT_Address);
				console.log(app.usdtContract)
				this.getDecimals();
				this.getForestContract();
				this.getAllowance();
				// console.log('USDT示例:',app.usdtContract)
			},
			async getForestContract() {
				//获取USDT合约
				// await tronWeb.contract(app.forestAbi,app.forest_Address)
				app.forestContract = await tronWeb.contract().at(app.forest_Address);
				console.log(app.forestContract);
				// const date = new Date('2021/12/03 00:00:00');
				// const curData = new Date();
				// this.getCalDura(Math.floor(date.getTime()/1000),Math.floor(curData.getTime()/1000));
				// this.getCount(date.getTime(),259200);
				// this.getCheckPoint();//开始时间,测试

				// this.getStart();
				// this.getTreeOf();
				this.getRefOf();
				this.getEnd(); //终极奖池
				this.getRemainTime();
				this.getDrawNum();
				this.getDrawTime(0);
				// this.getCheckPoint();//开始时间,测试
				this.getStart();
				this.getUserTreesDetail();
				this.getBgs(); //获取背景
				this.getUserBox();
				// this.openBox();
				this.getIsActivate();
				this.getTreesPrice();
				this.getNFTContract();
				this.getJackpot(); //今日累积的分红
				this.getAllContribution(); //全平台贡献值
				this.getPoolOf(); //用户未领取奖池
				this.getDividendOf(); //用户未领取分红
				this.onPoll();
				// this.getDesert();
				// this.getMyContribution();//我的贡献值
				// this.getWaterCountOf();
				// console.log('森林合约示例:',app.forestContract)
			},
			getUsdtBalanceOf() {
				//获取USDT余额
				app.usdtContract.balanceOf(this.account).call()
					.then(res => {
						this.usdtBalance = tronWeb.toDecimal(res._hex) / 10 ** this.usdtDec;
						// console.log("USDT余额:",this.usdtBalance);
					})
			},
			getDecimals() {
				//精度
				app.usdtContract.decimals().call()
					.then(res => {
						// console.log('精度:',res);
						this.usdtDec = res;
						app.usdtDec = res;
						this.getUsdtBalanceOf();
					})
			},
			getJackpot() {
				//今日累计分红奖池
				app.forestContract.totalDividend().call()
					.then(res => {
						// console.log('今日累计分红奖池:',res);
						// this.jackpotTotal = ;

						this.jackpotTotal = app.onShear(tronWeb.toDecimal(res._hex) / 10 ** this.usdtDec, 2);
					})
			},
			getMyContribution() {
				//我的贡献值
				app.forestContract.userC(this.account).call()
					.then(res => {
						// console.log('我的贡献值:',res);
						this.contribution = tronWeb.toDecimal(res._hex);
						// this.jackpotTotal = tronWeb.toDecimal(res._hex)/10**this.usdtDec
					})
			},
			getAllContribution() {
				//全平台贡献值
				app.forestContract.totalContribute().call()
					.then(res => {
						// console.log('全平台贡献值:',res);
						this.allContribution = tronWeb.toDecimal(res._hex);
						// this.jackpotTotal = tronWeb.toDecimal(res._hex)/10**this.usdtDec
					})
			},
			toUserInfo() {
				this.open = true;
				this.$nextTick(() => {
					setTimeout(() => {
						this.$refs.business.type = 1;
					}, 100)
				})
			},

			toActivate() {
				this.activateOpen = true;
				this.$nextTick(() => {
					setTimeout(() => {
						this.$refs.activate.type = 1;
					}, 100)
				})
			},
			toStore() {
				//仓库
				if (!this.isActivate) {
					this.toActivate();
					return;
				}
				this.getUserTrees();

			},
			toWater() {
				this.waterOpen = true;
				this.$nextTick(() => {
					setTimeout(() => {
						this.$refs.water.type = 1;
					}, 100)
				});
				setTimeout(() => {
					this.onClose()
				}, 2200)
			},
			toNft() {
				if (!this.isActivate) {
					this.toActivate();
					return;
				}
				this.nftOpen = true;
				this.$nextTick(() => {
					setTimeout(() => {
						this.$refs.aboutnft.type = 1;
					}, 100)
				})
			},
			toBuy() {

				if (!this.isActivate) {
					this.toActivate();
					return;
				}
				if (!this.isStart) {
					app.$tips('请等待游戏开始')
					return
				}
				this.buyOpen = true;
				setTimeout(() => {
					this.$refs.buy.type = 1;
				}, 100)
			},
			toReloading() {
				if (!this.isActivate) {
					this.toActivate();
					return;
				}
				this.reloadingOpen = true;
				setTimeout(() => {
					this.$refs.reloading.type = 1;
				}, 100)
			},
			toFriend() {
				this.friendOpen = true;
				setTimeout(() => {
					this.$refs.friendPopup.type = 1;
				}, 100)
			},
			toAward() {
				this.getOpen = true;
				setTimeout(() => {
					this.$refs.get.type = 1;
				}, 100)
			},
			toFruit() {
				this.fruitOpen = true;
				setTimeout(() => {
					this.$refs.fruit.type = 1;
				}, 100)
			},
			toNft2() {
				this.nftOpen2 = true;
				setTimeout(() => {
					this.$refs.nft.type = 1;
				}, 100)
			},
			toDesert() {
				this.desertOpen = true;
				setTimeout(() => {
					this.$refs.desert.type = 1;
				}, 100)
			},
			onClose() {
				this.$refs.business.type = 0;
				this.$refs.activate.type = 0;
				this.$refs.buy.type = 0;
				this.$refs.store.type = 0;
				this.$refs.aboutnft.type = 0;
				this.$refs.friendPopup.type = 0;
				this.$refs.desert.type = 0;
				this.$refs.get.type = 0;
				this.$refs.fruit.type = 0;
				this.$refs.nft.type = 0;
				this.$refs.reloading.type = 0;
				this.$refs.water.type = 0;
				this.$refs.rule.type = 0;
				setTimeout(() => {
					this.open = false;
					this.activateOpen = false;
					this.buyOpen = false;
					this.storeOpen = false;
					this.nftOpen = false;
					this.nftOpen2 = false;
					this.friendOpen = false;
					this.desertOpen = false;
					this.getOpen = false;
					this.fruitOpen = false;
					this.reloadingOpen = false;
					this.waterOpen = false;
					this.ruleOpen = false;
				}, 200)
			},
			getNotices(bl) {
				// const data = {
				// 	pageNum:1,
				// 	eachPageCount:1
				// };
				// this.noticeLock = false;
				// app.$get('Homepage/noticeList',data)
				// .then(res=>{
				// console.log(res);
				setTimeout(() => {
					this.refreshLock = false;
				}, 1000);
				// this.notice = res.data.result[0].title;
				this.noticeLock = true;
				this.transition = '10s linear';
				this.chrendWidth = '-' + this.$refs.noticeTxt.$el.offsetWidth;
				setTimeout(() => {
					this.chrendWidth = this.noticeWidth;
					this.transition = '0s';
					setTimeout(() => {
						this.getNotices(true);
					}, 100)
				}, 10000)
				// setTimeout(()=>{
				// 	this.getNoticeWidth();
				// },1300)
				// })
			},
		}
	}
</script>

<style scoped lang="scss">
	.two0 {
		@include size(73rpx, 70rpx, none);
	}

	.two1 {
		@include size(68rpx, 71rpx, none);
	}

	.two2 {
		@include size(69rpx, 70rpx, none);
	}

	.two3 {
		@include size(46rpx, 70rpx, none);
	}

	.two4 {
		@include size(58rpx, 69rpx, none);
	}

	.two5 {
		@include size(62rpx, 69rpx, none);
	}

	.two6 {
		@include size(60rpx, 69rpx, none);
	}

	.two7 {
		@include size(58rpx, 70rpx, none);
	}

	.three0 {
		@include size(96rpx, 84rpx, none);
	}

	.three1 {
		@include size(80rpx, 84rpx, none);
	}

	.three2 {
		@include size(86rpx, 85rpx, none);
	}

	.three3 {
		@include size(57rpx, 84rpx, none);
	}

	.three4 {
		@include size(77rpx, 84rpx, none);
	}

	.three5 {
		@include size(78rpx, 85rpx, none);
	}

	.three6 {
		@include size(76rpx, 84rpx, none);
	}

	.three7 {
		@include size(72rpx, 84rpx, none);
	}

	.contribute {
		@include ab();
		left: 18rpx;
		top: 220rpx;

		.contribute-icon {
			@include size(128rpx, 81rpx, none);
			@include ab();
			left: 0rpx;
		}

		.contribute-right {
			@include size(300rpx, 50rpx, #F9CA46);
			border-radius: 25rpx;
			@include cen();
			margin-left: 25rpx;
			margin-top: 10rpx;

			.contribute-right-txt {
				@include font($m, #5E2107);
				@include bold();
			}
		}
	}

	.tab-box {
		@include size(750rpx, 100rpx, none);
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		box-sizing: border-box;
		padding-left: 45rpx;
		padding-right: 45rpx;
		margin-bottom: 50rpx;
	}

	.tab1 {
		@include size(86rpx, 91rpx, none);
	}

	.tab2 {
		@include size(101rpx, 92rpx, none);
	}

	.tab3 {
		@include size(97rpx, 92rpx, none);
	}

	.tab4 {
		@include size(112rpx, 88rpx, none);
	}

	.tab5 {
		@include size(103rpx, 94rpx, none);
	}

	.tabs {
		@include size(750rpx, 150rpx, none);
		position: fixed;
		bottom: 0;
		left: 0;
		display: flex;
		flex-direction: column;
		justify-content: center;
	}

	.tab-bg {
		@include size(750rpx, 80rpx, none);
		@include ab();
		left: 0;
		margin-top: 13rpx;
	}

	.draw-time {
		@include font($el, #E70606);
		@include bold()
	}

	.draw-title-box {
		width: 350rpx;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		margin-top: 10rpx;
	}

	.draw-title {
		@include font($m, #333333);
	}

	.draw-title2 {
		@include font($m, #562115);
		@include bold();
		margin-left: 10rpx;
	}

	.draw-icon {
		@include size(34rpx, 34rpx, none);
		margin-left: 10rpx;
	}

	.draws {
		@include size(750rpx, 192rpx, none);
		@include re();
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		padding-left: 16rpx;
		padding-right: 16rpx;
		box-sizing: border-box;
	}

	.draw {
		@include size(350rpx, 192rpx, red);
		background: url(../../static/index/icon3.png) no-repeat;
		background-size: 100% 100%;
		// @include re();
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding-top: 35rpx;
	}

	.draw2 {
		background: url(../../static/index/icon4.png) no-repeat;
		background-size: 100% 100%;
	}

	.draw-bg {
		@include size(350rpx, 192rpx, none);
		@include ab();
		left: 0;
		top: 0;
	}

	.trees {
		@include size(632rpx, 84rpx, none);
		float: left;
	}

	.tree {
		@include size(90rpx, 84rpx, none);
		float: left;
		@include cen();
		@include re()
	}

	.tree-magic {
		@include size(107rpx, 84rpx, none);
	}

	.tree-shit {
		@include size(70rpx, 70rpx, none);
		@include ab();
		white-space: nowrap;
	}

	.tree-icon1 {
		@include size(50rpx, 50rpx, none);
		z-index: 11;
	}

	.tree-box {
		@include size(678rpx, 730rpx, none);
		background: url(@/static/index/treebg.png) no-repeat;
		background-size: 100% 100%;
		@include re();
		// margin-top: 40rpx;
		margin-top: 400rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		box-sizing: border-box;
		padding-top: 22rpx;

		.tree-num {
			@include font(36rpx, #045E04);
			@include bold();
			@include ab();
			letter-spacing: 2rpx;
			-webkit-text-fill-color: #045E04;
			-webkit-text-stroke-color: white;
			-webkit-text-stroke-width: 1rpx;
			top: 10rpx;
			transform: translateY(0rpx);
			opacity: 0;
			transition: .3s;
		}

		.treeActive {
			opacity: 1;
			top: -20rpx
		}
	}

	.tree-bg {
		@include size(678rpx, 730rpx, none);
		@include ab();
		z-index: 10;
		left: 0;
		top: 0;
	}

	// 公告
	.notice-big-box {
		@include size(530rpx, 55rpx, none);
		flex-direction: row;
		align-items: center;
		margin-top: 400rpx;
		@include re();
	}

	//公告
	.notice-box {
		@include size(710rpx, 66rpx, none);
		// padding-left: 60rpx;
		// padding-right: 60rpx;
		border-radius: 18rpx;
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		// margin-top: 310rpx;
		@include ab();
		top: 330rpx;
		z-index: 10;
	}

	.notice {
		@include size(710rpx, 50rpx, none);
		flex-direction: row;
		display: flex;
		align-items: center;
		justify-content: center;
		box-sizing: border-box;
		padding-left: 60rpx;
		@include re();
	}

	.notice-icon {
		@include size(73rpx, 55rpx, none);
		margin-left: 26rpx;
		@include ab();
		left: 100rpx;
	}

	.notice-t-box {
		@include size(450rpx, 50rpx, none);
		background-color: rgba(23, 23, 23, .7);
		position: relative;
		border-radius: 25rpx;
		border-width: 2rpx;
		border-style: solid;
		border-color: white;
		align-items: center;
	}

	.notice-t {
		@include size(400rpx, 50rpx, none);
		justify-content: center;
		margin-left: 16rpx;
		position: relative;
		line-height: 48rpx;
		overflow: hidden;
	}

	.noticeTxt-box {
		transform: translateX(0rpx);
		transition: 10s linear;
	}

	.notive-v {
		@include font($m, #fff);
		white-space: nowrap
	}

	.notice-more {
		@include size(30rpx, 30rpx, none)
	}

	.water {
		height: 140rpx;
		@include ab();
		right: 26rpx;
		top: 200rpx;
		font-weight: bold;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.water-bg {
		@include size(104rpx, 79rpx, none);
		@include ab();
		right: 0;
		top: -10rpx;
	}

	.water-txt-box {
		height: 38rpx;
		background-color: #5E2107;
		padding-left: 15rpx;
		padding-right: 15rpx;
		@include cen();
		border-radius: 19rpx;
		margin-top: 60rpx;
	}

	.water-txt {
		@include font($s, #fff);
		@include bold()
	}

	.balance-title {
		@include size(126rpx, 26rpx, none);
		@include ab();
		right: 28rpx;
		top: 155rpx;
		font-weight: bold;
	}

	.balance-box {
		@include size(170rpx, 38rpx, #F9CA46);
		border-radius: 20rpx;
		display: flex;
		flex-direction: row-reverse;
		align-items: center;
		padding-right: 15rpx;
	}

	.balance-txt {
		@include font($s, #5A1B00);
		@include bold();
	}

	.balance {
		@include size(200rpx, 60rpx, none);
		@include ab();
		right: 26rpx;
		top: 100rpx;
		display: flex;
		flex-direction: row-reverse;
		align-items: center;
	}

	.balance-icon {
		@include size(66rpx, 60rpx, none);
		@include ab();
		left: -20rpx;
		top: 0;
	}

	.guide {
		@include size(100rpx, 93rpx, none);
		@include ab();
		left: 26rpx;
		top: 320rpx;
		z-index: 10;
	}

	.guide-bg {
		@include size(100rpx, 93rpx, none);
		@include ab();
		left: 0;
		top: 0;
	}

	.view-bg-box {
		width: 750rpx;
		height: 1180rpx;
		@include re();
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	.view-bg {
		@include ab();
		width: 750rpx;
		height: 650rpx;
		left: 0;
		top: 0;
	}

	.info {
		@include size(288rpx, 164rpx, none);
		background: url(../../static/index/bg1.png) no-repeat;
		background-size: 100% 100%;
		@include ab();
		left: 26rpx;
		top: 28rpx;
		display: flex;
		flex-direction: row-reverse;
		align-items: center;
	}

	.info-msg {
		@include size(170rpx, 160rpx, none);
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding-top: 10rpx;
	}

	.info-msg-txt1 {
		@include font(22rpx, #FFFFFF);
	}

	.info-msg-txt2 {
		@include font($m, #FFFFFF);
		@include bold();
		margin-top: 5rpx;
	}

	.info-msg-txt3-box {
		@include size(100rpx, 30rpx, #5E2107);
		border-radius: 35rpx;
		@include cen();
	}

	.info-msg-txt3 {
		@include font(18rpx, #fff);
	}

	.info-bg {
		@include size(288rpx, 164rpx, none);
		@include ab();
		left: 0;
		top: 0;
	}

	.address {
		@include size(259rpx, 65rpx, none);
		background: url(../../static/index/bg2.png) no-repeat;
		background-size: 100% 100%;
		@include ab();
		right: 26rpx;
		top: 28rpx;
		@include cen();
	}

	.address-bg {
		@include size(259rpx, 65rpx, none);
		@include ab();
		left: 0;
		top: 0;
	}

	.address-txt {
		@include font(20rpx, #FFFFFF);
		@include bold();
	}

	.isDesert {
		background: url(@/static/smo.png) no-repeat;
		filter: "progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod='scale')";
		background-size: 100% 100%;
	}

	.desertBg {
		background: url(@/static/index/treebg2.png) no-repeat;
		background-size: 100% 100%;
	}
</style>
