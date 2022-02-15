<template>
	<view style="width: 100%;height: 100%;">
		<video v-if="reloadVideo" id="myVideo" style="width: 100%;height: 100%;" :src="testVideo"
			@error="videoErrorCallback"></video>
	</view>
</template>

<script>
	export default {
		name: "myVideoPlayer",
		data() {
			return {
				reloadVideo:false,
				testVideo:'',
			};
		},
		methods: {
			videoErrorCallback: function(e) {
				if(e.target.errMsg){
					uni.showModal({
						content: e.target.errMsg,
						showCancel: false
					})
				}
			},
			rushVideo(res){
				this.testVideo = res
				this.reloadVideo = false
				setTimeout(()=>{
					this.reloadVideo = true
				},100)
			},
		}
	}
</script>

<style>

</style>
