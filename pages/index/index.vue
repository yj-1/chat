<template>
	<view class="content wh">
		<Skeleton>
			<template #top>
				<view class="header-top">
					<view></view>
					<view class="pos-center">首页</view>
					<view class="header-right">
						<view class="mr-20" @click="goSearch">搜索</view>
						<text>添加</text>
					</view>
				</view>
			</template>
			<Item :list="list"></Item>
		</Skeleton>
	</view>
</template>

<script>
	// import Tabbar from 'components/tabbar.vue'
	// import Header from '../../components/Header.vue'
	import Item from './components/newList.vue'
	import Skeleton from '../../components/pageSkeleton.vue'
	export default {
		components: {
			// Tabbar,
			// Header,
			Item,
			Skeleton
		},
		data() {
			return {
				title: 'Hello',
				list: []
			}
		},
		onShow() {
			if(this.$store.state?.list?.length) {
				this.list = this.$store.state.list
				console.log(this.list)
			}
		},
		mounted() {
			console.log('测试')
		},
		methods: {
			goSearch() {
				uni.navigateTo({
					url: '/pages/search/search'
				})
			}
		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}


	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
	.wh {
		width: 100%;
		height: 100%;
	}

.header-top {
	width: 100%;
	height: 88rpx;
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 0 40rpx;
	font-size: 34rpx;
	color: #ffffff;
	position: relative;
}
.pos-center {
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
}
.header-right {
	display: flex;
	align-items: center;
}
.text-center {
	text-align: center;
}
.mr-20 {
	margin-right: 40rpx;
}
.overflow {
	overflow: hidden auto;
}
.overflow::-webkit-scrollbar {
	display: none;
}
</style>
