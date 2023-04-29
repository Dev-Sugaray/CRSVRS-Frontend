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

</script>

<template>
	<div>
		<cui-header></cui-header>
		<cui-menu></cui-menu>
		<cui-body>
			<h1 class="m-2 bg-light rounded">Driver information</h1>
			<div class="container mt-2 rounded bg-light p-1">
				<div class="container">
					<div class="container">
						<img :src="img" class="photo d-inline-block">
					</div>
					<ul>
						<li><b>Surname:</b> {{ ownerToView.surname }}</li>
						<li><b>Othernames:</b> {{ ownerToView.othernames }}</li>
						<li><b>Phone number:</b> {{ ownerToView.phone }}</li>
						<li><b>Alternative phone number:</b> {{ ownerToView.phone2 }}</li>
					</ul>
				</div>
				<div class="container">
					<router-link to="/owners/"><cui-button>Go back</cui-button></router-link>
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
	background-color: gold;
	cursor: pointer;
}
</style>