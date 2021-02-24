<template>
	<view :class="['header_bar', cls&&cls]">
		<view class="status" :style="{'--top': top}"></view>
		<slot></slot>
	</view>
</template>

<script>
	export default {
		props: {
			cls: {
				type: String
			}
		},
		data() {
			return {
				top: '0px'
			}
		},
		mounted() {
			this.top = uni.getSystemInfoSync().statusBarHeight + 'px'
		},
		onShow() {
			this.top = uni.getSystemInfoSync().statusBarHeight + 'px'
		}
	}
</script>

<style lang="scss" scoped>
	.header_bar {
		width: 100%;
		height: auto;
		background: #d9d9d9;
	}
	.status {
		width: 100%;
		height: var(--top);
	}
</style>
