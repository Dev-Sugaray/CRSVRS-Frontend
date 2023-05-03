<script setup>
import CuiButton from '@/components/CuiButton';
import CuiHeader from '@/components/CuiHeader';
import CuiMenu from '@/components/CuiMenu';
import CuiBody from '@/components/CuiBody'
import CuiInput from '@/components/CuiInput';
// Pinia dependencies
import { storeToRefs } from 'pinia';
// Vue dependencies
import { onMounted, ref } from 'vue';
// Pinia stores
import { useDriverStore } from '@/store/driver.store';
// Vue router
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/store/auth.store';
const router = useRouter();

const driverStore = useDriverStore();
const { drivers, showDriver, paginatedDrivers, range, showIndex, driverToEditId, driverToView } = storeToRefs(driverStore);
const { readDriver, deleteDriver, renewDriver, increaseShowIndex, decreaseShowIndex } = driverStore;


const authStore = useAuthStore();
const { credentials } = storeToRefs(authStore);


const editDriver = (id)=>{
	
	driverToEditId.value = id;
	router.push('/edit_driver');
	const btn = document.querySelector(`#actions_btn${id}`);
	btn.click();
}



onMounted(()=>{
	readDriver();
})

const moreDriverInfo = (driverId)=>{
	driverToView.value = drivers.value.filter(driver => driver.driver_id == driverId)[0];
	router.push('/more_driver_info');
	const btn = document.querySelector(`#actions_btn${driverId}`);
	btn.click();
}

const renewalCredentials = ref({
	id: null,
	fullname: null,
	amount: 0
});

const setCredentials = async (id, fullname)=>{
	renewalCredentials.value.id = id;
	renewalCredentials.value.fullname = fullname;
	const btn = document.querySelector(`#actions_btn${id}`);
	btn.click();
}

const renewDriverBtnClick = async ()=>{
	const id = renewalCredentials.value.id;
	const amount = renewalCredentials.value.amount;

	const payload = {
		driver_id: id,
		amount
	}

	renewDriver(payload);
}
</script>

<template>
	<div>
		<cui-header></cui-header>
		<cui-menu></cui-menu>
		<cui-body>

			<div class="d-flex justify-content-between align-items-center">
				<div class="col m-1">
					<cui-button @click="readDriver()"><i class="fa fa-spinner"></i><span class="lg"> Refresh</span> </cui-button>&nbsp;
				</div>
				<div class="col-9 m-1 lg">
					<cui-input :store="driverStore" stateKey="searchStr" placeholder="Search drivers"></cui-input>
				</div>
				<div class="col-6 m-1 sm">
					<cui-input :store="driverStore" stateKey="searchStr" placeholder="Search drivers"></cui-input>
				</div>
				<div class="col m-1">
					<select v-model="range" class="p-2 rounded range lg">
						<option value="5">Show 5</option>
						<option value="10">Show 10</option>
						<option value="20">Show 20</option>
						<option value="50">Show 50</option>
					</select>
					<select v-model="range" class="p-2 rounded range sm">
						<option value="5">5</option>
						<option value="10">10</option>
						<option value="20">20</option>
						<option value="50">50</option>
					</select>
				</div>
			</div>
			
			<div class="container table-wrapper">
				
				<div class="table">
					<div class="table-header row align-items-center pt-2 pb-2">
						<div class="table-header-col col">Fullname</div>
						<div class="table-header-col col lg">Vehicle security registration no</div>
						<div class="table-header-col col lg">Chassis number</div>
						<div class="table-header-col col"><span class="lg">Certificate </span>status</div>
						<div class="table-header-col col lg">Expiry date</div>
						<div class="table-header-col col"></div>
						<div class="table-header-col col"></div>
						<div class="table-header-col col"></div>
						<div class="table-header-col col"></div>
					</div>
					<div class="table-body">
						<div 
							class="table-row row bg-light rounded shadow align-items-center mt-2"
							v-for="driver in showDriver"
							:key="driver.id"
						>
							<div aos-init data-aos="zoom-in" class="table-row-col col col" data-aos-anchor-placement="top-bottom">{{ driver.surname }} {{ driver.othernames }} <br><small class="phone_number">{{ driver.phone }}</small></div>
							<div aos-init data-aos="zoom-in" class="table-row-col col col lg" data-aos-anchor-placement="top-bottom">{{ driver.vehicle_security_registration_no }}</div>
							<div aos-init data-aos="zoom-in" class="table-row-col col col lg" data-aos-anchor-placement="top-bottom">{{ driver.chassis_no }}</div>
							<div aos-init data-aos="zoom-in" :class="['table-header-col col', driver.status == 'Active' ? 'text-success' : 'text-danger']" data-aos-anchor-placement="top-bottom">{{ driver.status }}</div>
							<div aos-init data-aos="zoom-in" class="table-header-col col lg" data-aos-anchor-placement="top-bottom">{{ driver.expiry_date_description }}</div>
							
							<!-- For mobile view will add a new button that will show more information and hide the amount of information that needs to be shown on the frontend -->
							<div aos-init data-aos="zoom-in" class="table-row-col col col lg" data-aos-anchor-placement="top-bottom">
								<cui-button data-bs-toggle="modal" data-bs-target="#renew_driver" data-aos-anchor-placement="top-bottom" @click="setCredentials(driver.driver_id, driver.surname.concat(' ').concat(driver.othernames))">
									<i class="fa fa-redo"></i>
									<span> Renew</span>
								</cui-button>
							</div>
							<div aos-init data-aos="zoom-in" class="table-row-col col col lg" data-aos-anchor-placement="top-bottom">
								<cui-button @click="moreDriverInfo(driver.driver_id)">
									<i class="fa fa-eye"></i>
									<span> More</span>
								</cui-button>
							</div>
							<div aos-init data-aos="zoom-in" class="table-row-col col col lg" data-aos-anchor-placement="top-bottom">
								<cui-button v-if="credentials.admin_type != 'admin'" @click="editDriver(driver.driver_id)">
									<i class="fa fa-pen"></i>
									<span> Edit</span>
								</cui-button>
							</div>
							<div aos-init data-aos="zoom-in" class="table-row-col col col lg" data-aos-anchor-placement="top-bottom">
								<cui-button v-if="credentials.admin_type != 'admin'" type='danger' data-bs-toggle="modal" :data-bs-target="'#delete_driver'.concat(driver.driver_id)">
									<i class="fa fa-trash"></i>
									<span> Delete</span>
								</cui-button>
							</div>
							<div data-aos="zoom-in" class="table-row-col col col text-right sm">
								<cui-button data-bs-toggle="modal" v-if="credentials.admin_type != 'admin'" :data-bs-target="'#actions'.concat(driver.driver_id)">
									<i class="fa fa-ellipsis-v"></i>
									<span> Actions</span>
								</cui-button>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div class="pagination">
				<cui-button @click="decreaseShowIndex" class="m-1"><i class="fa fa-chevron-left"></i></cui-button>
				<cui-button class="m-1"
					v-for="i, index in paginatedDrivers"
					:key="'pag_'.concat(index)"
					@click="showIndex = index"
				>{{index+1}}</cui-button>

				<cui-button @click="increaseShowIndex" class="m-1"><i class="fa fa-chevron-right"></i></cui-button>
			</div>
		</cui-body>
	</div>

	<!-- Button trigger modal -->


<!-- action admin modal -->
	<div v-for="driver in drivers" data-backdrop="static" :key="driver.driver_id" class="modal fade" :id="'actions'.concat(driver.driver_id)">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<h1 class="h5">Actions for {{ driver.surname }} {{ driver.othernames }}</h1>
				</div>
				<div class="modal-body">
		
					<cui-button class="m-1" data-bs-toggle="modal" data-bs-target="#renew_driver" data-aos-anchor-placement="top-bottom" @click="setCredentials(driver.driver_id, driver.surname.concat(' ').concat(driver.othernames))">
						<i class="fa fa-redo"></i>
						<span> Renew</span>
					</cui-button>
					<cui-button class="m-1" @click="moreDriverInfo(driver.driver_id)">
						<i class="fa fa-eye"></i>
						<span> More</span>
					</cui-button>
					<cui-button class="m-1" v-if="credentials.admin_type != 'admin'" @click="editDriver(driver.driver_id)">
						<i class="fa fa-pen"></i>
						<span> Edit</span>
					</cui-button>
					<cui-button class="m-1" v-if="credentials.admin_type != 'admin'" type='danger' data-bs-toggle="modal" :data-bs-target="'#delete_driver'.concat(driver.driver_id)">
						<i class="fa fa-trash"></i>
						<span> Delete</span>
					</cui-button>
			
				</div>
				<div class="modal-footer">
					<div class="container mt-5 text-center">
						<cui-button data-bs-dismiss="modal" :id="'actions_btn'.concat(driver.driver_id)">Cancel</cui-button>
					</div>
				</div>
			</div>
		</div>
	</div>
<!-- End of action driver modal -->



<!-- Renew driver modal -->
	<div class="modal fade" id="renew_driver" data-backdrop="static" tabindex="-1" role="dialog" aria-labelledby="staticBackdropLabel" aria-hidden="true">
		<div class="modal-dialog">
			<div class="modal-content" style="overflow-y: auto; max-height:85%;  margin-top: 50px; margin-bottom:50px;">
				<div class="modal-header">
					<h1 class="h5">Renew driver</h1>
				</div>
				<div class="modal-body">
					<p>{{ renewalCredentials.fullname }}</p>
					<label>Amount</label>
					<input class="p-2 rounded cui-input w-100" type="text" v-model="renewalCredentials.amount">
				</div>
				<div class="modal-footer">
					<div class="container mt-5 text-center">
						<cui-button data-bs-dismiss="modal" id="renew_driver_btn" type="danger" class="">Cancel</cui-button>&nbsp;
						<cui-button id="renew-btn" data-driver_id="null" @click="renewDriverBtnClick" class="">Renew driver</cui-button>
					</div>
				</div>
			</div>
		</div>
	</div>
<!-- End of renew driver modal -->


<!-- delete driver modal -->
	<div v-for="driver in drivers" data-backdrop="static" :key="driver.driver_id" class="modal fade" :id="'delete_driver'.concat(driver.driver_id)">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<h1 class="h5">Delete driver</h1>
				</div>
				<div class="modal-body">
					{{ driver.surname }} {{ driver.othernames }} with phone number {{ driver.phone }}
				</div>
				<div class="modal-footer">
					<div class="container mt-5 text-center">
						<cui-button data-bs-dismiss="modal" class="" :id="'delete_driver_btn_'.concat(driver.driver_id)">Cancel</cui-button>&nbsp;
						<cui-button type="danger" @click="deleteDriver(driver.driver_id)">Delete</cui-button>
					</div>
				</div>
			</div>
		</div>
	</div>
<!-- End of delete driver modal -->

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