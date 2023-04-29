import { read, create, update, Delete } from '@/services/driver.service';
import * as lga from '@/services/lga.service';
import * as vehicleType from '@/services/vehicleTypes.service';
import { useAppStore } from '@/store/app.store';
import { useAuthStore } from '@/store/auth.store';
import { defineStore, storeToRefs } from 'pinia';
import { ref, computed, markRaw } from 'vue';
import router from '@/router/index';

export const useDriverStore = defineStore("driver", ()=>{
	const vRouter = markRaw(router);

	const appStore = useAppStore();
	const { appAlert, toggleProcessLoader } = appStore;

	const authStore = useAuthStore();
	const { credentials } = storeToRefs(authStore);

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

	const driverToAddVehicleOwnerId = ref('');
	const driverToAddSurname = ref('');
	const driverToAddOthernames = ref('');
	const driverToAddPhone = ref('');
	const driverToAddPhone2 = ref('');
	const driverToAddPassword = ref('');
	const driverToAddChassisNumber = ref('');
	const driverToAddLicenseNumber = ref('');
	const driverToAddVehicleType =ref('');
	const revenueHead = ref('Vehicle Security Registration');
	const driverToAddLGA = ref('');
	const driverToAddPhoto = ref('');
	const driverToAddAmount = ref(0);

	const createdDriverCredentials = ref({});
	

	const createDriver = async ()=>{

		const payload = JSON.stringify({
			vehicle_owner_id: driverToAddVehicleOwnerId.value,
			surname: driverToAddSurname.value,
			othernames: driverToAddOthernames.value,
			phone: driverToAddPhone.value,
			phone2: driverToAddPhone2.value,
			vehicle_type_id: driverToAddVehicleType.value,
			revenue_head: revenueHead.value,
			license_no: driverToAddLicenseNumber.value,
			lga_id: driverToAddLGA.value,
			photo: driverToAddPhoto.value,
			operator_id: credentials.value.admin_id,
			amount: driverToAddAmount.value,
			chassis_no: driverToAddChassisNumber.value
		})

		toggleProcessLoader('Creating new driver');

		await create(payload)
			.then((json)=>{
				if(json.status == true){
					// Add driver to drivers arr
					const { result } = json;
					drivers.value.push(result);
					createdDriverCredentials.value = result;
					vRouter.push('/add_driver_2');

					appAlert(json.message);
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
		const addEditorId = JSON.stringify({...driverToUpdate, operator_id: credentials.value.admin_id});
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
			deleter_id: credentials.value.admin_id
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


	// Local government of operation
	const lgas = ref([]);
	const getLGAs = async ()=>{

		toggleProcessLoader('Getting LGAs of operation');


		await lga.read()
			.then((json)=>{
				if(json.status == true){
					appAlert(json.message);
					const { result } = json;
					lgas.value = result;
					driverToAddLGA.value = result[0].lga_id;
					toggleProcessLoader('');
				}else {
					appAlert(json.message);
					toggleProcessLoader('');
				}
			})
			.catch((e)=> console.log(e));
	}

	// Vehicle types

	const vehicleTypes = ref([]);
	const getVehicleTypes = async ()=>{
		toggleProcessLoader('Getting vehicle types of operation');


		await vehicleType.read()
			.then((json)=>{
				if(json.status == true){
					appAlert(json.message);
					const { result } = json;
					vehicleTypes.value = result;
					driverToAddVehicleType.value = result[0].vehicle_type_id;
					toggleProcessLoader('');
				}else {
					appAlert(json.message);
					toggleProcessLoader('');
				}
			})
			.catch((e)=> console.log(e));
	}

	const addDriverPhoto = (file)=> {
		toggleProcessLoader("Using passport")
		const fileReader = new FileReader();
		fileReader.addEventListener("load", ()=>{
			driverToAddPhoto.value =  fileReader.result;
			toggleProcessLoader("");
		});
		fileReader.readAsDataURL(file);
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
		updateDriver,
		deleteDriver,
		driverToAddSurname,
		driverToAddPhone,
		driverToAddOthernames,
		driverToAddPassword,
		driverToAddPhone2,
		driverToAddPhoto,
		driverToAddChassisNumber,
		driverToAddVehicleType,
		driverToAddLGA,
		driverToAddVehicleOwnerId,
		revenueHead,
		driverToAddLicenseNumber,
		driverToAddAmount,
		lgas,
		getLGAs,
		vehicleTypes,
		getVehicleTypes,
		addDriverPhoto,
		createdDriverCredentials
	}
})