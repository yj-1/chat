<template>
	<view class="contacts">
		<van-index-bar :index="val.index" v-for="(val, i) in list" :key="i">
			<van-index-anchor class="bg-32" :index="val.index">{{val.index}}</van-index-anchor>
			<van-cell is-link v-for="(ele, l) in val.list" :key="l">
				<template #title>
				    <span class="custom-title">{{ele.url}}</span>
				    <van-tag type="danger">{{ele.name}}</van-tag>
				  </template>
			</van-cell>
		</van-index-bar>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: [
					{
						index: 'A',
						list: [
							{url: '测试', name: '一二三'}
						]
					},
					{
						index: 'B',
						list: [
							{url: '测试', name: '一二三'}
						]
					}
				]
			}
		},
	}
</script>

<style lang="scss" scoped>
	.bg-32 {
		background-color: #C8C7CC;
	}
</style>
