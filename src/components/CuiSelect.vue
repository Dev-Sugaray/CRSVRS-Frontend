<script setup>
import { defineProps } from 'vue';
import { storeToRefs } from 'pinia';

const props = defineProps({
	store: Object,
    stateKey: String,
})

const value = storeToRefs(props.store)[props.stateKey];

</script>

<template>
	<div>
		<select class="p-2 rounded cui-select w-100" v-model='value'>
			<slot></slot>
		</select>
	</div>
</template>

<style>
	.cui-select {
		color: var(--cui-gray);
		background-color: var(--cui-white);
		border: 2px solid var(--cui-light-gray);
		outline: none;
		transition: border 300ms ease-in;
	}

	.cui-select:focus {
		border: 2px solid var(--cui-blue);
	}
</style>