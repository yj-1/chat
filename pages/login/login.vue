<template>
	<view class="login">
		<text class="title">登录</text>
		<view class="small-title">
			<text>您好，欢迎来到。。。</text>
		</view>
		<van-form @submit="onSubmit">
		  <van-field
		    v-model="username"
		    name="用户名"
		    placeholder="请输入用户名/或者邮箱"
		    :rules="[{ required: true, message: '请填写用户名' }]"
		  />
		  <van-field
		    v-model="password"
		    type="password"
		    name="密码"
		    placeholder="请输入密码"
		    :rules="[{ required: true, message: '请填写密码' }]"
		  />
		  <div style="margin: 16px;">
		    <van-button round block type="info" native-type="submit">登陆</van-button>
		  </div>
		</van-form>
		<view class="go-reg">
			<text>去注册</text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				username: '',
				password: ''
			}
		},
		methods: {
			onSubmit() {
				console.log(234)
				uni.request({
					url: '/api/login',
					data: {
						username: this.username,
						password: this.password
					},
					method: 'POST',
					success(data) {
						uni.navigateTo({
							url: '/pages/index/index',
							success:(data) => {
								if(data.status === '200' && data.result) {
									const { username, sex, avatar, token } = data.result
									
									uni.setStorage({
										key: 'token',
										data: token,
									})
									
									this.$store.commit('setUser', { username, sex, avatar })
								}
							}
						})
						console.log(data)
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
.login {
	padding-top: 64rpx;
}
.go-reg {
	text-align: right;
	font-size: 24rpx;
	color: #007AFF;
	padding-right: 40rpx;
}
.title {
	padding: 0 32rpx 32rpx;
	margin-bottom: 64rpx;
	font-size: 48rpx;
	font-weight: 500;
}
.small-title {
	padding: 0 32rpx 32rpx;
	font-size: 32rpx;
	color: #d0d0d0;
}
</style>
