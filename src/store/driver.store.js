import { read, create, update, Delete, renew } from '@/services/driver.service';
import * as lga from '@/services/lga.service';
import * as vehicleType from '@/services/vehicleTypes.service';
import { useAppStore } from '@/store/app.store';
import { useAuthStore } from '@/store/auth.store';
import { defineStore, storeToRefs } from 'pinia';
import { ref, computed, markRaw, watch } from 'vue';
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
		arr.sort((a, b) => {
			if (a.surname === b.surname) {
				return a.othernames.localeCompare(b.othernames);
			} else {
				return a.surname.localeCompare(b.surname);
			}
		});
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
		if(showIndex.value > paginatedDrivers.value.length){
			showIndex.value = paginatedDrivers.value.length-1;
		}else if(showIndex.value < 0){
			showIndex.value = 0
		}
		const current =  paginatedDrivers.value[showIndex.value];
		return current;
	})

	const increaseShowIndex = ()=>{
		const maxValue = paginatedDrivers.value.length-1;
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

	const readDriver = async (id)=>{
		toggleProcessLoader('Getting drivers');

		await read(id)
			.then((json)=>{
				if(json.status == true){
					drivers.value = json.result;
					// appAlert(json.message);
					toggleProcessLoader('');
				}else {
					appAlert(json.message);
					toggleProcessLoader('');
				}
			})
		.catch((e)=>{ 
			toggleProcessLoader('');
			appAlert('An error occured, please try again');
			console.log(e);
		});
	}

		// Update showIndex whenever a new search is performed
	watch(filteredDrivers, (newValue) => {
		if (newValue.length > 0) {
			const index = paginatedDrivers.value.findIndex(page => page.includes(newValue[0]));
			if (index !== -1) {
				showIndex.value = index;
			}
		}
	});

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
	
	const driverToView = ref({});


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
					
					driverToAddVehicleOwnerId.value = "";
					driverToAddSurname.value = "";
					driverToAddOthernames.value = "";
					driverToAddPhone.value = "";
					driverToAddPhone2.value = "";
					driverToAddPassword.value = "";
					driverToAddChassisNumber.value = "";
					driverToAddLicenseNumber.value = "";
					driverToAddVehicleType.value = "";
					driverToAddLGA.value = "";
					driverToAddAmount.value;
				
					driverToView.value = result;
					router.push('/more_driver_info');

					appAlert("Successfully created driver");
					toggleProcessLoader('');
	

				}else {
					appAlert(json.message);
					toggleProcessLoader('');
				}
			})
			.catch((e)=>{ 
				toggleProcessLoader('');
				appAlert('An error occured, please try again');
				console.log(e);
			});
	}

	const driverToEditId = ref(0);
	const driverToEdit = computed(()=>{
		const res = drivers.value.filter((driver)=> driver.driver_id == driverToEditId.value)[0];
		return res;
	})

	const driverPhotoToEdit = ref('');
	const editDriverPhoto = (file)=>{
		toggleProcessLoader("Using passport")
		const fileReader = new FileReader();
		fileReader.addEventListener("load", ()=>{
			driverPhotoToEdit.value =  fileReader.result;
			toggleProcessLoader("");
		});
		fileReader.readAsDataURL(file);
	}

	const updateDriver = async (payload)=>{
		toggleProcessLoader('Updating driver information');
		const body = JSON.stringify({
			driver_id: payload.value.driver_id,
			surname: payload.value.surname,
			othernames: payload.value.othernames,
			phone: payload.value.phone,
			phone2: payload.value.phone2,
			photo: driverPhotoToEdit.value,
			license_no: payload.value.license_no,
			chassis_no: payload.value.chassis_no,
			lga_id: payload.value.lga_id,
			vehicle_type_id: payload.value.vehicle_type_id,
			vehicle_security_registration_no: payload.value.vehicle_security_registration_no,
			revenue_head: payload.value.revenue_head,
			amount: payload.value.amount,
			vehicle_owner_id: payload.value.vehicle_owner_id,
			operator_id: credentials.value.admin_id
		});


		await update(body)
			.then((json)=>{
				if(json.status == true){
					vRouter.back();

					appAlert(json.message);
					toggleProcessLoader('');
					driverPhotoToEdit.value = "";
				}else {
					appAlert(json.message);
					toggleProcessLoader('');
				}
			})
			.catch((e)=>{ 
				toggleProcessLoader('');
				appAlert('An error occured, please try again');
				console.log(e);
			});
	}

	const deleteDriver = async (id)=>{
		toggleProcessLoader('Deleting driver');

		const payload = JSON.stringify({
			driver_id: id,
			operator_id: credentials.value.admin_id
		})

		await Delete(payload)
			.then((json)=>{
				if(json.status == true){
					appAlert(json.message);
					// delete driver from drivers arr
					const arr = drivers.value.filter((driver)=> driver.driver_id != id);
					drivers.value = arr;

					toggleProcessLoader('');

					document.querySelector("#delete_driver_btn_".concat(id)).click();
				}else {
					appAlert(json.message);
					toggleProcessLoader('');
				}
			})
			.catch((e)=>{ 
				toggleProcessLoader('');
				appAlert('An error occured, please try again');
				console.log(e);
			});
	}

	const renewDriver = async (payload)=>{
		toggleProcessLoader('Renewing driver');

		const body = {...payload, operator_id: credentials.value.admin_id};

		await renew(body)
			.then((json)=>{
				if(json.status == true){
					appAlert(json.message);
					// delete driver from drivers arr
					drivers.value.push(json.result);
					toggleProcessLoader('');

					document.querySelector("#renew_driver_btn").click();

					driverToView.value = json.result;
					router.push('/more_driver_info');
				}else {
					appAlert(json.message);
					toggleProcessLoader('');
				}
			})
			.catch((e)=>{ 
				toggleProcessLoader('');
				appAlert('An error occured, please try again');
				console.log(e);
			});
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
			.catch((e)=>{ 
				toggleProcessLoader('');
				appAlert('An error occured, please try again');
				console.log(e);
			});
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
			.catch((e)=>{ 
				toggleProcessLoader('');
				appAlert('An error occured, please try again');
				console.log(e);
			});
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
		driverToEdit,
		driverToEditId,
		driverPhotoToEdit,
		editDriverPhoto,
		driverToView,
		increaseShowIndex,
		decreaseShowIndex,
		renewDriver
	}
})