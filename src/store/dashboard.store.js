import { read } from '@/services/dashboard.service';
import { useAppStore } from '@/store/app.store';
// import { useAuthStore } from '@/store/auth.store';
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useDashboardStore = defineStore("dashboard", ()=>{

	const appStore = useAppStore();
	const { appAlert, toggleProcessLoader } = appStore;

	// const authStore = useAuthStore();
	// const { credentials } = storeToRefs(authStore);

    const driverData = ref({});
    const vehicleOwnerData = ref({});
    const lgaData = ref({});
    const vehicleTypeData = ref({});

	const readDashboard = async ()=>{
		toggleProcessLoader('Setting up the dashboard');

		await read()
			.then((json)=>{
				if(json.status == true){
                    driverData.value = json.driver;
                    vehicleOwnerData.value = json.vehicle_owner;
                    lgaData.value = json.lga;
                    vehicleTypeData.value = json.vehicle_type;
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
	

	return {
        driverData,
        vehicleOwnerData,
        lgaData,
        vehicleTypeData,
        readDashboard
	}
})