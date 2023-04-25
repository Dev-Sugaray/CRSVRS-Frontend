<script setup>
import CuiButton from '@/components/CuiButton';
import CuiHeader from '@/components/CuiHeader';
import CuiMenu from '@/components/CuiMenu';
import CuiBody from '@/components/CuiBody'
import CuiInput from '@/components/CuiInput';
import CuiSelect from '@/components/CuiSelect';
// Pinia dependencies
import { storeToRefs } from 'pinia';
// Vue dependencies
import { onMounted } from 'vue';
// Pinia stores
import { useAdminStore } from '@/store/admin.store';

const adminStore = useAdminStore();
const { admins, showAdmin, paginatedAdmins, range, showIndex } = storeToRefs(adminStore);
const { readAdmin, createAdmin, updateAdmin, deleteAdmin } = adminStore;


onMounted(()=>{
	readAdmin();
})
</script>

<template>
	<div>
		<cui-header></cui-header>
		<cui-menu></cui-menu>
		<cui-body>

			<div class="row">
				<div class="col-4">
					<cui-button data-bs-toggle="modal" data-bs-target="#addAdmin"><i class="fa fa-plus"></i> Add new</cui-button> &nbsp;
					<cui-button @click="readAdmin()"><i class="fa fa-spinner"></i> Refresh</cui-button>
				</div>
				<div class="col-6">
					<cui-input :store="adminStore" stateKey="searchStr" placeholder="Search admins"></cui-input>
				</div>
				<div class="col-1">
					<select v-model="range" class="p-2 rounded">
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
						<div class="table-header-col col">Type</div>
						<div class="table-header-col col"></div>
					</div>
					<div class="table-body">
						<div 
							class="table-row row bg-light rounded shadow align-items-center mt-2"
							v-for="admin in showAdmin"
							:key="admin.id"
						>
							<div class="table-row-col col col">{{ admin.surname }} {{ admin.othernames }} <br><small class="phone_number">{{ admin.phone }}</small></div>
							<div class="table-row-col col col">{{ admin.admin_type }}</div>
							<!-- For mobile view will add a new button that will show more information and hide the amount of information that needs to be shown on the frontend -->
							<div class="table-row-col col col">
								<cui-button>
									<i class="fa fa-key"></i>
									Reset password
								</cui-button>&nbsp;
								<cui-button data-bs-toggle="modal" :data-bs-target="'#edit_admin'.concat(admin.admin_id)">
									<i class="fa fa-pen"></i>
									Edit
								</cui-button>&nbsp;
								<cui-button type='danger' data-bs-toggle="modal" :data-bs-target="'#delete_admin'.concat(admin.admin_id)">
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
					v-for="i, index in paginatedAdmins"
					:key="'pag_'.concat(index)"
					@click="showIndex = index"
				>{{index+1}}</cui-button>

				<cui-button class="m-1"><i class="fa fa-chevron-right"></i></cui-button>
			</div>
		</cui-body>
	</div>

	<!-- Button trigger modal -->


<!-- Add admin modal -->
	<div class="modal fade" id="addAdmin" data-backdrop="static" tabindex="-1" role="dialog" aria-labelledby="staticBackdropLabel" aria-hidden="true">
		<div class="modal-dialog">
			<div class="modal-content" style="overflow-y: auto; max-height:85%;  margin-top: 50px; margin-bottom:50px;">
				<div class="modal-header">
					<h1 class="h5">Add new admin</h1>
				</div>
				<div class="modal-body">
					<div class="row">
						<div class="container">
							<label>Surname</label>
							<cui-input :store="adminStore" stateKey="adminToAddSurname" type="text" placeholder="Surname"></cui-input>
						</div>
						<div class="container mt-2">
							<label>Othernames</label>
							<cui-input :store="adminStore" stateKey="adminToAddOthernames" type="text" placeholder="Othernames"></cui-input>
						</div>
					</div>
					<div class="row">
						<div class="container mt-2">
							<label>Phone</label>
							<cui-input :store="adminStore" stateKey="adminToAddPhone" type="text" placeholder="phone"></cui-input>
						</div>
						<div class="container mt-2">
							<label>Phone 2</label>
							<cui-input :store="adminStore" stateKey="adminToAddPhone2" type="text" placeholder="phone 2"></cui-input>
						</div>
					</div>
					<div class="row">
						
						<div class="container mt-2">
							<label>Password</label>
							<cui-input :store="adminStore" stateKey="adminToAddPassword" placeholder="password"></cui-input>
						</div>
						<div class="container mt-2">
							<label>Admin type</label>
							<cui-select :store="adminStore" stateKey="adminToAddAdminType">
								<option value="admin">Admin</option>
								<option value="global admin">Global admin</option>
							</cui-select>
						</div>
					</div>
				</div>
				<div class="modal-footer">
					<div class="container mt-5 text-center">
						<cui-button data-bs-dismiss="modal" type="danger" class="w-50">Cancel</cui-button>
						<cui-button @click="createAdmin" class="w-50">Add new admin</cui-button>
					</div>
				</div>
			</div>
		</div>
	</div>
<!-- End of add admin modal -->

<!-- Edit admin modal -->
	<div v-for="admin in admins" data-backdrop="static" :key="admin.admin_id" class="modal modal-fade" :id="'edit_admin'.concat(admin.admin_id)">
		<div class="modal-dialog">
			<div class="modal-content" style="overflow-y: auto; max-height:85%;  margin-top: 50px; margin-bottom:50px;">
				<div class="modal-header">
					<h1 class="h5">Edit admin</h1>
				</div>
				<div class="modal-body">
					<div class="row">
						<div class="container">
							<label>Surname</label>
							<cui-input :state="admin.surname" type="text" placeholder="Surname"></cui-input>
						</div>
						<div class="container mt-2">
							<label>Othernames</label>
							<cui-input :state="admin.othernames" type="text" placeholder="Othernames"></cui-input>
						</div>
					</div>
					<div class="row">
						<div class="container mt-2">
							<label>Phone</label>
							<cui-input :state="admin.phone" type="text" placeholder="phone"></cui-input>
						</div>
						<div class="container mt-2">
							<label>Phone 2</label>
							<cui-input :state="admin.phone2" type="text" placeholder="phone 2"></cui-input>
						</div>
					</div>
					<div class="row">
						<div class="container mt-2">
							<label>Admin type</label>
							<cui-select :state="admin.admin_type" placeholder="password">
								<option value="admin">Admin</option>
								<option value="global admin">Global admin</option>
							</cui-select>
						</div>
					</div>
				</div>
				<div class="modal-footer">
					<div class="container mt-5 text-center">
						<cui-button data-bs-dismiss="modal" type="danger" class="">Cancel</cui-button>&nbsp;
						<cui-button @click="updateAdmin(admin.admin_id)" class="">Edit</cui-button>
					</div>
				</div>
			</div>
		</div>
	</div>
<!-- End of edit admin modal -->


<!-- Edit admin modal -->
	<div v-for="admin in admins" data-backdrop="static" :key="admin.admin_id" class="modal modal-fade" :id="'delete_admin'.concat(admin.admin_id)">
		<div class="modal-dialog">
			<div class="modal-content" style="overflow-y: auto; max-height:85%;  margin-top: 50px; margin-bottom:50px;">
				<div class="modal-header">
					<h1 class="h5">Delete admin</h1>
				</div>
				<div class="modal-body">
					{{ admin.surname }} {{ admin.othernames }} with phone number {{ admin.phone }}
				</div>
				<div class="modal-footer">
					<div class="container mt-5 text-center">
						<cui-button data-bs-dismiss="modal" class="">Cancel</cui-button>&nbsp;
						<cui-button type="danger" @click="deleteAdmin(admin.admin_id)" class="">Delete</cui-button>
					</div>
				</div>
			</div>
		</div>
	</div>
<!-- End of delete admin modal -->
</template>

<style scoped>
.table-header {
	font-weight: bolder;
}

select {
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