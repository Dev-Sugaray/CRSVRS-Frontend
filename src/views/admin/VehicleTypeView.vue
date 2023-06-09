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
import { useVehicleTypeStore } from '@/store/vehicleType.store';

import { useAuthStore } from '@/store/auth.store';

const authStore = useAuthStore();
const { credentials } = storeToRefs(authStore);



const vehicleTypeStore = useVehicleTypeStore();
const { vehicleTypes, showVehicleType, paginatedVehicleTypes, range, showIndex } = storeToRefs(vehicleTypeStore);
const { readVehicleType, createVehicleType, updateVehicleType, deleteVehicleType, increaseShowIndex, decreaseShowIndex  } = vehicleTypeStore;


onMounted(()=>{
	readVehicleType();
})

</script>

<template>
	<div>
		<cui-header></cui-header>
		<cui-menu></cui-menu>
		<cui-body>

			<div class="d-flex justify-content-between align-items-center">
				<div class="col">
					<cui-button data-bs-toggle="modal" data-bs-target="#addVehicleType"><i class="fa fa-plus"></i> <span class="lg"> Add new</span></cui-button>
				</div>
				<div class="col">
					<cui-button @click="readVehicleType()"><i class="fa fa-spinner"></i><span class="lg"> Refresh</span></cui-button>
				</div>
				<div class="col-7">
					<cui-input :store="vehicleTypeStore" stateKey="searchStr" placeholder="Search vehicle types"></cui-input>
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
					<div class="table-header d-flex justify-content-between align-items-center pt-2 pb-2">
						<div class="table-header-col col-8">Vehicle Type</div>
						<div class="table-header-col col"></div>
						<div class="table-header-col col"></div>
					</div>
					<div class="table-body">
						<div 
							class="table-row row bg-light rounded shadow align-items-center mt-2"
							v-for="vehicleType in showVehicleType"
							:key="vehicleType.vehicle_type_id"
						>
							<div data-aos="zoom-in" class="table-row-col col col-8">{{ vehicleType.vehicle_type }}</div>
							<!-- For mobile view will add a new button that will show more information and hide the amount of information that needs to be shown on the frontend -->
							<div data-aos="zoom-in" class="table-row-col col col text-right">
								<cui-button  v-if="credentials.admin_type != 'admin'" data-bs-toggle="modal" :data-bs-target="'#edit_vehicleType'.concat(vehicleType.vehicle_type_id)">
									<i class="fa fa-pen"></i>
									<span class="lg"> Edit</span>
								</cui-button>
							</div>
							<div data-aos="zoom-in" class="table-row-col col col">
								<cui-button  v-if="credentials.admin_type != 'admin'" type='danger' data-bs-toggle="modal" :data-bs-target="'#delete_vehicleType'.concat(vehicleType.vehicle_type_id)">
									<i class="fa fa-trash"></i>
									<span class="lg"> Delete</span>
								</cui-button>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div class="pagination">
				<cui-button @click="decreaseShowIndex" class="m-1"><i class="fa fa-chevron-left"></i></cui-button>
				<cui-button class="m-1"
					v-for="i, index in paginatedVehicleTypes"
					:key="'pag_'.concat(index)"
					@click="showIndex = index"
					:class="[showIndex == index ? 'active_pagination_item' : '']"
				>{{index+1}}</cui-button>

				<cui-button @click="increaseShowIndex" class="m-1"><i class="fa fa-chevron-right"></i></cui-button>
			</div>
		</cui-body>
	</div>

	<!-- Button trigger modal -->


<!-- Add vehicleType modal -->
	<div class="modal fade" id="addVehicleType" data-backdrop="static" tabindex="-1" role="dialog" aria-labelledby="staticBackdropLabel" aria-hidden="true">
		<div class="modal-dialog">
			<div class="modal-content" style="overflow-y: auto; max-height:85%;  margin-top: 50px; margin-bottom:50px;">
				<div class="modal-header">
					<h1 class="h5">Add new vehicle type</h1>
				</div>
				<div class="modal-body">
					<div class="row">
						<div class="container">
							<label>Vehicle Type</label>
							<cui-input :store="vehicleTypeStore" stateKey="vehicleTypeName" type="text" placeholder="Vehicle type"></cui-input>
						</div>
					</div>
				</div>
				<div class="modal-footer">
					<div class="container mt-5 text-center">
						<cui-button data-bs-dismiss="modal" type="danger" id="create_vehicle_type_btn">Cancel</cui-button>&nbsp;
						<cui-button @click="createVehicleType">Add new vehicle type</cui-button>
					</div>
				</div>
			</div>
		</div>
	</div>
<!-- End of add vehicleType modal -->

<!-- Edit vehicleType modal -->
	<div v-for="vehicleType in vehicleTypes" data-backdrop="static" :key="vehicleType.vehicle_type_id" class="modal fade" :id="'edit_vehicleType'.concat(vehicleType.vehicle_type_id)">
		<div class="modal-dialog">
			<div class="modal-content" style="overflow-y: auto; max-height:85%;  margin-top: 50px; margin-bottom:50px;">
				<div class="modal-header">
					<h1 class="h5">Edit vehicle type</h1>
				</div>
				<div class="modal-body">
					<div class="row">
						<div class="container">
							<label>Vehicle type</label>
							<input class="p-2 rounded cui-input w-100"  v-model="vehicleType.vehicle_type" type="text" placeholder="Vehicle type">
						</div>
					</div>
				</div>
				<div class="modal-footer">
					<div class="container mt-5 text-center">
						<cui-button data-bs-dismiss="modal" type="danger" class="" :id="'update_vehicle_type_btn_'.concat(vehicleType.vehicle_type_id)">Cancel</cui-button>&nbsp;
						<cui-button @click="updateVehicleType(vehicleType.vehicle_type_id)" class="">Edit</cui-button>
					</div>
				</div>
			</div>
		</div>
	</div>
<!-- End of edit vehicleType modal -->


<!-- delete vehicleType modal -->
	<div v-for="vehicleType in vehicleTypes" data-backdrop="static" :key="vehicleType.vehicle_type_id" class="modal fade" :id="'delete_vehicleType'.concat(vehicleType.vehicle_type_id)">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<h1 class="h5">Delete vehicleType</h1>
				</div>
				<div class="modal-body">
					{{ vehicleType.vehicle_type }}
				</div>
				<div class="modal-footer">
					<div class="container mt-5 text-center">
						<cui-button data-bs-dismiss="modal" class="" :id="'delete_vehicle_type_btn_'.concat(vehicleType.vehicle_type_id)">Cancel</cui-button>&nbsp;
						<cui-button type="danger" @click="deleteVehicleType(vehicleType.vehicle_type_id)">Delete</cui-button>
					</div>
				</div>
			</div>
		</div>
	</div>
<!-- End of delete vehicleType modal -->
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