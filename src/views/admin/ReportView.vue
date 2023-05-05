<script setup>
import CuiButton from '@/components/CuiButton';
import CuiHeader from '@/components/CuiHeader';
import CuiMenu from '@/components/CuiMenu';
import CuiBody from '@/components/CuiBody';
import CuiInput from '@/components/CuiInput';
// Pinia dependencies
import { storeToRefs } from 'pinia';
// Pinia stores
import { useReportStore } from '@/store/report.store';
import { useAppStore } from '@/store/app.store';

const reportStore = useReportStore();
const { showReport, range, showIndex, paginatedReports } = storeToRefs(reportStore);
const { readReport, increaseShowIndex, decreaseShowIndex  } = reportStore;

const appStore = useAppStore();
const { appAlert } = appStore;

readReport();

const copyToClipboard = (text)=>{
	// check browser support
	if(navigator.clipboard == undefined){
		appAlert('Your broswer does not support copying to clipboard');
	}else {
		navigator.clipboard.writeText(text);
		appAlert(`Copied ${text} to clipboard`);
	}
}
</script>

<template>
	<div>
		<cui-header></cui-header>
		<cui-menu></cui-menu>
		<cui-body>

			<div class="d-flex align-items-center justify-content-center">
				<div class="col">
					<cui-button @click="readReport()"><i class="fa fa-spinner"></i><span class="lg"> Refresh</span></cui-button>
				</div>
				<div class="col-8">
					<cui-input :store="reportStore" stateKey="searchStr" placeholder="Search reports"></cui-input>
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
					<div class="table-header d-flex align-items-center justify-content-between pt-2 pb-2">
						<div class="table-header-col col d-none">S/N</div>
						<div class="table-header-col col lg">Total payer</div>
						
                        <div class="table-header-col col">Date</div>
                        <div class="table-header-col col">Total sum</div>
                        <div class="table-header-col col lg">Portal charge</div>
                        <div class="table-row-col col col sm"></div>
                        <div class="table-row-col col col lg"></div>
					</div>
					<div class="table-body">
						<div 
							class="table-row d-flex justify-content-between bg-light rounded shadow align-items-center mt-2"
							v-for="report, index in showReport"
							:key="'report'.concat(index)"
						>
							<div data-aos="zoom-in" class="table-row-col col col d-none">{{ index+1 }}</div>
							<div data-aos="zoom-in" class="table-row-col col col lg">{{ report.total_payer }}</div>
                            <div data-aos="zoom-in" class="table-row-col col col">{{ report.paydate_description }}</div>
                             <div data-aos="zoom-in" class="table-row-col col col">&#x20A6;{{ Number(report.total_sum).toLocaleString("en-US") }}</div>
                            <div data-aos="zoom-in" class="table-row-col col col lg">&#x20A6;{{ Number(report.portal_charge).toLocaleString("en-US") }}</div>
							
							<!-- For mobile view will add a new button that will show more information and hide the amount of information that needs to be shown on the frontend -->
							<div data-aos="zoom-in" class="table-row-col col col sm">
								<cui-button data-bs-toggle="modal" :data-bs-target="'#more_modal_'.concat(report.paydate)">
									<i class="fa fa-eye"></i>
									<span class="sm"></span>
								</cui-button>
							</div>
							<div data-aos="zoom-in" class="table-row-col col col lg">
								<cui-button data-bs-toggle="modal" :data-bs-target="'#report_modal_'.concat(report.paydate)">
									<i class="fa fa-users"></i>
									<span class="lg"> See beneficiaries</span>
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
<div v-for="report, index in showReport" data-backdrop="static" :key="'more_modal_'.concat(index)" class="modal fade" :id="'more_modal_'.concat(report.paydate)">
		<div class="modal-dialog">
			<div class="modal-content" style="overflow-y: auto; max-height:85%;  margin-top: 50px; margin-bottom:50px;">
				<div class="modal-header">
					<h1 class="h5">More info for {{ report.paydate_description }}</h1>
				</div>

				<div class="modal-body">
					<div><b>Total payers:</b> {{ report.total_payer }}</div>
                    <div><b>Total sum:</b>&#x20A6;{{ Number(report.total_sum).toLocaleString("en-US") }}</div>
                    <div><b>Paydate description:</b>{{ report.paydate_description }}</div>
                    <div><b>Portal charge:</b>&#x20A6;{{ Number(report.portal_charge).toLocaleString("en-US") }}</div>
					
				</div>
				
				<div class="modal-footer">
					<div class="container mt-5 text-center">
						<cui-button data-bs-dismiss="modal" type="danger" class="">Cancel</cui-button>&nbsp;
						<cui-button data-bs-toggle="modal" :data-bs-target="'#report_modal_'.concat(report.paydate)">
							<span class="sm"> See beneficiaries</span>
						</cui-button>
					</div>
				</div>
			</div>
		</div>
	</div>
<!-- End of show owner modal -->



<!-- Show owner modal -->
<div v-for="report, index in showReport" data-backdrop="static" :key="'report_modal_'.concat(index)" class="modal fade" :id="'report_modal_'.concat(report.paydate)">
		<div class="modal-dialog">
			<div class="modal-content" style="overflow-y: auto; max-height:85%;  margin-top: 50px; margin-bottom:50px;">
				<div class="modal-header">
					<h1 class="h5">Portal charge beneficiaries</h1>
				</div>

				<div class="container overflow-auto" style="max-height: 60vh">
						<div v-for="shareHolder, index in report.share_holder" :key="'share_holder_'.concat(index)">
							<p class="m-1 p-1 rounded d-flex justify-content-between align-items-center">
								<span><b>Bank name:</b> {{ shareHolder.bank_name }}</span>
								<cui-button @click="copyToClipboard(shareHolder.bank_name)" class="rounded border-2"><i class="fa fa-clone"></i></cui-button>
							</p>
							<p class="m-1 p-1 rounded d-flex justify-content-between align-items-center">
								<span><b>Account name:</b>  {{ shareHolder.account_name }}</span>
								<cui-button @click="copyToClipboard(shareHolder.account_name)" class="ronded border-2"><i class="fa fa-clone"></i></cui-button>
							</p>
							<p class="m-1 p-1 rounded d-flex justify-content-between align-items-center">
								<span><b>Account number:</b>  {{ shareHolder.account_no }}</span>
								<cui-button @click="copyToClipboard(shareHolder.account_no)" class="rounded border-2"><i class="fa fa-clone"></i></cui-button>
							</p>
							<p class="m-1 p-1 rounded d-flex justify-content-between align-items-center">
								<span><b>Settlement amount:</b>  &#x20A6;{{ Number(shareHolder.settlement_amount).toLocaleString('en-US') }}</span>
								<cui-button @click="copyToClipboard(shareHolder.settlement_amount)" class="rounded border-2"><i class="fa fa-clone"></i></cui-button>
							</p>
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