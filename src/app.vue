<template>
	<div class="container">
		<el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
			<el-menu-item index="1" route="/">启动页维护</el-menu-item>
			<el-menu-item index="2" route="/1">Banner维护</el-menu-item>
			<el-menu-item index="3" route="/2">专题要览</el-menu-item>
		</el-menu>
		<router-view></router-view>
	</div>
</template>

<script>
	export default {
		name: 'app',
		components: {
		},
		data() {
			return {
				activeIndex: '1'
			}
		},
		methods: {
			handleSelect(key, keyPath) {
				console.log(key, keyPath)
			}
		}
	}
</script>

<style >
	.container {
		padding: 15px;
		background: #f5f8ff;
	}
</style>