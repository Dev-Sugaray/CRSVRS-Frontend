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
import { useAuthStore } from '@/store/auth.store';

const adminStore = useAdminStore();
const { admins, showAdmin, paginatedAdmins, range, showIndex, newPassword, confirmNewPassword } = storeToRefs(adminStore);
const { readAdmin, createAdmin, updateAdmin, deleteAdmin, resetAdminPassword } = adminStore;


const authStore = useAuthStore();
const { credentials } = storeToRefs(authStore);

onMounted(()=>{
	readAdmin();
})

const resetPasswordClick = (id)=>{
	resetAdminPassword(id);
}
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
					<cui-input data-aos="slide-left" :store="adminStore" stateKey="searchStr" placeholder="Search admins"></cui-input>
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
						<div class="table-header-col col">Type</div>
						<div class="table-header-col col"></div>
					</div>
					<div class="table-body">
						<div 
							class="table-row row bg-light rounded shadow align-items-center mt-2"
							v-for="admin in showAdmin"
							:key="admin.id"
						>
							<div data-aos="slide-left" class="table-row-col col col">{{ admin.surname }} {{ admin.othernames }} <br><small class="phone_number">{{ admin.phone }}</small></div>
							<div data-aos="slide-right" class="table-row-col col col">{{ admin.admin_type }}</div>
							<!-- For mobile view will add a new button that will show more information and hide the amount of information that needs to be shown on the frontend -->
							<div class="table-row-col col col">
								<cui-button data-bs-toggle="modal" v-if="credentials.admin_type != 'admin'" :data-bs-target="'#reset_password'.concat(admin.admin_id)">
									<i class="fa fa-key"></i>
									Reset password
								</cui-button>&nbsp;
								<cui-button data-bs-toggle="modal" v-if="credentials.admin_type != 'admin'" :data-bs-target="'#edit_admin'.concat(admin.admin_id)">
									<i class="fa fa-pen"></i>
									Edit
								</cui-button>&nbsp;
								<cui-button type='danger' v-if="credentials.admin_type != 'admin'" data-bs-toggle="modal" :data-bs-target="'#delete_admin'.concat(admin.admin_id)">
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
						<cui-button data-bs-dismiss="modal" type="danger" id="create_admin_btn">Cancel</cui-button>&nbsp;&nbsp;
						<cui-button @click="createAdmin">Add new admin</cui-button>
					</div>
				</div>
			</div>
		</div>
	</div>
<!-- End of add admin modal -->

<!-- Edit admin modal -->
	<div v-for="admin in admins" data-backdrop="static" :key="admin.admin_id" class="modal fade" :id="'edit_admin'.concat(admin.admin_id)">
		<div class="modal-dialog">
			<div class="modal-content" style="overflow-y: auto; max-height:85%;  margin-top: 50px; margin-bottom:50px;">
				<div class="modal-header">
					<h1 class="h5">Edit admin</h1>
				</div>
				<div class="modal-body">
					<div class="row">
						<div class="container">
							<label>Surname</label>
							<input class="p-2 rounded cui-input w-100"  v-model="admin.surname" type="text" placeholder="Surname">
						</div>
						<div class="container mt-2">
							<label>Othernames</label>
							<input class="p-2 rounded cui-input w-100" v-model="admin.othernames" type="text" placeholder="Othernames">
						</div>
					</div>
					<div class="row">
						<div class="container mt-2">
							<label>Phone</label>
							<input class="p-2 rounded cui-input w-100" v-model="admin.phone" type="text" placeholder="phone">
						</div>
						<div class="container mt-2">
							<label>Phone 2</label>
							<input class="p-2 rounded cui-input w-100" v-model="admin.phone2" type="text" placeholder="phone 2">
						</div>
					</div>
					<div class="row">
						<div class="container mt-2">
							<label>Admin type</label>
							<select class="p-2 rounded cui-select w-100" v-model="admin.admin_type">
								<option value="admin">Admin</option>
								<option value="global admin">Global admin</option>
							</select>
						</div>
					</div>
				</div>
				<div class="modal-footer">
					<div class="container mt-5 text-center">
						<cui-button data-bs-dismiss="modal" type="danger" class="" :id="'update_admin_btn_'.concat(admin.admin_id)">Cancel</cui-button>&nbsp;
						<cui-button @click="updateAdmin(admin.admin_id)" class="">Edit</cui-button>
					</div>
				</div>
			</div>
		</div>
	</div>
<!-- End of edit admin modal -->


<!-- delete admin modal -->
	<div v-for="admin in admins" data-backdrop="static" :key="admin.admin_id" class="modal fade" :id="'delete_admin'.concat(admin.admin_id)">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<h1 class="h5">Delete admin</h1>
				</div>
				<div class="modal-body">
					{{ admin.surname }} {{ admin.othernames }} with phone number {{ admin.phone }}
				</div>
				<div class="modal-footer">
					<div class="container mt-5 text-center">
						<cui-button data-bs-dismiss="modal" class="" :id="'delete_admin_btn_'.concat(id)">Cancel</cui-button>&nbsp;
						<cui-button type="danger" @click="deleteAdmin(admin.admin_id)">Delete</cui-button>
					</div>
				</div>
			</div>
		</div>
	</div>
<!-- End of delete admin modal -->

<!-- Reset password modal -->
<div v-for="admin in admins" data-backdrop="static" :key="admin.admin_id" class="modal fade" :id="'reset_password'.concat(admin.admin_id)">
		<div class="modal-dialog">
			<div class="modal-content" style="overflow-y: auto; max-height:85%;  margin-top: 50px; margin-bottom:50px;">
				<div class="modal-header">
					<h1 class="h5">Reset password for {{ admin.surname.toLowerCase() }} {{ admin.othernames }}</h1>
				</div>
				<div class="modal-body">
					<div class="row">
						
						<div class="container mt-2">
							<label>New password</label>
							<input class="p-2 rounded cui-input w-100" v-model="newPassword" type="text" placeholder="New Password">
						</div>
						<div class="container mt-2">
							<label>Confirm new password</label>
							<input class="p-2 rounded cui-input w-100" v-model="confirmNewPassword" type="text" placeholder="Confirm new password">
						</div>
					</div>
				</div>
				<div class="modal-footer">
					<div class="container mt-5 text-center">
						<cui-button data-bs-dismiss="modal" type="danger" :id="'reset_admin_password_btn_'.concat(admin.admin_id)">Cancel</cui-button>&nbsp;
						<cui-button @click="resetPasswordClick(admin.admin_id)">Reset password</cui-button>
					</div>
				</div>
			</div>
		</div>
	</div>

<!-- End of reset password modal -->
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