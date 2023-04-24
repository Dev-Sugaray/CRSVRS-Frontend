<script setup>

</script>

<template>
	<div class="cui-card p-3 rounded shadow">
		<slot></slot>
	</div>
</template>

<style scoped>
	.cui-card {
		color: var(--cui-gray);
		background-color: var(--cui-white);
	}
</style>