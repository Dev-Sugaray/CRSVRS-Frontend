<script setup>
import AppAlert from '@/components/AppAlert';
import ProcessLoader from '@/components/ProcessLoader';
import ProgressBar from '@/components/ProgressBar';
import ConnectivityStatus from '@/components/ConnectivityStatus';
import { useAppStore } from '@/store/app.store';
import { storeToRefs } from 'pinia';

const appStore = useAppStore();
const { online } = storeToRefs(appStore);

window.ononline = ()=>{
	online.value = true;
}

window.onoffline = ()=>{
	online.value = false;
}
</script>
<template>
  <app-alert></app-alert>
  <process-loader></process-loader>
  <progress-bar></progress-bar>
  <connectivity-status></connectivity-status>
  <router-view/>
</template>
