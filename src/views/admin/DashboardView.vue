<script setup>
// import CuiButton from '@/components/CuiButton';
import CuiHeader from '@/components/CuiHeader';
import CuiMenu from '@/components/CuiMenu';
import CuiBody from '@/components/CuiBody'
import ReportBarChart from '@/components/ReportBarChart';
import RevenueBarChart from '@/components/RevenueBarChart';
</script>

<template>
	<div>
		<cui-header></cui-header>
		<cui-menu></cui-menu>
		<cui-body>
			<div class="row">
				<div class="container w-50 col">
					<report-bar-chart></report-bar-chart>
				</div>
				<div class="container w-50 col">
					<revenue-bar-chart></revenue-bar-chart>
				</div>
			</div>
		</cui-body>
	</div>
</template>

<style scoped>

</style>