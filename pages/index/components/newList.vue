<template>
	<view class="chat-list">
		<van-swipe-cell  v-for="(data, i) in list" :key="i">
			<view class="item" @click="go">
				<view class="between">
					<view class="userImg">
						<image :src="data.url"></image>
					</view>
					<view class="align-center">
						<text class="title">{{data.name}}</text>
						<text class="message">{{data.message}}</text>
					</view>
				</view>
				<view class="align-center">
					<text>{{data.time}}</text>
				</view>
			</view>
			<template #right>
				<van-button square text="删除" type="danger" class="delete-button" />
			</template>
		</van-swipe-cell>
	</view>
</template>

<script>
	export default {
		props: {
			list: {
				type: Array,
				default: () => ([
					{
						url: require('../../../static/logo.png'),
						name: '系统消息',
						message: '测试信息',
						time: '08:00'
					},
					{
						url: require('../../../static/logo.png'),
						name: '系统消息1',
						message: '测试信息测试信息测试信息测试信息测试信息测试信息测试信息测试信息测试信息测试信息测试信息测试信息测试信息测试信息',
						time: '08:10'
					}
				])
			}
		},
		methods: {
			go() {
				uni.navigateTo({
					url: '/pages/chat/chat'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.delete-button {
		height: 100%;
	}
	.chat-list .item {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 20rpx 40rpx;
		border-bottom: 1px solid #cccccc;
	}
	.message {
		max-width: 440rpx;
		display: block;
		padding-top: 12rpx;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		font-size: 28rpx;
		color: #999;
	}
.between {
	display: flex;
	flex-grow: 1;
}
.align-center {
	padding-left: 20rpx;
	display: flex;
	align-items: flex-start;
	justify-content: center;
	flex-direction: column;
}
.userImg {
	width: 120rpx;
	height: 120rpx;
	border-radius: 50%;
	image {
		width: 100%;
		height: 100%;
	}
}
.title {
	font-size: 30rpx;
	font-weight: 500;
}
</style>
