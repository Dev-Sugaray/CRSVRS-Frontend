<template>
    <div>
        <Bar
            v-if="loaded" :data="chartData" :options="chartOptions"
        />
    </div>
</template>

<script setup>
import { Bar } from 'vue-chartjs';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';

// Pinia stores
import { ref, onMounted } from 'vue'; 
import { useAppStore } from '@/store/app.store';
import { read } from '@/services/report.service';
  
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

const appStore = useAppStore();
const { toggleProcessLoader } = appStore;

const chartData = ref(null)

const chartOptions = ref({
    responsive: true,
    indexAxis: 'y'
})

const loaded = ref(false)


onMounted(async ()=> {
    toggleProcessLoader('Setting up the dashboard');
    loaded.value = false;

    const json = await read()
    const { result } = json;
    const data = result.map(obj => obj.total_payer).splice(0,7);
    const labels = result.map(obj => obj.paydate_description).splice(0,7);

    chartData.value = {
        labels: labels,
        datasets: [
          {
            label: 'Registered drivers',
            backgroundColor: 'rgb(3,1,105)',
            data: data
          }
        ]
      }

    loaded.value = true;
    toggleProcessLoader('');

})
</script>
