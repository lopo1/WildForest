<template>
	<view class="fc eBox" v-show="readyShow" :style="{height:maxHeight + 'px'}">
		<view class="swiper-item fr">
			<view class="toolsItem fc jc ac" @tap="toolsTap(item)" :style="{width:eWidth + 'px',margin:eM + 'px'}"
				v-for="item in configList">
				<view class="fr jc ac toolsIcon" :style="{width:eWidth - 5 + 'px',height:eWidth - 5 + 'px'}">
					<image v-show="item == 'picture'" style="width: 60rpx;height: 50rpx;"
						src="../static/society/picture.png"></image>
					<image v-show="item == 'camera'" style="width: 63rpx;height: 52rpx;"
						src="../static/society/camera.png"></image>
					<image v-show="item == 'red'" style="width: 51rpx;height: 60rpx;" src="../static/society/red.png">
					</image>
					<image v-show="item == 'collection'" style="width: 60rpx;height: 50rpx;"
						src="../static/society/picture.png"></image>
				</view>
				<text v-show="item == 'picture'" class="btnTxt">图片/视频</text>
				<text v-show="item == 'camera'" class="btnTxt">拍摄</text>
				<text v-show="item == 'red'" class="btnTxt">红包</text>
				<text v-show="item == 'collection'" class="btnTxt">收藏</text>
			</view>
		</view>
		<!-- style="height: 0;overflow: hidden;" -->
		<view>
			<helang-compress ref="helangCompress"></helang-compress>
		</view>
		<u-action-sheet :list="list" :border-radius="20" @click="sheetClick" v-model="showSheet"></u-action-sheet>
		<u-action-sheet :list="list2" :border-radius="20" @click="sheetClick2" v-model="showSheet2"></u-action-sheet>
		<myLoading ref="loading" :mask-alpha="0.1" animation="zoom-lessen" ft-color="#333333" bg-color="#FFFFFF"
			loading-type="scale-line" />
		<u-toast ref="uToast" />
	</view>
</template>

<script>
	import helangCompress from './helang-compress/helang-compress.vue'
	const app = getApp().globalData;
	export default {
		name: "tools",
		components: {
			helangCompress
		},
		props: {
			maxHeight: {
				type: Number,
				default: 275,
			},
			hasRightIcon:{
				type:Boolean,
				default:false
			}
		},
		data() {
			return {
				readyShow: false,
				maxWidth: 375,
				eWidth: 35,
				eM: 10,
				maxRow: 4,
				list: [{
					text: '图片'
				}, {
					text: '视频'
				}],
				showSheet: false,
				list2: [{
					text: '照相'
				}, {
					text: '视频'
				}],
				showSheet2: false,
				currentItem: '',
				configList:['picture', 'camera', 'collection'],
			}
		},
		created() {
			if(this.hasRightIcon){
				this.configList = ['picture', 'camera','red','collection']
			}
			let sys = this.$u.sys()
			this.maxWidth = sys.windowWidth - 30
			this.eWidth = (this.maxWidth / this.maxRow) - (this.eM * 2)
			console.log(this.eWidth);
		},
		mounted() {
			this.$nextTick(function() {
				this.readyShow = true
			})
		},
		methods: {
			toolsTap(item) {
				this.currentItem = item
				switch (item) {
					case 'picture':
						this.showSheet = true
						break;
					case 'camera':
						this.showSheet2 = true
						break;
					case 'red':
						this.$emit('redbag', true)
						break;
					case 'collection':
						break;
					default:
						break;
				}
			},
			// 图片事件
			pictureEvent(type) {
				if (type == 1) {
					uni.chooseImage({
						sizeType: ['original'],
						sourceType: ['album'], //从相册选择
						success: (res) => {
							this.picHandle(res.tempFilePaths)
						}
					});
				}
				if (type == 2) {
					uni.chooseImage({
						sizeType: ['original'], //可以指定是原图还是压缩图，默认二者都有
						sourceType: ['camera'],
						camera:'back',
						success: (res) => {
							this.picHandle(res.tempFilePaths)
						}
					});
				}
			},
			picHandle(picList) {
				// 图片处理
				if (picList.length <= 1) {
					this.$refs.loading.changeTitle(`处理中`)
					this.$refs.loading.showLoading()
					this.$refs.helangCompress.compress({
						src: picList[0],
						maxSize: 1080,
						fileType: 'jpg',
						quality: 0.8,
						minSize: -10 //最小压缩尺寸，图片尺寸小于该时值不压缩，非H5平台有效。若需要忽略该设置，可设置为一个极小的值，比如负数。
					}).then((res) => {
						// 压缩成功回调
						this.$emit('picMessage', [res])
						this.$refs.loading.hideLoading()
					}).catch((err) => {
						console.log(err);
						this.$refs.loading.hideLoading()
						// 压缩失败回调
						uni.showToast({
							title: '压缩失败',
						})
					})
				} else {
					this.$refs.loading.changeTitle(`处理中(0/${picList.length})`)
					this.$refs.loading.showLoading()
					this.$refs.helangCompress.batchCompress({
						batchSrc: picList,
						maxSize: 1080,
						fileType: 'jpg',
						quality: 0.8,
						minSize: -10, //最小压缩尺寸，图片尺寸小于该时值不压缩，非H5平台有效。若需要忽略该设置，可设置为一个极小的值，比如负数。
						progress: (res) => {
							this.$refs.loading.changeTitle(`处理中(${res.done}/${picList.length})`)
						},
					}).then((res) => {
						// 压缩成功回调
						console.log('图片处理完成');
						console.log(res);
						this.$emit('picMessage', res)
						this.$refs.loading.hideLoading()
					}).catch((err) => {
						console.log(err);
						this.$refs.loading.hideLoading()
						// 压缩失败回调
						uni.showToast({
							title: '压缩失败',
						})
					})
				}
			},
			// 视频事件
			videoEvent(type) {
				if (type == 1) {
					uni.chooseVideo({
						sizeType: ['original'], //可以指定是原图还是压缩图，默认二者都有
						sourceType: ['album'], //从相册选择
						maxDuration: 15,
						compressed: false,
						success: (res) => {
							if (res.size > 83886080) {
								this.$refs.uToast.show({
									title: '视频大小超过80MB!',
									type: 'warning',
									icon: false,
								})
							} else {
								this.videoHandle(res)
							}
						}
					});
				}
				if (type == 2) {
					uni.chooseVideo({
						sizeType: ['original'], //可以指定是原图还是压缩图，默认二者都有
						sourceType: ['camera'],
						compressed: false,
						maxDuration:30,
						camera:'back',
						success: (res) => {
							this.videoHandle(res)
						}
					});
				}
			},
			videoHandle(videoFile) {
				let that = this
				let token = uni.getStorageSync('token')
				this.$refs.loading.changeTitle(`处理中...`)
				this.$refs.loading.showLoading()
				this.$refs.helangCompress.compressVideo(videoFile).then((res) => {
					// 上传视频
					uni.uploadFile({
						url: this.baseUrl + '/GuildChat/uploadFile',
						filePath: res.src,
						header:{
							token:token
						},
						formData:{
							flag:1,
						},
						name: 'fi',
						success: function(uploadFileRes) {
							console.log('上传成功');
							console.log(JSON.parse(uploadFileRes.data));
							let result = JSON.parse(uploadFileRes.data)
							if(result.status == 1){
								res.poster = result.result.img_url
								res.src = result.result.url
								// 压缩成功回调
								that.$emit('videoMessage', res)
								that.$refs.loading.hideLoading()
							}else{
								that.$refs.loading.hideLoading()
								uni.showToast({
									icon:'none',
									title: '上传失败',
								})
							}
						},
						fail(err) {
							console.log('上传失败');
							console.log(err);
							uni.showToast({
									icon:'none',
								title: '上传失败',
							})
						}
					});
				}).catch((err) => {
					console.log(err);
					this.$refs.loading.hideLoading()
					// 压缩失败回调
					uni.showToast({
						title: '压缩失败',
					})
				})
			},
			// 视频大小转换
			bytesToSize(bytes) {
				if (bytes === 0) return '0 B';
				let k = 1024,
					sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
					i = Math.floor(Math.log(bytes) / Math.log(k));
				return (bytes / Math.pow(k, i)).toFixed(2) + ' ' + sizes[i];
			},
			sheetClick(index) {
				if (index == 0) {
					this.pictureEvent(1)
				}
				if (index == 1) {
					this.videoEvent(1)
				}
			},
			sheetClick2(index) {
				if (index == 0) {
					this.pictureEvent(2)
				}
				if (index == 1) {
					this.videoEvent(2)
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.eBox {
		width: 100%;
		background: #FFFFFF;
		overflow: hidden;
	}

	.swiper-item {
		padding: 30rpx;
	}

	.toolsIcon {
		background: #FFFFFF;
		border-radius: 50%;
		box-shadow: 0rpx 0rpx 10rpx #e3e3e3;
	}

	.btnTxt {
		font-size: 26rpx;
		color: #666666;
		margin-top: 20rpx;
	}
</style>
