// const baseUrl = 'http://143.92.52.111:80';//PRO
const baseUrl = 'http://cfapi.yearfish.xyz'; //DEV
// const baseUrl = 'http://www.bapc.cc';
// 接口:http://47.242.54.11:8088
// k线图:http://47.242.54.11:8088
// 交易市场:ws://47.242.54.11:7121
const prefix = '/';
let requestNum = 0; //请求次数
const showToast = (val) => {
	uni.showToast({
		title: val,
		icon: "none"
	})
}
const upload = (url, data = {
	filePath: ''
}, isArray = false) => {
	// const token = '479aXUEFzCy+BYtxAUCBoF/Wbem8fAXr9mBqE1m/a3dT';
	const token = uni.getStorageSync('token');
	let lang = 'zh-cn';
	const langType = uni.getStorageSync('langType');
	if (langType && langType != '') {
		lang = langType
	};
	if (isArray) {
		return new Promise((resolve, reject) => {
			// uni.showLoading();
			uni.uploadFile({
				url: baseUrl + prefix + url,
				files: data.files,
				formData: data.formData,
				// filePath:data.filePath,
				name: "image",
				header: {
					plat: 1,
					token: token,
					lang: lang
				},
				success: (res) => {
					uni.hideLoading();
					const json = JSON.parse(res.data);
					resolve(json);
				},
			})
		})
	} else {
		return new Promise((resolve, reject) => {
			// uni.showLoading();
			uni.uploadFile({
				url: baseUrl + prefix + url,
				filePath: data.filePath,
				formData: data.formData,
				name: "image",
				header: {
					token: token,
					plat: 1
				},
				success: (res) => {
					const json = JSON.parse(res.data);
					uni.hideLoading();
					if (json.status == 1) {
						//请求成功
						resolve(json);
					} else {
						const app = getApp().globalData;
						app.$tips('网络开小差~');
					};
				},
				fail: (err) => {
					console.log(err)
				}
			})
		})
	}

}
const createdPromise = (url, data = {}, method = 'GET', contentType = '') => {
	// const token = '479aXUEFzCy+BYtxAUCBoF/Wbem8fAXr9mBqE1m/a3dT';
	const token = uni.getStorageSync('token');
	let lang = 'zh-cn';
	const langType = uni.getStorageSync('langType');
	if (langType && langType != '') {
		lang = langType
	};
	let header = {
		'plat': 1,
		'token': token, //自定义请求头token信息
		'lang': lang //自定义请求头token信息
	}
	if (contentType != '') {
		header['content-type'] = contentType
	}
	return new Promise((resolve, reject) => {
		uni.request({
			url: baseUrl + prefix + url,
			method,
			sslVerify: false,
			data,
			header: header,
			success: (res) => {
				// console.log(res)
				uni.hideLoading();
				if (res.data.status == 1005) {
					showToast(res.data.info);
					uni.removeStorageSync('token');
					uni.reLaunch({
						url: '/pages/my/login/login'
					})
					//重新登录
				} else {
					resolve(res);
					if (res.data.status != 1) {
						if (res.data.info) {
							// showToast(res.data.info);
						};
					}
				};

			},
			fail: (err) => {
				console.log(err);
				uni.hideLoading();
				reject(err);
			}
		});
		// setTimeout(()=>{
		// 	uni.hideLoading();
		// },5000)
	})

};
const get = (url, data) => {
	// return;
	return createdPromise(url, data, 'GET');
};
const post = (url, data) => {
	// return
	return createdPromise(url, data, 'POST');
};
const postFormData = (url, data,) => {
	// return
	return createdPromise(url, data, 'POST','application/x-www-form-urlencoded');
};
export default {
	get,
	post,
	postFormData,
	upload,
	baseUrl,
}
