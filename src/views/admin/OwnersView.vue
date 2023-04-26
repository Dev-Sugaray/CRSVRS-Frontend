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
import { useOwnerStore } from '@/store/owners.store';

const ownerStore = useOwnerStore();
const { owners, showOwner, paginatedOwners, range, showIndex } = storeToRefs(ownerStore);
const { readOwner, createOwner, updateOwner, deleteOwner } = ownerStore;


onMounted(()=>{
	readOwner();
})

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
					<cui-input :store="ownerStore" stateKey="searchStr" placeholder="Search owners"></cui-input>
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
						<div class="table-header-col col">Date registered</div>
						<div class="table-header-col col"></div>
					</div>
					<div class="table-body">
						<div 
							class="table-row row bg-light rounded shadow align-items-center mt-2"
							v-for="owner in showOwner"
							:key="owner.id"
						>
							<div class="table-row-col col col">{{ owner.surname }} {{ owner.othernames }} <br><small class="phone_number">{{ owner.phone }}</small></div>
							<div class="table-row-col col col">{{ owner.date_registered }}</div>
							
							<!-- For mobile view will add a new button that will show more information and hide the amount of information that needs to be shown on the frontend -->
							<div class="table-row-col col col">
								<cui-button data-bs-toggle="modal" :data-bs-target="'#driver'.concat(owner.vehicle_owner_id)">
									<i class="fa fa-camera"></i>
									Upload photo
								</cui-button>&nbsp;
								<cui-button data-bs-toggle="modal" :data-bs-target="'#driver'.concat(owner.vehicle_owner_id)">
									<i class="fa fa-car"></i>
									Add drivers
								</cui-button>&nbsp;
								<cui-button data-bs-toggle="modal" :data-bs-target="'#edit_owner'.concat(owner.vehicle_owner_id)">
									<i class="fa fa-pen"></i>
									Edit
								</cui-button>&nbsp;
								<cui-button type='danger' data-bs-toggle="modal" :data-bs-target="'#delete_owner'.concat(owner.vehicle_owner_id)">
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
					v-for="i, index in paginatedOwners"
					:key="'pag_'.concat(index)"
					@click="showIndex = index"
				>{{index+1}}</cui-button>

				<cui-button class="m-1"><i class="fa fa-chevron-right"></i></cui-button>
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
						<cui-button data-bs-dismiss="modal" type="danger">Cancel</cui-button>&nbsp;
						<cui-button @click="createOwner">Add new owner</cui-button>
					</div>
				</div>
			</div>
		</div>
	</div>
<!-- End of add owner modal -->



<!-- Add car driver modal -->
<div v-for="owner in owners" data-backdrop="static" :key="owner.vehicle_owner_id" class="modal fade" :id="'driver'.concat(owner.vehicle_owner_id)">
		<div class="modal-dialog">
			<div class="modal-content" style="overflow-y: auto; max-height:85%;  margin-top: 50px; margin-bottom:50px;">
				<div class="modal-header">
					<h1 class="h5">Add driver for <span style="text-transform: capitalize;">{{ owner.surname.toLowerCase() }} {{ owner.othernames.toLowerCase() }}</span></h1>
				</div>
				<div class="modal-body">
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
						<cui-button data-bs-dismiss="modal" type="danger" class="">Cancel</cui-button>&nbsp;
						<cui-button @click="updateOwner(owner.vehicle_owner_id)" class="">Add driver</cui-button>
					</div>
				</div>
			</div>
		</div>
	</div>
<!-- End of Add driver modal -->


<!-- Edit owner modal -->
	<div v-for="owner in owners" data-backdrop="static" :key="owner.vehicle_owner_id" class="modal fade" :id="'edit_owner'.concat(owner.vehicle_owner_id)">
		<div class="modal-dialog">
			<div class="modal-content" style="overflow-y: auto; max-height:85%;  margin-top: 50px; margin-bottom:50px;">
				<div class="modal-header">
					<h1 class="h5">Edit owner</h1>
				</div>
				<div class="modal-body">
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
						<cui-button data-bs-dismiss="modal" type="danger" class="">Cancel</cui-button>&nbsp;
						<cui-button @click="updateOwner(owner.vehicle_owner_id)" class="">Edit</cui-button>
					</div>
				</div>
			</div>
		</div>
	</div>
<!-- End of edit owner modal -->


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
						<cui-button data-bs-dismiss="modal" class="">Cancel</cui-button>&nbsp;
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