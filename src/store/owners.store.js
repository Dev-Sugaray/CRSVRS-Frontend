import { read, create, update, Delete } from '@/services/owners.service';
import { useAppStore } from '@/store/app.store';
import { defineStore, storeToRefs } from 'pinia';
import { ref, computed, markRaw } from 'vue';
import { useAuthStore } from './auth.store';
import router from '@/router/index';

export const useOwnerStore = defineStore("owner", ()=>{
	
	const vRouter = markRaw(router);

	const appStore = useAppStore();
	const { appAlert, toggleProcessLoader } = appStore;


    const authStore = useAuthStore();
    const { credentials } = storeToRefs(authStore);

	// Credentials
	const owners = ref([]);

	// Operational variables
	const searchStr = ref('');
	const range = ref(5);
	const showIndex = ref(0);

	// Getters
	const filteredOwners = computed(()=>{
		const arr = owners.value.filter((owner)=> JSON.stringify(owner).toLowerCase().indexOf(searchStr.value.toLowerCase()) != -1);
		return arr;
	});

	const paginatedOwners = computed(()=>{
		const arr = filteredOwners.value;
		const result = [];
		let i = 0;

		while (i < arr.length) {
			result.push(arr.slice(i, i + range.value));
			i += range.value;
		}

		return result;
	})

	const regulatedShowIndex = ()=>{
		if(showIndex.value > paginatedOwners.value.length){
			showIndex.value = paginatedOwners.value.length-1;
		}else if(showIndex.value < 0){
			showIndex.value = 0
		}
	}

	const showOwner = computed(()=>{
		regulatedShowIndex();
		const current =  paginatedOwners.value[showIndex.value];
		return current;
	})

	const increaseShowIndex = ()=>{
		const maxValue = paginatedOwners.value.length-1;
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

	const ownerToEditId = ref(null);

	const ownerToAddPhoto = ref('');
	const ownerPhotoToEdit = ref('');


	const readOwner = async (id)=>{
		toggleProcessLoader('Getting owners');

		await read(id)
			.then((json)=>{
				if(json.status == true){
					owners.value = json.result;
					// appAlert(json.message);
					toggleProcessLoader('');
				}else {
					appAlert(json.message);
					toggleProcessLoader('');
				}
			})
		.catch((e)=> console.log(e));
	}

	// Credentials for the new owner to add
	const ownerToAddSurname = ref('');
	const ownerToAddOthernames = ref('');
	const ownerToAddPhone = ref('');
	const ownerToAddPhone2 = ref('');
	const ownerToAddPassport = ref('');
	const ownerToAddOwnerType = ref('owner')

	const ownerToView = ref({});
	


	const createOwner = async ()=>{
		const payload = JSON.stringify({
			surname: ownerToAddSurname.value,
			othernames: ownerToAddOthernames.value,
			phone: ownerToAddPhone.value,
			phone2: ownerToAddPhone2.value,
			photo: ownerToAddPhoto.value,
			operator_id: credentials.value.admin_id
		})

		ownerToAddSurname.value = "";
		ownerToAddOthernames.value = "";
		ownerToAddPhone.value = "";
		ownerToAddPhone2.value = "";
		ownerToAddPassport.value = "";
		ownerToAddOwnerType.value = "";
		ownerToAddPhoto.value = "";

		toggleProcessLoader('Creating new owner');
		await create(payload)
			.then((json)=>{
				if(json.status == true){
					// Add owner to owners arr
					
					readOwner();
					appAlert(json.message);
					
					toggleProcessLoader('');

					document.querySelector("#create_owner_btn").click();
				}else {
					appAlert(json.message);
					toggleProcessLoader('');
				}
			})
			.catch((e)=> console.log(e));
	}

	const updateOwner = async (payload)=>{
		toggleProcessLoader('Updating owner information');

		const body = JSON.stringify({
			vehicle_owner_id: payload.value.vehicle_owner_id,
			surname: payload.value.surname,
			othernames: payload.value.othernames,
			phone: payload.value.phone,
			phone2: payload.value.phone2,
			photo: ownerPhotoToEdit.value,
			operator_id: credentials.value.admin_id
		})

		await update(body)
			.then((json)=>{
				if(json.status == true){
					appAlert(json.message);
					toggleProcessLoader('');
					ownerPhotoToEdit.value = "";
					vRouter.back();
				}else {
					appAlert(json.message);
					toggleProcessLoader('');
				}
			})
			.catch((e)=> console.log(e));
	}

	const deleteOwner = async (id)=>{
		toggleProcessLoader('Deleting owner');

		const payload = JSON.stringify({
			vehicle_owner_id: id,
			operator_id: credentials.value.admin_id
		})

		await Delete(payload)
			.then((json)=>{
				if(json.status == true){
					appAlert(json.message);

					const arr = owners.value.filter((owner)=> owner.vehicle_owner_id != id);
					owners.value = arr;
					
					toggleProcessLoader('');

					document.querySelector("#delete_owner_btn_".concat(id)).click();
				}else {
					appAlert(json.message);
					toggleProcessLoader('');
				}
			})
			.catch((e)=> console.log(e));
	}

	const addOwnerPhoto = (file)=>{
		toggleProcessLoader("Using passport")
		const fileReader = new FileReader();
		fileReader.addEventListener("load", ()=>{
			ownerToAddPhoto.value =  fileReader.result;
			toggleProcessLoader("");
		});
		fileReader.readAsDataURL(file);
	}

	const editOwnerPhoto = (file)=> {
		toggleProcessLoader("Using passport")
		const fileReader = new FileReader();
		fileReader.addEventListener("load", ()=>{
			ownerPhotoToEdit.value =  fileReader.result;
			toggleProcessLoader("");
		});
		fileReader.readAsDataURL(file);
	}
	

	return {
		owners,
		readOwner,
		filteredOwners,
		paginatedOwners,
		showOwner,
		showIndex,
		searchStr,
		range,
		createOwner,
		updateOwner,
		deleteOwner,
		ownerToAddSurname,
		ownerToAddPhone,
		ownerToAddOthernames,
		ownerToAddPassport,
		ownerToAddOwnerType,
		ownerToAddPhone2,
		ownerPhotoToEdit,
		ownerToAddPhoto,
		addOwnerPhoto,
		editOwnerPhoto,
		ownerToEditId,
		ownerToView,
		increaseShowIndex,
		decreaseShowIndex
	}
})