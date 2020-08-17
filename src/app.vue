<template>
	<div class="container">
<!--		<el-menu :default-active="activeIndex" :router="true"  class="el-menu-demo" mode="horizontal" @select="handleSelect">-->
<!--			<el-menu-item index="1" route="/home">启动页维护</el-menu-item>-->
<!--			<el-menu-item index="2" route="/banner">Banner维护</el-menu-item>-->
<!--			<el-menu-item index="3" route="/topic">专题要览</el-menu-item>-->
<!--		</el-menu>-->
		<el-container>
			<el-aside width="200px" style="overflow-y: auto;overflow-x: hidden; border-radius: 5px;" :style="{maxHeight: localHeight + 'px'}">
				<oper-manager-menu></oper-manager-menu>
			</el-aside>
			<el-main style="padding-top: 0px;background: #fff;padding-left: 0px;margin-left: 20px;border-radius: 5px;">
				<router-view></router-view>
			</el-main>
		</el-container>
	</div>
</template>

<script>
	import OperManagerMenu from './views/OperManagerMenu.vue'
	export default {
		name: 'app',
		components: {
			OperManagerMenu
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
		computed: {
			localHeight () {
				return window.innerHeight;
			}
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