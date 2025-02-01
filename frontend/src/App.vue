<script setup lang="ts">
import { RouterView } from 'vue-router'
import { Toaster } from 'vue-sonner'
</script>

<template>
  <Toaster position="top-right" />
  <RouterView />
</template>

<style>
@import './assets/styles/main.css';
</style>
