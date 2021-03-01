<template>
	<view class="wh">
		<van-search v-model="value" placeholder="请输入搜索关键词" show-action @search="onSearch" @cancel="onCancel" @input="getUser" />
		<view class="user-list">
			<view>
				<view class="pd10">
					<text>用户：</text>
				</view>
				<van-cell v-for="(ele, i) in list" :key="i" size="large">
					<template #title>
						<view class="flex">
							<image class="user-img" :src="'http://localhost:3000/image/'+(ele.avatar || 'user.jpg')" crossorigin></image>
							<view class="column detial">
								<text>{{ele.username}}</text>
								<text>{{ele.autograph || ''}}</text>
							</view>
						</view>
					</template>
					<van-button v-if="ele.status == 0" type="primary" size="small" disabled round>{{'发送消息'}}</van-button>
					<van-button v-else-if="ele.status == 2" type="primary" size="small" disabled round>{{'加好友'}}</van-button>
				</van-cell>
			</view>
			
			<view v-if="group.length">
				<view class="pd10">
					<text>群聊：</text>
				</view>
				<van-cell v-for="(ele, i) in list" :key="i" size="large">
					<template #title>
						<view class="flex">
							<image class="user-img" :src="ele.avatar || 'http://localhost:3000/image/user.jpg'" crossorigin></image>
							<view class="column detial">
								<text>{{ele.username}}</text>
								<text>{{ele.autograph || ''}}</text>
							</view>
						</view>
					</template>
					<van-button v-if="ele.status == 0" type="primary" size="small" disabled round>{{'发送消息'}}</van-button>
					<van-button v-else-if="ele.status == 1" type="primary" size="small" disabled round>{{'加好友'}}</van-button>
				</van-cell>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				value: '',
				list:[
					{
						username: '用户1',
						avatar: '',
						status: '0'
					},
					{
						username: '用户1',
						avatar: '',
						status: '1'
					}
				],
				group: [
					
				]
			}
		},
		methods: {
			onSearch(val) {
				console.log(val)
			},
			onCancel() {
				uni.navigateTo({
					url: '/pages/index/index'
				})
				console.log('取消了')
			},
			getUser: (function() {
				let time = []
				return function(val) {
					console.log(this)
					if(time.length) {
						time = time.filter((ele, i) => {
							if(i < time.length) {
								clearTimeout(ele)
								return false
							} else {
								return true
							}
						})
						// clearTimeout(time)
					}
					 time.push(setTimeout(() => {
						uni.request({
							url: '/api/search/friends',
							method: "POST",
							data: { username: this.value,id: '603b832a82c37523b8a2c059' },
							success:(data) => {
								time = []
								console.log(this)
								this.$set(this, 'list', data.data.result?.list)
								console.log(data.result)
								console.log(data)
							}
						})
					},1000))
				}
			})()
		},
		watch: {
			
		}
	}
</script>

<style lang="scss" scoped>
	.user-img {
		width: 88rpx;
		height: 88rpx;
		border-radius: 10rpx;
		margin-right: 20rpx;
	}
.detail {
	justify-content: center;
	font-size: 24rpx;
}
.pb10 {
	// padding-bottom: 12rpx;
}
.pd10 {
	border-top: 1px solid #d9d9d9;
	padding: 20rpx 24rpx;
	font-size: 36rpx;
	font-weight: 600;
}
</style>
