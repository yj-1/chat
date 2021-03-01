<template>
	<view class="tabbars">
		<view v-for="(val, i) in list" :key="i" :class="['tabbar ',$store.state.index == i?'selected':'']" @click="go(i, val.path)">
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
						text: '首页',
						path: '/pages/index/index'
					},
					{
						icon: 'friends-o',
						text: '联系人',
						path: '/pages/contacts/contacts'
					},
					{
						icon: 'search',
						text: '发现'
					},
					{
						icon: 'contact',
						text: '我的',
						path: '/pages/personal/personal'
					}
				]
			}
		},
		mounted() {
			let  route = getCurrentPages()
			const path = route[route.length - 1].route
			for(let i in this.list) {
				if(this.list[i].path === '/'+path) {
					this.$store.commit({ type: 'setState', key: 'index', value: i })
					return false
				}
			}
		},
		methods: {
			go(i, path) {
				this.$store.commit({type:'setState',key:'index',value: i})
				uni.navigateTo({
					url:path
				})
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
		color: #007AFF;
	}
</style>
