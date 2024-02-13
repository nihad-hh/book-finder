<script setup>
import { RouterLink, RouterView } from 'vue-router'
import Header from './components/ui-parts/Header.vue'
</script>

<template>
  <div>
    <Header />

    <RouterView />
  </div>
</template>
