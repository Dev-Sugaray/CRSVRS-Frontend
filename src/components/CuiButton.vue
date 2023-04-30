<script setup>
import { defineProps } from 'vue';

const props = defineProps({
	type: String
})
</script>

<template>
	<button data-aos="fade-in" v-ripple="'rgba(255,255,255,.6)'" :class="'cui-button-'.concat(props.type)" class="cui-button p-2 rounded">
		<slot></slot>
	</button>
</template>

<style scoped>
	.cui-button {
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