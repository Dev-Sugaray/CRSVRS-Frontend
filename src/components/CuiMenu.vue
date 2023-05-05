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

const closeMenu = async (ev)=>{
	const { target } = ev;
	if(target.classList.contains('cui-menu-overlay')){
		isMenuActive.value = false;
	}
}
</script>

<template>
	<div :class="{menu_active: isMenuActive}" class="cui-menu-overlay" @click="closeMenu">
		<div :class="{menu_active: isMenuActive}" class="cui-menu pt-0">
			<div class="logo p-4 pt-0">
				<img src="@/assets/img/logo_without_bg.png">
			</div>
			<ul>
				<li :class="{ active: isActive('/dashboard')}"><router-link  to="/dashboard" class="p-3 rounded"><i class="fa fa-tachometer"></i> Dashboard</router-link></li>
				<li :class="{ active: isActive('/admin')}"><router-link  class="p-3 rounded" to="/admin"><i class="fa fa-user"></i> Admin</router-link></li>
				<li :class="{ active: isActive('/owners')}"><router-link  class="p-3 rounded" to="/owners"><i class="fa fa-users"></i>Vehicle owners</router-link></li>
				<li :class="{ active: isActive('/drivers')}"><router-link  class="p-3 rounded" to="/drivers"><i class="fa fa-steering-wheel"></i> Drivers</router-link></li>
				<li :class="{ active: isActive('/lga')}"><router-link  class="p-3 rounded" to="/lga"><i class="fa fa-map"></i> LGA</router-link></li>
				<li :class="{ active: isActive('/vehicle_type')}"><router-link  class="p-3 rounded" to="/vehicle_type"><i class="fa fa-car"></i> Vehicle types</router-link></li>
				<li :class="{ active: isActive('/reset_password')}"><router-link  class="p-3 rounded" to="/reset_password"><i class="fa fa-key"></i> Reset password</router-link></li>
				<li :class="{ active: isActive('/report')}"><router-link  class="p-3 rounded" to="/report"><i class="fa fa-analytics"></i> Report</router-link></li>
				<li :class="{ active: isActive('/docs')}"><router-link  class="p-3 rounded" to="/docs"><i class="fa fa-book"></i> Docs</router-link></li>
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
	transition: background-color 200ms ease-in;
	padding-top: 9px !important;
	padding-bottom: 9px !important;
}

a:hover {
	background-color: var(--cui-blue-very-transparent);
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
	@keyframes {

	}

	.cui-menu {
		display: block;
		position: fixed;
		height: 100%;
		left: 0;
		width: 70%;
		max-width: 13rem;
		margin-left: -100%;
		transition: margin-left 300ms ease-in;
	}

	.cui-menu-overlay {
		position: fixed;
		left: 0;
		width: 100%;
		bottom: 0;
		top: 0;
		margin-left: -100%;
		background-color: rgba(0,0,0,.8);
		backdrop-filter: blur(2px);
		z-index: 1000;
		transition: margin-left 350ms ease-in;
	}

	.cui-menu-overlay.menu_active {
		margin-left: 0;
	}

	.cui-menu.menu_active {
		display: block;
		margin-left: 0;
	}
}

</style>

