import { storeToRefs } from 'pinia';
import { useAppStore } from '@/store/app.store';

export const login = (payload)=>{
	const appStore = useAppStore();
	const { backend } = storeToRefs(appStore);

	return new Promise((resolve, reject)=>{
		const req = new XMLHttpRequest();
		req.addEventListener("load", ()=>{
			const res = req.response;
			// alert(res);
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
		req.open('POST', `${backend.value}/admin/login.php`);
		req.setRequestHeader("Content-Type","application/json");
		req.send(payload);
	})
}
