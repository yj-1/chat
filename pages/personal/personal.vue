<template>
	<view class="personal">
		<van-cell-group>
			<van-cell title="头像" is-link>
				<template #right-icon>
					<view class="user-right">
						<image class="user-img" src="../../static/user.jpg"></image>
						<van-icon name="arrow" />
					</view>
				</template>
			</van-cell>
		</van-cell-group>

		<van-cell-group>
			<van-cell title="昵称" value="内容" is-link />
		</van-cell-group>

		<van-cell-group>
			<van-cell title="邮箱" is-link />
		</van-cell-group>

		<van-cell-group>
			<van-cell title="更多" is-link />
		</van-cell-group>
		
		<van-cell-group>
			<van-cell title="注册" is-link to="/pages/register/register" />
		</van-cell-group>
		
		<van-cell-group>
			<van-cell title="登陆" is-link to="/pages/login/login" />
		</van-cell-group>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		methods: {

		}
	}
</script>

<style lang="scss" scoped>
	.user-right {
		display: flex;
		align-items: center;
	}

	.user-img {
		width: 88rpx;
		height: 88rpx;
	}
	/deep/ .van-cell__title {
		display: flex;
		align-items: center;
	}
</style>
