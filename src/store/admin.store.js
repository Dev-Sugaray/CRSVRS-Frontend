import { read, create, update, Delete} from '@/services/admin.service';
import { useAppStore } from '@/store/app.store';
import { useAuthStore } from '@/store/auth.store';
import { defineStore, storeToRefs } from 'pinia';
import { ref, computed } from 'vue';

export const useAdminStore = defineStore("admin", ()=>{

	const appStore = useAppStore();
	const { appAlert, toggleProcessLoader } = appStore;

	const authStore = useAuthStore();
	const { phone } = storeToRefs(authStore);

	// Credentials
	const admins = ref([]);

	// Operational variables
	const searchStr = ref('');
	const range = ref(5);
	const showIndex = ref(0);

	// Getters
	const filteredAdmins = computed(()=>{
		const arr = admins.value.filter((admin)=> JSON.stringify(admin).indexOf(searchStr.value) != -1);
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
		const current =  paginatedAdmins.value[showIndex.value];
		return current;
	})

	const currentAdminId = computed(()=>{
		try {
			const id = admins.value.filter((admin)=> admin.phone == phone.value)[0].admin_id;
			return id;
		}catch(e){
			return undefined
		}
		
	})

	const readAdmin = async (id)=>{
		toggleProcessLoader('Getting admins');

		await read(id)
			.then((json)=>{
				if(json.status == true){
					admins.value = json.result;
					appAlert(json.message);
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
			registrar_id: currentAdminId.value
		})

		toggleProcessLoader('Creating new admin');

		await create(payload)
			.then((json)=>{
				if(json.status == true){
					// Add admin to admins arr
					appAlert(json.message);
					toggleProcessLoader('');
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
		const addEditorId = {...adminToUpdate, editor_id: currentAdminId.value};
		await update(addEditorId)
			.then((json)=>{
				if(json.status == true){
					// create admin to admins arr
					appAlert(json.message);
					toggleProcessLoader('');
				}else {
					appAlert(json.message);
					toggleProcessLoader('');
				}
			})
			.catch((e)=> console.log(e));
	}

	const deleteAdmin = async (id)=>{
		toggleProcessLoader('Deleting admin');

		const payload = {
			admin_id: id,
			deleter_id: currentAdminId.value
		}

		await Delete(payload)
			.then((json)=>{
				if(json.status == true){
					// create admin to admins arr
					appAlert(json.message);
					toggleProcessLoader('');
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
		adminToAddPhone2
	}
})