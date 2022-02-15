const $tips = (val) => {
	uni.showToast({
		title:val==1 ? '':val,
		icon:val==1? 'success':'none'
	})
}
export default {
	$tips
}