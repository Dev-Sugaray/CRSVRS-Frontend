import { read } from '@/services/report.service';
import { useAppStore } from '@/store/app.store';
import { defineStore } from 'pinia';
import { ref, computed, watch } from 'vue';

export const useReportStore = defineStore("report", ()=>{

	const appStore = useAppStore();
	const { appAlert, toggleProcessLoader } = appStore;

	// Credentials
	const reports = ref([]);

	// Operational variables
	const searchStr = ref('');
	const range = ref(5);
	const showIndex = ref(0);

	// Getters
	const filteredReports = computed(()=>{
		const arr = reports.value.filter((admin)=> JSON.stringify(admin).toLowerCase().indexOf(searchStr.value.toLowerCase()) != -1);
		return arr;
	});

	const paginatedReports = computed(()=>{
		const arr = filteredReports.value;
		const result = [];
		let i = 0;

		while (i < arr.length) {
			result.push(arr.slice(i, i + range.value));
			i += range.value;
		}

		return result;
	})

	const showReport = computed(()=>{
		if(showIndex.value > paginatedReports.value.length){
			showIndex.value = paginatedReports.value.length-1;
		}else if(showIndex.value < 0){
			showIndex.value = 0
		}

		const current =  paginatedReports.value[showIndex.value];
		return current;
	})

		// Update showIndex whenever a new search is performed
	watch(filteredReports, (newValue) => {
		if (newValue.length > 0) {
			const index = paginatedReports.value.findIndex(page => page.includes(newValue[0]));
			if (index !== -1) {
				showIndex.value = index;
			}
		}
	});

	const increaseShowIndex = ()=>{
		const maxValue = paginatedReports.value.length-1;
		if(showIndex.value < maxValue){
			showIndex.value++;
		}
		
	}

	const decreaseShowIndex = ()=>{
		const leastValue = 0;
		if(showIndex.value > leastValue){
			showIndex.value--;
		}
	}

	const readReport = async ()=>{
		toggleProcessLoader('Fetching report');

		await read()
			.then((json)=>{
				if(json.status == true){
					reports.value = json.result;
					// appAlert(json.message);
					toggleProcessLoader('');
				}else {
					appAlert(json.message);
					toggleProcessLoader('');
				}
			})
		.catch((e)=> console.log(e));
	}


	

	return {
		reports,
		readReport,
		filteredReports,
		paginatedReports,
		showReport,
		showIndex,
		searchStr,
		range,
        increaseShowIndex,
        decreaseShowIndex
	}
})