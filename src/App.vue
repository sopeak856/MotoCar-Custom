<template>
  <div class="min-h-screen bg-[#0b0e14] text-gray-100 flex flex-col font-sans selection:bg-red-600 selection:text-white">
    <Navbar />

    <main class="flex-grow">
      <router-view />
    </main>

    <Footer />
  </div>
</template>

<script setup>
import Navbar from './components/Navbar.vue';
import Footer from './components/Footer.vue';
</script>

<style>
/* Global smooth transitions */
.animate-fade-in {
  animation: fadeIn 0.25s ease-out forwards;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: scale(0.98);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}
</style>
