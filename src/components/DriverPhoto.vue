<script setup>
import { storeToRefs } from 'pinia';
import { defineProps } from 'vue';
import { useFileDialog } from '@vueuse/core'
import { useDriverStore } from '@/store/driver.store';
import { useAppStore } from '@/store/app.store';
const driverStore = useDriverStore();
const { driverToAddPhoto, driverPhotoToEdit } = storeToRefs(driverStore);
const { addDriverPhoto, editDriverPhoto } = driverStore;

const appStore = useAppStore();
const { toggleProcessLoader } = appStore;

const props = defineProps({
	mode: {
		type: String,
		default: 'create'
	}
})

driverToAddPhoto.value = "";
driverPhotoToEdit.value = "";

const { open, onChange } = useFileDialog()
onChange((files) => {
	if(props.mode == 'edit'){
		editDriverPhoto(files[0]);
	}else {
		addDriverPhoto(files[0]);
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
		<img 
			src="@/assets/img/profile.svg" 
			@click="choosePhoto" 
			class="photo d-inline-block"
			v-if="driverPhotoToEdit.length == 0"
		>
		<img 
			:src="driverPhotoToEdit"
			@click="open" 
			class="photo d-inline-block" 
			v-else
		>
	</div>
	<div v-else>
		<img 
			src="@/assets/img/profile.svg" 
			@click="choosePhoto" 
			class="photo d-inline-block" 
			v-if="driverToAddPhoto.length == 0"
		>
		<img 
			:src="driverToAddPhoto" 
			@click="open" 
			class="photo d-inline-block" 
			v-else
		>
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