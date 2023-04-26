<script setup>
import { storeToRefs } from 'pinia';
import { useFileDialog } from '@vueuse/core'
import { useDriverStore } from '@/store/driver.store';
import { useAppStore } from '@/store/app.store';
const driverStore = useDriverStore();
const { driverToAddPhoto } = storeToRefs(driverStore);
const { addDriverPhoto } = driverStore;

const appStore = useAppStore();
const { toggleProcessLoader } = appStore;


const { open, onChange } = useFileDialog()
onChange((files) => {
  addDriverPhoto(files[0]);
})

const choosePhoto = ()=>{
	toggleProcessLoader('Loading please wait');
	open();
	toggleProcessLoader('')
}
</script>
<template>
	<img src="@/assets/img/profile.svg" @click="choosePhoto" class="photo d-inline-block" v-if="driverToAddPhoto.length == 0">
	<img :src="driverToAddPhoto" @click="open" class="photo d-inline-block" v-else>
</template>
<style scoped>	
.photo {
	width: 10rem;
	height: 10rem;
	border-radius: 100%;
	background-color: gold;
	cursor: pointer;
}
</style>