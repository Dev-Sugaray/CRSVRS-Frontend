import { read, create, update, Delete } from '@/services/lga.service';
import { useAppStore } from '@/store/app.store';
import { useAuthStore } from '@/store/auth.store';
import { defineStore, storeToRefs } from 'pinia';
import { ref, computed, watch } from 'vue';

export const useLGAStore = defineStore("lga", ()=>{

	const appStore = useAppStore();
	const { appAlert, toggleProcessLoader } = appStore;

	const authStore = useAuthStore();
	const { credentials } = storeToRefs(authStore);

	// Credentials
	const lgas = ref([]);

	// Operational variables
	const searchStr = ref('');
	const range = ref(5);
	const showIndex = ref(0);

	// Getters
	const filteredLGAs = computed(()=>{
		const arr = lgas.value.filter((lga)=> JSON.stringify(lga).toLowerCase().indexOf(searchStr.value.toLowerCase()) != -1);
		arr.sort((a, b) => {
			if (a.lga === b.lga) {
				return a.lga_inital.localeCompare(b.lga_inital);
			} else {
				return a.lga.localeCompare(b.lga);
			}
		});
		return arr;
	});

	const paginatedLGAs = computed(()=>{
		const arr = filteredLGAs.value;
		const result = [];
		let i = 0;

		while (i < arr.length) {
			result.push(arr.slice(i, i + range.value));
			i += range.value;
		}

		return result;
	})

	const showLGA = computed(()=>{
		if(showIndex.value > paginatedLGAs.value.length){
			showIndex.value = paginatedLGAs.value.length-1;
		}else if(showIndex.value < 0){
			showIndex.value = 0
		}

		const current =  paginatedLGAs.value[showIndex.value];
		return current;
	})

	const increaseShowIndex = ()=>{
		const maxValue = paginatedLGAs.value.length-1;
		if(showIndex.value < maxValue){
			showIndex.value++;
		}
		
	}

	const decreaseShowIndex = ()=>{
		const leastValue = 0;
		if(showIndex.value > leastValue){
			showIndex.value--;
		}
	}

		// Update showIndex whenever a new search is performed
	watch(filteredLGAs, (newValue) => {
		if (newValue.length > 0) {
			const index = paginatedLGAs.value.findIndex(page => page.includes(newValue[0]));
			if (index !== -1) {
				showIndex.value = index;
			}
		}
	});

	const readLGA = async (id)=>{
		toggleProcessLoader('Getting lgas');

		await read(id)
			.then((json)=>{
				if(json.status == true){
					lgas.value = json.result;
					// appAlert(json.message);
					toggleProcessLoader('');
				}else {
					appAlert(json.message);
					toggleProcessLoader('');
				}
			})
		.catch((e)=> console.log(e));
	}

	// Credentials for the new lga to add
	const lgaToAddLGA = ref('');
	const lgaToAddLGAInitial = ref('');

	const createLGA = async ()=>{
		const payload = JSON.stringify({
			lga: lgaToAddLGA.value,
			lga_initial: lgaToAddLGAInitial.value,
			operator_id: credentials.value.admin_id
		})

		toggleProcessLoader('Creating new lga');
		await create(payload)
			.then((json)=>{
				if(json.status == true){
					// Refresh the store
					read()
						.then((json)=>{
							if(json.status == true){
								lgas.value = json.result;
								appAlert("Successfully added LGA");
								toggleProcessLoader('');
							}else {
								appAlert(json.message);
								toggleProcessLoader('');
							}
						})
					.catch((e)=> console.log(e));
					
					document.querySelector("#create_lga_btn").click();
				}else {
					appAlert(json.message);
					toggleProcessLoader('');
				}
			})
			.catch((e)=> console.log(e));
	}

	const updateLGA = async (id)=>{
		toggleProcessLoader('Updating lga information');
		const lgaToUpdate = lgas.value.filter((lga)=> lga.lga_id == id)[0];
		const addEditorId = JSON.stringify({...lgaToUpdate, operator_id: credentials.value.admin_id});
		await update(addEditorId)
			.then((json)=>{
				if(json.status == true){

					// Refresh the store
					read()
						.then((json)=>{
							if(json.status == true){
								lgas.value = json.result;
								appAlert("Successfully updated LGA information");
								toggleProcessLoader('');	
							}else {
								appAlert(json.message);
								toggleProcessLoader('');
							}
						})
					.catch((e)=> console.log(e));

					

					document.querySelector("#update_lga_btn_".concat(id)).click();
				}else {
					appAlert(json.message);
					toggleProcessLoader('');
				}
			})
			.catch((e)=> console.log(e));
	}

	const deleteLGA = async (id)=>{
		toggleProcessLoader('Deleting lga');

		const payload = JSON.stringify({
			lga_id: id,
			operator_id: credentials.value.admin_id
		})

		await Delete(payload)
			.then((json)=>{
				if(json.status == true){
					appAlert(json.message);
					// delete lga from lgas arr
					
					const arr = lgas.value.filter((lga)=> lga.lga_id != id);
					lgas.value = arr;
					
					toggleProcessLoader('');
				
					document.querySelector("#delete_lga_btn_".concat(id)).click();
				}else {
					appAlert(json.message);
					toggleProcessLoader('');
				}
			})
			.catch((e)=> console.log(e));
	}
	

	return {
		lgas,
		readLGA,
		filteredLGAs,
		paginatedLGAs,
		showLGA,
		showIndex,
		searchStr,
		range,
		createLGA,
		updateLGA,
		deleteLGA,
        lgaToAddLGA,
        lgaToAddLGAInitial,
		increaseShowIndex,
		decreaseShowIndex
	}
})