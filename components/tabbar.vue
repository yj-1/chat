<template>
	<view class="tabbars">
		<view v-for="(val, i) in list" :key="i" :class="['tabbar ',$store.state.index === i?'selected':'']" @click="$store.commit({type:'setState',key:'index',value: i})">
			<van-icon :name="val.icon" />
			<text>{{val.text}}</text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: [
					{
						icon: 'wap-home-o',
						text: '首页'
					},
					{
						icon: 'friends-o',
						text: '联系人'
					},
					{
						icon: 'search',
						text: '发现'
					},
					{
						icon: 'contact',
						text: '我的'
					}
				]
			}
		}
	}
</script>

<style lang="scss" scoped>
	.tabbars {
		width: 100%;
		height: 160rpx;
		display: flex;
		justify-content: space-around;
		align-items: center;
		font-size: 28rpx;
		border-top: 1px solid #d9d9d9;
		.tabbar {
			display: flex;
			justify-content: center;
			align-items: center;
			flex-direction: column;
			i {
				font-size: 60rpx
			}
		}
	}
	.selected {
		font-size: 32rpx;
		color: #007AFF;
	}
</style>
