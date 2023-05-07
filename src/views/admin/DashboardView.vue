<script setup>
// import CuiButton from '@/components/CuiButton';
import CuiHeader from '@/components/CuiHeader';
import CuiMenu from '@/components/CuiMenu';
import CuiBody from '@/components/CuiBody'
import ReportBarChart from '@/components/ReportBarChart';
import RevenueBarChart from '@/components/RevenueBarChart';
import LgaPieChart from '@/components/LgaPieChart';
import LgaRevenuePieChart from '@/components/LgaRevenuePieChart';
import VehicleTypePieChart from '@/components/VehicleTypePieChart';
import VehicleTypeRevenuePieChart from '@/components/VehicleTypeRevenuePieChart';
import { useDashboardStore } from '@/store/dashboard.store';
import { storeToRefs } from 'pinia';

const dashboardStore = useDashboardStore();
const { driverData, vehicleOwnerData } = storeToRefs(dashboardStore);
const { readDashboard } = dashboardStore;

readDashboard();
</script>

<template>
	<div>
		<cui-header></cui-header>

		<cui-menu></cui-menu>
		<cui-body class="overflow-auto">
			<div class="row">
				<div class="container col-lg-6 col-md-12 col-sm-12 col-xs-12">
					<div class="h5 text-center mt-4">
						Registrations for the last 7 days
					</div>
					<div class="container">
						<report-bar-chart></report-bar-chart>
					</div>
					
				</div>
				<div class="container col-lg-6 col-md-12 col-sm-12 col-xs-12">
					<div class="h5 text-center mt-4">
						Revenue for the last 7 days
					</div>
					<div class="container">
						<revenue-bar-chart></revenue-bar-chart>
					</div>
					
				</div>
			</div>
			<div class="container cui-white rounded p-2 mt-4 shadow">
				<h1 class="h4 text-center mt-4">Driver information</h1>
				<div class="row align-items-center justify-content-center">
					<div class="col-lg-4 col-md-6 col-sm-12 col-xs-12">
						<div class="p-3 cui-green cui-card border rounded-5 shadow-3 text-light d-flex align-items-center justify-content-center flex-row m-2" style="background-color: rgb(65, 211, 187)">
							<div class="h4 p-2"><i class="fa fa-cars fa-2x"></i></div>
							<div class="h5 p-2">Active</div>
							<p class="h1 p-2">{{ driverData.active_driver }}</p>
						</div>
					</div>
					<div class="col-lg-4 col-md-6 col-sm-12 col-xs-12">
						<div class="p-3 cui-card border rounded-5 shadow-3 text-light d-flex align-items-center justify-content-center flex-row m-2" style="background-color: rgb(201, 38, 38)">
							<div class="h4 p-2"><i class="fa fa-cars fa-2x"></i></div>
							<div class="h5 p-2">Expired</div>
							<p class="h1 p-2">{{ driverData.expired_driver }}</p>
						</div>
					</div>
					<div class="col-lg-4 col-md-6 col-sm-12 col-xs-12">
						<div class="p-3 cui-card border rounded-5 shadow-3 text-light d-flex align-items-center justify-content-center flex-row m-2" style="background-color: #1b03a3">
							<div class="h4 p-2"><i class="fa fa-cars fa-2x"></i></div>	
							<div class="h5 p-2">Total</div>
							<p class="h1 p-2">{{ driverData.total_driver }}</p>
						</div>
					</div>
				</div>
				
				<div class="row mt-4">
					<div class="col-lg-6 col-md-6 col-sm-12 text-center">
						<div class="container h5 text-center mt-5 mb-2">
							Distribution of drivers by local govt.
						</div>
						<div container>
							<lga-pie-chart></lga-pie-chart>
						</div>
						
					</div>
					<div class="col-lg-6 col-md-6 col-sm-12 text-center">
						<div class="container h5 text-center mt-5 mb-2">
							Distribution of drivers by vehicle type
						</div>
						<div container>
							<vehicle-type-pie-chart></vehicle-type-pie-chart>
						</div>
						
					</div>
				</div>
		
			</div>
		
			<h1 class="h4 text-center mt-4">Vehicle owner information</h1>
			<div class="row align-items-center justify-content-center">
				<div class="col-lg-4 col-md-6 col-sm-12 col-xs-12">
					<div class="p-3 cui-green cui-card border rounded-5 shadow-3 text-light d-flex align-items-center justify-content-center flex-row m-2" style="background-color: rgb(65, 211, 187)">
						<div class="h4 p-2"><i class="fa fa-cars fa-2x"></i></div>
						<div class="h5 p-2">Active</div>
						<p class="h1 p-2">{{ vehicleOwnerData.total_vehicle_owner }}</p>
					</div>
				</div>
				<div class="col-lg-4 col-md-6 col-sm-12 col-xs-12">
					<div class="p-3 cui-card border rounded-5 shadow-3 text-light d-flex align-items-center justify-content-center flex-row m-2" style="background-color: rgb(201, 38, 38)">
						<div class="h4 p-2"><i class="fa fa-cars fa-2x"></i></div>
						<div class="h5 p-2">Expired drivers</div>
						<p class="h1 p-2">{{ driverData.expired_driver }}</p>
					</div>
				</div>
				<div class="col-lg-4 col-md-6 col-sm-12 col-xs-12">
					<div class="p-3 cui-card border rounded-5 shadow-3 text-light d-flex align-items-center justify-content-center flex-row m-2" style="background-color: #1b03a3">
						<div class="h4 p-2"><i class="fa fa-cars fa-2x"></i></div>	
						<div class="h5 p-2">Total drivers</div>
						<p class="h1 p-2">{{ driverData.total_driver }}</p>
					</div>
				</div>
			</div>

			<h1 class="h4 text-center mt-4">Revenue information</h1>
			<div class="row mt-4">
					<div class="col-lg-6 col-md-6 col-sm-12 text-center">
						<div class="container h5 text-center mt-5 mb-2">
							Distribution of revenue by local govt.
						</div>
						<div container>
							<lga-revenue-pie-chart></lga-revenue-pie-chart>
						</div>
						
					</div>
					<div class="col-lg-6 col-md-6 col-sm-12 text-center">
						<div class="container h5 text-center mt-5 mb-2">
							Distribution of revenue by vehicle type
						</div>
						<div container>
							<vehicle-type-revenue-pie-chart></vehicle-type-revenue-pie-chart>
						</div>
						
					</div>
				</div>
		</cui-body>
	</div>
</template>

<style scoped>

</style>