<script setup>
import { computed } from 'vue'
import NProgress from 'nprogress'

const percentage = computed(() => {
	return NProgress.status
})
</script>

<template>
	<div>
		<div class="bar" v-if="percentage > 0">
			<div class="progress" :style="{ width: percentage + '%' }"></div>
		</div>
	<!-- Your other content goes here -->
	</div>
</template>

<style>
.bar {
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 3px;
	z-index: 1000000000000000000000000000000000000000000000;
	background-color: var(--cui-blue-very-transparent);
}

.progress {
	height: 3px;
	background-color: var(--cui-blue);
}
</style>
