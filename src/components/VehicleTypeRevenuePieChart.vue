<template>
    <div>
        <Pie
            v-if="loaded" :data="chartData" :options="chartOptions"
        />
    </div>
</template>

<script setup>
import { Pie } from 'vue-chartjs';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'

// Pinia stores
import { ref, onMounted, watchEffect } from 'vue';
import { useDashboardStore } from '@/store/dashboard.store';
import { storeToRefs } from 'pinia';

const dashboardStore = useDashboardStore();
const { vehicleTypeData } = storeToRefs(dashboardStore);

const loaded = ref(false);
  
ChartJS.register(ArcElement, Tooltip, Legend)

const chartOptions = ref({
    responsive: true,
    indexAxis: 'y'
})

const generateRandomColor = ()=>{
    const number = 255;
    const r = Math.floor(Math.random() * number);
    const g = Math.floor(Math.random() * number);
    const b = Math.floor(Math.random() * number);

    return `rgb(${r}, ${g}, ${b})`;
}

const myLegend = ref([]);

let chartData = ref(null);

onMounted(()=>{
    watchEffect(()=>{
        if(vehicleTypeData.value[0] != undefined){
            loaded.value = true;
            const data = vehicleTypeData.value.map(obj => obj.amount);
            const labels = vehicleTypeData.value.map(obj => obj.vehicle_type.concat(' ').concat(`(N${Number(obj.amount).toLocaleString('en-US')})`));
            const colors = [];
            vehicleTypeData.value.forEach((vehicle_type)=>{
                const color = generateRandomColor();
                colors.push(color);
                myLegend.value.push({color, vehicle_type: vehicle_type.vehicle_type});
            })

            chartData.value = {
                labels: labels,
                datasets: [
                    {
                    labels: labels,
                    backgroundColor: colors,
                    data: data
                    }
                ]
            }
        }

    })
       
})
</script>
