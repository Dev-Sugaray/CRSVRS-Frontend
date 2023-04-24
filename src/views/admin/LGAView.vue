 <script setup>
import CuiButton from '@/components/CuiButton';
import CuiHeader from '@/components/CuiHeader';
import CuiMenu from '@/components/CuiMenu';
import CuiBody from '@/components/CuiBody'
// // Pinia dependencies
// // import { storeToRefs } from 'pinia';
// // Pinia stores
// import { useAuthStore } from '@/store/auth.store';

// const authStore = useAuthStore();
// const { loginAdmin } = authStore;

</script>

<template>
	<div>
		<cui-header></cui-header>
		<cui-menu></cui-menu>
		<cui-body>
			<cui-button><i class="fa fa-plus"></i> Add</cui-button>
			<select>
				<option>Show 5</option>
				<option>Show 10</option>
				<option>Show 20</option>
				<option>Show 50</option>
			</select>
		</cui-body>
	</div>
</template>

<style scoped>

</style>