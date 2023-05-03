<script setup>
// import CuiButton from '@/components/CuiButton';
import { useRoute } from 'vue-router';
import { storeToRefs } from 'pinia';
import { useAuthStore } from '@/store/auth.store';
import { useAppStore } from '@/store/app.store';
const authStore = useAuthStore();
const { logoutAdmin } = authStore;

const appStore = useAppStore();
const { isMenuActive } = storeToRefs(appStore);

const route = useRoute();
</script>

<template>
	<header class="cui-header">
		<div class="header-item text-left"> 
			<div class="menu-btn p-3" @click="isMenuActive = true" v-ripple="'rgba(0,0,0,.2)'">
				<i class="fa fa-bars fa-1x"></i>
			</div>
		</div>
		<div class="header-item" data-aos="slide-right">
			<b>{{ route.meta.displayName }}</b>
		</div>
		<div class="header-item" style="text-align: right">
			<div @click="logoutAdmin" class="logout-btn p-3 rounded" v-ripple="'rgba(0,0,0,.2)'">
				<i class='fa fa-power-off fa-1x'></i>&nbsp;<span class="lg">Logout</span>
			</div>
		</div>
	</header>
</template>

<style scoped>
.cui-header {
	width: calc(100% - 10rem);
	display: flex;
	align-items: center;
	justify-content: space-between;
	position: absolute;
	left: 10rem;
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

@media only screen and (max-width: 767px) {
	.cui-header {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		width: 100%;
	}

}
</style>