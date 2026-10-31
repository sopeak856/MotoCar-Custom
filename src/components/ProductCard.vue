<template>
  <div class="group relative bg-[#12161f] border border-gray-800/80 hover:border-red-500/50 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-red-950/20 flex flex-col justify-between">
    <!-- Top Image Container -->
    <div class="relative w-full aspect-[4/3] bg-zinc-950 overflow-hidden">
      <router-link :to="`/product/${product.id}`" class="block w-full h-full">
        <img 
          :src="product.images[0]" 
          :alt="product.title" 
          class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
      </router-link>

      <!-- Wishlist Button -->
      <button 
        @click.prevent="wishlistStore.toggleWishlist(product.id)" 
        class="absolute top-3 right-3 p-2 rounded-xl bg-black/60 backdrop-blur-md border border-white/10 text-gray-300 hover:text-red-500 transition-colors z-10 cursor-pointer"
        :class="{ 'text-red-500 bg-red-950/40 border-red-500/30': wishlistStore.isInWishlist(product.id) }"
        title="Save to Wishlist"
      >
        <Heart class="w-4 h-4" :class="{ 'fill-current': wishlistStore.isInWishlist(product.id) }" />
      </button>

      <!-- Category / Vehicle Type Pill -->
      <div class="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
        <span class="px-2 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider bg-black/75 backdrop-blur-md text-gray-300 border border-white/10 flex items-center space-x-1">
          <Bike v-if="product.vehicleType === 'moto'" class="w-3 h-3 text-red-400" />
          <Car v-else-if="product.vehicleType === 'car'" class="w-3 h-3 text-cyan-400" />
          <Wrench v-else class="w-3 h-3 text-amber-400" />
          <span>{{ product.brand }}</span>
        </span>

        <span 
          v-if="product.isPromotion" 
          class="px-2 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider bg-red-600 text-white shadow-md shadow-red-600/40"
        >
          {{ product.promoDiscountPercent }}% OFF
        </span>

        <span 
          v-if="userStore.isB2B && product.b2bTiers" 
          class="px-2 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider bg-amber-500 text-black shadow-md"
        >
          B2B BULK TIER
        </span>
      </div>

      <!-- Live Fitment Badge Overlay -->
      <div class="absolute bottom-2 left-2 right-2 z-10">
        <div 
          v-if="fitmentResult.status === 'guaranteed'"
          class="flex items-center space-x-1.5 px-2.5 py-1 rounded-lg bg-emerald-950/90 border border-emerald-500/40 text-emerald-300 text-[10px] font-bold backdrop-blur-md"
        >
          <CheckCircle2 class="w-3 h-3 text-emerald-400 shrink-0" />
          <span class="truncate">{{ fitmentResult.text }}</span>
        </div>
        <div 
          v-else-if="fitmentResult.status === 'incompatible'"
          class="flex items-center space-x-1.5 px-2.5 py-1 rounded-lg bg-rose-950/90 border border-rose-500/40 text-rose-300 text-[10px] font-bold backdrop-blur-md"
        >
          <AlertCircle class="w-3 h-3 text-rose-400 shrink-0" />
          <span class="truncate">{{ fitmentResult.text }}</span>
        </div>
        <div 
          v-else-if="fitmentResult.status === 'universal'"
          class="flex items-center space-x-1.5 px-2.5 py-1 rounded-lg bg-sky-950/80 border border-sky-500/30 text-sky-300 text-[10px] font-semibold backdrop-blur-md"
        >
          <Sparkles class="w-3 h-3 text-sky-400 shrink-0" />
          <span class="truncate">Universal Fitment</span>
        </div>
      </div>
    </div>

    <!-- Product Details Content -->
    <div class="p-4 flex-1 flex flex-col justify-between space-y-3">
      <div>
        <div class="flex items-center justify-between text-xs text-gray-400 mb-1">
          <div class="flex items-center space-x-1 text-amber-400">
            <Star class="w-3.5 h-3.5 fill-current" />
            <span class="font-bold text-white">{{ product.rating }}</span>
            <span class="text-gray-500">({{ product.reviewCount }})</span>
          </div>

          <span class="text-[10px] font-medium" :class="product.inStock ? 'text-emerald-400' : 'text-gray-500'">
            {{ product.inStock ? 'In Stock (Cambodia)' : 'Pre-order' }}
          </span>
        </div>

        <router-link :to="`/product/${product.id}`" class="block group-hover:text-red-400 transition-colors">
          <h3 class="text-sm font-bold text-white line-clamp-2 leading-snug">
            {{ product.title }}
          </h3>
        </router-link>

        <p class="text-[11px] text-gray-400 line-clamp-1 mt-1 font-khmer">
          {{ product.titleKh }}
        </p>
      </div>

      <!-- Pricing Block -->
      <div class="pt-2 border-t border-gray-800/80">
        <!-- B2C Mode Pricing -->
        <div v-if="!userStore.isB2B" class="flex items-baseline justify-between">
          <div>
            <div class="text-base font-black text-white font-mono">
              ${{ product.retailPrice.toLocaleString() }}
            </div>
            <div class="text-[10px] text-gray-500 font-mono">
              ≈ {{ (product.retailPrice * 4100).toLocaleString() }} ៛
            </div>
          </div>

          <div v-if="product.b2bTiers" class="text-right">
            <span class="text-[9px] uppercase font-bold text-amber-400 bg-amber-500/10 px-1.5 py-0.5 rounded border border-amber-500/20">
              B2B From ${{ product.b2bTiers[product.b2bTiers.length - 1].price }}
            </span>
          </div>
        </div>

        <!-- B2B Mode Wholesale Pricing -->
        <div v-else class="space-y-1">
          <div class="flex items-baseline justify-between">
            <div>
              <span class="text-[10px] uppercase font-bold text-amber-400 block">Wholesale (1 unit)</span>
              <span class="text-base font-black text-amber-300 font-mono">
                ${{ product.b2bTiers ? product.b2bTiers[0].price : Math.round(product.retailPrice * 0.85) }}
              </span>
            </div>
            <div class="text-right">
              <span class="text-[10px] uppercase font-bold text-emerald-400 block">Tier Max Bulk</span>
              <span class="text-sm font-black text-emerald-400 font-mono">
                ${{ product.b2bTiers ? product.b2bTiers[product.b2bTiers.length - 1].price : Math.round(product.retailPrice * 0.75) }}
              </span>
            </div>
          </div>
          <div class="text-[10px] text-gray-400 flex justify-between">
            <span>MOQ: {{ product.b2bMoq || 1 }} pcs</span>
            <span>Retail MSRP: ${{ product.retailPrice }}</span>
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="mt-3 flex items-center gap-2">
          <button 
            @click="handleAddToCart"
            class="flex-1 py-2 px-3 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs flex items-center justify-center space-x-1.5 shadow-lg shadow-red-600/20 transition-all cursor-pointer"
          >
            <ShoppingCart class="w-3.5 h-3.5" />
            <span>Add to Cart</span>
          </button>

          <router-link 
            :to="`/product/${product.id}`"
            class="p-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-gray-300 hover:text-white transition-colors cursor-pointer"
            title="Inspect Specifications & Fitment"
          >
            <Eye class="w-4 h-4" />
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { Heart, ShoppingCart, Eye, Star, CheckCircle2, AlertCircle, Sparkles, Bike, Car, Wrench } from '@lucide/vue';
import { useVehicleStore } from '../stores/vehicleStore';
import { useCartStore } from '../stores/cartStore';
import { useWishlistStore } from '../stores/wishlistStore';
import { useUserStore } from '../stores/userStore';

const props = defineProps({
  product: {
    type: Object,
    required: true
  }
});

const vehicleStore = useVehicleStore();
const cartStore = useCartStore();
const wishlistStore = useWishlistStore();
const userStore = useUserStore();

const fitmentResult = computed(() => {
  return vehicleStore.checkFitment(props.product);
});

function handleAddToCart() {
  const qty = userStore.isB2B ? (props.product.b2bMoq || 1) : 1;
  cartStore.addToCart(props.product, qty);
}
</script>

