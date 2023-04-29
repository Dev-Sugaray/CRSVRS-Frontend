<script setup>
import CuiHeader from '@/components/CuiHeader';
import CuiMenu from '@/components/CuiMenu';
import CuiBody from '@/components/CuiBody';
import CuiButton from '@/components/CuiButton';
import OwnerPhoto from '@/components/OwnerPhoto';
// Modules
import { getOwnerImage } from '@/modules/getImage';
// Pinia dependencies
import { storeToRefs } from 'pinia';
// Vue dependencies
import { onMounted, ref } from 'vue';
// Pinia stores
import { useOwnerStore } from '@/store/owners.store';

const ownerStore = useOwnerStore();
const { owners, ownerToEditId, ownerPhotoToEdit } = storeToRefs(ownerStore);
const { updateOwner } = ownerStore;

const payload = ref(owners.value.filter((owner)=> owner.vehicle_owner_id == ownerToEditId.value)[0]);
// console.log(payload.value);

onMounted(()=> {
    getOwnerImage(payload.value.photo).then((img)=> {
        ownerPhotoToEdit.value = img;
    });
})

const updateBtnClick = ()=>{
    updateOwner(payload);
}

</script>

<template>
	<cui-header></cui-header>
	<cui-menu></cui-menu>
	<cui-body>
		<div class="container-fluid text-center">
			<owner-photo mode="edit"></owner-photo>
		</div>
		<div class="row">
			<div class="container mt-2  col">
				<label>Surname</label>
				<input class="p-2 rounded cui-input w-100"  v-model="payload.surname" type="text" placeholder="Surname">
			</div>
			<div class="container mt-2 col">
				<label>Othernames</label>
				<input class="p-2 rounded cui-input w-100" v-model="payload.othernames" type="text" placeholder="Othernames">
			</div>
		</div>
		<div class="row">
			<div class="container mt-2 col">
				<label>Phone</label>
				<input class="p-2 rounded cui-input w-100" v-model="payload.phone" type="text" placeholder="phone">
			</div>
			<div class="container mt-2 col">
				<label>Phone 2</label>
				<input class="p-2 rounded cui-input w-100" v-model="payload.phone2" type="text" placeholder="phone 2">
			</div>
		</div>
		<div class="container p-2 mt-4">
			<cui-button @click="updateBtnClick" class="w-100">Edit owner</cui-button>
		</div>
	</cui-body>
</template>

<style scoped>
.table-header {
	font-weight: bolder;
}

.range {
	color: white;
	background-color: var(--cui-blue);
	font-weight: bold;
	border: none;
	outline: none;
}

.phone_number {
	color: var(--cui-light-gray)
}
</style>