<template>
	<text @click="textTap" :class="[isLink?'linkText':'']">
		{{msg}}
	</text>
</template>

<script>
	export default {
		name:"msgRulers",
		data() {
			return {
				isLink:false,
			};
		},
		props:{
			msg:{
				default:'',
				type:String,
			}
		},
		created() {
			this.isLink = this.$u.test.url(this.msg)
		},
		methods:{
			textTap(){
				if(this.isLink){
					plus.runtime.openURL(this.msg);
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
.linkText{
	text-decoration: underline;
}
</style>
