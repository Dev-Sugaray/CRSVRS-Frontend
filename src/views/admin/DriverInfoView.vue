<script setup>
import CuiButton from '@/components/CuiButton';
import CuiHeader from '@/components/CuiHeader';
import CuiMenu from '@/components/CuiMenu';
import CuiBody from '@/components/CuiBody'

import { generateCertificate } from '@/modules/certificate';
import { generateReceipt } from '@/modules/receipt';
// Vue router
import { useRouter } from 'vue-router';
// Modules
import { getDriverImage } from '@/modules/getImage';
// Pinia dependencies
import { storeToRefs } from 'pinia';
// // Vue dependencies
import { onMounted, ref } from 'vue';
// // Pinia stores
import { useDriverStore } from '@/store/driver.store';
import { useAppStore } from '@/store/app.store';

const driverStore = useDriverStore();
const { driverToView } = storeToRefs(driverStore);
const img = ref(null);

const appStore = useAppStore();
const { appAlert } = appStore;

onMounted(()=>{
	getDriverImage(driverToView.value.photo).then((data)=> {
		img.value = data;
	}).catch((e)=>{
		console.log(e);
		appAlert('Failed to fetch driver photo');
	})
})
const generateDriverCertificate = ()=>{
	const payload = {
		driver_id: `${driverToView.value.driver_id}`,
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
		driver_id: `${driverToView.value.driver_id}`,
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

const router = useRouter();
</script>

<template>
	<div>
		<cui-header></cui-header>
		<cui-menu></cui-menu>
		<cui-body class="overflow-auto">
			<h1 class="mt-1 mb-1 bg-light rounded h3 p-3">Driver information</h1>
			<div class="container mt-2 rounded bg-light p-1" style="overflow-y: auto">
				<div class="container">
					<div class="container p-2 mt-4">
						<img :src="img" class="photo d-inline-block">
					</div>
					<ul class="mt-4">
						<li class="m-1 p-2 rounded"><b>Surname:</b> {{ driverToView.surname }}</li>
						<li class="m-1 p-2 rounded"><b>Othernames:</b> {{ driverToView.othernames }}</li>
						<li class="m-1 p-2 rounded"><b>Phone:</b> {{ driverToView.phone }}</li>
						<li class="m-1 p-2 rounded"><b>Alternative phone number:</b> {{ driverToView.phone2 }}</li>
						<li class="m-1 p-2 rounded"><b>Vehicle security registration no:</b> {{ driverToView.vehicle_security_registration_no }}</li>
						<li class="m-1 p-2 rounded"><b>LGA:</b> {{ driverToView.lga }}</li>
						<li class="m-1 p-2 rounded"><b>Vehicle type:</b> {{ driverToView.vehicle_type }}</li>
                        <li class="m-1 p-2 rounded"><b>Chassis number:</b> {{ driverToView.chassis_no }}</li>
                        <li class="m-1 p-2 rounded"><b>License number:</b> {{ driverToView.license_no }}</li>
                        <li class="m-1 p-2 rounded"><b>Revenue head:</b> {{ driverToView.revenue_head }}</li>
						<li class="m-1 p-2 rounded"><b>Amount:</b> {{ driverToView.amount }}</li>
						<li class="m-1 p-2 rounded"><b>Issue date:</b> {{ driverToView.issue_date_description }}</li>
						<li class="m-1 p-2 rounded"><b>Expiry date:</b> {{ driverToView.expiry_date_description }}</li>
                        <li class="m-1 p-2 rounded"><b>Certificate status:</b> {{ driverToView.status }}</li>
					</ul>
				</div>
				<div class="container ">
					<cui-button @click="router.back()" class="w-2 m-1">
						<i class="fa fa-arrow-left"></i>
					</cui-button>
					<cui-button @click="generateDriverReceipt" class="w-2 m-1">
						<span class="lg">Print receipt</span>
						<span class="sm">
							<i class="fa fa-receipt"></i>
							<span> Receipt</span>
						</span>
						
					</cui-button>
					<cui-button @click="generateDriverCertificate" class="w-2 m-1">
						<span class="lg">Print certificate</span>
						<span class="sm">
							<i class="fa fa-certificate"></i>
							<span> Certificate</span>
						</span>
						
					</cui-button>
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
	cursor: pointer;
}

ul {
	list-style: none;
	margin-left: -2rem;
}

li {
	background-color: white;
	display: inline-block;
}
</style>