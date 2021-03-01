<template>
	<view class="personal wh">
		<Skeleton>
			<template #top>
				<view class="header-top">
					<view></view>
					<view class="pos-center">我的</view>
				</view>
			</template>
			<view class="grow">
				<van-cell-group>
					<van-cell title="头像" is-link>
						<template #right-icon>
							<view class="user-right">
								<image v-if="$store.state.user.avatar" class="user-img" src="../../static/user.jpg"></image>
								<van-icon name="arrow" />
							</view>
						</template>
					</van-cell>
				</van-cell-group>
				
				<van-cell-group>
					<van-cell title="昵称" :value="$store.state.user.username" is-link />
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
		</Skeleton>
	</view>
</template>

<script>
		import Skeleton from '../../components/pageSkeleton.vue'
	export default {
		components: {
			Skeleton
		},
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
