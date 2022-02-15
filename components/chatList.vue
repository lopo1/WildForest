<template>
	<view style="height: 100%;background: #F5F5F5;">
		<scroll-view class="chartScroll" :scroll-with-animation="scrollAnimation" :scroll-top="scrollTop"
			:scroll-into-view="scrollToView" @scroll="scroll" @scrolltolower="loadHistory" :lower-threshold="20"
			:scroll-y="true">
			<view class="charListBox">
				<view :style="{opacity: showReady?1:0}" style="margin: 20rpx 0;transform: rotate(-180deg);transition: opacity .3s;">
					<view class="chatItem" :class="[item.newMsg?'showNews':'']" v-for="(item,index) in chatData" :key="item.user_id+'_'+index">	
						<timeText2 :t="item.create_at" :index="index" :maxLength="chatData.length"></timeText2>	
						<view v-if="item.type == 1" class="receiveChat fr">
							<view @click="toUserInfo(item)" class="uHeader fr jc ac">
								<img-cache style="border-radius: 50%;" :fade-show="true" width="90rpx" height="90rpx" mode="aspectFit" :src="item.to_head_img">
								</img-cache>
							</view>
							<view class="rtBox fc">
								<text class="nickName">{{item.to_nickname}}</text>
								<view :id="'item-id-'+index" @longtap="longTap('item-id-'+index,index,1,item)" v-if="item.message_type == 1" :class="[item.newMsg?'newInfoLeft':'']" class="infoBox">
									<view :class="[selectionTextIndex == index?'textSelection':'']" class="messageText">
										<msgRulers :msg="item.message"></msgRulers>
									</view>
								</view>
								<!-- <view :id="'item-id-'+index" @longtap="longTap('item-id-'+index,index,1,item)" @tap="preImg(item.message)" v-if="item.message_type == 2"
									:style="{height:item.height + 'px'}" class="msgImageOuter fr ac">
									<img-cache :fade-show="true" :width="item.width + 'px'" :height="item.height + 'px'"
										mode="widthFix" :src="item.message"></img-cache>
								</view> -->
								<view :id="'item-id-'+index" @longtap="longTap('item-id-'+index,index,1,item)" @tap="preImg(item.message)" style="max-width: 40%;" v-if="item.message_type == 3"
									class="msgImageOuter fr ac">
									<ice :fade-show="true" style="border-radius: 10rpx;flex: 1;height: auto;min-height: 100rpx;"
										mode="widthFix" :src="item.message"></ice>
								</view>
								<view :id="'item-id-'+index" @longtap="longTap('item-id-'+index,index,1,item)" @tap="openVideoEvent(item)" style="max-width: 40%;position: relative;" v-if="item.message_type == 8"
									class="msgImageOuter fr ac">
									<ice  mode="widthFix" style="border-radius: 10rpx;flex: 1;height: auto;" :fade-show="true"
										:src="getPoster(item.message)"></ice>
									<view class="centerPlay fr jc ac">
										<image style="width: 70rpx;height: 70rpx;" src="../static/society/videoPlay.png"></image>
									</view>
								</view>
								<view @click="getRed(item)" :id="'item-id-'+index" @longtap="longTap('item-id-'+index,index,2,item)" v-if="item.message_type == 4 && canShowRed(item.message)" :class="[item.newMsg?'newInfoRight':'']" class="redBagBox fr jc ac">
									<image style="width: 64rpx;height: 70rpx;margin: 0 30rpx;" src="../static/society/redBagIcon.png"></image>
									<view class="redBagMessage">
										<text class="messageText2">{{getRedBagName(item.message)}}</text>
									</view>
								</view>
								<view @click="getRed2(item)" :id="'item-id-'+index" @longtap="longTap('item-id-'+index,index,2,item)" v-if="item.message_type == 4 && !canShowRed(item.message)" :class="[item.newMsg?'newInfoRight':'']" style="background: #F9E0C2;" class="redBagBox fr jc ac">
									<image style="width: 64rpx;height: 70rpx;margin: 0 30rpx;" src="../static/society/redBagIcon2.png"></image>
									<view class="redBagMessage">
										<text class="messageText2">{{getRedBagName(item.message)}}</text>
									</view>
								</view>
								<view @click="toGuildDetail(item.message.split(',')[0])" v-if="item.message_type == 5" class="invitaBox fr jc ac">
									<view class="guildHead">
										<img-cache style="border-radius: 50%;" :fade-show="true" width="80rpx" height="80rpx" mode="aspectFit" :src="item.message.split(',')[2]">
										</img-cache>
									</view>
									<view class="fc ac jb">
										<text style="font-size: 24rpx;color: #333333;">邀请你加入公会</text>
										<text style="font-size: 30rpx;margin-top: 5rpx;color: #333333;">{{item.message.split(',')[1]}}</text>
									</view>
								</view>
							</view>
						</view>
						<view v-if="item.type == 2" class="sendChat fr">
							<view class="rtBox2 fc">
								<text class="nickName">{{item.to_nickname}}</text>
								<view :id="'item-id-'+index" @longtap="longTap('item-id-'+index,index,2,item)" v-if="item.message_type == 1" :class="[item.newMsg?'newInfoRight':'']" class="infoBox">
									<view :class="[selectionTextIndex == index?'textSelection2':'']" class="messageText2">
										<msgRulers :msg="item.message"></msgRulers>
									</view>
								</view>
								<!-- <view :id="'item-id-'+index" @longtap="longTap('item-id-'+index,index,2,item)" @tap="preImg(item.message)" v-if="item.message_type == 3" class="msgImageOuter fr ac">
									<img-cache  mode="aspectFit" :fade-show="true" :width="item.width + 'px'" :height="item.height + 'px'"
										:src="item.message"></img-cache>
								</view> -->
								<view :id="'item-id-'+index" @longtap="longTap('item-id-'+index,index,2,item)" @tap="preImg(item.message)" v-if="item.message_type == 3" class="msgImageOuter fr ac" style="max-width: 40%;">
									<ice  mode="widthFix" style="border-radius: 10rpx;flex: 1;height: auto;min-height: 100rpx;" :fade-show="true"
										:src="item.message"></ice>
								</view>
								<view :id="'item-id-'+index" @longtap="longTap('item-id-'+index,index,2,item)" @tap="openVideoEvent(item)" v-if="item.message_type == 8" class="msgImageOuter fr ac" style="max-width: 40%;position: relative;">
									<ice  mode="widthFix" style="border-radius: 10rpx;flex: 1;height: auto;" :fade-show="true"
										:src="getPoster(item.message)"></ice>
									<view class="centerPlay fr jc ac">
										<image style="width: 70rpx;height: 70rpx;" src="../static/society/videoPlay.png"></image>
									</view>
								</view>
								<!-- 未领取 -->
								<view @click="getRed(item)" :id="'item-id-'+index" @longtap="longTap('item-id-'+index,index,2,item)" v-if="item.message_type == 4 && canShowRed(item.message)" :class="[item.newMsg?'newInfoRight':'']" class="redBagBox fr jc ac">
									<image style="width: 64rpx;height: 70rpx;margin: 0 30rpx;" src="../static/society/redBagIcon.png"></image>
									<view class="redBagMessage">
										<text class="messageText2">{{getRedBagName(item.message)}}</text>
									</view>
								</view>
								<!-- 已领取或已点击 -->
								<view @click="getRed2(item)" :id="'item-id-'+index" @longtap="longTap('item-id-'+index,index,2,item)" v-if="item.message_type == 4 && !canShowRed(item.message)" :class="[item.newMsg?'newInfoRight':'']" style="background: #F9E0C2;" class="redBagBox fr jc ac">
									<image style="width: 64rpx;height: 70rpx;margin: 0 30rpx;" src="../static/society/redBagIcon2.png"></image>
									<view class="redBagMessage">
										<text class="messageText2">{{getRedBagName(item.message)}}</text>
									</view>
								</view>
								<view @click="toGuildDetail(item.message.split(',')[0])" v-if="item.message_type == 5" class="invitaBox2 fr jc ac">
									<view class="guildHead" style="background: #FFFFFF;">
										<img-cache style="border-radius: 50%;" :fade-show="true" width="80rpx" height="80rpx" mode="aspectFit" :src="item.message.split(',')[2]">
										</img-cache>
									</view>
									<view class="fc ac jb">
										<text style="font-size: 24rpx;color: #FFFFFF;">邀请你加入公会</text>
										<text style="font-size: 30rpx;margin-top: 5rpx;color: #FFFFFF;">{{item.message.split(',')[1]}}</text>
									</view>
								</view>
							</view>
							<view @click="toUserInfo(item)" class="uHeader fr jc ac">
								<img-cache style="border-radius: 50%;" :fade-show="true" width="90rpx" height="90rpx" mode="aspectFit" :src="item.to_head_img">
								</img-cache>
							</view>
						</view>
						<view v-if="item.type == 3" class="guildTipsBox fr jc ac">
							<text v-if="item.message_type == 6" class="infoText">{{getUserName1(item)}}<text style="color: #FFBA29;margin: 0 5rpx;">领取了</text>{{getUserName2(item)}}的红包</text>
						</view>
						<timeText :t="item.create_at"></timeText>
					</view>
				</view>
				<view :style="{height:noMore?'0rpx':'60rpx',top:noMore?'0rpx':'30rpx'}" class="loadingHis fr jc">
					<Loading13></Loading13>
				</view>
			</view>
		</scroll-view>
		<u-toast ref="uToast" />
		<yinrh-menu-popup v-model="value" :pop-data="menu" :placement="place" :elInfo="elInfo" :x="x" :y="y" @tapPopup="tapPopup" />
		<u-modal class="redBagModel" width="540" v-model="redBagShow" :show-title="false" :show-confirm-button="false" :mask-close-able="true">
			<view @click="toRedBagInfo(currentRedBagInfo)" class="redBagOuter fc ac">
				<view class="redBagInfo">
					<view class="fr jc ac userRed">
						<image style="width: 60rpx;height: 60rpx;margin-right: 20rpx;" :src="currentRedBagInfo.head"></image>
						<text>{{currentRedBagInfo.nickname}} 的红包</text>
					</view>
					<text class="redTitle fr jc ac">{{currentRedBagInfo.title}}</text>
				</view>
				<view class="openBtn fr jc ac">
					<text v-show="!showOpenAnimate">打开</text>
					<image v-show="showOpenAnimate" class="openLoadingBtn" src="../static/society/openRedLoading.png"></image>
				</view>
			</view>
		</u-modal>
	</view>
</template>

<script>
	const app = getApp().globalData;
	import {
		resolveFile,
		getDirSize,
		removeDir,
		formatSize,
		storage
	} from '@/components/img-cache';
	import Loading13 from "@/components/loading13.vue";
	import {getDataList2,updateSQL} from '../util/lyz-sqlite/index.js';
	import uniCopy from '@/js_sdk/xb-copy/uni-copy.js'
	import ice from '@/components/ice/img-cache.vue'
	import timeText from '@/components/chatTimeText.vue'
	import timeText2 from '@/components/chatTimeText2.vue'
	import msgRulers from '@/components/msgRulers.vue'
	export default {
		components: {
			Loading13,
			ice,
			timeText,
			timeText2,
			msgRulers,
		},
		name: "chatList",
		data() {
			return {
				isHistoryLoading: false,
				scrollAnimation: true,
				scrollTop: 0,
				old: {
					scrollTop: 0
				},
				scrollToView: '',
				noMore: false,
				imgMaxWidth: 187,
				chatData: [],
				// chatData: [{
				// 		nickName: '周铭',
				// 		type: 1,
				// 		msgType: 1,
				// 		message: '大霖子,来改功能了,🤪',
				// 		header: 'https://www.hualigs.cn/image/60fc473323895.jpg'
				// 	},
				// 	{
				// 		nickName: '大霖子',
				// 		type: 2,
				// 		msgType: 1,
				// 		message: '哇哇哇呜呜呜啊啊啊啊嘟嘟嘟嘿嘿嘿哈哈哈',
				// 		header: 'https://www.hualigs.cn/image/60fc473381c20.jpg'
				// 	},
				// ],
				imgPreList: [],
				imgPreCurrent: 0,
				sWidth: 375,
				sHeight: 667,
				currentId:'',
				page:1,
				size:15,
				guildList:false,
				x: 0,
				y: 0,
				menu: [{
					title: '复制',
					icon:require('@/static/society/chatCopy.png'),
					iH:34,
					id:1,
				},{
					title: '转发',
					icon:require('@/static/society/chatReturn.png'),
					iH:32,
					id:2,
				}
				// , {
				// 	title: '置顶消息'
				// }, {
				// 	title: '翻译'
				// }, {
				// 	title: '删除'
				// }, {
				// 	title: '封禁用户'
				// }, {
				// 	title: '多选'
				// },
				],
				value: false, // 是否显示menu，true-显示
				place: 'bottom-end',
				elInfo:{},
				selectionTextIndex:-1,
				currentItem:null,
				showReady:false,
				redBagShow:false,
				currentRedBagInfo:{
					head:'',
					nickname:'',
					id:'',
					title:'',
					guild_id:'',
					message_id:'',
				},
				showOpenAnimate:false,
			};
		},
		computed:{
			getPoster(){
				return function (itemMessageStr) {
					let res = itemMessageStr.split('`')
					return res[0]
				}
			},
			getRedBagName(){
				return function (redBagItem) {
					let res = redBagItem.split(',')
					if(res.length <= 2){
						return res[1]
					}else{
						res.splice(0,1)
						let redName = ''
						res.map(item=>{
							redName += item
						})
						return redName
					}
				}
			},
			canShowRed(){
				return function (redBagItem) {
					let res = redBagItem.split(',')
					let redId = res[0]
					let idx = app.redBagList.findIndex(item=>item.red_id == redId)
					if(idx == -1){
						return true
					}else{
						return false
					}
				}
			},
			getUserName1(){
				return function (item) {
					let res = item.to_nickname.split(',')
					return res[1]
				}
			},
			getUserName2(){
				return function (item) {
					let res = item.to_nickname.split(',')
					return res[0]
				}
			},
		},
		created() {
			app.chatPreTime = ''
			app.chatPreTimeDown = ''
			app.chatShowPreTime = ''
			let sys = this.$u.sys()
			this.sWidth = sys.windowWidth
			this.sHeight = sys.windowHeight - 200
			console.log(this.sWidth, this.sHeight);
			this.imgMaxWidth = sys.windowWidth * 0.4
			console.log(this.imgMaxWidth);
		},
		mounted() {
			setTimeout(()=>{
				this.$nextTick(function(){
					this.showReady = true
				})
			},1000)
		},
		beforeDestroy() {
			if(this.currentId != ''){
				this.clearAll()
			}
		},
		methods: {
			clearAll(){
				updateSQL('chatData', 'privateList', {count:0},'id',this.currentId).then(res => {
					console.log('清空未读')
				})
				updateSQL('chatData', 'guildList', {count:0},'id',this.currentId).then(res => {
					console.log('清空未读')
				})
				this.currentId = ''
			},
			firstGetData(result,isGuild) {
				console.log('渲染历史数据');
				this.currentId = result
				this.guildList = isGuild
				this.loadHistory()
			},
			scroll(e) {
				this.value = false
				this.selectionTextIndex = -1
				this.old.scrollTop = e.detail.scrollTop
			},
			goNew() {
				setTimeout(()=>{
					if(this.old.scrollTop <= 600){
						this.$nextTick(function() {
							this.scrollTop = 1
						});
					}
				},100)
			},
			sendData(result) {
				console.log(result);
				this.$nextTick(function(){
					this.chatData.unshift(result)
					console.log('消息列表------------------------------------------');
					console.log(this.chatData);
					this.scrollTop = this.old.scrollTop
					this.goNew()
				})
			},
			sendData2(result) {
				console.log(result);
				this.$nextTick(function(){
					this.chatData.unshift(result)
					this.goNew()
				})
			},
			sendVideo(videoData) {
				// if (videoData.orientation == 'right') {
				// 	let saveWidth = videoData.width
				// 	let saveHeight = videoData.height
				// 	videoData.width = saveHeight
				// 	videoData.height = saveWidth
				// }
				// let w_hInfo = this.setImgWidthHeight(videoData)
				// let w_hInfo2 = this.setVideoWidthHeight(videoData)
				// console.log(w_hInfo);
				// let videoMsg = {
				// 	to_nickname: '大霖子',
				// 	newMsg: true,
				// 	type: 2,
				// 	message_type: 4,
				// 	poster: videoData.poster,
				// 	message: videoData.src,
				// 	vWidth: w_hInfo2.width,
				// 	vHeight: w_hInfo2.height,
				// 	to_head_img: 'https://www.hualigs.cn/image/60fc473381c20.jpg'
				// }
				console.log(videoData);
				this.chatData.unshift(videoData)
				this.goNew()
				// setTimeout(() => {
				// 	this.imgPreList.push('https://img.zcool.cn/community/0153af5fdb4a7d11013ee04dd2c6e7.gif')
				// 	this.chatData.push({
				// 		nickName: '周铭',
				// 		newMsg: true,
				// 		type: 1,
				// 		msgType: 2,
				// 		width: 160,
				// 		height: 108,
				// 		message: 'https://img.zcool.cn/community/0153af5fdb4a7d11013ee04dd2c6e7.gif',
				// 		header: 'https://www.hualigs.cn/image/60fc473323895.jpg'
				// 	}, )
				// }, 2000)
			},
			sendImg(imgList) {
				imgList.map(item => {
					this.imgPreList.push(item.src)
					let w_hInfo = this.setImgWidthHeight(item)
					console.log(w_hInfo);
					let shiftData = {
						to_head_img: 'https://www.hualigs.cn/image/60fc473381c20.jpg',
						to_nickName: '大霖子',
						message: item.src,
						message_type: 3,
						newMsg: true,
						type: 2,
						width: w_hInfo.width,
						height: w_hInfo.height,
					}
					this.chatData.unshift(shiftData)
				})
				this.goNew()
				setTimeout(() => {
					this.imgPreList.push('https://img.zcool.cn/community/0153af5fdb4a7d11013ee04dd2c6e7.gif')
					this.chatData.unshift({
						to_head_img: 'https://www.hualigs.cn/image/60fc473323895.jpg',
						to_nickName: '周铭',
						message: 'https://img.zcool.cn/community/0153af5fdb4a7d11013ee04dd2c6e7.gif',
						message_type: 2,
						newMsg: true,
						type: 1,
						width: 160,
						height: 108,
					}, )
					this.goNew()
				}, 2000)
			},
			setImgWidthHeight(item) {
				let width = item.width
				let height = item.height
				// 判断是否未长图
				if (height > width) {
					// 长图
					width = 80
					// 计算缩放比例
					let roc = width / item.width
					height = item.height * roc
				} else {
					if (width > this.imgMaxWidth) {
						width = this.imgMaxWidth
						// 计算缩放比例
						let roc = this.imgMaxWidth / item.width
						height = item.height * roc
					}
				}
				console.log({
					width,
					height
				});
				return {
					width,
					height
				}
			},
			setVideoWidthHeight(item) {
				let width = item.width
				let height = item.height
				let that = this
				let mathRes = function(width, height) {
					let mW = width
					let mH = height
					if (mW > that.sWidth) {
						mW = that.sWidth
						let roc = mW / item.width
						mH = item.height * roc
					}
					if (mH > that.sHeight) {
						// 长图
						mH = that.sHeight
						// 计算缩放比例
						let roc = mH / item.height
						mW = item.width * roc
					}
					console.log(mW, mH);
					if (mW <= that.sWidth && mH <= that.sHeight) {
						return {
							w: mW,
							h: mH
						}
					} else {
						mathRes(mW, mH)
					}
				}
				let res = mathRes(width, height)
				return {
					width: res.w,
					height: res.h
				}
			},
			preImg(src) {
				let index = this.imgPreList.findIndex((item) => {
					return item == src
				})
				if (index == -1) {
					index = 0
					this.imgPreList[0] = src
				}
				this.$nextTick(function(){
					this.imgPreCurrent = index
					console.log(this.imgPreList, this.imgPreCurrent);
					uni.previewImage({
						urls: this.imgPreList,
						current: this.imgPreCurrent,
						longPressActions: {
							itemList: ['保存图片'],
							indicator: 'number',
							current: this.imgPreCurrent,
							success: (data) => {
								uni.saveImageToPhotosAlbum({
									filePath: this.imgPreList[data.index],
									success: function() {
										uni.showToast({
											icon: 'none',
											position: 'bottom',
											title: '已保存到相册',
										})
									}
								});
								console.log('选中了第' + (data.tapIndex + 1) + '个按钮,第' + (data.index + 1) + '张图片');
							},
							fail: (err) => {
								console.log(err.errMsg);
							}
						}
					});
				})
			},
			openVideoEvent(item) {
				this.$emit('openVideoEvent', item)
			},
			//触发滑动到底部(加载历史信息记录)
			loadHistory(e) {
				if (this.noMore) {
					return
				}
				if (this.isHistoryLoading) {
					return;
				}
				this.isHistoryLoading = true
				if(this.guildList){
					getDataList2('chatData', 'guildChatList',this.page, this.size,{guild_id:this.currentId},'g_id','desc').then(res=>{
						this.isHistoryLoading = false
						console.log('本地历史请求成功');
						console.log(res);
						this.chatData = this.chatData.concat(res)
						if(this.page == 1 && res.length < this.size){
							setTimeout(()=>{
								this.noMore = true
							},2000)
						}
						this.page += 1
						if(res.length == 0){
							setTimeout(()=>{
								this.noMore = true
							},2000)
						}
					}).catch(e=>{
						console.log('本地历史请求失败');
					})
				}else{
					getDataList2('chatData', 'chatList',this.page, this.size,{conversation_id:this.currentId},'m_id','desc').then(res=>{
						// 判断最新消息是否与服务器最新一致 不一致则拉取，保存本地再渲染
						this.isHistoryLoading = false
						console.log('本地历史请求成功');
						console.log(res);
						this.chatData = this.chatData.concat(res)
						if(this.page == 1 && res.length < this.size){
							setTimeout(()=>{
								this.noMore = true
							},2000)
						}
						this.page += 1
						if(res.length == 0){
							setTimeout(()=>{
								this.noMore = true
							},2000)
						}
					}).catch(e=>{
						console.log('本地历史请求失败');
					})
				}
			},
			longTap(id,index,type,item) {
				console.log(item);
				if(item.message_type == 4){
					return
				}
				uni.hideKeyboard()
				setTimeout(()=>{
					let dom = uni.createSelectorQuery().in(this);
					dom.select('#'+id).boundingClientRect();
					dom.exec(data => {
						console.log(data);
						this.elInfo = data[0]
						let isTop = data[0].top >= 60
						this.place = type == 1?'left':'right'
						this.x = data[0]['width'] / 2;
						this.y = data[0][isTop ? 'top' : 'bottom'];
						// this.value = false
						setTimeout(()=>{
							uni.vibrateShort()
							this.value = true;
							this.selectionTextIndex = index
							this.currentItem = item
						},100)
					});
				},300)
			},
			tapPopup(e) {
				this.selectionTextIndex = -1
				if(e.id == 1){
					uniCopy({
						content:this.currentItem.message,
						success:(res)=>{
							uni.hideToast()
							this.$refs.uToast.show({
								title: '已复制',
								position:'bottom',
								icon: false
							})
						}
					})
				}
			},
			clearMenu(){
				console.log('清空');
				this.value = false;
				this.selectionTextIndex = -1
			},
			getLastData(){
				return this.chatData[0] || []
			},
			getRed(item){
				this.showOpenAnimate = false
				let msg = item.message
				let msgReturn = msg.split(',')
				this.currentRedBagInfo.head = item.to_head_img
				this.currentRedBagInfo.nickname = item.to_nickname
				this.currentRedBagInfo.title = this.getRedBagName(item.message)
				this.currentRedBagInfo.id = msgReturn[0]
				this.currentRedBagInfo.message_id = item.message_id
				this.currentRedBagInfo.guild_id = item.guild_id
				console.log(item);
				console.log(this.currentRedBagInfo);
				this.redBagShow = true
			},
			toRedBagInfo(currentInfo){
				this.showOpenAnimate = true
				console.log(currentInfo);
				let params = {
					guildId:this.currentRedBagInfo.guild_id,
					redId:this.currentRedBagInfo.id,
					messageId:this.currentRedBagInfo.message_id,
				}
				console.log(params);
				app.$post('GuildChat/getRed', params).then(res => {
					console.log('领取红包了');
					console.log(res);
					uni.hideToast()
					if(res.data.status == 1){
						let result = res.data.result
						if(result.hasOwnProperty('flag')){
							// 1 是已经领过了，2是过期，3是引进领完
							if(result.flag == 1){
								app.addRedBagId(this.currentRedBagInfo.id)
								this.$forceUpdate()
								this.redBagShow = false
								this.$refs.uToast.show({
									title: '您已领取过该红包',
									position:'bottom',
									type:'warning',
									icon: false
								})
							}else if(result.flag == 2){
								app.addRedBagId(this.currentRedBagInfo.id)
								this.$forceUpdate()
								this.redBagShow = false
								this.$refs.uToast.show({
									title: '红包已过期',
									type:'warning',
									position:'bottom',
									icon: false
								})
							}else if(result.flag == 3){
								app.addRedBagId(this.currentRedBagInfo.id)
								this.$forceUpdate()
								this.redBagShow = false
								this.$refs.uToast.show({
									title: '手慢啦~红包已被抢完',
									type:'warning',
									position:'bottom',
									icon: false
								})
							}
						}else{
							app.$get('GuildChat/redInfo',{
								guildId:this.currentRedBagInfo.guild_id,
								redId:this.currentRedBagInfo.id,}).then(res2 => {
								if(res2.data.status == 1){
									app.addRedBagId(this.currentRedBagInfo.id)
									this.$forceUpdate()
									this.redBagShow = false
									currentInfo['amount'] = res.data.result.amount
									let infoStr = JSON.stringify(res2.data.result)
									this.linkTo.navTo('./getRedBag?redInfo='+infoStr)
								}else{
									this.redBagShow = false
									this.$refs.uToast.show({
										title: res.data.info,
										type:'error',
										position:'bottom',
										icon: false
									})
								}
							}).catch(err=>{
								this.redBagShow = false
								this.$refs.uToast.show({
									title: '红包信息获取失败',
									type:'error',
									position:'bottom',
									icon: false
								})
							})
						}
					}else{
						this.redBagShow = false
						this.$refs.uToast.show({
							title: res.data.info,
							type:'error',
							position:'bottom',
							icon: false
						})
					}
				}).catch(err=>{
					this.redBagShow = false
					this.$refs.uToast.show({
						title: '领取红包失败',
						type:'error',
						position:'bottom',
						icon: false
					})
				})
				// setTimeout(()=>{
				// },2000)
			},
			getRed2(item){
				let msg = item.message
				let msgReturn = msg.split(',')
				console.log(item);
				console.log(item.guild_id);
				console.log(msgReturn[0]);
				app.$get('GuildChat/redInfo',{
					guildId:item.guild_id,
					redId:msgReturn[0],}).then(res2 => {
					if(res2.data.status == 1){
						console.log(res2.data.result);
						let infoStr = JSON.stringify(res2.data.result)
						this.linkTo.navTo('./getRedBag?redInfo='+infoStr)
					}else{
						this.redBagShow = false
						this.$refs.uToast.show({
							title: res.data.info,
							type:'error',
							position:'bottom',
							icon: false
						})
					}
				}).catch(err=>{
					this.redBagShow = false
					this.$refs.uToast.show({
						title: '红包信息获取失败',
						type:'error',
						position:'bottom',
						icon: false
					})
				})
			},
			toGuildDetail(id){
				this.linkTo.navTo('../guildDetail/guildDetail?guildId='+id)
			},
			toUserInfo(item){
				console.log(item);
				// 跳转userInfo
				this.linkTo.navTo('../../index/userInfo/userInfo?userId='+item.user_id)
			}
		}
	}
</script>

<style lang="scss" scoped>

	.uHeader {
		width: 90rpx;
		height: 90rpx;
		overflow: hidden !important;
		border-radius: 50%;
		box-shadow: 0 0 10rpx #999999;
		flex-shrink: 0;
	}
	.charListBox {
		padding: 0 30rpx;
		height: 100%;
		display: flex;
		flex-direction: column-reverse;
		justify-content: flex-end;
		transform: rotate(-180deg);
		padding-bottom: 10rpx;
	}

	.loadingHis {
		box-sizing: border-box;
		// padding-top: 60rpx;
		height: 60rpx;
		overflow: hidden;
		align-items: center;
		transition: .3s;
		position: relative;
	}

	.chatItem {
		margin-top: 10rpx;
		transform: rotate(-180deg);
	}

	.rtBox {
		flex: 1;
		padding-left: 20rpx;
		padding-bottom: 15rpx;
		align-items: flex-start;
		overflow: hidden;

		.infoBox {
			width: auto;
			background: #FFFFFF;
			padding: 20rpx;
			max-width: 80%;
			border-top-right-radius: 20rpx;
			border-bottom-right-radius: 20rpx;
			border-bottom-left-radius: 20rpx;
			box-shadow: 0 4rpx 8rpx #e3e3e3;
			word-break: break-all;
		}
			
		.redBagBox{
			padding: 0 20rpx;
			max-width: 80%;
			height: 130rpx;
			background: #F58C26;
			border-top-right-radius: 10rpx;
			border-bottom-left-radius: 10rpx;
			border-bottom-right-radius: 10rpx;
		}
		
		.redBagMessage{
			flex: 1;
			color: #FFFFFF;
			margin-right: 40rpx;
			font-size: 30rpx;
			overflow: hidden;
			text-overflow:ellipsis;
			white-space: nowrap;
		}

		.messageText {
			font-size: 30rpx;
			line-height: 50rpx;
			padding: 0 8rpx;
			color: #333333;
		}
		
		.textSelection{
			background: #66CCCC !important;
			color: #FFFFFF;
			transition: .2s;
		}

		.msgImageOuter {
			max-width: 50%;
			border-radius: 10rpx;
			border-top-left-radius: 0;
			overflow: hidden;
		}
	}

	.nickName {
		padding: 15rpx 0 15rpx 0;
		font-size: 26rpx;
		color: #999999;
	}

	.sendChat {
		justify-content: flex-end;

		.rtBox2 {
			align-items: flex-end;
			flex: 1;
			padding-right: 20rpx;
			padding-bottom: 15rpx;
			overflow: hidden;

			.infoBox {
				width: auto;
				background: linear-gradient(to right, #1eb0ff, #1890FF);
				padding: 20rpx;
				max-width: 80%;
				border-top-left-radius: 20rpx;
				border-bottom-right-radius: 20rpx;
				border-bottom-left-radius: 20rpx;
				box-shadow: 0 0 8rpx #e3e3e3;
				word-break: break-all;
			}
			
			.redBagBox{
				padding: 0 20rpx;
				max-width: 80%;
				height: 130rpx;
				background: #F58C26;
				border-top-left-radius: 10rpx;
				border-bottom-left-radius: 10rpx;
				border-bottom-right-radius: 10rpx;
			}
			
			.redBagMessage{
				flex: 1;
				color: #FFFFFF;
				margin-right: 40rpx;
				font-size: 30rpx;
				overflow: hidden;
				text-overflow:ellipsis;
				white-space: nowrap;
			}

			.messageText2 {
				font-size: 30rpx;
				padding: 0 8rpx;
				line-height: 50rpx;
				color: #FFFFFF;
			}
		
			.textSelection2{
				background: #66CCCC !important;
				color: #FFFFFF;
				transition: .2s;
			}

			.msgImageOuter {
				max-width: 50%;
				border-radius: 10rpx;
				border-top-right-radius: 0;
				overflow: hidden;
			}
		}
	}


	.msgImageOuter {
		box-shadow: 0 4rpx 8rpx #e1e1e1;
	}

	.newInfoLeft {
		position: relative;
		left: -100%;
		opacity: 0;
		animation: infoShow .3s forwards;
	}

	.newInfoRight {
		position: relative;
		right: -100%;
		opacity: 0;
		animation: infoShow2 .3s forwards;
	}

	@keyframes infoShow {
		from {
			left: -100%;
			opacity: 0;
		}

		to {
			left: 0;
			opacity: 1;
		}
	}

	@keyframes infoShow2 {
		from {
			right: -100%;
			opacity: 0;
		}

		to {
			right: 0;
			opacity: 1;
		}
	}
	.showNews{
		opacity: 0;
		animation: showNewsAnimation .3s forwards;
	}
	
	@keyframes showNewsAnimation {
		from {
			opacity: 0;
		}
	
		to {
			opacity: 1;
		}
	}
	
	.centerPlay{
		border-radius: 50%;
		position: absolute;
		top: 50%;
		left: 50%;
		width: 70rpx;
		height: 70rpx;
		transform: translate(-50%,-50%);
		background: rgba(0,0,0,.3);
		opacity: .9;
	}
	.redBagOuter{
		width: 540rpx;
		height: 750rpx;
		background: url(../static/society/redbagBg.png);
		background-size: 100% 100%;
		position: relative;
		.redBagInfo{
			flex: 1;
			.userRed{
				margin: 150rpx 36rpx 50rpx 36rpx;
				font-size: 30rpx;
				color: #ffffff;
			}
			.redTitle{
				margin: 0 36rpx;
				font-size: 36rpx;
				font-weight: 700;
				color: #ffffff;
			}
		}
		.openBtn{
			border-radius: 50%;
			width: 120rpx;
			height: 120rpx;
			margin-bottom: 125rpx;
			background: #FFC893;
			font-size: 34rpx;
			font-weight: 700;
			color: #333333;
		}
	}
	.openLoadingBtn{
		width: 60rpx;
		height: 60rpx;
		animation: rotate 1s linear infinite;
	}
	@keyframes rotate{
		from{transform: rotate(0deg)}
	    to{transform: rotate(359deg)}
	}
	.guildTipsBox{
		margin: 20rpx 0;
		font-size: 24rpx;
		color: #999999;
	}
	.invitaBox{
		max-width: 100%;
		padding:25rpx 20rpx;
		border-radius: 10px;
		background: #FFFFFF;
		box-shadow: 0 0 8rpx #e3e3e3;
		border-top-left-radius: 0;
	}
	.invitaBox2{
		max-width: 100%;
		padding:25rpx 20rpx;
		border-radius: 10px;
		background: linear-gradient(to right, #1eb0ff, #1890FF);
		box-shadow: 0 0 8rpx #e3e3e3;
		border-top-right-radius: 0;
	}
	.guildHead{
		flex-shrink: 0;
		width: 80rpx;
		height: 80rpx;
		border-radius: 50%;
		box-shadow: 0 0 1rpx #838383;
		overflow: hidden;
		margin-right: 20rpx;
	}
</style>
