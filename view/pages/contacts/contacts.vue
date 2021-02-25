<template>
	<view class="wh">
		<Skeleton>
			<template #top>
				<view class="header-top">
					<view></view>
					<view class="pos-center">联系人</view>
<!-- 					<view class="header-right">
						<view class="mr-20">搜索</view>
						<text>添加</text>
					</view> -->
				</view>
			</template>
			<Contact></Contact>
		</Skeleton>
	</view>
</template>

<script>
	import Skeleton from '../../components/pageSkeleton.vue'
	import Contact from '../../components/contacts.vue'
	export default {
		components: {
			Skeleton,
			Contact
		},
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss">

</style>
