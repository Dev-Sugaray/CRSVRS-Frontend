<script setup>
import CuiButton from '@/components/CuiButton';
import CuiHeader from '@/components/CuiHeader';
import CuiMenu from '@/components/CuiMenu';
import CuiBody from '@/components/CuiBody'
// Pinia dependencies
import { storeToRefs } from 'pinia';
// Pinia stores
import { useReportStore } from '@/store/report.store';
const reportStore = useReportStore();
const { showReport, range, showIndex, paginatedReports } = storeToRefs(reportStore);
const { readReport, increaseShowIndex, decreaseShowIndex  } = reportStore;

readReport();
</script>

<template>
	<div>
		<cui-header></cui-header>
		<cui-menu></cui-menu>
		<cui-body>

			<div class="row">
				<div class="col-4">
					<cui-button @click="readReport()"><i class="fa fa-spinner"></i> Refresh</cui-button>
				</div>
				<div class="col-6">
					<cui-input :store="ownerStore" stateKey="searchStr" placeholder="Search owners"></cui-input>
				</div>
				<div class="col-1">
					<select v-model="range" class="p-2 rounded range">
						<option value="5">Show 5</option>
						<option value="10">Show 10</option>
						<option value="20">Show 20</option>
						<option value="50">Show 50</option>
					</select>
				</div>
				
			</div>
			
			<div class="container table-wrapper">
				
				<div class="table">
					<div class="table-header row align-items-center pt-2 pb-2">
						<div class="table-header-col col">S/N</div>
						<div class="table-header-col col">Total payer</div>
						<div class="table-header-col col">Total sum</div>
                        <div class="table-header-col col">Date</div>
                        <div class="table-header-col col">Portal charge</div>
                        <div class="table-row-col col col"></div>
					</div>
					<div class="table-body">
						<div 
							class="table-row row bg-light rounded shadow align-items-center mt-2"
							v-for="report, index in showReport"
							:key="'report'.concat(index)"
						>
							<div data-aos="zoom-in" class="table-row-col col col">{{ index+1 }}</div>
							<div data-aos="zoom-in" class="table-row-col col col">{{ report.total_payer }}</div>
                            <div data-aos="zoom-in" class="table-row-col col col">&#x20A6;{{ Number(report.total_sum).toLocaleString("en-US") }}</div>
                            <div data-aos="zoom-in" class="table-row-col col col">{{ report.paydate_description }}</div>
                            <div data-aos="zoom-in" class="table-row-col col col">&#x20A6;{{ Number(report.portal_charge).toLocaleString("en-US") }}</div>
							
							<!-- For mobile view will add a new button that will show more information and hide the amount of information that needs to be shown on the frontend -->
							<div data-aos="zoom-in" class="table-row-col col col">
								<cui-button data-bs-toggle="modal" :data-bs-target="'#report_modal_'.concat(report.paydate)">
									<i class="fa fa-users"></i>
									See beneficiaries
								</cui-button>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div class="pagination">
				<cui-button @click="decreaseShowIndex" class="m-1"><i class="fa fa-chevron-left"></i></cui-button>
				<cui-button class="m-1"
					v-for="i, index in paginatedReports"
					:key="'pag_'.concat(index)"
					@click="showIndex = index"
				>{{index+1}}</cui-button>

				<cui-button @click="increaseShowIndex" class="m-1"><i class="fa fa-chevron-right"></i></cui-button>
			</div>
		</cui-body>
	</div>

	<!-- Button trigger modal -->

<!-- Show owner modal -->
<div v-for="report, index in showReport" data-backdrop="static" :key="'report_modal_'.concat(index)" class="modal fade" :id="'report_modal_'.concat(report.paydate)">
		<div class="modal-dialog">
			<div class="modal-content" style="overflow-y: auto; max-height:85%;  margin-top: 50px; margin-bottom:50px;">
				<div class="modal-header">
					<h1 class="h5">Portal charge beneficiaries</h1>
				</div>

				<div class="container">
                    <div v-for="shareHolder, index in report.share_holder" :key="'share_holder_'.concat(index)">
                        <b>Bank name:</b> {{ shareHolder.bank_name }}
                        <br>
                        <b>Account name:</b>  {{ shareHolder.account_name }}
                        <br>
                        <b>Account number:</b>  {{ shareHolder.account_no }}
                        <br>
                        <b>Settlement amount:</b>  &#x20A6;{{ Number(shareHolder.settlement_amount).toLocaleString('en-US') }}
                        <br>
                        <hr>
                    </div>
                </div>
				<div class="modal-footer">
					<div class="container mt-5 text-center">
						<cui-button data-bs-dismiss="modal" type="danger" class="w-50">Cancel</cui-button>&nbsp;
					</div>
				</div>
			</div>
		</div>
	</div>
<!-- End of show owner modal -->

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