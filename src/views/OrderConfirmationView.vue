<template>
  <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8 text-left">
    <!-- Success Badge -->
    <div class="text-center space-y-3">
      <div class="w-16 h-16 rounded-3xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mx-auto shadow-xl shadow-emerald-500/20">
        <CheckCircle2 class="w-8 h-8" />
      </div>
      <span class="px-3 py-1 rounded-full text-xs font-bold bg-emerald-950 text-emerald-400 border border-emerald-500/30">
        ORDER CONFIRMED & RECORDED
      </span>
      <h1 class="text-3xl sm:text-4xl font-black text-white uppercase tracking-tight font-sans">
        Thank You For Your Order!
      </h1>
      <p class="text-xs text-gray-400 max-w-md mx-auto">
        Your high-performance parts have been reserved in our Phnom Penh warehouse. An SMS and Telegram dispatch alert will be sent.
      </p>
    </div>

    <!-- Main Order Details Card -->
    <div class="bg-[#12161f] border border-gray-800 rounded-3xl p-6 sm:p-8 space-y-6">
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-800 pb-5">
        <div>
          <div class="text-[10px] text-gray-500 uppercase font-bold">Order Identifier</div>
          <div class="text-xl font-black font-mono text-red-500">{{ order.id }}</div>
          <div class="text-xs text-gray-400 mt-0.5">Date: {{ order.date }} • Payment: {{ order.paymentMethod }}</div>
        </div>

        <!-- Download Tax Invoice Button -->
        <button 
          @click="isTaxModalOpen = true"
          class="px-4 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs uppercase tracking-wider flex items-center space-x-2 transition-colors cursor-pointer shrink-0"
        >
          <FileText class="w-4 h-4" />
          <span>Download Tax Invoice (VAT)</span>
        </button>
      </div>

      <!-- Items List -->
      <div>
        <h3 class="text-xs font-bold uppercase text-gray-400 mb-3">Purchased Components</h3>
        <div class="space-y-3">
          <div 
            v-for="item in order.items" 
            :key="item.id || item.productId"
            class="p-3.5 rounded-2xl bg-zinc-900 border border-gray-800 flex items-center justify-between gap-4"
          >
            <div class="flex items-center space-x-3 overflow-hidden">
              <img 
                :src="item.product?.images?.[0] || item.image" 
                class="w-12 h-12 rounded-xl object-cover bg-zinc-950 border border-gray-700 shrink-0"
              />
              <div class="truncate">
                <div class="text-xs font-bold text-white truncate">{{ item.product?.title || item.title }}</div>
                <div class="text-[10px] text-gray-400">Qty: {{ item.quantity }} • ${{ item.price || item.product?.retailPrice }}</div>
              </div>
            </div>

            <div class="text-right shrink-0">
              <div class="text-xs font-mono font-bold text-white">
                ${{ ((item.price || item.product?.retailPrice || 0) * item.quantity).toFixed(2) }}
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Installation Details Card if booked -->
      <div v-if="order.installationDetails" class="p-4 rounded-2xl bg-cyan-950/20 border border-cyan-500/30 space-y-2">
        <div class="flex items-center space-x-2 text-cyan-400 text-xs font-bold uppercase">
          <Wrench class="w-4 h-4" />
          <span>Certified Partner Garage Appointment Scheduled</span>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs pt-1">
          <div>
            <span class="text-gray-400 block text-[10px]">Garage Location</span>
            <span class="text-white font-semibold">{{ order.installationDetails.garageName }}</span>
          </div>
          <div>
            <span class="text-gray-400 block text-[10px]">Scheduled Slot</span>
            <span class="text-white font-semibold">{{ order.installationDetails.appointmentDate }} ({{ order.installationDetails.timeSlot }})</span>
          </div>
          <div>
            <span class="text-gray-400 block text-[10px]">Target Vehicle</span>
            <span class="text-white font-semibold">{{ order.installationDetails.vehicle }}</span>
          </div>
        </div>
      </div>

      <!-- Financial Totals -->
      <div class="border-t border-gray-800 pt-4 flex justify-end">
        <div class="w-72 space-y-1.5 text-xs text-right">
          <div class="flex justify-between text-gray-400">
            <span>Subtotal:</span>
            <span class="font-mono text-white">${{ Number(order.subtotal || order.total * 0.9).toFixed(2) }}</span>
          </div>
          <div class="flex justify-between text-gray-400">
            <span>Tax (Cambodia VAT 10%):</span>
            <span class="font-mono text-white">${{ Number(order.tax || order.total * 0.1).toFixed(2) }}</span>
          </div>
          <div class="flex justify-between text-gray-400">
            <span>Delivery & Handling:</span>
            <span class="font-mono text-white">{{ order.shipping === 0 ? 'FREE' : `$${order.shipping || 0}` }}</span>
          </div>
          <div class="flex justify-between text-sm font-black text-red-500 border-t border-gray-800 pt-2">
            <span>Total USD:</span>
            <span class="font-mono">${{ Number(order.total).toFixed(2) }}</span>
          </div>
          <div class="text-[11px] font-mono text-gray-400">
            ≈ {{ Math.round(order.total * 4100).toLocaleString() }} KHR (៛)
          </div>
        </div>
      </div>
    </div>

    <!-- Actions Row -->
    <div class="flex flex-col sm:flex-row items-center justify-between gap-4">
      <router-link 
        to="/tracking" 
        :query="{ id: order.id }"
        class="w-full sm:w-auto px-6 py-3 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-gray-700 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center space-x-2 transition-colors"
      >
        <PackageSearch class="w-4 h-4 text-red-400" />
        <span>Track Live Delivery Status</span>
      </router-link>

      <router-link 
        to="/shop" 
        class="w-full sm:w-auto px-6 py-3 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs uppercase tracking-wider transition-colors text-center"
      >
        Continue Shopping
      </router-link>
    </div>

    <!-- Tax Invoice Modal -->
    <TaxInvoiceModal 
      v-if="isTaxModalOpen"
      :order="order"
      @close="isTaxModalOpen = false"
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { CheckCircle2, FileText, Wrench, PackageSearch } from '@lucide/vue';
import confetti from 'canvas-confetti';
import { useUserStore } from '../stores/userStore';
import TaxInvoiceModal from '../components/TaxInvoiceModal.vue';

const route = useRoute();
const userStore = useUserStore();

const isTaxModalOpen = ref(false);

const order = computed(() => {
  const paramId = route.params.id;
  const match = userStore.orders.find(o => o.id === paramId);
  return match || userStore.orders[0];
});

onMounted(() => {
  confetti({
    particleCount: 100,
    spread: 80,
    origin: { y: 0.5 }
  });
});
</script>

