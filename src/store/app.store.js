import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useAppStore = defineStore('app', ()=>{
	const backend = ref('http://localhost:7000/api');

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

	return { 
		backend,
		alertVisible,
		alertMessage,
		appAlert,
		closeAlert,
		processLoaderVisible, 
		processLoaderMessage,
		toggleProcessLoader
	}
}, 
{
	persistedState: {
		persist: false
	}
}
);