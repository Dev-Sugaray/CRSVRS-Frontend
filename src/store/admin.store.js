import { read, create, update, Delete, globalResetPassword} from '@/services/admin.service';
import { useAppStore } from '@/store/app.store';
import { useAuthStore } from '@/store/auth.store';
import { defineStore, storeToRefs } from 'pinia';
import { ref, computed } from 'vue';

export const useAdminStore = defineStore("admin", ()=>{

	const appStore = useAppStore();
	const { appAlert, toggleProcessLoader } = appStore;

	const authStore = useAuthStore();
	const { credentials } = storeToRefs(authStore);

	// Credentials
	const admins = ref([]);

	// Operational variables
	const searchStr = ref('');
	const range = ref(5);
	const showIndex = ref(0);

	// Getters
	const filteredAdmins = computed(()=>{
		const arr = admins.value.filter((admin)=> JSON.stringify(admin).toLowerCase().indexOf(searchStr.value.toLowerCase()) != -1);
		return arr;
	});

	const paginatedAdmins = computed(()=>{
		const arr = filteredAdmins.value;
		const result = [];
		let i = 0;

		while (i < arr.length) {
			result.push(arr.slice(i, i + range.value));
			i += range.value;
		}

		return result;
	})

	const showAdmin = computed(()=>{
		if(showIndex.value > paginatedAdmins.value.length){
			showIndex.value = paginatedAdmins.value.length-1;
		}else if(showIndex.value < 0){
			showIndex.value = 0
		}

		const current =  paginatedAdmins.value[showIndex.value];
		return current;
	});

	const currentAdminId = computed(()=> {
		const id = credentials.value.admin_id;
		return id;
	})

	const increaseShowIndex = ()=>{
		const maxValue = paginatedAdmins.value.length-1;
		if(showIndex.value < maxValue){
			showIndex.value++;
		}
		
	}

	const decreaseShowIndex = ()=>{
		const leastValue = 0;
		if(showIndex.value > leastValue){
			showIndex.value--;
		}
	}

	const readAdmin = async (id)=>{
		toggleProcessLoader('Getting admins');

		await read(id)
			.then((json)=>{
				if(json.status == true){
					admins.value = json.result;
					// appAlert(json.message);
					toggleProcessLoader('');
				}else {
					appAlert(json.message);
					toggleProcessLoader('');
				}
			})
		.catch((e)=> console.log(e));
	}

	// Credentials for the new admin to add
	const adminToAddSurname = ref('');
	const adminToAddOthernames = ref('');
	const adminToAddPhone = ref('');
	const adminToAddPhone2 = ref('');
	const adminToAddPassword = ref('');
	const adminToAddAdminType = ref('admin')
	


	const createAdmin = async ()=>{
		const payload = JSON.stringify({
			surname: adminToAddSurname.value,
			othernames: adminToAddOthernames.value,
			phone: adminToAddPhone.value,
			phone2: adminToAddPhone2.value,
			password: adminToAddPassword.value,
			admin_type: adminToAddAdminType.value,
			operator_id: currentAdminId.value
		})

		
		toggleProcessLoader('Creating new admin');
		await create(payload)
			.then((json)=>{
				if(json.status == true){
					// Add admin to admins arr
					const { result } = json;
					admins.value.push(result);
					appAlert(json.message);
					toggleProcessLoader('');
					document.querySelector("#create_admin_btn").click();

					// reset Credentials for the new admin to add
					adminToAddSurname.value = "";
					adminToAddOthernames.value = "";
					adminToAddPhone.value = "";
					adminToAddPhone2.value = "";
					adminToAddPassword.value = "";
					adminToAddAdminType .value= 'admin';

				}else {
					appAlert(json.message);
					toggleProcessLoader('');
				}
			})
			.catch((e)=> console.log(e));
	}

	const updateAdmin = async (id)=>{
		toggleProcessLoader('Updating admin information');
		const adminToUpdate = admins.value.filter((admin)=> admin.admin_id == id)[0];
		const addEditorId = JSON.stringify({...adminToUpdate, operator_id: currentAdminId.value});
		await update(addEditorId)
			.then((json)=>{
				if(json.status == true){
					appAlert(json.message);
					toggleProcessLoader('');
					document.querySelector("#update_admin_btn_".concat(id)).click();
				}else {
					appAlert(json.message);
					toggleProcessLoader('');
				}
			})
			.catch((e)=> console.log(e));
	}

	const deleteAdmin = async (id)=>{
		toggleProcessLoader('Deleting admin');

		const payload = JSON.stringify({
			admin_id: id,
			operator_id: currentAdminId.value
		})

		await Delete(payload)
			.then((json)=>{
				if(json.status == true){
					appAlert(json.message);
					// delete admin from admins arr
					const arr = admins.value.filter((admin)=> admin.admin_id != id);
					admins.value = arr;
					
					toggleProcessLoader('');

					document.querySelector("#delete_admin_btn_".concat(id)).click();
				}else {
					appAlert(json.message);
					toggleProcessLoader('');
				}
			})
			.catch((e)=> console.log(e));
	}

	const newPassword = ref('');
	const confirmNewPassword = ref('');

	const resetAdminPassword = async (id)=>{
		toggleProcessLoader('Resetting admin password');

		const payload = JSON.stringify({
			operator_id: currentAdminId.value,
			admin_id: id,
			new_password_1: newPassword.value,
			new_password_2: confirmNewPassword.value
		})

		await globalResetPassword(payload)
			.then((json)=>{
				if(json.status == true){
					appAlert(json.message);
	
					toggleProcessLoader('');

					document.querySelector(`#reset_admin_password_btn_${id}`).click();
				}else {
					appAlert(json.message);
					toggleProcessLoader('');
				}
			})
			.catch((e)=> console.log(e));
	}


	

	return {
		admins,
		readAdmin,
		filteredAdmins,
		paginatedAdmins,
		showAdmin,
		showIndex,
		searchStr,
		range,
		createAdmin,
		currentAdminId,
		updateAdmin,
		deleteAdmin,
		adminToAddSurname,
		adminToAddPhone,
		adminToAddOthernames,
		adminToAddPassword,
		adminToAddAdminType,
		adminToAddPhone2,
		resetAdminPassword,
		newPassword,
		confirmNewPassword,
		increaseShowIndex,
		decreaseShowIndex,
		globalResetPassword
	}
})