<template>
	<!--输入交易密码-->
	<view class="delete-popup" v-show="show">
		<view class="aboutNFT" :class="{deleteActive:type == 1}">>
			<text class="aboutNFT-txt">本批次剩余NFT藏品数量：{{nftTotal}}</text>
			<scroll-view class="nfts" scroll-y="true" @scrolltolower='getPages'>
				<view class="nft" v-for="(item,index) in nfts">
					<view class="nft-icon-box">
						<image class="nft-icon" :src="item.status ==1 ? '/static/icon5.png':item.url" mode="widthFix"></image>
					</view>
					<text class="nft-txt">{{getHideInfo(item.trans_hash)}}</text>
				</view>
			</scroll-view>
			<image class="userinfo-close" @tap='onClose' src="/static/userinfo/close.png" mode=""></image>
		</view>
	</view>
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
				type:0,
				la:{},
				childOpen:false,
				popupShow:false,
				width:0,
				windowHeight:0,
				open:false,
				show:false,
				page:2,
				apiLock:true
			}
		},
		props:{
			nfts:{
				default:[]
			},
			nftTotal:{
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
			getPages(){
				if(!this.apiLock) return;
				this.apiLock = false;
				app.$get('user/nft',{page:this.page,size:10})
				.then(res=>{
					// console.log('nft产品:',res);
					setTimeout(()=>{
						this.apiLock = true;
					},1000);
					if(res.data.status == 1){
						if(res.data.result.data.length == 0) return
						this.nfts = this.nfts.concat(res.data.result.data);
						this.page++
					}
				})
			},
			onClose(){
				this.$emit('onClose');
			},
			getHideInfo(str){
				//隐藏中间信息
				const newStr = str+'';
				return newStr.substring(0,2) + '**' + newStr.substring(newStr.length - 3)
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
	
	.nfts{
		@include size(520rpx,350rpx,none);
		margin-top: 20rpx;
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
	}
	.nft{
		@include size(173rpx,130rpx,none);
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		margin-top: 30rpx;
		float: left;
	}
	.nft-icon-box{
		@include size(107rpx,90rpx,none);
		overflow: hidden;
		@include re();
		@include cen()
	}
	.nft-icon{
		width: 107rpx;
		height: auto;
		// @include size(107rpx,90rpx,none);
		@include ab()
	}
	.nft-txt{
		width: 173rpx;
		text-align: center;
		@include font(22rpx,#822700);
		@include bold();
		margin-top: 15rpx;
		@include tH();
	}
	.aboutNFT{
		@include size(680rpx,653rpx,none);
		@include re();
		transition-property:transform;
		transition-duration:.2s;
		transform: scale(0);
		background: url(@/static/bg7.png) no-repeat;
		background-size: 100% 100%;
		display:flex;
		flex-direction: column;
		align-items: center;
	}
	.aboutNFT-bg{
		@include size(680rpx,653rpx,none);
		@include ab();
		left: 0;
		top: 0;
	}
	.aboutNFT-txt{
		@include font($l,#792800);
		@include bold();
		margin-top: 126rpx;
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
