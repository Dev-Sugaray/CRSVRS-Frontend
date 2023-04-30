<script setup>
import CuiButton from '@/components/CuiButton';
import CuiHeader from '@/components/CuiHeader';
import CuiMenu from '@/components/CuiMenu';
import CuiBody from '@/components/CuiBody'

import { generateCertificate } from '@/modules/certificate';
import { generateReceipt } from '@/modules/receipt';
// Modules
import { getDriverImage } from '@/modules/getImage';
// Pinia dependencies
import { storeToRefs } from 'pinia';
// // Vue dependencies
import { computed, onMounted, ref } from 'vue';
// // Pinia stores
import { useDriverStore } from '@/store/driver.store';

const driverStore = useDriverStore();
const { driverToView, lgas, vehicleTypes } = storeToRefs(driverStore);
const { getLGAs, getVehicleTypes } = driverStore;



const driverLGA = computed(()=>{
	const res = lgas.value.filter((lga)=> lga.lga_id == driverToView.value.lga_id)[0];
	return res;
})

const driverVehicleType = computed(()=>{
	const res = vehicleTypes.value.filter((vehicleType)=> vehicleType.vehicle_type_id == driverToView.value.vehicle_type_id)[0];
	return res;
})



const img = ref(null);

onMounted(()=>{

    getVehicleTypes();
    getLGAs();
	getDriverImage(driverToView.value.photo).then((data)=> {
		img.value = data;
	})
})

// const img1 = await extractImage(coatOfArm);
// console.log({img1});
// const img2 = await extractImage(crossRiverLogo);

const generateDriverCertificate = ()=>{
	const payload = {
		full_name: `${driverToView.value.surname} ${driverToView.value.othernames}`,
		phone: `${driverToView.value.phone}`,
		phone2: `${driverToView.value.phone2}`,
		vehicle_security_registration_no: `${driverToView.value.vehicle_security_registration_no}`,
		photo: `${driverToView.value.photo}`,
		lga: `${driverToView.value.lga}`,
		vehicle_type: `${driverToView.value.vehicle_type}`,
		chassis_no: `${driverToView.value.chassis_no}`,
		license_no: `${driverToView.value.license_no}`,
		revenue_head: `${driverToView.value.revenue_head}`,
		amount: `${driverToView.value.amount}`,
		issue_date: `${driverToView.value.issue_date_description}`,
		expiry_date: `${driverToView.value.expiry_date_description}`,
	}

	generateCertificate(payload);
}

const generateDriverReceipt = ()=>{
	const payload = {
		full_name: `${driverToView.value.surname} ${driverToView.value.othernames}`,
		phone: `${driverToView.value.phone}`,
		phone2: `${driverToView.value.phone2}`,
		vehicle_security_registration_no: `${driverToView.value.vehicle_security_registration_no}`,
		photo: `${driverToView.value.photo}`,
		lga: `${driverToView.value.lga}`,
		vehicle_type: `${driverToView.value.vehicle_type}`,
		chassis_no: `${driverToView.value.chassis_no}`,
		license_no: `${driverToView.value.license_no}`,
		revenue_head: `${driverToView.value.revenue_head}`,
		amount: `${driverToView.value.amount}`,
		issue_date: `${driverToView.value.issue_date_description}`,
		expiry_date: `${driverToView.value.expiry_date_description}`,
	}

	generateReceipt(payload);
}

</script>

<template>
	<div>
		<cui-header></cui-header>
		<cui-menu></cui-menu>
		<cui-body>
			<h1 class="m-2 bg-light rounded">Driver information</h1>
			<div class="container mt-2 rounded bg-light p-1">
				<div class="container">
					<div class="container">
						<img :src="img" class="photo d-inline-block">
					</div>
					<ul>
						<li><b>Surname:</b> {{ driverToView.surname }}</li>
						<li><b>Othernames:</b> {{ driverToView.othernames }}</li>
						<li><b>Phone:</b> {{ driverToView.phone }}</li>
						<li><b>Alternative phone number:</b> {{ driverToView.phone2 }}</li>
						<li><b>Vehicle security registration no:</b> {{ driverToView.vehicle_security_registration_no }}</li>
						<li><b>LGA:</b> {{ driverLGA.lga }}</li>
						<li><b>Vehicle type:</b> {{ driverVehicleType.vehicle_type }}</li>
                        <li><b>Chassis number:</b> {{ driverToView.chassis_no }}</li>
                        <li><b>License number:</b> {{ driverToView.license_no }}</li>
                        <li><b>Revenue head:</b> {{ driverToView.revenue_head }}</li>
						<li><b>Amount:</b> {{ driverToView.amount }}</li>
						<li><b>Issue date</b> {{ driverToView.issue_date_description }}</li>
						<li><b>Expiry date</b> {{ driverToView.expiry_date_description }}</li>
                        <li><b>Certificate status</b> {{ driverToView.status }}</li>
					</ul>
				</div>
				<div class="container">
					<cui-button @click="generateDriverReceipt">Print receipt</cui-button>&nbsp;
					<cui-button @click="generateDriverCertificate">Print certificate</cui-button>
				</div>
			</div>
		</cui-body>
	</div>
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
	background-color: white;
	box-shadow: 0px 0px 5px black;
	cursor: pointer;
}
</style>