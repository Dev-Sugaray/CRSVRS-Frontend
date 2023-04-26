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
const { admins, showAdmin, paginatedAdmins, range, showIndex, oldPassword, newPassword, confirmNewPassword } = storeToRefs(adminStore);
const { readAdmin, createAdmin, updateAdmin, deleteAdmin, resetAdminPassword } = adminStore;


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
			<h1>Driver information</h1>
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
						<cui-button data-bs-dismiss="modal" type="danger">Cancel</cui-button>
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
						<cui-button data-bs-dismiss="modal" type="danger" class="">Cancel</cui-button>&nbsp;
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
						<cui-button data-bs-dismiss="modal" class="">Cancel</cui-button>&nbsp;
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
						<div class="container">
							<label>Old password</label>
							<input class="p-2 rounded cui-input w-100"  v-model="oldPassword" type="text" placeholder="Password">
						</div>
						<div class="container mt-2">
							<label>Othernames</label>
							<input class="p-2 rounded cui-input w-100" v-model="newPassword" type="text" placeholder="New Password">
						</div>
					</div>
					<div class="row">
						<div class="container mt-2">
							<label>Phone</label>
							<input class="p-2 rounded cui-input w-100" v-model="confirmNewPassword" type="text" placeholder="Confirm new password">
						</div>
					</div>
				</div>
				<div class="modal-footer">
					<div class="container mt-5 text-center">
						<cui-button data-bs-dismiss="modal" type="danger">Cancel</cui-button>&nbsp;
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