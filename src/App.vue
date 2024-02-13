<script setup>
import { RouterLink, RouterView } from 'vue-router'
import Header from './components/ui-parts/Header.vue'
import Footer from './components/ui-parts/Footer.vue'
</script>

<template>
  <div>
    <Header />
    <RouterView />
    <Footer />
  </div>
</template>
