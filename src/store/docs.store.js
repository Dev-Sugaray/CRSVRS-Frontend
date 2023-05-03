import { read } from '@/services/docs.service';
import { useAppStore } from '@/store/app.store';
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useDocsStore = defineStore("docs", ()=>{

	const appStore = useAppStore();
	const { appAlert, toggleProcessLoader } = appStore;

	const docs = ref('');	

	const readDocs = async ()=>{
		toggleProcessLoader('Fetching documentation');
		await read().then((data)=>{
			docs.value = data;
			toggleProcessLoader('');
		}).catch((e)=>{
			console.log(e);
			toggleProcessLoader('');
			appAlert('An error occured!');
		})
	}

	return {
		docs,
		readDocs
	}
}, {
	persistedState: {
		persist: false
	}
})