/*eslint-disable*/
import { storeToRefs } from 'pinia';
import { useAppStore } from '@/store/app.store';
import { useAuthStore } from '@/store/auth.store';
import axios from 'axios';

const appStore = useAppStore();
const { backend } = storeToRefs(appStore);
const authStore = useAuthStore();
const { token } = storeToRefs(authStore);


export const read = ()=>{
	const options = {
		method: 'get',
		url: `${backend.value}/api/report/read.php`,
		headers: {
			'Authorization':`bearer ${token.value}`
		}
	}

	return new Promise((resolve, reject)=>{
		axios(options).then( res =>{
			const { data } = res;
			resolve(data);
		}, (err)=>{
			reject(err);
		});
	})
}

