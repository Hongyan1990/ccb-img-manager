import Router from 'vue-router'

const routes = [
	{
		path: '/',
		component: () => import('../views/Home.vue')
	}
]

export default new Router({
	routes,
	mode: 'history'
})