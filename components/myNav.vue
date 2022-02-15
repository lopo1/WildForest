<template>
	<view>
		<u-navbar style="flex-shrink: 0;" :title-width="350" :is-fixed="fixed" :border-bottom="borderBottom" :background="background" :is-back="false" title-size="36rpx" :title-color="titleColor" :title="title">
			<view slot="right">
				<slot name="rt"></slot>
			</view>
			<view class="fr ac" style="padding-left: 30rpx;" @click="backClick">
				<image style="width: 50rpx;height: 50rpx;" :src="leftIcon"></image>
			</view>
		</u-navbar>
	</view>
</template>

<script>
	export default {
		name:"myNav",
		props: {
			title: {
				type: String,
				default: '',
			},
			titleColor: {
				type: String,
				default: '#1A1A1A',
			},
			background:{
				type: Object,
				default: ()=>{
					return {background:'#FFFFFF'}
				},
			},
			borderBottom:{
				type:Boolean,
				default:true,
			},
			fixed:{
				type:Boolean,
				default:true,
			},
			leftIcon:{
				type: String,
				default:'/static/back.png'
			}
		},
		data() {
			return {
				
			};
		},
		methods:{
			backClick(){
				uni.navigateBack({
					delta:1,
				})
			}
		}
	}
</script>

<style>

</style>
