<script setup>
import { useAppStore } from '@/store/app.store.js';
import { useRoute } from 'vue-router';
import { storeToRefs } from 'pinia';
const route = useRoute();

const isActive = (path)=>{
	return route.path == path;
}

const appStore = useAppStore();
const { isMenuActive } = storeToRefs(appStore);
</script>

<template>
	<div :class="{menu_active: isMenuActive}" class="cui-menu-overlay">
		<div :class="{menu_active: isMenuActive}" class="cui-menu pt-0">
			<div class="logo p-4 pt-0">
				<img src="@/assets/img/logo_without_bg.png">
			</div>
			<ul>
				<li :class="{ active: isActive('/dashboard')}"><router-link v-ripple="'rgba(0,0,0,.2)'" to="/dashboard" class="p-3 rounded"><i class="fa fa-tachometer"></i> Dashboard</router-link></li>
				<li :class="{ active: isActive('/admin')}"><router-link v-ripple="'rgba(0,0,0,.2)'" class="p-3 rounded" to="/admin"><i class="fa fa-user"></i> Admin</router-link></li>
				<li :class="{ active: isActive('/owners')}"><router-link v-ripple="'rgba(0,0,0,.2)'" class="p-3 rounded" to="/owners"><i class="fa fa-users"></i>Vehicle owners</router-link></li>
				<li :class="{ active: isActive('/drivers')}"><router-link v-ripple="'rgba(0,0,0,.2)'" class="p-3 rounded" to="/drivers"><i class="fa fa-steering-wheel"></i> Drivers</router-link></li>
				<li :class="{ active: isActive('/lga')}"><router-link v-ripple="'rgba(0,0,0,.2)'" class="p-3 rounded" to="/lga"><i class="fa fa-map"></i> LGA</router-link></li>
				<li :class="{ active: isActive('/vehicle_type')}"><router-link v-ripple="'rgba(0,0,0,.2)'" class="p-3 rounded" to="/vehicle_type"><i class="fa fa-car"></i> Vehicle types</router-link></li>
				<li :class="{ active: isActive('/reset_password')}"><router-link v-ripple="'rgba(0,0,0,.2)'" class="p-3 rounded" to="/reset_password"><i class="fa fa-key"></i> Reset password</router-link></li>
				<li :class="{ active: isActive('/report')}"><router-link v-ripple="'rgba(0,0,0,.2)'" class="p-3 rounded" to="/report"><i class="fa fa-analytics"></i> Report</router-link></li>
			</ul>
		</div>
	</div>
	
</template>

<style scoped>
.cui-menu {
	background-color: var(--cui-white);
	width: 10rem;
	position: absolute;
	left: 0;
}

.cui-menu img {
	width: 5rem;
	height: 5rem;
}

ul {
	list-style: none;
	width: 100%;
}

li {
	margin-left: -2rem;
}

a {
	text-decoration: none;
	display: flex;
	align-items: center;
	justify-content: left;
	background-color: ;
	width: 100%;
	color: var(--cui-blue);
}

a i {
	width: 2rem;
}


.active {
	background-color: var(--cui-blue); 
	color: white;
	border-top-right-radius: 10px;
	border-bottom-right-radius: 10px;
}

.active * {
	color: white;
}

@media only screen and (max-width: 767px) {
	.cui-menu {
		display: none;
		position: fixed;
		height: 100%;
		left: 0;
		width: 100%;
		max-width: 20rem;
	}

	.cui-menu-overlay.menu_active {
		position: fixed;
		left: 0;
		right: 0;
		bottom: 0;
		top: 0;
		background-color: rgba(0,0,0,.8);
		backdrop-filter: blur(2px);
		z-index: 1000000000;
	}

	.cui-menu.menu_active {
		display: block;
	}
}


</style>

