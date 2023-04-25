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
		url: `${backend.value}/admin/read/${payload ? payload : ""}`,
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
		url: `${backend.value}/admin/create.php`,
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

export const update = (payload) => {
	const options = {
		method: 'POST',
		url: `${backend.value}/admin/update.php`,
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
	return new Promise((resolve, reject)=>{
		const req = new XMLHttpRequest();
		req.addEventListener("load", ()=>{
			const res = req.response;
			alert(res);
			try {
				const json = JSON.parse(res);
				resolve(json);
			}catch(e){
				reject(e);
			}
		})
		req.addEventListener("error", (e)=>{
			reject(e);
		})
		req.withCredentials = true;
		req.open('POST', `${backend.value}/admin/delete.php`);
		req.setRequestHeader("Content-Type","application/json");
		req.setRequestHeader("Authorization", `bearer ${token.value}`);
		req.send(payload);
	})
}
