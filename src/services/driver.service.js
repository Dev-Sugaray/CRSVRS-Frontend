/*eslint-disable*/
import { storeToRefs } from 'pinia';
import { useAppStore } from '@/store/app.store';
import { useAuthStore } from '@/store/auth.store';
import axios from 'axios';

const appStore = useAppStore();
const { backend } = storeToRefs(appStore);
const authStore = useAuthStore();
const { token } = storeToRefs(authStore);


export const read = (payload)=>{
	const options = {
		method: 'get',
		url: `${backend.value}/driver/read/${payload ? payload : ""}`,
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

export const create = payload =>{
	const options = {
		method: 'post',
		url: `${backend.value}/driver/create.php`,
		headers: {
			'Content-Type': 'application/json',
			'Authorization':`bearer ${token.value}`
		},
		data: payload
	}

	

	return new Promise((resolve, reject)=>{

		axios(options).then( res =>{
			const { data } = res;
			console.log(data)
			resolve(data);
		}, (err)=>{
			reject(err);
		});
	})
}

export const update = (payload) => {
	const options = {
		method: 'POST',
		url: `${backend.value}/driver/update.php`,
		headers: {
			'Content-Type': 'application/json',
			'Authorization':`bearer ${token.value}`
		},
		data: payload
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


export const Delete = (payload) => {
	const options = {
		method: 'POST',
		url: `${backend.value}/driver/delete.php`,
		headers: {
			'Content-Type': 'application/json',
			'Authorization':`bearer ${token.value}`
		},
		data: payload
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