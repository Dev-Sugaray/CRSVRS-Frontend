<script setup>

</script>

<template>
	<div class="cui-body p-3 rounded">
		<slot></slot>
	</div>
</template>

<style scoped>
	.cui-body {
		color: var(--cui-black);
		background-color: var(--cui-blue-very-transparent);
		position: absolute;
		left: 11rem;
		right: 10px;
		top: 4rem;
		bottom: 10px;
	}

	@media only screen and (max-width: 767px) {
		.cui-body {
			left: 10px;
		}
	}
</style>