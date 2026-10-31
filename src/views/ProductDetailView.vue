<template>
  <div v-if="product" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12 text-left">
    <!-- Breadcrumbs -->
    <div class="flex items-center space-x-2 text-xs text-gray-500">
      <router-link to="/" class="hover:text-gray-300">Home</router-link>
      <span>/</span>
      <router-link to="/shop" class="hover:text-gray-300">Catalog</router-link>
      <span>/</span>
      <span class="text-gray-300 font-semibold truncate max-w-sm">{{ product.title }}</span>
    </div>

    <!-- Main Product Section: Gallery + Action Block -->
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-10">
      <!-- Left Column: Image Gallery (5 Cols) -->
      <div class="lg:col-span-6 space-y-4">
        <!-- Main Large Image Container -->
        <div class="relative w-full aspect-[4/3] rounded-3xl bg-zinc-950 border border-gray-800 overflow-hidden shadow-2xl group">
          <img 
            :src="activeImage" 
            :alt="product.title" 
            class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />

          <!-- Wishlist Toggle -->
          <button 
            @click="wishlistStore.toggleWishlist(product.id)"
            class="absolute top-4 right-4 p-3 rounded-2xl bg-black/60 backdrop-blur-md border border-white/10 text-gray-300 hover:text-red-500 transition-colors cursor-pointer"
            :class="{ 'text-red-500 bg-red-950/60 border-red-500/40': wishlistStore.isInWishlist(product.id) }"
          >
            <Heart class="w-5 h-5" :class="{ 'fill-current': wishlistStore.isInWishlist(product.id) }" />
          </button>

          <!-- Badges Overlay -->
          <div class="absolute top-4 left-4 flex flex-col gap-2">
            <span class="px-3 py-1 rounded-lg text-xs font-black uppercase tracking-wider bg-black/80 backdrop-blur-md text-red-400 border border-white/10">
              {{ product.brand }}
            </span>
            <span v-if="product.isPromotion" class="px-3 py-1 rounded-lg text-xs font-black uppercase tracking-wider bg-red-600 text-white shadow-lg shadow-red-600/30">
              PROMO -{{ product.promoDiscountPercent }}%
            </span>
          </div>
        </div>

        <!-- Thumbnail Row -->
        <div class="flex items-center gap-3 overflow-x-auto pb-2">
          <div 
            v-for="(img, idx) in product.images" 
            :key="idx"
            @click="activeImage = img"
            class="w-20 h-20 rounded-xl overflow-hidden border-2 cursor-pointer transition-all shrink-0"
            :class="activeImage === img ? 'border-red-500 shadow-lg shadow-red-500/20' : 'border-gray-800 opacity-60 hover:opacity-100'"
          >
            <img :src="img" :alt="product.title" class="w-full h-full object-cover" />
          </div>
        </div>

        <!-- Authenticity & Certified Guarantee Box -->
        <div class="p-4 rounded-2xl bg-[#12161f] border border-gray-800/80 grid grid-cols-2 gap-4 text-xs">
          <div class="flex items-center space-x-3">
            <ShieldCheck class="w-5 h-5 text-emerald-400 shrink-0" />
            <div>
              <div class="font-bold text-white">100% Genuine Guaranteed</div>
              <div class="text-[11px] text-gray-400">Direct factory warranty in Cambodia</div>
            </div>
          </div>
          <div class="flex items-center space-x-3">
            <Truck class="w-5 h-5 text-cyan-400 shrink-0" />
            <div>
              <div class="font-bold text-white">Express Delivery</div>
              <div class="text-[11px] text-gray-400">Phnom Penh & 24 Provinces via VET</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Right Column: Product Specs, Fitment Checker, Pricing & Actions (6 Cols) -->
      <div class="lg:col-span-6 space-y-6">
        <div>
          <!-- Rating & Brand Header -->
          <div class="flex items-center space-x-3 text-xs mb-2">
            <div class="flex items-center space-x-1 text-amber-400">
              <Star class="w-4 h-4 fill-current" />
              <span class="font-bold text-white">{{ product.rating }}</span>
              <span class="text-gray-500">({{ product.reviewCount }} customer reviews)</span>
            </div>
            <span>•</span>
            <span class="text-gray-400 font-mono">SKU: {{ product.id }}</span>
          </div>

          <h1 class="text-2xl sm:text-3xl font-black text-white tracking-tight uppercase">
            {{ product.title }}
          </h1>

          <p class="text-sm text-gray-400 font-khmer mt-1">
            {{ product.titleKh }}
          </p>
        </div>

        <!-- INTERACTIVE VEHICLE FITMENT CHECKER WIDGET -->
        <div class="p-4 sm:p-5 rounded-2xl border transition-all" :class="fitmentBoxClass">
          <div class="flex items-start justify-between gap-3">
            <div class="flex items-start space-x-3">
              <div class="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 mt-0.5" :class="fitmentIconBg">
                <CheckCircle2 v-if="fitmentResult.status === 'guaranteed'" class="w-5 h-5 text-emerald-400" />
                <AlertCircle v-else-if="fitmentResult.status === 'incompatible'" class="w-5 h-5 text-rose-400" />
                <Sparkles v-else class="w-5 h-5 text-sky-400" />
              </div>
              <div>
                <div class="text-xs font-bold uppercase tracking-wider" :class="fitmentTextColor">
                  Vehicle Fitment Status
                </div>
                <div class="text-sm font-bold text-white mt-0.5">
                  {{ fitmentResult.text }}
                </div>
                <div class="text-xs font-khmer text-gray-400 mt-0.5">
                  {{ fitmentResult.textKh }}
                </div>
              </div>
            </div>

            <button 
              @click="isVehicleModalOpen = true"
              class="px-3 py-1.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-xs font-bold text-gray-200 transition-colors shrink-0 cursor-pointer"
            >
              Change Vehicle
            </button>
          </div>
        </div>

        <!-- PRICING CARD (B2C & B2B Switchable) -->
        <div class="p-5 rounded-2xl bg-[#12161f] border border-gray-800/80 space-y-4">
          <!-- B2C Retail Price -->
          <div class="flex items-baseline justify-between border-b border-gray-800 pb-3">
            <div>
              <div class="text-xs text-gray-400 font-semibold uppercase">Retail Price (B2C)</div>
              <div class="text-3xl font-black text-white font-mono mt-0.5">
                ${{ product.retailPrice.toLocaleString() }}
              </div>
              <div class="text-xs text-gray-500 font-mono">
                ≈ {{ (product.retailPrice * 4100).toLocaleString() }} KHR (៛) • VAT Included
              </div>
            </div>

            <div class="text-right">
              <span class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold" :class="product.inStock ? 'bg-emerald-950 text-emerald-400 border border-emerald-500/30' : 'bg-zinc-800 text-gray-400'">
                <span class="w-2 h-2 rounded-full mr-1.5" :class="product.inStock ? 'bg-emerald-500 animate-ping' : 'bg-gray-500'"></span>
                {{ product.inStock ? `${product.stockCount} Available in Phnom Penh` : 'Backorder Available' }}
              </span>
            </div>
          </div>

          <!-- B2B WHOLESALE TIER PRICING TABLE -->
          <div v-if="product.b2bTiers" class="space-y-2 pt-1">
            <div class="flex items-center justify-between">
              <span class="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center space-x-1.5">
                <Layers class="w-3.5 h-3.5" />
                <span>B2B Wholesale Tier Pricing (For Garages & Shops)</span>
              </span>
              <span class="text-[10px] text-gray-500 font-mono">MOQ: {{ product.b2bMoq || 1 }} Units</span>
            </div>

            <div class="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <div 
                v-for="tier in product.b2bTiers" 
                :key="tier.minQty"
                class="p-2.5 rounded-xl border text-center transition-all"
                :class="selectedQty >= tier.minQty && userStore.isB2B 
                  ? 'bg-amber-500/20 border-amber-500 text-white shadow-md' 
                  : 'bg-zinc-900 border-gray-800 text-gray-300'"
              >
                <div class="text-[10px] text-gray-400 font-bold uppercase">{{ tier.minQty }}+ units</div>
                <div class="text-sm font-black font-mono text-amber-300">${{ tier.price }}</div>
                <div class="text-[9px] text-emerald-400 font-bold">
                  Save {{ Math.round((1 - tier.price / product.retailPrice) * 100) }}%
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- ACTIONS & QUANTITY SELECTOR -->
        <div class="space-y-4">
          <!-- Quantity Row -->
          <div class="flex items-center space-x-4">
            <span class="text-xs font-bold uppercase text-gray-400">Quantity:</span>
            <div class="flex items-center border border-gray-700 rounded-xl bg-zinc-900 overflow-hidden">
              <button 
                @click="decrementQty"
                class="p-2.5 hover:bg-zinc-800 text-gray-400 hover:text-white transition-colors cursor-pointer"
              >
                <Minus class="w-4 h-4" />
              </button>
              <input 
                type="number" 
                v-model.number="selectedQty"
                class="w-16 bg-transparent text-center font-mono font-bold text-sm text-white focus:outline-none"
                min="1"
              />
              <button 
                @click="incrementQty"
                class="p-2.5 hover:bg-zinc-800 text-gray-400 hover:text-white transition-colors cursor-pointer"
              >
                <Plus class="w-4 h-4" />
              </button>
            </div>

            <!-- Optional Installation Addon Checkbox -->
            <label class="flex items-center space-x-2 text-xs text-cyan-300 cursor-pointer bg-cyan-950/30 border border-cyan-500/30 px-3 py-2 rounded-xl">
              <input 
                type="checkbox" 
                v-model="includeInstallation"
                class="rounded bg-zinc-900 border-gray-700 text-cyan-500 focus:ring-cyan-500 w-4 h-4"
              />
              <span class="font-bold">+ Add Certified Installation (+${{ product.installationFee || 50 }})</span>
            </label>
          </div>

          <!-- Main CTA Buttons -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <!-- Add to Cart -->
            <button 
              @click="handleAddToCart"
              class="py-3.5 px-6 rounded-2xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-extrabold text-sm uppercase tracking-wider shadow-xl shadow-red-600/30 flex items-center justify-center space-x-2 transition-all cursor-pointer"
            >
              <ShoppingCart class="w-5 h-5" />
              <span>Add to Cart</span>
            </button>

            <!-- Book Installation directly -->
            <button 
              @click="isInstallationModalOpen = true"
              class="py-3.5 px-6 rounded-2xl bg-cyan-600/20 hover:bg-cyan-600 text-cyan-300 hover:text-white border border-cyan-500/40 font-extrabold text-sm uppercase tracking-wider flex items-center justify-center space-x-2 transition-all cursor-pointer"
            >
              <Wrench class="w-5 h-5" />
              <span>Book Installation</span>
            </button>
          </div>

          <!-- B2B RFQ Button -->
          <button 
            @click="isRfqModalOpen = true"
            class="w-full py-3 rounded-2xl bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-amber-300 font-extrabold text-xs uppercase tracking-wider flex items-center justify-center space-x-2 transition-all cursor-pointer"
          >
            <Layers class="w-4 h-4" />
            <span>Request for Bulk Quotation (RFQ)</span>
          </button>
        </div>
      </div>
    </div>

    <!-- SPECIFICATIONS & COMPATIBLE DETAILS TABS -->
    <div class="bg-[#12161f] border border-gray-800/80 rounded-3xl p-6 sm:p-8 space-y-6">
      <div class="flex items-center space-x-4 border-b border-gray-800 pb-4 text-sm font-bold">
        <button 
          @click="activeTab = 'specs'" 
          class="pb-2 relative transition-colors cursor-pointer"
          :class="activeTab === 'specs' ? 'text-red-500 border-b-2 border-red-500' : 'text-gray-400 hover:text-white'"
        >
          Technical Specifications
        </button>

        <button 
          @click="activeTab = 'vehicles'" 
          class="pb-2 relative transition-colors cursor-pointer"
          :class="activeTab === 'vehicles' ? 'text-red-500 border-b-2 border-red-500' : 'text-gray-400 hover:text-white'"
        >
          Vehicle Compatibility List
        </button>

        <button 
          @click="activeTab = 'reviews'" 
          class="pb-2 relative transition-colors cursor-pointer"
          :class="activeTab === 'reviews' ? 'text-red-500 border-b-2 border-red-500' : 'text-gray-400 hover:text-white'"
        >
          Reviews ({{ product.reviewCount }})
        </button>
      </div>

      <!-- Tab 1: Specifications -->
      <div v-if="activeTab === 'specs'" class="space-y-6">
        <p class="text-sm text-gray-300 leading-relaxed max-w-4xl">
          {{ product.description }}
        </p>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
          <div 
            v-for="(val, key) in product.specifications" 
            :key="key"
            class="p-3 rounded-xl bg-zinc-900/60 border border-gray-800 flex justify-between items-center text-xs"
          >
            <span class="text-gray-400 font-medium">{{ key }}</span>
            <span class="font-bold text-white font-mono">{{ val }}</span>
          </div>
        </div>
      </div>

      <!-- Tab 2: Vehicle Compatibility List -->
      <div v-else-if="activeTab === 'vehicles'" class="space-y-4">
        <p class="text-xs text-gray-400">
          Engineered for exact bolt-on tolerances. The following vehicles are verified for seamless fitment without chassis cutting:
        </p>

        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          <div 
            v-for="(cv, idx) in product.compatibleVehicles" 
            :key="idx"
            class="p-3.5 rounded-xl bg-zinc-900 border border-gray-800 flex items-center space-x-3"
          >
            <CheckCircle2 class="w-4 h-4 text-emerald-400 shrink-0" />
            <div>
              <div class="text-xs font-bold text-white">{{ cv.make }} {{ cv.model }}</div>
              <div class="text-[10px] text-gray-400 font-mono">
                Years: {{ cv.years ? cv.years.join(', ') : 'All Years' }}
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Tab 3: Reviews -->
      <div v-else-if="activeTab === 'reviews'" class="space-y-6">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div class="p-4 rounded-xl bg-zinc-900 border border-gray-800 text-center space-y-1">
            <div class="text-3xl font-black text-amber-400 font-mono">{{ product.rating }}</div>
            <div class="flex justify-center text-amber-400">
              <Star class="w-4 h-4 fill-current" />
              <Star class="w-4 h-4 fill-current" />
              <Star class="w-4 h-4 fill-current" />
              <Star class="w-4 h-4 fill-current" />
              <Star class="w-4 h-4 fill-current" />
            </div>
            <div class="text-xs text-gray-400">{{ product.reviewCount }} verified owner reviews</div>
          </div>

          <div class="md:col-span-2 space-y-3">
            <div class="p-3.5 rounded-xl bg-zinc-900/60 border border-gray-800 space-y-1">
              <div class="flex items-center justify-between text-xs">
                <span class="font-bold text-white">Vireak Chea (Phnom Penh)</span>
                <span class="text-emerald-400 text-[10px] font-bold">✓ Verified Purchase</span>
              </div>
              <div class="text-xs text-gray-300">
                "Installed at Apex Performance in Tuol Kork. The sound is breathtaking and Dyno verified +14 HP gain. Top tier quality!"
              </div>
            </div>

            <div class="p-3.5 rounded-xl bg-zinc-900/60 border border-gray-800 space-y-1">
              <div class="flex items-center justify-between text-xs">
                <span class="font-bold text-white">Bona K. (Siem Reap)</span>
                <span class="text-emerald-400 text-[10px] font-bold">✓ Verified Purchase</span>
              </div>
              <div class="text-xs text-gray-300">
                "Delivered via Virak Buntham to Siem Reap within 24 hours. Packaging was bulletproof with all gaskets and hardware."
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- COMPATIBLE ACCESSORIES / FREQUENTLY BOUGHT TOGETHER -->
    <div class="space-y-6">
      <div class="flex items-center justify-between">
        <div>
          <h2 class="text-xl font-black text-white uppercase tracking-tight">Recommended Accessories & Hardware</h2>
          <p class="text-xs text-gray-400">Frequently paired with this upgrade</p>
        </div>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <ProductCard 
          v-for="acc in relatedProducts" 
          :key="acc.id" 
          :product="acc" 
        />
      </div>
    </div>

    <!-- Modals -->
    <RFQModal 
      v-if="isRfqModalOpen" 
      :product="product" 
      @close="isRfqModalOpen = false" 
      @submitted="onRfqSubmitted"
    />

    <InstallationModal 
      v-if="isInstallationModalOpen" 
      :product="product" 
      @close="isInstallationModalOpen = false" 
    />

    <VehicleSelectorModal 
      v-if="isVehicleModalOpen" 
      @close="isVehicleModalOpen = false" 
    />
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { 
  Heart, ShoppingCart, Wrench, Layers, Star, CheckCircle2, 
  AlertCircle, Sparkles, ShieldCheck, Truck, Minus, Plus 
} from '@lucide/vue';
import { PRODUCTS } from '../data/mockData';
import { useVehicleStore } from '../stores/vehicleStore';
import { useCartStore } from '../stores/cartStore';
import { useWishlistStore } from '../stores/wishlistStore';
import { useUserStore } from '../stores/userStore';
import ProductCard from '../components/ProductCard.vue';
import RFQModal from '../components/RFQModal.vue';
import InstallationModal from '../components/InstallationModal.vue';
import VehicleSelectorModal from '../components/VehicleSelectorModal.vue';

const route = useRoute();
const router = useRouter();
const vehicleStore = useVehicleStore();
const cartStore = useCartStore();
const wishlistStore = useWishlistStore();
const userStore = useUserStore();

const product = computed(() => {
  return PRODUCTS.find(p => p.id === route.params.id) || PRODUCTS[0];
});

const activeImage = ref(product.value?.images[0] || '');
watch(product, (newP) => {
  if (newP) activeImage.value = newP.images[0];
}, { immediate: true });

const selectedQty = ref(1);
const includeInstallation = ref(false);
const activeTab = ref('specs');

const isRfqModalOpen = ref(false);
const isInstallationModalOpen = ref(false);
const isVehicleModalOpen = ref(false);

const fitmentResult = computed(() => {
  return vehicleStore.checkFitment(product.value);
});

const fitmentBoxClass = computed(() => {
  if (fitmentResult.value.status === 'guaranteed') return 'bg-emerald-950/30 border-emerald-500/40';
  if (fitmentResult.value.status === 'incompatible') return 'bg-rose-950/30 border-rose-500/40';
  return 'bg-zinc-900 border-gray-800';
});

const fitmentIconBg = computed(() => {
  if (fitmentResult.value.status === 'guaranteed') return 'bg-emerald-600/20';
  if (fitmentResult.value.status === 'incompatible') return 'bg-rose-600/20';
  return 'bg-sky-600/20';
});

const fitmentTextColor = computed(() => {
  if (fitmentResult.value.status === 'guaranteed') return 'text-emerald-400';
  if (fitmentResult.value.status === 'incompatible') return 'text-rose-400';
  return 'text-sky-400';
});

function incrementQty() {
  selectedQty.value++;
}

function decrementQty() {
  if (selectedQty.value > 1) selectedQty.value--;
}

function handleAddToCart() {
  cartStore.addToCart(
    product.value, 
    selectedQty.value, 
    includeInstallation.value, 
    includeInstallation.value ? 'Apex Performance Tuning & Dyno Lab' : null,
    vehicleStore.activeVehicle ? `${vehicleStore.activeVehicle.year} ${vehicleStore.activeVehicle.make} ${vehicleStore.activeVehicle.model}` : ''
  );
  router.push('/cart');
}

const relatedProducts = computed(() => {
  return PRODUCTS.filter(p => p.id !== product.value.id).slice(0, 4);
});

function onRfqSubmitted() {
  alert('Your wholesale RFQ has been submitted! You can review it in your My Account -> RFQ Management dashboard.');
}
</script>

