<script setup>
import CuiButton from '@/components/CuiButton';
import { useRoute } from 'vue-router';

import { useAuthStore } from '@/store/auth.store';
const authStore = useAuthStore();
const { logoutAdmin } = authStore;

const route = useRoute();
</script>

<template>
	<header class="header-lg-screen row">
			<div class="col-1"> 
				<div class="menu-btn p-3" v-ripple="'rgba(0,0,0,.2)'">
					<i class="fa fa-bars fa-1x"></i>
				</div>
			</div>
			<div class="col-9" data-aos="slide-right">
				<b>{{ route.meta.displayName }}</b>
			</div>
			<div class="col-2" style="text-align: right">
				<div @click="logoutAdmin" class="logout-btn p-3 rounded" v-ripple="'rgba(0,0,0,.2)'">
					<i class='fa fa-power-off fa-1x'></i>&nbsp;Logout
				</div>
			</div>
		</header>
		<header class="header-sm-screen">
			<div class="menu-btn">
				<i class="fa fa-bars"></i>
			</div>
			<div class="search-container">
			</div>
			<div class="logout-container">
				<cui-button @click="logoutAdmin"><i class='fa fa-power-off'></i> Logout</cui-button>
			</div>
		</header>
</template>

<style scoped>
.header-lg-screen {
	width: calc(100% - 10rem);
	display: flex;
	align-items: center;
	justify-content: space-between;
	position: absolute;
	left: 10rem;
}

.header-sm-screen {
	display: none;
}

.menu-btn {
	width: 3rem;
	height: 3rem;
	display: flex;
	align-items: center;
	justify-content: center;
	border-radius: 100%;
}

.logout-btn {
	width: 6rem;
	height: 3rem;
	display: flex;
	align-items: center;
	justify-content: center;
	cursor: pointer;
}
</style>