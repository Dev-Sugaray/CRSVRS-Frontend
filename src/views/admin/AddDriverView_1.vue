<script setup>
import CuiHeader from '@/components/CuiHeader';
import CuiMenu from '@/components/CuiMenu';
import CuiBody from '@/components/CuiBody';
import CuiButton from '@/components/CuiButton';
import DriverPhoto from '@/components/DriverPhoto';
// Pinia dependencies
import { storeToRefs } from 'pinia';
// Vue dependencies
import { onMounted } from 'vue';
// Vue-router
import { useRouter } from 'vue-router';
// Pinia stores
import { useDriverStore } from '@/store/driver.store';

const driverStore = useDriverStore();
const { driverToAddSurname, driverToAddOthernames, revenueHead, driverToAddLicenseNumber, driverToAddPhone, driverToAddPhone2, driverToAddChassisNumber,  driverToAddLGA, driverToAddAmount, driverToAddVehicleType, lgas, vehicleTypes } = storeToRefs(driverStore);
const { createDriver, getLGAs, getVehicleTypes } = driverStore;

const router = useRouter();

onMounted(()=> {
	getLGAs();
	getVehicleTypes();
})

</script>

<template>
	<cui-header></cui-header>
	<cui-menu></cui-menu>
	<cui-body class="overflow-auto">
		<div class="container-fluid text-center">
			<driver-photo></driver-photo>
		</div>
		<div class="row">
			<div class="container mt-2  col-lg-4 col-md-6 col-sm-12 col-xs-12">
				<label>Surname</label>
				<input class="p-2 rounded cui-input w-100"  v-model="driverToAddSurname" type="text" placeholder="Surname">
			</div>
			<div class="container mt-2 col-lg-4 col-md-6 col-sm-12 col-xs-12">
				<label>Othernames</label>
				<input class="p-2 rounded cui-input w-100" v-model="driverToAddOthernames" type="text" placeholder="Othernames">
			</div>
		</div>
		<div class="row">
			<div class="container mt-2 col-lg-4 col-md-6 col-sm-12 col-xs-12">
				<label>Phone</label>
				<input class="p-2 rounded cui-input w-100" v-model="driverToAddPhone" type="text" placeholder="phone">
			</div>
			<div class="container mt-2 col-lg-4 col-md-6 col-sm-12 col-xs-12">
				<label>Phone 2</label>
				<input class="p-2 rounded cui-input w-100" v-model="driverToAddPhone2" type="text" placeholder="phone 2">
			</div>
		</div>
		<div class="row">
			<div class="container mt-2 col-lg-4 col-md-6 col-sm-12 col-xs-12">
				<label>Chassis number</label>
				<input class="p-2 rounded cui-input w-100" v-model="driverToAddChassisNumber" type="text" placeholder="Chassis number">
			</div>
			<div class="container mt-2 col-lg-4 col-md-6 col-sm-12 col-xs-12">
				<label>LGA</label>
				<select class="p-2 rounded cui-select w-100" v-model="driverToAddLGA">
					<option
						v-for="lga in lgas"
						:key="lga.lga_id"
						:value="lga.lga_id"
					>
						{{  lga.lga }}
					</option>
					
				</select>
			</div>
		</div>
		<div class="row">
			<div class="container mt-2 col-lg-4 col-md-6 col-sm-12 col-xs-12">
				<label>Amount</label>
				<input class="p-2 rounded cui-input w-100" v-model="driverToAddAmount" type="number" placeholder="Amount">
			</div>
			<div class="container mt-2 col-lg-4 col-md-6 col-sm-12 col-xs-12">
				<label>Vehicle type</label>
				<select class="p-2 rounded cui-select w-100" v-model="driverToAddVehicleType">
					<option
						v-for="vehicleType in vehicleTypes"
						:key="vehicleType.vehicle_type_id"
						:value="vehicleType.vehicle_type_id">
						{{  vehicleType.vehicle_type }}
					</option>
				</select>
			</div>
		</div>
		<div class="row">
			<div class="container mt-2 col-lg-4 col-md-6 col-sm-12 col-xs-12">
				<label>License number</label>
				<input class="p-2 rounded cui-input w-100" v-model="driverToAddLicenseNumber" type="text" placeholder="License number">
			</div>
			<div class="container mt-2 col-lg-4 col-md-6 col-sm-12 col-xs-12">
				<label>Revenue head</label>
				<input class="p-2 rounded cui-input w-100" v-model="revenueHead" readonly>
			</div>
		</div>
		<div class="container p-2 mt-4">
			<cui-button  @click="router.back()" class="w-6">Go back</cui-button>&nbsp;
			<cui-button @click="createDriver" class="w-6">Add driver</cui-button>
		</div>
	</cui-body>
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

</style>