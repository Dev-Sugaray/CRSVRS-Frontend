<script setup>
import { defineProps } from 'vue';

const props = defineProps({
	type: String
})
</script>

<template>
	<button v-ripple="'rgba(255,255,255,.6)'" :class="'cui-button-'.concat(props.type)" class="cui-button p-2 rounded">
		<slot></slot>
	</button>
</template>

<style scoped>
	@keyframes fade-in {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}

	.cui-button {
		animation: fade-in 100ms ease-in;
		color: white;
		background-color: var(--cui-blue);
		font-weight: light;
		border: none;
		outline: none;
	}

	.cui-button-danger {
		background-color: red;
	}
</style>