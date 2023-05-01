import { createRouter, createWebHashHistory } from 'vue-router'
import { useAuthStore } from '@/store/auth.store';
import { useAppStore } from '@/store/app.store';
import { storeToRefs } from 'pinia'

const routes = [
	{
		path: '/',
		name: 'login',
		component: ()=> import(/* webpackChunkName: 'login' */ '../views/admin/IndexView.vue'),
		meta: {
			displayName: 'Login',
			requireAuth: false
		}
	},
	{
		path: '/dashboard',
		name: 'dashboard',
		component: ()=> import(/* webpackChunkName: 'dashboard' */ '../views/admin/DashboardView.vue'),
		meta: {
			displayName: 'Dashboard',
			requireAuth: true
		}
	},
	{
		path: '/admin',
		name: 'admin',
		component: ()=> import(/* webpackChunkName: 'admin' */ '../views/admin/AdminView.vue'),
		meta: {
			displayName: 'Admin',
			requireAuth: true
		}
	},
	{
		path: '/owners',
		name: 'owners',
		component: ()=> import(/* webpackChunkName: 'owners' */ '../views/admin/OwnersView.vue'),
		meta: {
			displayName: 'Vehicle owner',
			requireAuth: true
		}
	},
	{
		path: '/more_owner_info',
		name: 'more owner info',
		component: ()=> import(/* webpackChunkName: 'more_owner_info' */ '../views/admin/OwnerInfoView.vue'),
		meta: {
			displayName: 'Vehicle owner information',
			requireAuth: true
		}
	},
	{
		path: '/edit_owner',
		name: 'edit owner',
		component: ()=> import(/* webpackChunkName: 'owners_edit' */ '../views/admin/EditOwnerView.vue'),
		meta: {
			displayName: 'Edit vehicle owner',
			requireAuth: true
		}
	},
	{
		path: '/add_driver_1',
		name: 'Add driver step 1',
		component: ()=> import(/* webpackChunkName: 'add_driver_view_1' */ '../views/admin/AddDriverView_1.vue'),
		meta: {
			displayName: 'Add driver step 1',
			requireAuth: true
		}
	},
	{
		path: '/drivers',
		name: 'drivers',
		component: ()=> import(/* webpackChunkName: 'drivers' */ '../views/admin/DriversView.vue'),
		meta: {
			displayName: 'Drivers',
			requireAuth: true
		}
	},
	{
		path: '/edit_driver',
		name: 'edit driver',
		component: ()=> import(/* webpackChunkName: 'edit_driver' */ '../views/admin/EditDriverView.vue'),
		meta: {
			displayName: 'Edit driver',
			requireAuth: true
		}
	},
	{
		path: '/more_driver_info',
		name: 'more_driver info',
		component: ()=> import(/* webpackChunkName: 'more_driver_info' */ '../views/admin/DriverInfoView.vue'),
		meta: {
			displayName: 'Driver information',
			requireAuth: true
		}
	},
	{
		path: '/report',
		name: 'report',
		component: ()=> import(/* webpackChunkName: 'report' */ '../views/admin/ReportView.vue'),
		meta: {
			displayName: 'Report',
			requireAuth: true
		}
	},
	{
		path: '/lga',
		name: 'lga',
		component: ()=> import(/* webpackChunkName: 'lga' */ '../views/admin/LGAView.vue'),
		meta: {
			displayName: 'Local government of operation',
			requireAuth: true
		}
	},
	{
		path: '/vehicle_type',
		name: 'vehicle_type',
		component: ()=> import(/* webpackChunkName: 'vehicle_type' */ '../views/admin/VehicleTypeView.vue'),
		meta: {
			displayName: 'Vehicle type',
			requireAuth: true
		}
	},
	{
		path: '/information',
		name: 'information',
		component: ()=> import(/* webpackChunkName: 'information' */ '../views/authority/InformationView.vue')
	},
	{
		path: '/reset_password',
		name: 'reset password',
		component: ()=> import(/* webpackChunkName: 'reset_password'*/ '../views/admin/ResetPasswordView.vue'),
		meta: {
			displayName: 'Reset password',
			requireAuth: true
		}
	}
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to)=>{
	// This is to disable the menu once the user changes route
	const appStore = useAppStore();
	const { isMenuActive } = storeToRefs(appStore);
	isMenuActive.value = false;

	// This handles navigation guard for unauthorized access
	if(to.meta.requireAuth){

		const authStore = useAuthStore();
		const {token} = storeToRefs(authStore);

		if(token.value == ''){
			return '/';
		}
	}else {
		return true;
	}
})

export default router
