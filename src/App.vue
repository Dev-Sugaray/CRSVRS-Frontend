<script setup>
import AppAlert from '@/components/AppAlert';
import ProcessLoader from '@/components/ProcessLoader'
</script>
<template>
  <app-alert></app-alert>
  <process-loader></process-loader>
  <router-view/>
</template>
