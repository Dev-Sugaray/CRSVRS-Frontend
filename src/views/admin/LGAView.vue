<script setup>
import CuiButton from '@/components/CuiButton';
import CuiHeader from '@/components/CuiHeader';
import CuiMenu from '@/components/CuiMenu';
import CuiBody from '@/components/CuiBody'
import CuiInput from '@/components/CuiInput';
// Pinia dependencies
import { storeToRefs } from 'pinia';
// Vue dependencies
import { onMounted } from 'vue';
// Pinia stores
import { useLGAStore } from '@/store/lga.store';
import { useAuthStore } from '@/store/auth.store';

const authStore = useAuthStore();
const { credentials } = storeToRefs(authStore);


const lgaStore = useLGAStore();
const { lgas, showLGA, paginatedLGAs, range, showIndex } = storeToRefs(lgaStore);
const { readLGA, createLGA, updateLGA, deleteLGA, increaseShowIndex, decreaseShowIndex  } = lgaStore;


onMounted(()=>{
	readLGA();
})

</script>

<template>
	<div>
		<cui-header></cui-header>
		<cui-menu></cui-menu>
		<cui-body>

			<div class="d-flex align-items-center justify-content-between">
				<div class="col">
					<cui-button data-bs-toggle="modal" data-bs-target="#addLGA">
						<i class="fa fa-plus"></i>
						<span class="lg"> Add new</span>
					</cui-button>
				</div>
				<div class="col">
					<cui-button @click="readLGA()">
						<i class="fa fa-spinner"></i>
						<span class="lg"> Refresh</span>
					</cui-button>
				</div>
				<div class="col-8 lg">
					<cui-input :store="lgaStore" stateKey="searchStr" placeholder="Search lgas"></cui-input>
				</div>
				<div class="col-6 sm">
					<cui-input :store="lgaStore" stateKey="searchStr" placeholder="Search lgas"></cui-input>
				</div>
				<div class="col m-1">
					<select v-model="range" class="p-2 rounded range lg">
						<option value="5">Show 5</option>
						<option value="10">Show 10</option>
						<option value="20">Show 20</option>
						<option value="50">Show 50</option>
					</select>
					<select v-model="range" class="p-2 rounded range sm">
						<option value="5">5</option>
						<option value="10">10</option>
						<option value="20">20</option>
						<option value="50">50</option>
					</select>
				</div>
				
			</div>
			
			<div class="container table-wrapper">
				
				<div class="table">
					<div class="table-header d-flex justify-content-between align-items-center pt-2 pb-2">
						<div class="table-header-col col-4">LGA</div>
						<div class="table-header-col col-4">LGA Initial</div>
						<div class="table-header-col col"></div>
						<div class="table-header-col col"></div>
					</div>
					<div class="table-body">
						<div 
							class="table-row row bg-light rounded shadow align-items-center mt-2"
							v-for="lga in showLGA"
							:key="lga.id"
						>
							<div data-aos="zoom-in" class="table-row-col col col-4">{{ lga.lga }}</div>
							<div data-aos="zoom-in" class="table-row-col col col-4">{{ lga.lga_initial }}</div>
							<!-- For mobile view will add a new button that will show more information and hide the amount of information that needs to be shown on the frontend -->
							<div data-aos="zoom-in" class="table-row-col col col">
								<cui-button  v-if="credentials.admin_type != 'admin'" data-bs-toggle="modal" :data-bs-target="'#edit_lga'.concat(lga.lga_id)">
									<i class="fa fa-pen"></i>
									<span class="lg"> Edit</span>
								</cui-button>
							</div>
							<div data-aos="zoom-in" class="table-row-col col col">
								<cui-button  v-if="credentials.admin_type != 'admin'" type='danger' data-bs-toggle="modal" :data-bs-target="'#delete_lga'.concat(lga.lga_id)">
									<i class="fa fa-trash"></i>
									<span class="lg"> Delete</span>
								</cui-button>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div class="pagination">
				<cui-button @click="decreaseShowIndex" class="m-1"><i class="fa fa-chevron-left"></i></cui-button>
				<cui-button class="m-1"
					v-for="i, index in paginatedLGAs"
					:key="'pag_'.concat(index)"
					@click="showIndex = index"
				>{{index+1}}</cui-button>

				<cui-button @click="increaseShowIndex" class="m-1"><i class="fa fa-chevron-right"></i></cui-button>
			</div>
		</cui-body>
	</div>

	<!-- Button trigger modal -->


<!-- Add lga modal -->
	<div class="modal fade" id="addLGA" data-backdrop="static" tabindex="-1" role="dialog" aria-labelledby="staticBackdropLabel" aria-hidden="true">
		<div class="modal-dialog">
			<div class="modal-content" style="overflow-y: auto; max-height:85%;  margin-top: 50px; margin-bottom:50px;">
				<div class="modal-header">
					<h1 class="h5">Add new lga</h1>
				</div>
				<div class="modal-body">
					<div class="row">
						<div class="container">
							<label>LGA</label>
							<cui-input :store="lgaStore" stateKey="lgaToAddLGA" type="text" placeholder="LGA"></cui-input>
						</div>
						<div class="container mt-2">
							<label>LGA Initial</label>
							<cui-input :store="lgaStore" stateKey="lgaToAddLGAInitial" type="text" placeholder="LGA Initial"></cui-input>
						</div>
					</div>
				</div>
				<div class="modal-footer">
					<div class="container mt-5 text-center">
						<cui-button data-bs-dismiss="modal" type="danger" id="create_lga_btn">Cancel</cui-button>&nbsp;
						<cui-button @click="createLGA">Add new lga</cui-button>
					</div>
				</div>
			</div>
		</div>
	</div>
<!-- End of add lga modal -->

<!-- Edit lga modal -->
	<div v-for="lga in lgas" data-backdrop="static" :key="lga.lga_id" class="modal fade" :id="'edit_lga'.concat(lga.lga_id)">
		<div class="modal-dialog">
			<div class="modal-content" style="overflow-y: auto; max-height:85%;  margin-top: 50px; margin-bottom:50px;">
				<div class="modal-header">
					<h1 class="h5">Edit lga</h1>
				</div>
				<div class="modal-body">
					<div class="row">
						<div class="container">
							<label>Surname</label>
							<input class="p-2 rounded cui-input w-100"  v-model="lga.lga" type="text" placeholder="Surname">
						</div>
						<div class="container mt-2">
							<label>Othernames</label>
							<input class="p-2 rounded cui-input w-100" v-model="lga.lga_initial" type="text" placeholder="Othernames">
						</div>
					</div>
				</div>
				<div class="modal-footer">
					<div class="container mt-5 text-center">
						<cui-button data-bs-dismiss="modal" type="danger" class="" :id="'update_lga_btn_'.concat(lga.lga_id)">Cancel</cui-button>&nbsp;
						<cui-button @click="updateLGA(lga.lga_id)" class="">Edit</cui-button>
					</div>
				</div>
			</div>
		</div>
	</div>
<!-- End of edit lga modal -->


<!-- delete lga modal -->
	<div v-for="lga in lgas" data-backdrop="static" :key="lga.lga_id" class="modal fade" :id="'delete_lga'.concat(lga.lga_id)">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<h1 class="h5">Delete lga</h1>
				</div>
				<div class="modal-body">
					{{ lga.lga }}
				</div>
				<div class="modal-footer">
					<div class="container mt-5 text-center">
						<cui-button data-bs-dismiss="modal" class="" :id="'delete_lga_btn_'.concat(lga.lga_id)">Cancel</cui-button>&nbsp;
						<cui-button type="danger" @click="deleteLGA(lga.lga_id)">Delete</cui-button>
					</div>
				</div>
			</div>
		</div>
	</div>
<!-- End of delete lga modal -->

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
</style>