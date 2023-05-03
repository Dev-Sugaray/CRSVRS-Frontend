<script setup>
import CuiHeader from '@/components/CuiHeader';
import CuiMenu from '@/components/CuiMenu';
import CuiBody from '@/components/CuiBody';
import CuiButton from '@/components/CuiButton';
import DriverPhoto from '@/components/DriverPhoto';
// Modules
import { getDriverImage } from '@/modules/getImage';
// Pinia dependencies
import { storeToRefs } from 'pinia';
// Vue dependencies
import { onMounted, ref } from 'vue';
// Pinia stores
import { useDriverStore } from '@/store/driver.store';
// Vue-router
import { useRouter } from 'vue-router';

const router = useRouter();

const driverStore = useDriverStore();
const { drivers, driverToEditId, lgas, vehicleTypes, driverPhotoToEdit } = storeToRefs(driverStore);
const { updateDriver, getLGAs, getVehicleTypes } = driverStore;

const payload = ref(drivers.value.filter((driver)=> driver.driver_id == driverToEditId.value)[0]);

onMounted(()=> {
	getLGAs();
	getVehicleTypes();
    getDriverImage(payload.value.photo).then((img)=> {
        driverPhotoToEdit.value = img;
    });
})

const updateBtnClick = ()=>{
    updateDriver(payload);
}

</script>

<template>
	<cui-header></cui-header>
	<cui-menu></cui-menu>
	<cui-body class="overflow-auto">
		<div class="container-fluid text-center">
			<driver-photo mode="edit"></driver-photo>
		</div>
		<div class="row">
			<div class="container mt-2  col-lg-6 col-md-6 col-sm-12 col-xs-12">
				<label>Surname</label>
				<input class="p-2 rounded cui-input w-100"  v-model="payload.surname" type="text" placeholder="Surname">
			</div>
			<div class="container mt-2 col-lg-6 col-md-6 col-sm-12 col-xs-12">
				<label>Othernames</label>
				<input class="p-2 rounded cui-input w-100" v-model="payload.othernames" type="text" placeholder="Othernames">
			</div>
		</div>
		<div class="row">
			<div class="container mt-2 col-lg-6 col-md-6 col-sm-12 col-xs-12">
				<label>Phone</label>
				<input class="p-2 rounded cui-input w-100" v-model="payload.phone" type="text" placeholder="phone">
			</div>
			<div class="container mt-2 col-lg-6 col-md-6 col-sm-12 col-xs-12">
				<label>Phone 2</label>
				<input class="p-2 rounded cui-input w-100" v-model="payload.phone2" type="text" placeholder="phone 2">
			</div>
		</div>
		<div class="row">
			<div class="container mt-2 col-lg-6 col-md-6 col-sm-12 col-xs-12" v-if="false">
				<label>Revenue head</label>
				<input class="p-2 rounded cui-input w-100" v-model="payload.revenue_head" readonly>
			</div>
			<div class="container mt-2 col-lg-6 col-md-6 col-sm-12 col-xs-12" v-if="false">
				<label>LGA</label>
				<select class="p-2 rounded cui-select w-100" v-model="payload.lga_id">
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
			<div class="container mt-2 col-lg-6 col-md-6 col-sm-12 col-xs-12">
				<label>Amount</label>
				<input class="p-2 rounded cui-input w-100" v-model="payload.amount" type="number" placeholder="Amount">
			</div>
			<div class="container mt-2 col-lg-6 col-md-6 col-sm-12 col-xs-12">
				<label>Vehicle type</label>
				<select class="p-2 rounded cui-select w-100" v-model="payload.vehicle_type_id">
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
			<div class="container mt-2 col-lg-6 col-md-6 col-sm-12 col-xs-12">
				<label>Chassis number</label>
				<input class="p-2 rounded cui-input w-100" v-model="payload.chassis_no" type="text" placeholder="Chassis number">
			</div>
			<div class="container mt-2 col-lg-6 col-md-6 col-sm-12 col-xs-12">
				<label>License number</label>
				<input class="p-2 rounded cui-input w-100" v-model="payload.license_no" type="text" placeholder="License number">
			</div>	
		</div>
		<div class="container p-2 mt-4">
			<cui-button @click="router.back()" class="w-6"><i class="fa fa-arrow-left"></i></cui-button>&nbsp;<cui-button @click="updateBtnClick" class="w-6">
				<i class="fa fa-pen"></i>
				<span> Edit driver</span>
			</cui-button>
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