<template>
  <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 text-left">
    <!-- Header -->
    <div class="space-y-2">
      <span class="px-3 py-1 rounded-full text-xs font-bold bg-red-600/20 text-red-400 border border-red-500/30 uppercase tracking-wider">
        Real-Time Logistics
      </span>
      <h1 class="text-3xl font-black text-white uppercase tracking-tight">Order & Shipment Tracking</h1>
      <p class="text-xs text-gray-400">
        Track your high-performance motorcycle and car parts across all 25 Cambodian provinces.
      </p>
    </div>

    <!-- Search Box -->
    <div class="p-6 rounded-3xl bg-[#12161f] border border-gray-800 space-y-3">
      <label class="block text-xs font-bold uppercase text-gray-400">Enter MotoCar Order ID or Tracking Number</label>
      <div class="flex items-center space-x-2">
        <input 
          v-model="trackingQuery" 
          @keydown.enter="searchOrder"
          type="text" 
          placeholder="e.g. MCC-2026-9021 or VET-EXP-882910KH"
          class="w-full bg-zinc-900 border border-gray-700 rounded-xl px-4 py-3 text-sm text-white uppercase font-mono focus:outline-none focus:border-red-500"
        />
        <button 
          @click="searchOrder"
          class="px-6 py-3 bg-red-600 hover:bg-red-500 text-white rounded-xl text-xs font-bold uppercase tracking-wider shrink-0 transition-colors cursor-pointer"
        >
          Track Now
        </button>
      </div>

      <!-- Quick sample pills -->
      <div class="flex items-center space-x-2 text-xs text-gray-500 pt-1">
        <span>Try sample orders:</span>
        <button @click="trackingQuery = 'MCC-2026-9021'; searchOrder()" class="text-red-400 hover:underline font-mono">MCC-2026-9021</button>
        <span>•</span>
        <button @click="trackingQuery = 'MCC-2026-8840'; searchOrder()" class="text-red-400 hover:underline font-mono">MCC-2026-8840</button>
      </div>
    </div>

    <!-- Tracking Results Card -->
    <div v-if="matchedOrder" class="bg-[#12161f] border border-gray-800 rounded-3xl p-6 sm:p-8 space-y-6">
      <!-- Top Overview -->
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-800 pb-5">
        <div>
          <div class="text-[10px] text-gray-400 font-bold uppercase">Consignment Order</div>
          <div class="text-xl font-black font-mono text-white">{{ matchedOrder.id }}</div>
          <div class="text-xs text-gray-400 mt-1">
            Carrier: <span class="text-white font-semibold">{{ matchedOrder.carrier }}</span>
          </div>
        </div>

        <div class="sm:text-right">
          <span class="px-3 py-1 rounded-full text-xs font-bold bg-cyan-950 text-cyan-400 border border-cyan-500/30">
            {{ matchedOrder.status }}
          </span>
          <div class="text-xs text-gray-400 font-mono mt-2">Tracking Code: {{ matchedOrder.trackingNumber }}</div>
        </div>
      </div>

      <!-- Visual Step-by-Step Timeline -->
      <div class="py-4">
        <h3 class="text-xs font-bold uppercase text-gray-400 mb-6 tracking-wider">Logistics Milestones</h3>
        <div class="relative pl-6 border-l-2 border-red-600/40 space-y-8 ml-3">
          <div 
            v-for="(step, idx) in matchedOrder.trackingTimeline" 
            :key="idx"
            class="relative group"
          >
            <!-- Circle Dot Indicator -->
            <div 
              class="absolute -left-[31px] top-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold"
              :class="step.done 
                ? 'bg-red-600 text-white shadow-lg shadow-red-600/50 ring-4 ring-[#12161f]' 
                : 'bg-zinc-800 text-gray-500 ring-4 ring-[#12161f]'"
            >
              <Check v-if="step.done" class="w-3.5 h-3.5" />
              <span v-else class="w-2 h-2 rounded-full bg-gray-500"></span>
            </div>

            <div class="space-y-0.5">
              <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                <div class="text-sm font-bold" :class="step.done ? 'text-white' : 'text-gray-400'">
                  {{ step.title }}
                </div>
                <div class="text-[11px] font-mono text-gray-500">{{ step.time }}</div>
              </div>
              <p class="text-xs text-gray-400">{{ step.desc }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Items in this shipment -->
      <div class="pt-4 border-t border-gray-800 space-y-3">
        <h4 class="text-xs font-bold uppercase text-gray-400">Shipped Items</h4>
        <div 
          v-for="item in matchedOrder.items" 
          :key="item.id || item.productId"
          class="flex items-center justify-between p-3 rounded-xl bg-zinc-900 border border-gray-800 text-xs"
        >
          <div class="flex items-center space-x-3">
            <img :src="item.product?.images?.[0] || item.image" class="w-10 h-10 rounded-lg object-cover bg-zinc-950" />
            <div>
              <div class="font-bold text-white">{{ item.product?.title || item.title }}</div>
              <div class="text-[10px] text-gray-400">Quantity: {{ item.quantity }}</div>
            </div>
          </div>
          <span class="text-emerald-400 font-bold">In Transit</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { Check } from '@lucide/vue';
import { useUserStore } from '../stores/userStore';

const route = useRoute();
const userStore = useUserStore();

const trackingQuery = ref('');

onMounted(() => {
  if (route.query.id) {
    trackingQuery.value = route.query.id;
  } else if (userStore.orders.length) {
    trackingQuery.value = userStore.orders[0].id;
  }
});

const matchedOrder = computed(() => {
  if (!trackingQuery.value) return userStore.orders[0] || null;
  const q = trackingQuery.value.trim().toUpperCase();
  const match = userStore.orders.find(o => 
    o.id.toUpperCase().includes(q) || 
    (o.trackingNumber && o.trackingNumber.toUpperCase().includes(q))
  );
  return match || userStore.orders[0];
});

function searchOrder() {
  // computed reactive query updates view
}
</script>

