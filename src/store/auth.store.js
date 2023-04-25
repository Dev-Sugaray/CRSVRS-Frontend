import { login } from '@/services/login.service';
import { useAppStore } from '@/store/app.store';
import { defineStore } from 'pinia';
import { markRaw, ref } from 'vue';
import router from '@/router/index';

export const useAuthStore = defineStore("auth", ()=>{
	const vRouter = markRaw(router);

	const appStore = useAppStore();
	const { appAlert, toggleProcessLoader } = appStore;

	// Credentials
	const phone = ref('');
	const password = ref('');
	const token = ref('');


	const loginAdmin = async ()=>{
		toggleProcessLoader('Logging you in');
		const payload = JSON.stringify({
			phone: phone.value,
			password: password.value
		})



		await login(payload)
			.then((json)=>{
				if(json.status == true){
					const { result } = json;
					token.value = result.token;
					vRouter.push('/dashboard');
					appAlert(json.message);
					toggleProcessLoader('');
				}else {
					appAlert(json.message);
					toggleProcessLoader('');
				}
			})
		.catch((e)=> console.log(e));
		}
	

	return {
		phone,
		password,
		token,
		loginAdmin
	}
})