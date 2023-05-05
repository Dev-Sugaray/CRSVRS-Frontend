<script setup>
// Services
import { resetPassword } from '@/services/admin.service';

import CuiHeader from '@/components/CuiHeader';
import CuiMenu from '@/components/CuiMenu';
import CuiBody from '@/components/CuiBody';
import CuiButton from '@/components/CuiButton';
// Pinia dependencies
import { storeToRefs } from 'pinia';
// Vue dependencies
import { ref } from 'vue';
// Pinia stores
import { useAuthStore } from '@/store/auth.store';
import { useAppStore } from '@/store/app.store';

const authStore = useAuthStore();
const { credentials } = storeToRefs(authStore);

const appStore = useAppStore();
const { toggleProcessLoader, appAlert } = appStore;

const oldPassword = ref('');
const newPassword = ref('');
const confirmNewPassword = ref('');

const resetAdminPassword = ()=>{
    
    const payload = JSON.stringify({
        operator_id: credentials.value.admin_id,
        admin_id: credentials.value.admin_id,
        password: oldPassword.value,
        new_password_1: newPassword.value,
        new_password_2: confirmNewPassword.value
    });


    toggleProcessLoader('Resetting new password');
    resetPassword(payload).then((json)=> {
        if(json.status == true){
            toggleProcessLoader('');
            appAlert(json.message);
        }else {
            toggleProcessLoader('');
            appAlert(json.message);
        }
    })
}
</script>

<template>
	<cui-header></cui-header>
	<cui-menu></cui-menu>
	<cui-body>
		<div class="row justify-content-center">
			<div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
				<div class="container">
					<div class="container mt-2  col">
						<label>Old password</label>
						<input class="p-2 rounded cui-input w-100"  v-model="oldPassword" type="text" placeholder="old password">
					</div>
					<div class="container mt-2 col">
						<label>New password</label>
						<input class="p-2 rounded cui-input w-100" v-model="newPassword" type="text" placeholder="new password">
					</div>
					<div class="container mt-2 col">
						<label>Confirm new password</label>
						<input class="p-2 rounded cui-input w-100" v-model="confirmNewPassword" type="text" placeholder="confirm new password">
					</div>
				</div>
				<div class="container p-2 mt-4">
					<cui-button @click="resetAdminPassword" class="w-100">Reset password</cui-button>
				</div>
			</div>
		</div>	
	</cui-body>
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