import { read, create, update, Delete } from '@/services/vehicleTypes.service';
import { useAppStore } from '@/store/app.store';
import { useAuthStore } from '@/store/auth.store';
import { defineStore, storeToRefs } from 'pinia';
import { ref, computed } from 'vue';

export const useVehicleTypeStore = defineStore("vehicleType", ()=>{

	const appStore = useAppStore();
	const { appAlert, toggleProcessLoader } = appStore;

	const authStore = useAuthStore();
	const { phone } = storeToRefs(authStore);

	// Credentials
	const vehicleTypes = ref([]);

	// Operational variables
	const searchStr = ref('');
	const range = ref(5);
	const showIndex = ref(0);

	// Getters
	const filteredVehicleTypes = computed(()=>{
		const arr = vehicleTypes.value.filter((vehicleType)=> JSON.stringify(vehicleType).toLowerCase().indexOf(searchStr.value.toLowerCase()) != -1);
		return arr;
	});

	const paginatedVehicleTypes = computed(()=>{
		const arr = filteredVehicleTypes.value;
		const result = [];
		let i = 0;

		while (i < arr.length) {
			result.push(arr.slice(i, i + range.value));
			i += range.value;
		}

		return result;
	})

	const showVehicleType = computed(()=>{
		const current =  paginatedVehicleTypes.value[showIndex.value];
		return current;
	})

	const currentVehicleTypeId = computed(()=>{
		try {
			const id = vehicleTypes.value.filter((vehicleType)=> vehicleType.phone == phone.value)[0].vehicleType_id;
			return id;
		}catch(e){
			return undefined
		}
		
	})

	const readVehicleType = async (id)=>{
		toggleProcessLoader('Getting vehicleTypes');

		await read(id)
			.then((json)=>{
				if(json.status == true){
					vehicleTypes.value = json.result;
					appAlert(json.message);
					toggleProcessLoader('');
				}else {
					appAlert(json.message);
					toggleProcessLoader('');
				}
			})
		.catch((e)=> console.log(e));
	}

	// Credentials for the new vehicleType to add
	const vehicleTypeToAddSurname = ref('');
	const vehicleTypeToAddOthernames = ref('');
	const vehicleTypeToAddPhone = ref('');
	const vehicleTypeToAddPhone2 = ref('');
	const vehicleTypeToAddPassword = ref('');
	const vehicleTypeToAddVehicleTypeType = ref('vehicleType')
	


	const createVehicleType = async ()=>{
		const payload = JSON.stringify({
			surname: vehicleTypeToAddSurname.value,
			othernames: vehicleTypeToAddOthernames.value,
			phone: vehicleTypeToAddPhone.value,
			phone2: vehicleTypeToAddPhone2.value,
			password: vehicleTypeToAddPassword.value,
			vehicleType_type: vehicleTypeToAddVehicleTypeType.value,
			registrar_id: currentVehicleTypeId.value
		})

		toggleProcessLoader('Creating new vehicleType');
		await create(payload)
			.then((json)=>{
				if(json.status == true){
					// Add vehicleType to vehicleTypes arr
					const { result } = json;
					vehicleTypes.value.push(result);
					appAlert(json.message);
					
					toggleProcessLoader('');

					document.querySelector("#create_vehicle_type_btn_".concat(result.vehicle_type_id)).click();
				}else {
					appAlert(json.message);
					toggleProcessLoader('');
				}
			})
			.catch((e)=> console.log(e));
	}

	const updateVehicleType = async (id)=>{
		toggleProcessLoader('Updating vehicleType information');
		const vehicleTypeToUpdate = vehicleTypes.value.filter((vehicleType)=> vehicleType.vehicleType_id == id)[0];
		const addEditorId = JSON.stringify({...vehicleTypeToUpdate, editor_id: currentVehicleTypeId.value});
		await update(addEditorId)
			.then((json)=>{
				if(json.status == true){
					appAlert(json.message);
					toggleProcessLoader('');

					document.querySelector("#update_vehicle_type_btn_".concat(id)).click();
				}else {
					appAlert(json.message);
					toggleProcessLoader('');
				}
			})
			.catch((e)=> console.log(e));
	}

	const deleteVehicleType = async (id)=>{
		toggleProcessLoader('Deleting vehicleType');

		const payload = JSON.stringify({
			vehicleType_id: id,
			deleter_id: currentVehicleTypeId.value
		})

		await Delete(payload)
			.then((json)=>{
				if(json.status == true){
					appAlert(json.message);
					// delete vehicleType from vehicleTypes arr
					
					const arr = vehicleTypes.value.filter((vehicleType)=> vehicleType.vehicleType_id != id);
					vehicleTypes.value = arr;
					
					toggleProcessLoader('');

					document.querySelector("#delete_vehicle_type_btn_".concat(id)).click();
				}else {
					appAlert(json.message);
					toggleProcessLoader('');
				}
			})
			.catch((e)=> console.log(e));
	}


	

	return {
		vehicleTypes,
		readVehicleType,
		filteredVehicleTypes,
		paginatedVehicleTypes,
		showVehicleType,
		showIndex,
		searchStr,
		range,
		createVehicleType,
		currentVehicleTypeId,
		updateVehicleType,
		deleteVehicleType,
		vehicleTypeToAddSurname,
		vehicleTypeToAddPhone,
		vehicleTypeToAddOthernames,
		vehicleTypeToAddPassword,
		vehicleTypeToAddVehicleTypeType,
		vehicleTypeToAddPhone2
	}
})