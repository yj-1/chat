<template>
	<view class="content wh">
		<Header>
			<slot name="top"></slot>
		</Header>
		<view class="wh column">
				<view class="grow overflow">
					<slot></slot>
				</view>
				<Tabbar></Tabbar>
		</view>
	</view>
</template>

<script>
	import Tabbar from './tabbar.vue'
	import Header from './Header.vue'
	export default {
		components: {
			Tabbar,
			Header,
		},
		data() {
			return {
				title: 'Hello'
			}
		},
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
		heihgt: 100%;
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
