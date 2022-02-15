<template>
	<!--弹出层-->
	<view @tap="onClose" ref='popup' class="popup" :class="{hide:popupOpen}" v-show="show"></view>
</template>

<script>
	const app = getApp().globalData;
	export default {
		watch:{
			open(val){
				console.log(val)
				const _this = this;
				if(val){
					this.show = val;
					this.$nextTick(()=>{
						setTimeout(()=>{
							this.popupOpen = true
						},100)
					})
				}else{
					this.popupOpen = false;
					this.$nextTick(()=>{
						setTimeout(()=>{
							_this.show = val;
						},400);
					})
				}
			}
		},
		data(){
			return{
				popupOpen:false,
				show:false,//控制动画
				windowHeight:0,//设备可使用高度
			}
		},
		props:{
			open:{
				//控制是否出现
				default:false
			},
			backgroundColor:{
				default:'rgba(0,0,0,.4)'
			}
		},
		methods:{
			onClose(){
				this.$emit('onClose')
			},
			
		}
	}
</script>

<style lang="scss" scoped>
	//弹出层
	.popup{
		width: 750rpx;
		height: 100vh;
		position: fixed;
		transition: .4s;
		left: 0;
		top: 0;
		background-color: rgba(0,0,0,.6);
		opacity: 0;
		@include cen();
		z-index:20
	}
	.hide{
		opacity: 1;
	}
</style>
