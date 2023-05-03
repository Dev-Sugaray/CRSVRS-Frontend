<script setup>
import CuiButton from '@/components/CuiButton';
import CuiHeader from '@/components/CuiHeader';
import CuiMenu from '@/components/CuiMenu';
import CuiBody from '@/components/CuiBody'

// Modules
import { getOwnerImage } from '@/modules/getImage';
// Pinia dependencies
import { storeToRefs } from 'pinia';
// // Vue dependencies
import { onMounted, ref } from 'vue';
// Vue router
import { useRouter } from 'vue-router';
// // Pinia stores
import { useOwnerStore } from '@/store/owners.store';

const ownerStore = useOwnerStore();
const { ownerToView } = storeToRefs(ownerStore);

const img = ref(null);

onMounted(()=>{
	getOwnerImage(ownerToView.value.photo).then((data)=> {
		img.value = data;
	})
})


const router = useRouter();
</script>

<template>
	<div>
		<cui-header></cui-header>
		<cui-menu></cui-menu>
		<cui-body class="overflow-auto">
			<h1 class="mt-1 mb-1 bg-light rounded h3 p-3">Vehicle owner information</h1>
			<div class="container mt-2 rounded bg-light p-2">
				<div class="container">
					<div class="container mt-3">
						<img :src="img" class="photo d-inline-block">
					</div>
					<ul class="mt-4">
						<li class="m-1 p-2 rounded"><b>Surname:</b> {{ ownerToView.surname }}</li>
						<li class="m-1 p-2 rounded"><b>Othernames:</b> {{ ownerToView.othernames }}</li>
						<li class="m-1 p-2 rounded"><b>Phone number:</b> {{ ownerToView.phone }}</li>
						<li class="m-1 p-2 rounded"><b>Alternative phone number:</b> {{ ownerToView.phone2 }}</li>
					</ul>
				</div>
				<div class="container">
					<cui-button @click="router.back()"><i class="fa fa-arrow-left"></i> Go back</cui-button>
				</div>
			</div>
		</cui-body>
	</div>
</template>

<style scoped>
.table-header {
	font-weight: bolder;
}

.range {
	color: white;
	background-color: var(--cui-blue);
	font-weight: bold;
	border: none;
	outline: none;
}

.phone_number {
	color: var(--cui-light-gray)
}

.photo {
	width: 10rem;
	height: 10rem;
	border-radius: 100%;
	background-color: white;
	box-shadow: 0px 0px 5px black;
	cursor: pointer;
}

ul {
	list-style: none;
	margin-left: -2rem;
}

li {
	background-color: white;
	display: inline-block;
}
</style>