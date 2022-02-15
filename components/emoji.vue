<template>
	<view class="fc eBox" v-show="readyShow" :style="{height:maxHeight + 'px'}">
		<view class="swiper-item">
			<view v-if="hisData.length > 0" class="fc">
				<view class="tipsText" :style="{marginLeft:eM + 'px'}">
					最近使用
				</view>
				<view class="eList fr ac">
					<view @click="selectEmoji(item)" class="emojiItem fr jc ac"
						:style="{width:eWidth + 'px',height:eWidth + 'px',margin:eM + 'px'}"
						v-for="(item,index) in hisData" :key="item.id + '' + index">
						{{item.text}}
					</view>
				</view>
			</view>
			<view class="tipsText" :style="{marginLeft:eM + 'px'}">
				所有表情
			</view>
			<view class="eList fr ac">
				<view @click="selectEmoji(item)" class="emojiItem fr jc ac"
					:style="{width:eWidth + 'px',height:eWidth + 'px',margin:eM + 'px'}" v-for="item in emojiData"
					:key="item.id">
					{{item.text}}
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import emJson from '../static/society/emJson.js'
	const app = getApp().globalData;
	export default {
		name: "emoji",
		props: {
			maxHeight: {
				type: Number,
				default: 275,
			},
		},
		data() {
			return {
				readyShow:false,
				emojiData: [],
				hisData: [],
				hisChangeData: [],
				maxWidth: 375,
				eWidth: 35,
				eM: 6,
				maxRow: 8,
				maxColum: 7,
			}
		},
		created() {
			let sys = this.$u.sys()
			this.maxWidth = sys.windowWidth - 30
			this.eWidth = (this.maxWidth / this.maxRow) - (this.eM * 2)
			this.maxColum = parseInt(this.maxHeight / (this.eWidth + (this.eM * 2)))
			this.pageSize = this.maxRow * (this.maxColum + 1);
			this.hisData = uni.getStorageSync('hisEmoji') || []
			this.hisChangeData = uni.getStorageSync('hisEmoji') || []
			this.getEmojiData()
			uni.$on('changeHis', () => {
				this.hisData = uni.getStorageSync('hisEmoji') || []
				this.hisChangeData = uni.getStorageSync('hisEmoji') || []
			})
		},
		mounted() {
			this.$nextTick(function(){
				this.readyShow = true
			})
		},
		destroyed() {
			uni.$off('changeHis')
		},
		methods: {
			getEmojiData() {
				this.emojiData = emJson
			},
			selectEmoji(item) {
				console.log(item);
				this.$emit('emojiText', item.text)
				this.saveEmj(item)
			},
			saveEmj(item) {
				let cId = item.id
				let saved = this.hisChangeData.findIndex(item => item.id == cId)
				console.log(saved);
				if (saved >= 0) {
					this.hisChangeData.splice(saved, 1)
					this.hisChangeData.unshift(item)
				} else {
					this.hisChangeData.unshift(item)
					if (this.hisChangeData.length > this.maxRow) {
						this.hisChangeData.splice(this.hisChangeData.length - 1, 1)
					}
				}
				// console.log(123);
				// let data = await uni.getStorageSync('hisEmoji')
				// let obj = {};
				// let peon = data.reduce((cur,next) => {
				//     obj[next.text] ? "" : obj[next.text] = true && cur.push(next);
				//     return cur;
				// },[]) 
				// this.hisData = peon
				// this.hisChangeData = peon
				uni.setStorageSync('hisEmoji', this.hisChangeData)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.eBox {
		width: 100%;
		overflow: hidden;
		background: #FFFFFF;
	}

	.swiper-item {
		flex: 1;
		height: 0;
		padding: 10rpx 30rpx;
		width: 100%;
		overflow: auto;
	}

	@keyframes showHisBox {
		from {
			height: 0;
		}

		to {
			height: auto;
		}
	}

	.eList {
		flex-wrap: wrap;
	}

	.emojiItem {
		font-size: 50rpx;
		margin: 20rpx;
	}

	.tipsText {
		margin-top: 15rpx;
		font-size: 24rpx;
		color: #4c4c4c;
	}
</style>
