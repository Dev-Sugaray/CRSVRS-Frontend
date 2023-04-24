<script setup>
import { defineProps } from 'vue';
import { storeToRefs } from 'pinia';

const props = defineProps({
	type: String,
	placeholder: {
		type: String,
		default: ''
	},
	store: Object,
    stateKey: String,
    state: String
})

const value = !props.state ? storeToRefs(props.store)[props.stateKey] : props.state;

</script>

<template>
	<div>
		<input class="p-2 rounded cui-input w-100" :type="props.type" :placeholder="props.placeholder" v-model='value'>
	</div>
</template>

<style scoped>
	.cui-input {
		color: var(--cui-gray);
		background-color: var(--cui-white);
		border: 2px solid var(--cui-light-gray);
		outline: none;
		transition: border 300ms ease-in;
	}

	.cui-input:focus {
		border: 2px solid var(--cui-blue);
	}
</style>