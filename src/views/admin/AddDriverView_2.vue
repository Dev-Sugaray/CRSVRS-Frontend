<script setup>
import CuiButton from '@/components/CuiButton';
import CuiHeader from '@/components/CuiHeader';
import CuiMenu from '@/components/CuiMenu';
import CuiBody from '@/components/CuiBody'
// import CuiInput from '@/components/CuiInput';
// import CuiSelect from '@/components/CuiSelect';
// // Pinia dependencies
import { storeToRefs } from 'pinia';
// // Vue dependencies
// import { onMounted } from 'vue';
// // Pinia stores
import { useDriverStore } from '@/store/driver.store';
// Modules
import { getDriverImage } from '@/modules/getImage';

const driverStore = useDriverStore();
const { createdDriverCredentials } = storeToRefs(driverStore);
// const { readAdmin, createAdmin, updateAdmin, deleteAdmin, resetAdminPassword } = driverStore;

// onMounted(()=>{
// 	readAdmin();
// })

// const resetPasswordClick = (id)=>{
// 	resetAdminPassword(id);
// }

</script>

<template>
	<div>
		<cui-header></cui-header>
		<cui-menu></cui-menu>
		<cui-body>
			<h1 class="p-1 bg-light rounded m-1">Driver information</h1>
			<div class="container bg-light rounded m-1">
				<div class="container">
					<img class="img photo" :src="getDriverImage(createdDriverCredentials.photo)">
				</div>
				<ul>
					<li>Surname: {{ createdDriverCredentials.surname }}</li>
					<li>Othernames: {{ createdDriverCredentials.othernames }}</li>
					<li>Phone: {{ createdDriverCredentials.phone }}</li>
					<li>Alternative phone: {{ createdDriverCredentials.phone2 }}</li>
					<li>Vehicle Security Registration: {{ createdDriverCredentials.vehicle_security_registration_no }}</li>
					<li>License number: {{ createdDriverCredentials.license_no }}</li>
					<li>Chassis number: {{ createdDriverCredentials.chassis_no }}</li>
					<li>Vehicle Type: {{  }}</li>
					<li>LGA: {{  }}</li>
					<li>Amount: {{ createdDriverCredentials.amount }}</li>
					<li>Expiry date: {{ createdDriverCredentials.expiry_date }}</li>
				</ul>
			</div>
			<div class="container">
				<cui-button>Print receipt</cui-button>
				<cui-button>Print certificate</cui-button>
			</div>
		</cui-body>
	</div>

	<!-- Button trigger modal -->


</template>

<style scoped>
.table-header {
	font-weight: bolder;
}

.range {
	color: white;
	background-color: var(--cui-blue);
	font-weight: bold;
	border: none;
	outline: none;
}

.phone_number {
	color: var(--cui-light-gray)
}

.photo {
	width: 10rem;
	height: 10rem;
	border-radius: 100%;
	background-color: gray;
	cursor: pointer;
}
</style>