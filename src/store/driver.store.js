import { read, create, update, Delete } from '@/services/driver.service';
import { useAppStore } from '@/store/app.store';
import { useAuthStore } from '@/store/auth.store';
import { defineStore, storeToRefs } from 'pinia';
import { ref, computed } from 'vue';

export const useDriverStore = defineStore("driver", ()=>{

	const appStore = useAppStore();
	const { appAlert, toggleProcessLoader } = appStore;

	const authStore = useAuthStore();
	const { phone } = storeToRefs(authStore);

	// Credentials
	const drivers = ref([]);

	// Operational variables
	const searchStr = ref('');
	const range = ref(5);
	const showIndex = ref(0);

	// Getters
	const filteredDrivers = computed(()=>{
		const arr = drivers.value.filter((driver)=> JSON.stringify(driver).toLowerCase().indexOf(searchStr.value.toLowerCase()) != -1);
		return arr;
	});

	const paginatedDrivers = computed(()=>{
		const arr = filteredDrivers.value;
		const result = [];
		let i = 0;

		while (i < arr.length) {
			result.push(arr.slice(i, i + range.value));
			i += range.value;
		}

		return result;
	})

	const showDriver = computed(()=>{
		const current =  paginatedDrivers.value[showIndex.value];
		return current;
	})

	const currentDriverId = computed(()=>{
		try {
			const id = drivers.value.filter((driver)=> driver.phone == phone.value)[0].driver_id;
			return id;
		}catch(e){
			return undefined
		}
		
	})

	const readDriver = async (id)=>{
		toggleProcessLoader('Getting drivers');

		await read(id)
			.then((json)=>{
				if(json.status == true){
					drivers.value = json.result;
					appAlert(json.message);
					toggleProcessLoader('');
				}else {
					appAlert(json.message);
					toggleProcessLoader('');
				}
			})
		.catch((e)=> console.log(e));
	}

	// Credentials for the new driver to add
	const driverToAddSurname = ref('');
	const driverToAddOthernames = ref('');
	const driverToAddPhone = ref('');
	const driverToAddPhone2 = ref('');
	const driverToAddPassword = ref('');
	const driverToAddDriverType = ref('driver')
	


	const createDriver = async ()=>{
		const payload = JSON.stringify({
			surname: driverToAddSurname.value,
			othernames: driverToAddOthernames.value,
			phone: driverToAddPhone.value,
			phone2: driverToAddPhone2.value,
			password: driverToAddPassword.value,
			driver_type: driverToAddDriverType.value,
			registrar_id: currentDriverId.value
		})

		toggleProcessLoader('Creating new driver');
		await create(payload)
			.then((json)=>{
				if(json.status == true){
					// Add driver to drivers arr
					const { result } = json;
					drivers.value.push(result);
					appAlert(json.message);
					location.reload();
					toggleProcessLoader('');
				}else {
					appAlert(json.message);
					toggleProcessLoader('');
				}
			})
			.catch((e)=> console.log(e));
	}

	const updateDriver = async (id)=>{
		toggleProcessLoader('Updating driver information');
		const driverToUpdate = drivers.value.filter((driver)=> driver.driver_id == id)[0];
		const addEditorId = JSON.stringify({...driverToUpdate, editor_id: currentDriverId.value});
		await update(addEditorId)
			.then((json)=>{
				if(json.status == true){
					appAlert(json.message);
					toggleProcessLoader('');
				}else {
					appAlert(json.message);
					toggleProcessLoader('');
				}
			})
			.catch((e)=> console.log(e));
	}

	const deleteDriver = async (id)=>{
		toggleProcessLoader('Deleting driver');

		const payload = JSON.stringify({
			driver_id: id,
			deleter_id: currentDriverId.value
		})

		await Delete(payload)
			.then((json)=>{
				if(json.status == true){
					appAlert(json.message);
					// delete driver from drivers arr
					location.reload();
					const arr = drivers.value.filter((driver)=> driver.driver_id != id);
					drivers.value = arr;
					
					toggleProcessLoader('');
				}else {
					appAlert(json.message);
					toggleProcessLoader('');
				}
			})
			.catch((e)=> console.log(e));
	}
	

	return {
		drivers,
		readDriver,
		filteredDrivers,
		paginatedDrivers,
		showDriver,
		showIndex,
		searchStr,
		range,
		createDriver,
		currentDriverId,
		updateDriver,
		deleteDriver,
		driverToAddSurname,
		driverToAddPhone,
		driverToAddOthernames,
		driverToAddPassword,
		driverToAddDriverType,
		driverToAddPhone2,
	}
})