import { defineStore } from 'pinia';
import { ref } from 'vue';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

export const useAppStore = defineStore('app', ()=>{
	const backend = ref('http://localhost/mac/vehicle_system/api');

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

	const closeAllBoostrapModals = ()=>{
		// const modals = document.querySelectorAll('.modal'); // Select all modal elements
		// modals.forEach(modal => {
		// 	// if(modal.classList.contains('show')) {
		// 			// check if the modal is currently shown
		// 	// const bootstrapModal = new bootstrap.Modal(modal); // create a Bootstrap modal instance
		// 	// bootstrapModal.hide(); // call the Bootstrap modal's hide() method to close the modal
		// 	// }
		// 	?
		// });		  
	}

	return { 
		backend,
		alertVisible,
		alertMessage,
		appAlert,
		closeAlert,
		processLoaderVisible, 
		processLoaderMessage,
		toggleProcessLoader,
		closeAllBoostrapModals
	}
}, 
{
	persistedState: {
		persist: false
	}
}
);