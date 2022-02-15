<template>
	<view>
		<myLoading ref="loading" :mask-alpha="0.1" animation="zoom-lessen" ft-color="#333333" bg-color="#FFFFFF"
			loading-type="scale-line" />
	</view>
</template>

<script>
	export default {
		name:"preview",
		props: {
			mediaList: {
				type: Array,
				default: ()=>{
					return []
				}
			},
		},
		data() {
			return {
				
			};
		},
		methods:{
			showPre(id) {
				console.log(id);
				uni.previewImage({
					urls: this.mediaList,
					longPressActions: {
						itemList: ['发送给朋友', '保存图片', '收藏'],
						success: function(data) {
							console.log('选中了第' + (data.tapIndex + 1) + '个按钮,第' + (data.index + 1) + '张图片');
							this.$refs.loading.showLoading()
							setTimeout(()=>{
								this.$refs.loading.hideLoading()
							},3000)
						},
						fail: function(err) {
							console.log(err.errMsg);
						}
					}
				});
			}
		}
	}
</script>

<style>

</style>
