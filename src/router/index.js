import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
	{
		path: '/',
		name: 'login',
		component: ()=> import(/* webpackChunkName: 'login' */ '../views/admin/IndexView.vue')
	},
	{
		path: '/dashboard',
		name: 'dashboard',
		component: ()=> import(/* webpackChunkName: 'dashboard' */ '../views/admin/DashboardView.vue')
	},
	{
		path: '/admin',
		name: 'admin',
		component: ()=> import(/* webpackChunkName: 'admin' */ '../views/admin/AdminView.vue')
	},
	{
		path: '/owners',
		name: 'owners',
		component: ()=> import(/* webpackChunkName: 'owners' */ '../views/admin/OwnersView.vue')
	},
	{
		path: '/drivers',
		name: 'drivers',
		component: ()=> import(/* webpackChunkName: 'drivers' */ '../views/admin/DriversView.vue')
	},
	{
		path: '/lga',
		name: 'lga',
		component: ()=> import(/* webpackChunkName: 'lga' */ '../views/admin/LGAView.vue')
	},
	{
		path: '/vehicle_type',
		name: 'vehicle_type',
		component: ()=> import(/* webpackChunkName: 'vehicle_type' */ '../views/admin/VehicleTypeView.vue')
	},
	{
		path: '/information',
		name: 'information',
		component: ()=> import(/* webpackChunkName: 'information' */ '../views/authority/InformationView.vue')
	}
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
