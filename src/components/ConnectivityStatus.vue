<script setup>
import { useAppStore } from '@/store/app.store';
import { storeToRefs } from 'pinia';
import { ref } from 'vue';
const appStore = useAppStore();
const { online } = storeToRefs(appStore);
const isProduction = ref(process.env.NODE_ENV == 'production');
</script>
<template>
	<div class="connectivity" v-if="(online == false) && (isProduction == true)">
		
		You are offline
		<br>
		:-(
		
	</div>
</template>

<style scoped>
.connectivity {
	position: fixed;
	top: 0;
	right: 0;
	left: 0;
	bottom: 0;
	background-color: var(--cui-white);
	display: flex;
	justify-content: center;
	align-items: center;
	z-index: 100000000000000000000000000000;
	font-weight: bolder;
	font-size: 4rem;
	text-align: center;
	display: none;
}
</style>