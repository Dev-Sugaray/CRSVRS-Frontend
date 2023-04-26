import { read, create, update, Delete } from '@/services/owners.service';
import { useAppStore } from '@/store/app.store';
import { defineStore, storeToRefs } from 'pinia';
import { ref, computed } from 'vue';
import { useAuthStore } from './auth.store';

export const useOwnerStore = defineStore("owner", ()=>{

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

	const showOwner = computed(()=>{
		const current =  paginatedOwners.value[showIndex.value];
		return current;
	})

	const readOwner = async (id)=>{
		toggleProcessLoader('Getting owners');

		await read(id)
			.then((json)=>{
				if(json.status == true){
					owners.value = json.result;
					appAlert(json.message);
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
	


	const createOwner = async ()=>{
		const payload = JSON.stringify({
			surname: ownerToAddSurname.value,
			othernames: ownerToAddOthernames.value,
			phone: ownerToAddPhone.value,
			phone2: ownerToAddPhone2.value,
			photo: ownerToAddPassport.value,
			operator_id: credentials.value.admin_id
		})

		toggleProcessLoader('Creating new owner');
		await create(payload)
			.then((json)=>{
				if(json.status == true){
					// Add owner to owners arr
					const { result } = json;
					owners.value.push(result);
					appAlert(json.message);
					location.reload();
					toggleProcessLoader('');
				}else {
					appAlert(json.message);
					toggleProcessLoader('');
				}
			})
			.catch((e)=> console.log(e));
	}

	const updateOwner = async (id)=>{
		toggleProcessLoader('Updating owner information');
		const ownerToUpdate = owners.value.filter((owner)=> owner.vehicle_owner_id == id)[0];
		const addEditorId = JSON.stringify({...ownerToUpdate, operator_id: credentials.value.admin_id});
		await update(addEditorId)
			.then((json)=>{
				if(json.status == true){
					appAlert(json.message);
					toggleProcessLoader('');
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
					// delete owner from owners arr
					location.reload();
					// const arr = owners.value.filter((owner)=> owner.owner_id != id);
					// owners.value = arr;
					
					toggleProcessLoader('');
				}else {
					appAlert(json.message);
					toggleProcessLoader('');
				}
			})
			.catch((e)=> console.log(e));
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
		ownerToAddPhone2
	}
})