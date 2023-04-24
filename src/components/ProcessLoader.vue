<script setup>
import { storeToRefs } from 'pinia';
import { useAppStore } from '@/store/app.store';
const appStore = useAppStore();
const { processLoaderVisible, processLoaderMessage } = storeToRefs(appStore);
</script>

<template>
	<div v-if="processLoaderVisible" class="wrapper d-flex justify-content-center align-items-center">
		<div class="app-modal rounded">
			<div class="app-modal-content p-2">
				<div class="loader">
					<svg version="1.1" id="L9" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
					viewBox="0 0 100 100" enable-background="new 0 0 0 0" xml:space="preserve">
						<path fill="#fff" d="M73,50c0-12.7-10.3-23-23-23S27,37.3,27,50 M30.9,50c0-10.5,8.5-19.1,19.1-19.1S69.1,39.5,69.1,50">
						<animateTransform 
						attributeName="transform" 
						attributeType="XML" 
						type="rotate"
						dur="1s" 
						from="0 50 50"
						to="360 50 50" 
						repeatCount="indefinite" />
						</path>
					</svg>
				</div>
			</div>
			<div class="app-modal-footer p-2">
				<p class="text-light h4">{{ processLoaderMessage }}</p>
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
	background-color: rgba(0,0,0,.8);
	backdrop-filter: blur(2px);
	z-index: 1000000;
}

.app-modal {
	display: flex;
	align-items: center;
	flex-direction: column;
	justify-content: center;
	background-color: rgba(0,0,0,.2);
	width: 50%;
	min-width: 10rem;
}

.app-modal-header {
	text-align: right;
}

.app-modal-content {

}

.app-modal-footer {
	text-align: center;
}

.loader {
  width: 10rem;
  height: 10rem;
}

</style>