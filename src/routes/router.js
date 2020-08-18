import Router from 'vue-router'

const routes = [
	{
		path: '/',
		redirect: '/app'
	},
	{
		path: '/app',
		component: () => import('../views/HomeContainer.vue'),
		children: [
			{
				path: '/app',
				redirect: '/app/home/1'
			},
			{
				path: '/app/home/:id',
				component: () => import("../views/HomeNew.vue")
			}
		]
	},
	{
		path: '/add/:id',
		component: () => import('../views/AddImgNew.vue')
	}
]

export default new Router({
	routes,
	mode: 'history'
})