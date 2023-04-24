<script setup>
import { storeToRefs } from 'pinia';
import { useAppStore } from '@/store/app.store';
import CuiButton from '@/components/CuiButton';
const appStore = useAppStore();
const { alertVisible, alertMessage } = storeToRefs(appStore);
const { closeAlert } = appStore;

const wrapperClick = (ev)=>{
	const { target } = ev;
	if(target.className == 'wrapper'){
		closeAlert();
	}
}
</script>

<template>
	<div v-if="alertVisible" class="wrapper d-flex justify-content-center align-items-center" @click="wrapperClick">
		<div class="app-modal p-3 rounded">
			<div class="app-modal-content p-2">
				<p>{{ alertMessage }}</p>
			</div>
			<div class="app-modal-footer p-2">
				<cui-button @click="closeAlert">Close</cui-button>
			</div>
		</div>
	</div>
</template>

<style scoped>
.wrapper {
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background-color: var(--cui-light-gray-transparent);
	backdrop-filter: blur(1px);
	z-index: 10000000000;
}

.app-modal {
	display: flex;
	align-items: center;
	flex-direction: column;
	justify-content: center;
	background-color: white;
	width: 50%;
	min-width: 10rem;
}

.app-modal-content {

}

.app-modal-footer {
	text-align: center;
}
</style>