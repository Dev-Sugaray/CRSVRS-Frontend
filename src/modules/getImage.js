/*eslint-disable*/
import { storeToRefs } from 'pinia';
import { useAppStore } from '@/store/app.store';
import { useAuthStore } from '@/store/auth.store';
import axios from 'axios';

const appStore = useAppStore();
const { backend } = storeToRefs(appStore);
// const { toggleProcessLoader } = appStore;
const authStore = useAuthStore();
const { token } = storeToRefs(authStore);

export const getDriverImage = (phonenumber)=>{
	const options = {
		method: 'GET',
		url: `${backend.value}/driver/image/${phonenumber}`,
	}

	return new Promise((resolve, reject)=>{
		axios(options).then((res)=> {
			const { data } = res;
			resolve(data);
		}).catch((err)=> {
			reject(err);
		})
	})

}

export const getVehicleOwnerImage = (phonenumber)=>{

}