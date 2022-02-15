import next from './router.js'
const onlogin = (isTo = true)=>{
	//判断是否已经登录.isTo是否跳转
	// const token = '9d28gOHacOZ7KnrlFV+P39cF2da3QWkA16Yo+hzzWRI'
	const token = uni.getStorageSync('token');
	console.log(token)
	if(token == '' || !token){
		if(isTo){
			next.$next('index/login/login');
		};
		return false;
	}else{
		return true;
	}
}
 export default {
 	onlogin
 }
 