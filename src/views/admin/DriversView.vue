<script setup>
import CuiButton from '@/components/CuiButton';
import CuiHeader from '@/components/CuiHeader';
import CuiMenu from '@/components/CuiMenu';
import CuiBody from '@/components/CuiBody'
import CuiInput from '@/components/CuiInput';
// Pinia dependencies
import { storeToRefs } from 'pinia';
// Vue dependencies
import { onMounted } from 'vue';
// Pinia stores
import { useDriverStore } from '@/store/driver.store';
// Vue router
import { useRouter } from 'vue-router';
const router = useRouter();

const driverStore = useDriverStore();
const { drivers, showDriver, paginatedDrivers, range, showIndex, driverToEditId, driverToView } = storeToRefs(driverStore);
const { readDriver, createDriver, deleteDriver } = driverStore;

const editDriver = (id)=>{
	
	driverToEditId.value = id;
	router.push('/edit_driver');

}

onMounted(()=>{
	readDriver();
})

const moreDriverInfo = (driverId)=>{
	driverToView.value = drivers.value.filter(driver => driver.driver_id == driverId)[0];
	router.push('/more_driver_info');
}

</script>

<template>
	<div>
		<cui-header></cui-header>
		<cui-menu></cui-menu>
		<cui-body>

			<div class="row">
				<div class="col-4">
					<!-- <cui-button data-bs-toggle="modal" data-bs-target="#addDriver"><i class="fa fa-plus"></i> Add new</cui-button> &nbsp; -->
					<cui-button @click="readDriver()"><i class="fa fa-spinner"></i> Refresh</cui-button>
				</div>
				<div class="col-6">
					<cui-input :store="driverStore" stateKey="searchStr" placeholder="Search drivers"></cui-input>
				</div>
				<div class="col-1">
					<select v-model="range" class="p-2 rounded range">
						<option value="5">Show 5</option>
						<option value="10">Show 10</option>
						<option value="20">Show 20</option>
						<option value="50">Show 50</option>
					</select>
				</div>
				
			</div>
			
			<div class="container">
				
				<div class="table">
					<div class="table-header row align-items-center pt-2 pb-2">
						<div class="table-header-col col">Fullname</div>
						<div class="table-header-col col">Vehicle security registration no</div>
						<div class="table-header-col col">Chassis number</div>
						<div class="table-header-col col">Certificate status</div>
						<div class="table-header-col col">Expiry date</div>
						<div class="table-header-col col"></div>
					</div>
					<div class="table-body">
						<div 
							class="table-row row bg-light rounded shadow align-items-center mt-2"
							v-for="driver in showDriver"
							:key="driver.id"
						>
							<div class="table-row-col col col">{{ driver.surname }} {{ driver.othernames }} <br><small class="phone_number">{{ driver.phone }}</small></div>
							<div class="table-row-col col col">{{ driver.vehicle_security_registration_no }}</div>
							<div class="table-row-col col col">{{ driver.chassis_no }}</div>
							<div :class="['table-header-col col', driver.status.toLowerCase() == 'active' ? 'text-success' : 'text-danger']">{{ driver.status }}</div>
							<div class="table-header-col col">{{ driver.expiry_date_description }}</div>
							
							<!-- For mobile view will add a new button that will show more information and hide the amount of information that needs to be shown on the frontend -->
							<div class="table-row-col col col">
								<cui-button @click="moreDriverInfo(driver.driver_id)">
									<i class="fa fa-eye"></i>
									More
								</cui-button>&nbsp;
								<cui-button @click="editDriver(driver.driver_id)">
									<i class="fa fa-pen"></i>
									Edit
								</cui-button>&nbsp;
								<cui-button type='danger' data-bs-toggle="modal" :data-bs-target="'#delete_driver'.concat(driver.driver_id)">
									<i class="fa fa-trash"></i>
									Delete
								</cui-button>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div class="pagination">
				<cui-button class="m-1"><i class="fa fa-chevron-left"></i></cui-button>
				<cui-button class="m-1"
					v-for="i, index in paginatedDrivers"
					:key="'pag_'.concat(index)"
					@click="showIndex = index"
				>{{index+1}}</cui-button>

				<cui-button class="m-1"><i class="fa fa-chevron-right"></i></cui-button>
			</div>
		</cui-body>
	</div>

	<!-- Button trigger modal -->


<!-- Add driver modal -->
	<div class="modal fade" id="addDriver" data-backdrop="static" tabindex="-1" role="dialog" aria-labelledby="staticBackdropLabel" aria-hidden="true">
		<div class="modal-dialog">
			<div class="modal-content" style="overflow-y: auto; max-height:85%;  margin-top: 50px; margin-bottom:50px;">
				<div class="modal-header">
					<h1 class="h5">Add new driver</h1>
				</div>
				<div class="modal-body">
					
					<div class="row">
						<div class="container">
							<label>Surname</label>
							<cui-input :store="driverStore" stateKey="driverToAddSurname" type="text" placeholder="Surname"></cui-input>
						</div>
						<div class="container mt-2">
							<label>Othernames</label>
							<cui-input :store="driverStore" stateKey="driverToAddOthernames" type="text" placeholder="Othernames"></cui-input>
						</div>
					</div>
					<div class="row">
						<div class="container mt-2">
							<label>Phone</label>
							<cui-input :store="driverStore" stateKey="driverToAddPhone" type="text" placeholder="phone"></cui-input>
						</div>
						<div class="container mt-2">
							<label>Phone 2</label>
							<cui-input :store="driverStore" stateKey="driverToAddPhone2" type="text" placeholder="phone 2"></cui-input>
						</div>
					</div>
				</div>
				<div class="modal-footer">
					<div class="container mt-5 text-center">
						<cui-button data-bs-dismiss="modal" type="danger" class="w-50">Cancel</cui-button>
						<cui-button @click="createDriver" class="w-50">Add new driver</cui-button>
					</div>
				</div>
			</div>
		</div>
	</div>
<!-- End of add driver modal -->

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