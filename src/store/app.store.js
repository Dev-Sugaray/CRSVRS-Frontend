import { defineStore } from 'pinia';
import { ref } from 'vue';
import config from '@/config/api.config'

export const useAppStore = defineStore('app', ()=>{

	const backend = ref(process.env.NODE_ENV === 'production' ? config.apiUrl.production : config.apiUrl.development)

	const alertVisible = ref(false);
	const alertMessage = ref('');

	const processLoaderVisible = ref(false);
	const processLoaderMessage = ref('')

	const appAlert = msg =>{
		alertMessage.value = msg;
		alertVisible.value = true;
	}

	const closeAlert = () => {
		alertMessage.value = '';
		alertVisible.value = false;
	}

	const toggleProcessLoader = (msg) => {
		processLoaderMessage.value = msg;
		processLoaderVisible.value = !processLoaderVisible.value;
	}

	const isMenuActive = ref(false);

	return { 
		backend,
		alertVisible,
		alertMessage,
		appAlert,
		closeAlert,
		processLoaderVisible, 
		processLoaderMessage,
		toggleProcessLoader,
		isMenuActive
	}
}, 
{
	persistedState: {
		persist: false
	}
}
);