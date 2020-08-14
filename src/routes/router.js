import Router from 'vue-router'

const routes = [
	{
		path: '/',
		redirect: '/home'
	},
	{
		path: '/home',
		component: () => import('../views/Home.vue')
	},
	{
		path: '/banner',
		component: () => import('../views/BannerMaintain.vue')
	},
	{
		path: '/topic',
		component: () => import('../views/Topic.vue')
	},
	// {
	// 	path: '/edit',
	// 	component: () => import('../views/MyEditer.vue')
	// }
]

export default new Router({
	routes,
	mode: 'history'
})