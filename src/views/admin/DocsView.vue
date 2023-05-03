<script setup>
// import CuiButton from '@/components/CuiButton';
import CuiHeader from '@/components/CuiHeader';
import CuiMenu from '@/components/CuiMenu';
import CuiBody from '@/components/CuiBody'

import { storeToRefs } from 'pinia';
import { onMounted } from 'vue';

import { useDocsStore } from '@/store/docs.store';
const docsStore = useDocsStore();
const { docs } = storeToRefs(docsStore);
const { readDocs } = docsStore;

onMounted(()=>{
	readDocs();
})
</script>

<template>
	<div>
		<cui-header></cui-header>
		<cui-menu></cui-menu>
		<cui-body class="container overflow-auto rounded docs sm" v-if="docs.length" v-html="docs">
			
		</cui-body>
		<cui-body class="container" v-else>
			<h1>No docs yet please refresh</h1>
		</cui-body>
		<cui-body class="container overflow-scroll rounded docs lg" v-if="docs.length" v-html="docs">
			
		</cui-body>
		<cui-body class="container" v-else>
			<h1>No docs yet please refresh</h1>
		</cui-body>
	</div>
</template>

<style scoped>
	.container {
		height: 85vh;
	}

	.docs {
		margin-left: -10px;
	}

	.docs.lg {
		overflow-x: none;
		padding: 1rem;
		width: calc(100% - 12rem);
		/*margin-left: 1rem;*/
	}

	.docs.lg .container {
		overflow-x: none;
		height: 83vh;
	}

	.docs.sm {
		overflow-x: none !important;
	}
</style>