<script setup>
import AppAlert from '@/components/AppAlert';
import ProcessLoader from '@/components/ProcessLoader';
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
  <connectivity-status></connectivity-status>
  <router-view/>
</template>
