<template>
	<view class="register">
		<text class="title">注册</text>
		<van-form @submit="onSubmit">
		  <van-field
		    v-model="form.username"
		    name="用户名"
		    label="用户名"
		    placeholder="请输入用户名"
		    :rules="[{ required: true, message: '请填写用户名' }]"
		  />
<!-- 			<van-field
			  v-model="form.email"
			  name="邮箱"
			  label="邮箱"
			  placeholder="请输入邮箱"
			  :rules="[{ required: true, message: '请填写用户名' }]"
			/> -->
		  <van-field
		    v-model="form.password"
		    type="password"
		    name="密码"
		    label="密码"
		    placeholder="请输入密码"
		    :rules="[{ required: true, message: '请填写密码' }]"
		  />
			<van-field
			  v-model="form.repass"
			  type="password"
			  name="重复密码"
			  label="重复密码"
			  placeholder="请再次输入密码"
			  :rules="[{ required: true, message: '请填写密码' }]"
			/>
<!-- 			<van-field
			  v-model="form.smsCode"
			  name="验证码"
			  label="验证码"
			  placeholder="请输入验证码"
			  :rules="[{ required: true, message: '请填写用户名' }]"
			/> -->
		  <div style="margin: 16px;">
		    <van-button round block type="info" native-type="submit">注册</van-button>
		  </div>
		</van-form>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				form: {
					username: '',
					password: '',
					// email: '',
					repass: '',
					// smsCode: ''
				},
				dis: false
			}
		},
		methods: {
			onSubmit(values) {
				console.log('values')
				uni.request({
					url: '/api/register',
					method: 'POST',
					data: this.form,
					success(data) {
						console.log(data)
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.register {
		width: 100%;
		height: 100%;
		padding-top: 56rpx;
	}
.title {
	padding: 0 32rpx 32rpx;
	margin-bottom: 64rpx;
	font-size: 48rpx;
	font-weight: 500;
}
</style>
