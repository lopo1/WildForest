<template>
	<view class='content'>
		
	</view>
</template>

<script>
	
	export default {
		data(){
			return{
				desertTimer:""
			}
		},
		onLoad(){
			this.getTime(1637729788859,84970);
		},
		methods:{
			getTime(num,remainS){
				//获取开始时间的日期
				const date = new Date(num);
				//当前日期
				const curDate = new Date();
				//获取开始时间的时间戳 
				const startTimestamp = date.getTime();
				//获取当前时间的时间戳
				const curTimestamp = curDate.getTime();
				const startMon = date.getMonth()+1;
				const startDay = date.getDate();
				const startM = date.getMinutes();
				const curMon = curDate.getMonth()+1;
				const curDay = curDate.getDate();
				const curH = curDate.getHours();//当前小时
				const curM = curDate.getMinutes();//当前分钟
				console.log('开始时间的时间戳:',startTimestamp,'当前时间戳:',curTimestamp)
				//实际需要跑的时间
				// const startH = 5;
				const startH = date.getHours();//开始时间(小时)
				const remaiH = remainS/60/60;//理想要跑的时间(小时)
				console.log('开始的小时:',startH+'点',' 理想跑的小时:',remaiH+'小时');
				const s = remaiH <= 17 ? 0:Math.ceil((remaiH-startH%17)/17);//小于17小时
				const tealTime =startH > 0 && startH < 7? s * 7 + remaiH + 7 - startH : s * 7 + remaiH;//这是真实需要跑的时间(小时)
				const endTimestamp = startTimestamp + tealTime*60*60*1000;
				console.log('实际需要跑的小时:',tealTime+'小时');
				console.log('结束时间的时间戳:',endTimestamp);
				const endDate = new Date(endTimestamp);
				const endMon = endDate.getMonth()+1;
				const endDay = endDate.getDate();
				const endH = endDate.getHours();//结束小时
				const endM = endDate.getMinutes();
				console.log('开始年月日:',startMon+'月'+startDay+'日'+startH+'点'+startM+'分');
				console.log('当前年月日:',curMon+'月'+curDay+'日'+curH+'点'+curM+'分');
				console.log('结束年月日:',endMon+'月'+endDay+'日'+endH+'点'+endM+'分');
				if(curTimestamp >= endTimestamp){
					console.log('已沙漠化')
				}else{
					console.log('未沙漠化');
					//用结束的时间戳减去当前时间戳，产生还需等待的时间，用于倒计时
					const waitTimestamp = endTimestamp - curTimestamp;
					
					this.getTimer(waitTimestamp)
				}
				////////////////////////////////////////////////////////////////////////////////////////
			},
			getTimer(waitTimestamp){
				//倒计时
				let tempTimestamp = waitTimestamp;
				let waitH = Math.floor(waitTimestamp/1000/60/60);
				let waitM = Math.floor(waitTimestamp/1000/60%60);
				let waitS = Math.floor(waitTimestamp/1000%60);
				console.log('还需等待:',waitH+'小时'+waitM+'分钟'+waitS+'秒');
				this.desertTimer = setInterval(()=>{
					const curDate = new Date();
					const curH = curDate.getHours();
					if(waitS ==0){
						if(waitM ==0){
							waitM ==59;
							if(waitH ==0){
								if(waitH ==0 && waitM==0 && waitS ==0){
									console.log('已沙漠化')
									clearTimeout(this.desertTimer);
									return;
								}
							}else{
								waitH--
							}
						}else{
							waitM --;
						};
						waitS = 59;
					}else{
						waitS --;
						tempTimestamp -= 1000;
					};
					if(curH > 0 && curH < 7){
						clearTimeout(this.desertTimer);
						//当前时间静止，不能进行倒计时
						console.log('当前处于0-7点，时间静止');
						const curM = curDate.getMinutes();
						const curS = curDate.getSeconds();
						const stopTimestamp = (curH*60*60*1000 + curM*60*1000 + curS *1000)+tempTimestamp;
						let stopH = Math.floor(stopTimestamp/1000/60/60);
						let stopM = Math.floor(stopTimestamp/1000/60%60);
						let stopS = Math.floor(stopTimestamp/1000%60);
						console.log('静止时间:',stopH+'小时'+stopM+'分钟'+stopS+'秒');
						return;
					}
				},1000)
			}
		}
	}
</script>

<style scoped lang="scss">
</style>
