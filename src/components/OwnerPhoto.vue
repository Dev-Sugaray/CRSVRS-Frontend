<script setup>
import { storeToRefs } from 'pinia';
import { defineProps } from 'vue';
import { useFileDialog } from '@vueuse/core'
import { useOwnerStore } from '@/store/owners.store';
import { useAppStore } from '@/store/app.store';
const ownerStore = useOwnerStore();
const { ownerToAddPhoto, ownerPhotoToEdit } = storeToRefs(ownerStore);
const { addOwnerPhoto, editOwnerPhoto } = ownerStore;

const appStore = useAppStore();
const { toggleProcessLoader } = appStore;

const props = defineProps({
	mode: {
		type: String,
		default: 'create'
	}
})


const { open, onChange } = useFileDialog()
onChange((files) => {
	if(props.mode == 'edit'){
		editOwnerPhoto(files[0]);
	}else {
		addOwnerPhoto(files[0]);
	}
  
})

const choosePhoto = ()=>{
	toggleProcessLoader('Loading please wait');
	open();
	toggleProcessLoader('')
}
</script>
<template>
	<div v-if="props.mode == 'edit'">
		<img src="@/assets/img/profile.svg" @click="choosePhoto" class="photo d-inline-block" v-if="ownerPhotoToEdit.length == 0">
		<img :src="ownerPhotoToEdit" @click="open" class="photo d-inline-block" v-else>
	</div>
	<div v-else>
		<img src="@/assets/img/profile.svg" @click="choosePhoto" class="photo d-inline-block" v-if="ownerToAddPhoto.length == 0">
		<img :src="ownerToAddPhoto" @click="open" class="photo d-inline-block" v-else>
	</div>
	
</template>
<style scoped>	
.photo {
	width: 10rem;
	height: 10rem;
	border-radius: 100%;
	background-color: white;
	cursor: pointer;
	box-shadow: 0px 0px 5px black;
}
</style>