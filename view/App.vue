<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
	@import 'vant/lib/index.css';
	* {
		margin: 0;
		padding: 0;
		box-sizing: border-box;
	}
	uni-page-body, .wh {
		width: 100%;
		height: 100%;
	}
	.h100 {
		height: 100%;
	}
	.column {
		display: flex;
		flex-direction: column;
	}
	.grow {
		flex-grow: 1;
	}
	.flex {
		display: flex;
	}
	.mr-20 {
		margin-right: 20rpx;
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
</style>
