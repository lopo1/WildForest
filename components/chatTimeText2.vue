<template>
	<view :class="[time==''?'h0':'timeText fr jc ac']">
		<u-line v-if="time != ''" color="#e3e3e3" />
		<text style="flex-shrink: 0;margin:0 30rpx;">{{time}}</text>
		<u-line v-if="time != ''" color="#e3e3e3" />
	</view>
</template>

<script>
	const app = getApp().globalData;
	export default {
		name:"chatTimeText",
		data() {
			return {
				time:''
			};
		},
		props:{
			t:{
				default:'',
			},
			maxLength:{
				default:20,
			},
			index:{
				default:-1,
			}
		},
		created() {
			console.log('日期');
			console.log(this.t);
			if(this.t != undefined && this.t != '' && this.t != null){
				if(app.chatPreTimeDown == ''){
					app.chatPreTimeDown = this.t
					console.log('不空',app.chatPreTimeDown);
				}else{
					let startTime = new Date(app.chatPreTimeDown).getTime();
					let endTime = new Date(this.t).getTime();
					let minutes = Math.floor((endTime -startTime) / 1000 / 60); // 计算剩余的分钟数
					if(minutes>=5){
						app.chatPreTimeDown = this.t
						this.time = this.setText(this.t)
					}else{
						this.time = ''
					}
				}
				if(this.maxLength < 15){
					if(this.index == this.maxLength - 1){
						this.time = this.setText(this.t)
					}
				}
			}
		},
		methods:{
			setText(time){
				let hours = new Date(time).getHours()
				let nowToday = new Date().getDate()
				let days = new Date(time).getDate()
				let text1 = ''
				let text2 = ''
				console.log(days,nowToday);
				if(nowToday - 1 == days){
					text1 = '昨天'
				}
				if(nowToday == days){
					text1 = '今天'
				}
				if (hours >= 0 && hours <= 10) {
					text2 = `早上`;
				} else if (hours > 10 && hours <= 14) {
					text2 = `中午`;
				} else if (hours > 14 && hours <= 18) {
					text2 = `下午`;
				} else if (hours > 18 && hours <= 24) {
					text2 = `晚上`;
				}
				let foDate = this.$u.date(time, 'hh:MM')
				if(text1 != ''){
					let H = hours % 12
					let M = new Date(time).getMinutes()
					if(H == 0){
						H = '12'
					}
					if(M<10){
						M = '0'+M
					}
					foDate = `${text1} ${text2} ${H}:${M}`
				}
				return foDate
			}
		}
	}
</script>

<style scoped lang="scss">
	.timeText{
		text-align: center;
		font-size: 22rpx;
		color: #999999;
		padding: 0 30rpx;
		padding-top: 15rpx;
	}
	.h0{
		height: 0;
		overflow: hidden;
	}
</style>
