<template>
	<div class="container">
		<el-menu :default-active="activeIndex" :router="true"  class="el-menu-demo" mode="horizontal" @select="handleSelect">
			<el-menu-item index="1" route="/home">启动页维护</el-menu-item>
			<el-menu-item index="2" route="/banner">Banner维护</el-menu-item>
			<el-menu-item index="3" route="/topic">专题要览</el-menu-item>
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
		watch: {
			// 如果路由有变化，会再次执行该方法
			'$route': 'fetchData'
		},
		methods: {
			handleSelect(key, keyPath) {
				// this.activeIndex = key
			},
			fetchData() {
				console.log(this.$route);
				const path = this.$route.path;
				switch (path) {
					case '/home':
						this.activeIndex = '1';
						break;
					case '/banner':
						this.activeIndex = '2';
						break;
					case '/topic':
						this.activeIndex = '3';
						break;
					default :
						this.activeIndex = '1';

				}
			}
		},
		mounted() {

		}
	}
</script>

<style >
	.container {
		padding: 15px;
		background: #f5f8ff;
	}
</style>