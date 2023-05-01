<script setup>
import CuiButton from '@/components/CuiButton';
import CuiHeader from '@/components/CuiHeader';
import CuiMenu from '@/components/CuiMenu';
import CuiBody from '@/components/CuiBody'
import CuiInput from '@/components/CuiInput';
import OwnerPhoto from '@/components/OwnerPhoto';
// Pinia dependencies
import { storeToRefs } from 'pinia';
// Vue dependencies
// import { onBeforeMount } from 'vue';
// Pinia stores
import { useOwnerStore } from '@/store/owners.store';
import { useDriverStore } from '@/store/driver.store';
// Vue-router
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/store/auth.store';
const router = useRouter();
const ownerStore = useOwnerStore();
const { owners, showOwner, paginatedOwners, range, showIndex, ownerToView, ownerToEditId } = storeToRefs(ownerStore);
const { readOwner, createOwner, updateOwner, deleteOwner, increaseShowIndex, decreaseShowIndex  } = ownerStore;


const driverStore = useDriverStore();
const { driverToAddVehicleOwnerId, driverToAddPhoto } = storeToRefs(driverStore);

const authStore = useAuthStore();
const { credentials } = storeToRefs(authStore);


const addDriver = (ownerId)=>{
	// Set the owner id
	driverToAddVehicleOwnerId.value = ownerId;
	// Reset the add driver image
	driverToAddPhoto.value = "";
	// Go to the add driver route
	router.push('/add_driver_1');
}

const editOwner = (id)=>{
	
	ownerToEditId.value = id;
	router.push('/edit_owner');

}

const moreOwnerInfo = (ownerId)=>{
	ownerToView.value = owners.value.filter(owner => owner.vehicle_owner_id == ownerId)[0];
	router.push('/more_owner_info');
}

readOwner();
</script>

<template>
	<div>
		<cui-header></cui-header>
		<cui-menu></cui-menu>
		<cui-body>

			<div class="row">
				<div class="col-4">
					<cui-button data-bs-toggle="modal" data-bs-target="#addOwner"><i class="fa fa-plus"></i> Add new</cui-button> &nbsp;
					<cui-button @click="readOwner()"><i class="fa fa-spinner"></i> Refresh</cui-button>
				</div>
				<div class="col-6">
					<cui-input :store="ownerStore" stateKey="searchStr" placeholder="Search vehicle owners"></cui-input>
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
			
			<div class="container table-wrapper">
				
				<div class="table">
					<div class="table-header row align-items-center pt-2 pb-2">
						<div class="table-header-col col">Fullname</div>
						<div class="table-header-col col">Date registered</div>
						<div class="table-header-col col"></div>
						<div class="table-header-col col"></div>
						<div class="table-header-col col"></div>
						<div class="table-header-col col"></div>
					</div>
					<div class="table-body">
						<div 
							class="table-row row bg-light rounded shadow align-items-center mt-2"
							v-for="owner in showOwner"
							:key="owner.vehicle_owner_id"
						>
							<div data-aos="zoom-in" class="table-row-col col col">{{ owner.surname }} {{ owner.othernames }} <br><small class="phone_number">{{ owner.phone }}</small></div>
							<div class="table-row-col col col">{{ new Date(owner.date_registered).toDateString() }}</div>
							
							<!-- For mobile view will add a new button that will show more information and hide the amount of information that needs to be shown on the frontend -->
							<div data-aos="zoom-in" class="table-row-col col col">
								<cui-button @click="addDriver(owner.vehicle_owner_id)">
									<i class="fa fa-car"></i>
									Add driver
								</cui-button>
							</div>
							<div data-aos="zoom-in" class="table-row-col col col">
								<cui-button @click="moreOwnerInfo(owner.vehicle_owner_id)">
									<i class="fa fa-eye"></i>
									More
								</cui-button>
							</div>
							<div data-aos="zoom-in" class="table-row-col col col">
								<cui-button @click="editOwner(owner.vehicle_owner_id)" v-if="credentials.admin_type != 'admin'">
									<i class="fa fa-pen"></i>
									Edit
								</cui-button>
							</div>
							<div data-aos="zoom-in" class="table-row-col col col">
								<cui-button type='danger' data-bs-toggle="modal" :data-bs-target="'#delete_owner'.concat(owner.vehicle_owner_id)" v-if="credentials.admin_type != 'admin'">
									<i class="fa fa-trash"></i>
									Delete
								</cui-button>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div class="pagination">
				<cui-button @click="decreaseShowIndex" class="m-1"><i class="fa fa-chevron-left"></i></cui-button>
				<cui-button class="m-1"
					v-for="i, index in paginatedOwners"
					:key="'pag_'.concat(index)"
					@click="showIndex = index"
				>{{index+1}}</cui-button>

				<cui-button @click="increaseShowIndex" class="m-1"><i class="fa fa-chevron-right"></i></cui-button>
			</div>
		</cui-body>
	</div>

	<!-- Button trigger modal -->


<!-- Add owner modal -->
	<div class="modal fade" id="addOwner" data-backdrop="static" tabindex="-1" role="dialog" aria-labelledby="staticBackdropLabel" aria-hidden="true">
		<div class="modal-dialog">
			<div class="modal-content" style="overflow-y: auto; max-height:85%;  margin-top: 50px; margin-bottom:50px;">
				<div class="modal-header">
					<h1 class="h5">Add new owner</h1>
				</div>
				<div class="modal-body">
					<div class="container-fluid text-center">
						<owner-photo></owner-photo>
					</div>
					<div class="row">
						<div class="container">
							<label>Surname</label>
							<cui-input :store="ownerStore" stateKey="ownerToAddSurname" type="text" placeholder="Surname"></cui-input>
						</div>
						<div class="container mt-2">
							<label>Othernames</label>
							<cui-input :store="ownerStore" stateKey="ownerToAddOthernames" type="text" placeholder="Othernames"></cui-input>
						</div>
					</div>
					<div class="row">
						<div class="container mt-2">
							<label>Phone</label>
							<cui-input :store="ownerStore" stateKey="ownerToAddPhone" type="text" placeholder="phone"></cui-input>
						</div>
						<div class="container mt-2">
							<label>Phone 2</label>
							<cui-input :store="ownerStore" stateKey="ownerToAddPhone2" type="text" placeholder="phone 2"></cui-input>
						</div>
					</div>
				</div>
				<div class="modal-footer">
					<div class="container mt-5 text-center">
						<cui-button data-bs-dismiss="modal" type="danger" id="create_owner_btn">Cancel</cui-button>&nbsp;
						<cui-button @click="createOwner">Add new owner</cui-button>
					</div>
				</div>
			</div>
		</div>
	</div>
<!-- End of add owner modal -->


<!-- Edit owner modal -->
	<div v-for="owner in owners" data-backdrop="static" :key="owner.vehicle_owner_id" class="modal fade" :id="'edit_owner'.concat(owner.vehicle_owner_id)">
		<div class="modal-dialog">
			<div class="modal-content" style="overflow-y: auto; max-height:85%;  margin-top: 50px; margin-bottom:50px;">
				<div class="modal-header">
					<h1 class="h5">Owner information</h1>
				</div>
				<div class="modal-body">
					<div class="container-fluid text-center">
						<owner-photo mode="edit"></owner-photo>
					</div>
					<div class="row">
						<div class="container">
							<label>Surname</label>
							<input class="p-2 rounded cui-input w-100"  v-model="owner.surname" type="text" placeholder="Surname">
						</div>
						<div class="container mt-2">
							<label>Othernames</label>
							<input class="p-2 rounded cui-input w-100" v-model="owner.othernames" type="text" placeholder="Othernames">
						</div>
					</div>
					<div class="row">
						<div class="container mt-2">
							<label>Phone</label>
							<input class="p-2 rounded cui-input w-100" v-model="owner.phone" type="text" placeholder="phone">
						</div>
						<div class="container mt-2">
							<label>Phone 2</label>
							<input class="p-2 rounded cui-input w-100" v-model="owner.phone2" type="text" placeholder="phone 2">
						</div>
					</div>
				</div>
				<div class="modal-footer">
					<div class="container mt-5 text-center">
						<cui-button data-bs-dismiss="modal" type="danger" class="" :id="'edit_owner_btn'.concat(owner.vehicle_owner_id)">Cancel</cui-button>&nbsp;
						<cui-button @click="updateOwner(owner.vehicle_owner_id)" class="">Edit</cui-button>
					</div>
				</div>
			</div>
		</div>
	</div>
<!-- End of edit owner modal -->


<!-- Show owner modal -->
<div v-for="owner in owners" data-backdrop="static" :key="owner.vehicle_owner_id" class="modal fade" :id="'show_owner'.concat(owner.vehicle_owner_id)">
		<div class="modal-dialog">
			<div class="modal-content" style="overflow-y: auto; max-height:85%;  margin-top: 50px; margin-bottom:50px;">
				<div class="modal-header">
					<h1 class="h5">Edit owner</h1>
				</div>
				<div class="modal-body">
					<div class="container-fluid text-center">
						<owner-photo mode="edit"></owner-photo>
					</div>
					<div class="row">
						<div class="container">
							Surname: {{ owner.surname }}
						</div>
						<div class="container mt-2">
							Othernames: {{ owner.othernames }}
						</div>
					</div>
					<div class="row">
						<div class="container mt-2">
							Phone: {{ owner.phone }}
						</div>
						<div class="container mt-2">
							Alternative phone number: {{ owner.phone2 }}
						</div>
					</div>
				</div>
				<div class="modal-footer">
					<div class="container mt-5 text-center">
						<cui-button data-bs-dismiss="modal" type="danger" class="w-50" :id="'show_owner_btn'.concat(owner.vehicle_owner_id)">Cancel</cui-button>&nbsp;
					</div>
				</div>
			</div>
		</div>
	</div>
<!-- End of show owner modal -->


<!-- delete owner modal -->
	<div v-for="owner in owners" data-backdrop="static" :key="owner.vehicle_owner_id" class="modal fade" :id="'delete_owner'.concat(owner.vehicle_owner_id)">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<h1 class="h5">Delete owner</h1>
				</div>
				<div class="modal-body">
					{{ owner.surname }} {{ owner.othernames }} with phone number {{ owner.phone }}
				</div>
				<div class="modal-footer">
					<div class="container mt-5 text-center">
						<cui-button data-bs-dismiss="modal" class="" :id="'delete_owner_btn_'.concat(owner.vehicle_owner_id)">Cancel</cui-button>&nbsp;
						<cui-button type="danger" @click="deleteOwner(owner.vehicle_owner_id)">Delete</cui-button>
					</div>
				</div>
			</div>
		</div>
	</div>
<!-- End of delete owner modal -->
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