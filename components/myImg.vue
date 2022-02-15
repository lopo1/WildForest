<template>
	<view>
		<u-image style="box-shadow: 0rpx 0rpx 8rpx #bebebe;" :width="width" :height="height" :border-radius="borderRadius" :src="src" duration="450" :fade="true">
			<u-loading slot="loading"></u-loading>
			<view slot="error" style="width: 100%;height: 100%;">
				<image style="width: 100%;height: 100%;" src="../static/lev-logo.png" :mode="mode"></image>
			</view>
		</u-image>
	</view>
</template>

<script>
	export default {
		name:"myImg",
		props: {
			width: {
				type: String,
				default: '50rpx'
			},
			height: {
				type: String,
				default: '50rpx'
			},
			borderRadius:{
				type: String,
				default: '0'
			},
			src:{
				type: String,
				default: ''
			},
			mode:{
				type: String,
				default: 'aspectFit'
			}
		},
		data() {
			return {
				
			};
		}
	}
</script>

<style scoped lang="scss">
</style>
