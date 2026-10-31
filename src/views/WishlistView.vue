<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 text-left">
    <!-- Header -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h1 class="text-3xl font-black text-white uppercase tracking-tight">Wishlist & My Garage</h1>
        <p class="text-xs text-gray-400 mt-1">Manage your saved performance parts and registered vehicles.</p>
      </div>

      <!-- Tabs Switcher -->
      <div class="flex items-center space-x-2 bg-zinc-900 p-1.5 rounded-2xl border border-gray-800 text-xs font-bold">
        <button 
          @click="activeTab = 'items'"
          class="px-4 py-2 rounded-xl flex items-center space-x-2 transition-all cursor-pointer"
          :class="activeTab === 'items' ? 'bg-red-600 text-white shadow-md' : 'text-gray-400 hover:text-white'"
        >
          <Heart class="w-4 h-4" />
          <span>Saved Items ({{ wishlistStore.itemIds.length }})</span>
        </button>

        <button 
          @click="activeTab = 'garage'"
          class="px-4 py-2 rounded-xl flex items-center space-x-2 transition-all cursor-pointer"
          :class="activeTab === 'garage' ? 'bg-red-600 text-white shadow-md' : 'text-gray-400 hover:text-white'"
        >
          <Car class="w-4 h-4" />
          <span>My Garage ({{ vehicleStore.garageVehicles.length }})</span>
        </button>
      </div>
    </div>

    <!-- TAB 1: SAVED ITEMS -->
    <div v-if="activeTab === 'items'" class="space-y-6">
      <div v-if="savedProducts.length" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div 
          v-for="p in savedProducts" 
          :key="p.id"
          class="bg-[#12161f] border border-gray-800 rounded-2xl overflow-hidden flex flex-col justify-between"
        >
          <div class="relative aspect-[4/3] bg-zinc-950">
            <img :src="p.images[0]" :alt="p.title" class="w-full h-full object-cover" />
            <button 
              @click="wishlistStore.removeFromWishlist(p.id)"
              class="absolute top-2 right-2 p-2 rounded-xl bg-black/60 text-red-500 hover:bg-black/90 transition-colors cursor-pointer"
            >
              <Trash2 class="w-4 h-4" />
            </button>
          </div>

          <div class="p-4 space-y-3 flex-1 flex flex-col justify-between">
            <div>
              <div class="text-[10px] text-gray-500 font-mono">{{ p.brand }}</div>
              <router-link :to="`/product/${p.id}`" class="text-sm font-bold text-white hover:text-red-400 transition-colors line-clamp-2">
                {{ p.title }}
              </router-link>
              <div class="text-base font-black font-mono text-white mt-2">${{ p.retailPrice }}</div>
            </div>

            <div class="flex items-center gap-2 pt-2 border-t border-gray-800">
              <button 
                @click="cartStore.addToCart(p, 1); wishlistStore.removeFromWishlist(p.id)"
                class="flex-1 py-2 px-3 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-bold flex items-center justify-center space-x-1 transition-colors cursor-pointer"
              >
                <ShoppingCart class="w-3.5 h-3.5" />
                <span>Move to Cart</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div v-else class="text-center py-16 bg-[#12161f] border border-gray-800 rounded-3xl p-8 space-y-4">
        <Heart class="w-12 h-12 text-gray-600 mx-auto" />
        <h3 class="text-lg font-bold text-white">Your Wishlist is Empty</h3>
        <p class="text-xs text-gray-400">Save your favorite exhausts, brakes, and aero parts to track pricing and fitment.</p>
        <router-link to="/shop" class="inline-block px-5 py-2.5 rounded-xl bg-red-600 text-white text-xs font-bold uppercase tracking-wider">
          Explore Performance Shop
        </router-link>
      </div>
    </div>

    <!-- TAB 2: MY GARAGE (SAVED VEHICLES) -->
    <div v-else class="space-y-6">
      <div class="flex items-center justify-between">
        <div>
          <h2 class="text-lg font-bold text-white">Registered Vehicles in Your Garage</h2>
          <p class="text-xs text-gray-400">Set an active vehicle to automatically filter 100% compatible upgrades.</p>
        </div>

        <button 
          @click="isVehicleModalOpen = true"
          class="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-bold flex items-center space-x-1.5 transition-colors cursor-pointer"
        >
          <Plus class="w-4 h-4" />
          <span>Add Another Ride</span>
        </button>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div 
          v-for="v in vehicleStore.garageVehicles" 
          :key="v.id"
          class="p-6 rounded-3xl border transition-all text-left relative flex flex-col justify-between"
          :class="vehicleStore.activeVehicle?.id === v.id ? 'bg-[#12161f] border-red-500 shadow-xl shadow-red-950/30' : 'bg-[#12161f] border-gray-800'"
        >
          <div>
            <div class="flex items-start justify-between">
              <div class="flex items-center space-x-3">
                <div class="w-12 h-12 rounded-2xl bg-zinc-900 border border-gray-700 flex items-center justify-center text-red-500">
                  <Car v-if="v.type === 'car'" class="w-6 h-6" />
                  <Bike v-else class="w-6 h-6" />
                </div>
                <div>
                  <div class="text-xs font-bold text-red-400 uppercase tracking-widest">{{ v.make }}</div>
                  <h3 class="text-lg font-black text-white">{{ v.year }} {{ v.model }}</h3>
                  <div class="text-xs text-gray-400 font-mono">{{ v.nickname || 'Personal Vehicle' }}</div>
                </div>
              </div>

              <span 
                v-if="vehicleStore.activeVehicle?.id === v.id"
                class="px-2.5 py-1 rounded-full text-[10px] font-black bg-red-600 text-white uppercase tracking-wider"
              >
                PRIMARY FITMENT
              </span>
            </div>

            <!-- Vehicle Specs List -->
            <div class="grid grid-cols-2 gap-2 mt-5 text-xs">
              <div class="p-2.5 rounded-xl bg-zinc-900/60 border border-gray-800">
                <span class="text-gray-500 block text-[10px]">Engine</span>
                <span class="text-gray-200 font-mono font-semibold">{{ v.engine }}</span>
              </div>
              <div class="p-2.5 rounded-xl bg-zinc-900/60 border border-gray-800">
                <span class="text-gray-500 block text-[10px]">License Plate</span>
                <span class="text-gray-200 font-mono font-semibold">{{ v.plateNumber || 'Pending Registration' }}</span>
              </div>
            </div>
          </div>

          <!-- Actions -->
          <div class="flex items-center justify-between gap-3 mt-6 pt-4 border-t border-gray-800">
            <button 
              @click="vehicleStore.selectActiveVehicle(v); $router.push({ path: '/shop', query: { vehicleType: v.type } })"
              class="px-4 py-2 rounded-xl bg-red-600/10 hover:bg-red-600/20 text-red-400 border border-red-500/30 text-xs font-bold transition-all cursor-pointer"
            >
              Browse Compatible Upgrades →
            </button>

            <div class="flex items-center space-x-2">
              <button 
                v-if="vehicleStore.activeVehicle?.id !== v.id"
                @click="vehicleStore.setPrimaryVehicle(v.id)"
                class="px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-gray-300 text-xs font-semibold cursor-pointer"
              >
                Set Primary
              </button>
              <button 
                @click="vehicleStore.removeVehicleFromGarage(v.id)"
                class="p-2 text-gray-500 hover:text-red-400 transition-colors cursor-pointer"
              >
                <Trash2 class="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Vehicle Selector Modal -->
    <VehicleSelectorModal 
      v-if="isVehicleModalOpen" 
      @close="isVehicleModalOpen = false" 
    />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRoute } from 'vue-router';
import { Heart, Car, Bike, Plus, Trash2, ShoppingCart } from '@lucide/vue';
import { PRODUCTS } from '../data/mockData';
import { useWishlistStore } from '../stores/wishlistStore';
import { useVehicleStore } from '../stores/vehicleStore';
import { useCartStore } from '../stores/cartStore';
import VehicleSelectorModal from '../components/VehicleSelectorModal.vue';

const route = useRoute();
const wishlistStore = useWishlistStore();
const vehicleStore = useVehicleStore();
const cartStore = useCartStore();

const activeTab = ref(route.query.tab === 'garage' ? 'garage' : 'items');
const isVehicleModalOpen = ref(false);

const savedProducts = computed(() => {
  return PRODUCTS.filter(p => wishlistStore.itemIds.includes(p.id));
});
</script>

