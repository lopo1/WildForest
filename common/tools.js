// import Language from './language.js'

let navTo = (url, type = "slide-in-right") => {
	uni.navigateTo({
		url,
		animationType: type
	})
}


let backTo = (delta = 1, type = "slide-out-right") => {
	uni.navigateBack({
		delta,
		animationType: type
	})
}

let $noToast = (title, icon = "none") => {
	uni.showToast({
		title,
		icon
	})
}
let showHtml = (str) => { //富文本解析
	return str

		.replace(str ? /&(?!#?\w+;)/g : /&/g, '&amp;')

		.replace(/&amp;nbsp;/g, "")

		.replace(/&lt;/g, "<")

		.replace(/&gt;/g, ">")

		.replace(/&quot;/g, "\"")

		.replace(/&#39;/g, "\'")

}

// let showLanguage = () => {
// 	let type = uni.getStorageSync('lang');
// 	let languageInfo;
// 	switch (type) {
// 		case 'zh-cn':
// 			languageInfo = Language.ChinaLanguage;
// 			break;
// 		case 'en-us':
// 			languageInfo = Language.EnglisghLanguage;
// 			break;
// 		case 'ko-kr':
// 			languageInfo = Language.KoreanLanguage;
// 			break;
// 		case 'ja-jp':
// 			languageInfo = Language.JapanLanguage;
// 			break;
// 		case 'th-th':
// 			languageInfo = Language.ThaiLanguage;
// 			break;
// 		case 'zh-tw':
// 			languageInfo = Language.TraditionalChineseLanguage;
// 			break;
// 		default:
// 			break;
// 	}
// 	return languageInfo;
// }
function parsNum(num,fix){
	let lNum = Number(num)
	let res = parseInt(num * fix) / fix
	return res
}

export default {
	navTo,
	backTo,
	showHtml,
	$noToast,
	parsNum,
	// showLanguage
}
