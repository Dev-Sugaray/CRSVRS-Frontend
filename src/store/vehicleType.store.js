import { read, create, update, Delete } from '@/services/vehicleTypes.service';
import { useAppStore } from '@/store/app.store';
import { useAuthStore } from '@/store/auth.store';
import { defineStore, storeToRefs } from 'pinia';
import { ref, computed, watch } from 'vue';

export const useVehicleTypeStore = defineStore("vehicleType", ()=>{

	const appStore = useAppStore();
	const { appAlert, toggleProcessLoader } = appStore;

	const authStore = useAuthStore();
	const { credentials } = storeToRefs(authStore);

	// Credentials
	const vehicleTypes = ref([]);

	// Operational variables
	const searchStr = ref('');
	const range = ref(5);
	const showIndex = ref(0);

	// Getters
	const filteredVehicleTypes = computed(()=>{
		const arr = vehicleTypes.value.filter((vehicleType)=> JSON.stringify(vehicleType).toLowerCase().indexOf(searchStr.value.toLowerCase()) != -1);
		arr.sort((a, b) => {
			return a.vehicle_type.localeCompare(b.vehicle_type);
		});
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
		if(showIndex.value > paginatedVehicleTypes.value.length){
			showIndex.value = paginatedVehicleTypes.value.length-1;
		}else if(showIndex.value < 0){
			showIndex.value = 0
		}

		const current =  paginatedVehicleTypes.value[showIndex.value];
		return current;
	})

	const increaseShowIndex = ()=>{
		const maxValue = paginatedVehicleTypes.value.length-1;
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

	watch(filteredVehicleTypes, (newValue) => {
		if (newValue.length > 0) {
			const index = paginatedVehicleTypes.value.findIndex(page => page.includes(newValue[0]));
			if (index !== -1) {
				showIndex.value = index;
			}
		}
	});

	const readVehicleType = async (id)=>{
		toggleProcessLoader('Getting vehicle types');

		await read(id)
			.then((json)=>{
				if(json.status == true){
					vehicleTypes.value = json.result;
					// appAlert(json.message);
					toggleProcessLoader('');
				}else {
					appAlert(json.message);
					toggleProcessLoader('');
				}
			})
		.catch((e)=> console.log(e));
	}

	// Credentials for the new vehicleType to add
	const vehicleTypeName = ref('');


	const createVehicleType = async ()=>{
		const payload = JSON.stringify({
			vehicle_type: vehicleTypeName.value,
			operator_id: credentials.value.admin_id
		})

		toggleProcessLoader('Creating new vehicle type');
		await create(payload)
			.then((json)=>{
				if(json.status == true){
					// Add vehicleType to vehicleTypes arr
				
					read()
						.then((json)=>{
							if(json.status == true){
								vehicleTypes.value = json.result;
								appAlert("Successfully created vehicle type");
								toggleProcessLoader('');

								// Reset the vehicle type variable that hold the payload value
								vehicleTypeName.value = "";
							}else {
								appAlert(json.message);
								toggleProcessLoader('');
							}
						})
					.catch((e)=> console.log(e));

					document.querySelector("#create_vehicle_type_btn").click();
				}else {
					appAlert(json.message);
					toggleProcessLoader('');
				}
			})
			.catch((e)=> console.log(e));
	}

	const updateVehicleType = async (id)=>{
		toggleProcessLoader('Updating vehicle type information');
		const vehicleTypeToUpdate = vehicleTypes.value.filter((vehicleType)=> vehicleType.vehicle_type_id == id)[0];

		const addEditorId = JSON.stringify({...vehicleTypeToUpdate, operator_id: credentials.value.admin_id});

		await update(addEditorId)
			.then((json)=>{
				if(json.status == true){


					read(id)
						.then((json)=>{
							if(json.status == true){
								vehicleTypes.value = json.result;
								appAlert('Successfully updated vehicle type');
								toggleProcessLoader('');
							}else {
								appAlert(json.message);
								toggleProcessLoader('');
							}
						})
					.catch((e)=> console.log(e));

					document.querySelector("#update_vehicle_type_btn_".concat(id)).click();
				}else {
					appAlert(json.message);
					toggleProcessLoader('');
				}
			})
			.catch((e)=> console.log(e));
	}

	const deleteVehicleType = async (id)=>{
		toggleProcessLoader('Deleting vehicle type');

		const payload = JSON.stringify({
			vehicle_type_id: id,
			operator_id: credentials.value.admin_id
		})

		await Delete(payload)
			.then((json)=>{
				if(json.status == true){
					appAlert(json.message);
					// delete vehicleType from vehicleTypes arr
					
					const arr = vehicleTypes.value.filter((vehicleType)=> vehicleType.vehicle_type_id != id);
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
		updateVehicleType,
		deleteVehicleType,
		vehicleTypeName,
		increaseShowIndex,
		decreaseShowIndex
	}
})