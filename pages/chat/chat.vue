<template>
	<view class="chat">
		<Header>
			<van-nav-bar :title="title" left-arrow @click-left="onClickLeft" />
		</Header>
		
		<view class="grow">
			<view class="record">
				<view class="msg-time">
					<text>11月14日 14:21</text>
				</view>
				<view class="msg-left flex">
					<view class="head-img mr-20">
						<image class="wh" src="../../static/user.jpg"></image>
					</view>
					<view class="msg">
						234
					</view>
				</view>
				
				<view class="msg-right flex">
					<view class="msg mr-20">
						234
					</view>
					<view class="head-img">
						<image class="wh" src="../../static/user.jpg"></image>
					</view>
				</view>
			</view>
		</view>
		
		<view class="bot-tool">
			<view class="p-10 align-center over-input">
				<image class="small-img" src="../../static/lefticon.png"></image>
				<textarea class="input-text" style="height: 28px;" auto-height maxlength="250" placeholder="请输入..."></textarea>
				<image class="small-img mr-10" src="../../static/smeo.png"></image>
				<image class="small-img" src="../../static/add.png"></image>
<!-- 				<van-image src="../../static/lefticon.png"></van-image> -->
			</view>
		</view>
	</view>
</template>

<script>
	import Header from '../../components/Header.vue'
	export default {
		components: {
			Header
		},
		data() {
			return {
				title: '测试'
			};
		},
		methods: {
			onClickLeft() {
				uni.navigateBack()
			}
		},
	}
</script>

<style lang="scss" scoped>
.chat {
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
}

.align-center {
	display: flex;
}
.over-input {
	width: 100%;
	// min-height: 40rpx;
	max-height: 400rpx;
	align-items: flex-end;
}
.bot-tool {
	width: 100%;
	// height: 165rpx;
	// height: 80rpx;ss
	max-height: 400rpx;
	border-top: 1px solid #C8C7CC;
}
.p-10 {
	padding: 20rpx 32rpx;
}
.input-text {
	display: inline-block;
	width: 454rpx;
	// height: 56rpx !important;
	// max-height: 400rpx;
	// height: 72rpx;
	padding: 6rpx 18rpx;
}
$w: 56rpx;
.small-img {
	width: $w;
	height: $w;
}
.mr-10 {
	margin-right: 20rpx;
}
.msg-time {
	padding: 32rpx;
	text-align: center;
	color: rgba(39,40,50,0.30);
	font-size: 20rpx;
}
.msg-left {
	padding: 20rpx 32rpx;
	text-align: left;
}
.msg-right {
	padding: 20rpx 32rpx;
	text-align: right;
	justify-content: flex-end;
}

.head-img {
	width: 80rpx;
	height: 80rpx;
	
	image {
		border-radius: 10rpx;
	}
}
.msg {
	line-height: 44rpx;
	padding: 18rpx;
	border-radius: 10rpx;
	background-color: #FFE431;
}
</style>
