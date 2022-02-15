<template>
	<!--输入交易密码-->
		<view class="delete-popup" v-show="show">
			<view class="buy" :class="{deleteActive:type == 1}">
				<view class="ban-box" style="background-color: red;">
					<view class="ban">
						<view class="ban-txt-box">
							<text class="ban-txt">可用: {{usdt}}</text>
						</view>
						<image class="ban-icon" src="/static/index/icon5.png" mode=""></image>
					</view>
					<view class="ban">
						<view class="ban-txt-box">
							<text class="ban-txt">可获得贡献值: {{contribute}}</text>
						</view>
					</view>
				</view>
				<view class="goods-box">
					<view class="goods" v-for="(item,index) in treePrices" @tap='onTapNum(index)'>
						<image class="goods-icon" :src="item.url" mode=""></image>
						<view class="ban2">
							<view class="ban-txt-box2">
								<text class="ban-txt">{{item.price}}</text>
							</view>
							<image class="ban-icon2" src="/static/index/icon5.png" mode=""></image>
						</view>
						<text class="goods-txt">{{item.name}}</text>
						<image class="goods-pick" v-if="tapNum == index" src="/static/buy/gou.png" mode=""></image>
					</view>
				</view>
				<view class="operate">
					<view class="operate-nums">
						<input type="number" value="" @input='onNum' v-model="num" class="operate-input" />
						<cover-image class="operate-nums-icon" @tap='onReduce' src="/static/buy/j.png" mode=""></cover-image>
						<cover-image class="operate-nums-icon2" @tap='onAdd' src="/static/buy/a.png" mode=""></cover-image>
					</view>
					<view class="operate-ban">
						<image class="operate-ban-icon" src="/static/index/icon5.png" mode=""></image>
						<text class="operate-ban-txt">x{{total}}</text>
					</view>
					<view class="buy-btn" @tap='onBuy'>
						<image class="btn-bg" src="/static/buy/btn.png" mode=""></image>
					</view>
				</view>
				<image class="userinfo-close" @tap='onClose' src="/static/userinfo/close.png" mode=""></image>
			</view>
			<view class="newPopup" v-show="childOpen" :class="{popupShow:popupShow}"></view>
			<view class="popupInfo" v-show="childOpen" :class="{popupShow:popupShow}">
				<text class="popupInfo-title">提示</text>
				<text class="popupInfo-txt">购买成功，请等待交易完成</text>
				<view class="popupInfo-btn" @tap='onClose'>
					<text class="popupInfo-btn-txt">确认</text>
				</view>
			</view>
		</view>
	
</template>

<script>
	const app = getApp().globalData;
	import np from '@/common/np.js';
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
				// trees:[
				// 	{url:'/static/buy/junjun.png',price:'158',name:"梭梭树",contribute:1},
				// 	{url:'/static/buy/shaliu.png',price:'316',name:"沙柳",contribute:2},
				// 	{url:'/static/buy/yu.png',price:'790',name:"榆树",contribute:5},
				// 	{url:'/static/buy/bais.png',price:'1580',name:"柏树",contribute:10},
				// 	{url:'/static/buy/zhangzi.png',price:'3160',name:"樟子松",contribute:20},
				// 	{url:'/static/buy/yunshan.png',price:'7900',name:"云杉",contribute:50},
				// 	{url:'/static/buy/huyang.png',price:'15800',name:"胡杨",contribute:100},
				// 	{url:'/static/buy/lengshan.png',price:'31600',name:"冷杉",contribute:200},
				// ],
				la:{},
				type:0,
				childOpen:false,
				popupShow:false,
				width:0,
				windowHeight:0,
				open:false,
				show:false,
				num:1,
				tapNum:-1,
				total:0,
				apiLock:true,
				contribute:"--"
			}
		},
		props:{
			treePrices:{
				default:[]
			},
			getShow:{
				//用于接收
				default:false
			},
			usdt:{
				default:0
			},
			accredit:{
				default:0,//授权数量
			}
		},
		
		onShow(){
			this.getSystemHeight();
		},
	
		mounted(){
			this.getSystemHeight();
		},
		methods:{
			getTransaction(txId){
				//查看交易讯息
				setTimeout(()=>{
					tronWeb.trx.getTransaction(txId)
					.then(res=>{
						console.log(res);
						if(res.ret && res.ret[0].contractRet){
							this.$emit('onBuyRefresh')
						}
					})
				},3000)
				
			},
			async onBuy(){
				if(this.tapNum < 0){
					app.$tips('请选择种子');
					return
				}else if(this.num <= 0){
					app.$tips('数量有误');
					return
				}else if(this.total <=0 || this.total==''){
					app.$tips('价格有误');
					return
				}else if(this.total > this.usdt){
					app.$tips('USDT余额不足');
					return
				}
				if(this.accredit>0){
					//已授权
					if(!this.apiLock) return;
					this.apiLock = false;
					uni.showLoading({mask:true});
					try{
						const res = await app.forestContract.buyTree(this.tapNum,this.num).send({feeLimit:tronWeb.toSun(5000),})
						console.log(res);
						// this.getTransaction(res)
						this.getTransaction(res)
						app.$tips('交易进行中，请等待交易完成');
						this.apiLock = true;
						this.onChildOpen();
						uni.hideLoading();
					} catch{
						app.$tips('购买失败')
						this.apiLock = true;
						uni.hideLoading();
					}
				}else{
					//未授权
					uni.showLoading({mask:true});
					const num = new Number(2**255-1).toLocaleString().split(',').join('');
					app.usdtContract.approve(app.forest_Address,num)
					.send((error, transactionHash)=>{
						if(!error) {
						   console.log('transactionHash is :' + transactionHash);
						   app.$tips('授权交易进行中，请等待交易完成');
						} else {
						   console.log(error);
						   uni.hideLoading();
						}
					})
				}
				
			},
			onNum(ev){
				console.log(ev.detail.value);
				if(this.tapNum <0) return;
				if(ev.detail.value == '') return;
				// console.log(Math.round(ev.detail.value))
				this.$nextTick(()=>{
					this.num = Math.floor(ev.detail.value);
					this.total = np.times(this.num,this.treePrices[this.tapNum].price);
					this.contribute = np.times(this.num,this.treePrices[this.tapNum].contribute);
				})
			},
			onAdd(){
				console.log(this.tapNum);
				if(this.tapNum*1 < 0){
					app.$tips('请选择要购买的种子');
					return;
				}
				if(this.num >= 99){
					this.num = 99;
					return;
				}
				this.num ++;
				this.total = np.times(this.num,this.treePrices[this.tapNum].price);
				this.contribute = np.times(this.num,this.treePrices[this.tapNum].contribute);
			},
			onReduce(){
				if(this.tapNum*1 <0){
					app.$tips('请选择要购买的种子');
					return;
				}
				if(this.num <= 1){
					this.num = 1;
					return;
				}
				this.num --;
				this.total = np.times(this.num,this.treePrices[this.tapNum].price);
				this.contribute = np.times(this.num,this.treePrices[this.tapNum].contribute);
			},
			onTapNum(index){
				this.tapNum = index;
				this.total = np.times(this.num,this.treePrices[this.tapNum].price);
				this.contribute = np.times(this.num,this.treePrices[this.tapNum].contribute);
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
		@include size(477rpx,275rpx,none);
		background: url(@/static/buy/popup.png) no-repeat;
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
	
	.goods-pick{
		@include size(48rpx,48rpx,none);
		@include ab();
		right: 10rpx;
		top: 0;
	}
	.buy-btn{
		@include size(156rpx,70rpx,none);
		@include ab();
		right: 20rpx;
	}
	.btn-bg{
		@include size(156rpx,70rpx,none);
	}
	.operate-ban{
		display: flex;
		flex-direction: row;
		align-items: center;
		margin-left: 20rpx;
	}
	.operate-nums{
		@include size(170rpx,54rpx,none);
		@include re();
		display: flex;
		flex-direction: row;
		align-items: center;
		@include cen();
	}
	.operate-ban-txt{
		@include font($e,#fff);
		@include bold();
		margin-left: 10rpx;
	}
	.operate-ban-icon{
		@include size(48rpx,48rpx,none);
	}
	.operate-nums-icon{
		@include size(54rpx,54rpx,none);
		@include ab();
		left: 0;
	}
	.operate-nums-icon2{
		@include size(54rpx,54rpx,none);
		@include ab();
		right: 0;
	}
	.operate-input{
		@include size(100rpx,45rpx,#FFE1A1);
		@include font($m,#5E2107);
		@include bold();
		text-align: center;
	}
	.operate{
		@include size(600rpx,70rpx,nones);
		display: flex;
		flex-direction: row;
		align-items: center;
		margin-top: 47rpx;
		@include re();
	}
	.goods-icon{
		@include size(83rpx,83rpx,none);
	}
	.ban-box{
		@include size(600rpx,50rpx,none);
		margin-top: 168rpx;
		display: flex;
		// flex-direction: row-reverse;
	}
	.ban-txt-box{
		height: 45rpx;
		min-width: 220rpx;
		width:auto ;
		background: #FFE1A1;
		white-space:nowrap; overflow:hidden; text-overflow:ellipsis;
		padding-left: 30rpx;
		padding-right: 30rpx;
		border-radius: 20rpx;
		@include cen();
		margin-left: 30rpx;
	}
	.ban-txt-box2{
		@include size(120rpx,30rpx,#FFE1A1);
		border-radius: 20rpx;
		@include cen();
		padding-left: 30rpx;
		// margin-left: 30rpx;
		
	}
	.ban-txt{
		@include font(20rpx,#5E2107);
		@include bold();
	}
	.ban{
		@include size(280rpx,50rpx,none);
		display: flex;
		flex-direction: row;
		align-items: center;
		border-radius: 20rpx;
		padding-right: 20rpx;
		@include re()
	}
	.ban2{
		@include size(150rpx,50rpx,none);
		display: flex;
		flex-direction: row;
		align-items: center;
		border-radius: 20rpx;
		@include ab();
		left: 0;
		top: 70rpx;
	}
	.goods-txt{
		@include font($s,#FFFFFF);
		@include bold();
		margin-top: 30rpx;
	}
	.ban-icon{
		@include size(45rpx,45rpx,none);
		@include ab();
		left: 10rpx;
	}
	.ban-icon2{
		@include size(45rpx,45rpx,none);
		@include ab();
		left: 0rpx;
	}
	.goods-box{
		@include size(600rpx,328rpx,none);
		margin-top: 40rpx;
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
	}
	.goods{
		@include size(150rpx,150rpx,none);
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		@include re();
		margin-top: 15rpx;
	}
	.buy{
		@include size(661rpx,722rpx,none);
		align-items: center;
		background: url(@/static/bg8.png) no-repeat;
		background-size: 100% 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		transform: scale(0);
		transition: .2s;
	}
	.buy-bg{
		@include size(661rpx,722rpx,none);
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
		z-index: 999;
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
		top: 90rpx;
		right: 10rpx;
	}
	.popupShow{
		opacity :1
	}
</style>
