import { read } from '@/services/report.service';
import { useAppStore } from '@/store/app.store';
import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

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

	const increaseShowIndex = ()=>{
		showIndex.value++;
	}

	const decreaseShowIndex = ()=>{
		showIndex.value--;
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