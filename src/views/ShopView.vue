<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 text-left">
    <!-- Breadcrumb & Header Title -->
    <div>
      <div class="flex items-center space-x-2 text-xs text-gray-500 mb-2">
        <router-link to="/" class="hover:text-gray-300">Home</router-link>
        <span>/</span>
        <span class="text-gray-300 font-semibold">Performance Catalog</span>
      </div>
      <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 class="text-3xl font-black text-white uppercase tracking-tight font-sans">
            {{ pageTitle }}
          </h1>
          <p class="text-xs text-gray-400 mt-1">
            Displaying {{ filteredProducts.length }} precision components tested for Cambodian roads & racetracks.
          </p>
        </div>

        <!-- Vehicle Fitment Active Bar -->
        <div class="flex items-center space-x-3 bg-zinc-900/90 border border-gray-700/80 p-2.5 rounded-2xl shadow-inner">
          <div class="w-8 h-8 rounded-lg bg-red-600/20 border border-red-500/30 flex items-center justify-center text-red-400 shrink-0">
            <Car v-if="vehicleStore.activeVehicle?.type === 'car'" class="w-4 h-4" />
            <Bike v-else-if="vehicleStore.activeVehicle?.type === 'moto'" class="w-4 h-4" />
            <Wrench v-else class="w-4 h-4" />
          </div>
          <div class="text-xs">
            <div class="text-[10px] text-gray-400 uppercase font-bold">Fitment Checking:</div>
            <div class="text-white font-bold truncate max-w-[200px]">
              {{ vehicleStore.activeVehicle ? `${vehicleStore.activeVehicle.year} ${vehicleStore.activeVehicle.make} ${vehicleStore.activeVehicle.model}` : 'No Vehicle Selected' }}
            </div>
          </div>
          <button 
            @click="isVehicleModalOpen = true"
            class="px-2.5 py-1 text-[11px] font-bold bg-zinc-800 hover:bg-zinc-700 text-gray-200 rounded-lg transition-colors cursor-pointer"
          >
            Change
          </button>
        </div>
      </div>
    </div>

    <!-- Top Mode Filter Bar (All Products / Motorcycle / Car / B2B Wholesale) -->
    <div class="flex flex-wrap items-center justify-between gap-4 bg-zinc-950 p-2 rounded-2xl border border-gray-800/80">
      <div class="flex flex-wrap items-center gap-1.5 text-xs font-bold">
        <button 
          @click="selectCatalogTab('all')"
          class="px-3.5 py-2 rounded-xl transition-all cursor-pointer"
          :class="catalogTab === 'all' ? 'bg-red-600 text-white shadow-md shadow-red-600/30' : 'text-gray-400 hover:text-white hover:bg-zinc-900'"
        >
          All Products
        </button>

        <button 
          @click="selectCatalogTab('moto')"
          class="px-3.5 py-2 rounded-xl flex items-center space-x-1.5 transition-all cursor-pointer"
          :class="catalogTab === 'moto' ? 'bg-red-600 text-white shadow-md shadow-red-600/30' : 'text-gray-400 hover:text-white hover:bg-zinc-900'"
        >
          <Bike class="w-4 h-4" />
          <span>Motorcycle Custom</span>
        </button>

        <button 
          @click="selectCatalogTab('car')"
          class="px-3.5 py-2 rounded-xl flex items-center space-x-1.5 transition-all cursor-pointer"
          :class="catalogTab === 'car' ? 'bg-red-600 text-white shadow-md shadow-red-600/30' : 'text-gray-400 hover:text-white hover:bg-zinc-900'"
        >
          <Car class="w-4 h-4" />
          <span>Car Custom</span>
        </button>

        <button 
          @click="selectCatalogTab('b2b')"
          class="px-3.5 py-2 rounded-xl flex items-center space-x-1.5 transition-all cursor-pointer font-black"
          :class="catalogTab === 'b2b' ? 'bg-amber-500 text-black shadow-md shadow-amber-500/30' : 'bg-amber-500/10 text-amber-400 hover:bg-amber-500/20 border border-amber-500/20'"
        >
          <Layers class="w-4 h-4" />
          <span>B2B Bulk Catalog</span>
        </button>
      </div>

      <!-- Quick Compatibility Switch & Sort -->
      <div class="flex items-center space-x-3 text-xs">
        <!-- Compatible Only Toggle -->
        <label 
          v-if="vehicleStore.activeVehicle"
          class="flex items-center space-x-2 text-xs text-gray-300 cursor-pointer bg-zinc-900 px-3 py-1.5 rounded-xl border border-gray-800"
        >
          <input 
            type="checkbox" 
            v-model="onlyCompatible"
            class="rounded bg-zinc-800 border-gray-700 text-red-600 focus:ring-red-500 w-4 h-4"
          />
          <span class="font-bold text-emerald-400">Guaranteed Fit Only</span>
        </label>

        <!-- Sort Select -->
        <div class="flex items-center space-x-1.5">
          <span class="text-gray-500 font-medium">Sort:</span>
          <select 
            v-model="sortBy"
            class="bg-zinc-900 border border-gray-800 rounded-xl px-2.5 py-1.5 text-xs text-gray-200 focus:outline-none focus:border-red-500"
          >
            <option value="featured">Recommended</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="rating">Highest Rated</option>
            <option value="reviews">Best Seller</option>
          </select>
        </div>
      </div>
    </div>

    <!-- Main Content Grid: Sidebar Filters + Products Grid -->
    <div class="grid grid-cols-1 lg:grid-cols-4 gap-8">
      <!-- Left Filters Sidebar -->
      <div class="space-y-6">
        <!-- Search Input -->
        <div class="bg-[#12161f] border border-gray-800 rounded-2xl p-4">
          <label class="block text-xs font-bold uppercase text-gray-400 mb-2">Search Catalog</label>
          <div class="relative">
            <input 
              v-model="searchQuery"
              type="text" 
              placeholder="Search exhaust, Brembo, turbo..."
              class="w-full bg-zinc-900 border border-gray-700 rounded-xl pl-9 pr-3 py-2 text-xs text-white focus:outline-none focus:border-red-500"
            />
            <Search class="w-3.5 h-3.5 text-gray-500 absolute left-3 top-2.5" />
          </div>
        </div>

        <!-- Category Filter -->
        <div class="bg-[#12161f] border border-gray-800 rounded-2xl p-4">
          <div class="flex items-center justify-between mb-3">
            <h3 class="text-xs font-bold uppercase text-gray-300">Category</h3>
            <button 
              v-if="selectedCategory" 
              @click="selectedCategory = ''"
              class="text-[10px] text-red-400 hover:text-red-300"
            >
              Reset
            </button>
          </div>
          <div class="space-y-1.5">
            <div 
              @click="selectedCategory = ''"
              class="px-2.5 py-1.5 rounded-lg text-xs cursor-pointer flex items-center justify-between transition-colors"
              :class="!selectedCategory ? 'bg-red-600/20 text-red-400 font-bold' : 'text-gray-400 hover:text-white'"
            >
              <span>All Categories</span>
              <span class="text-[10px] font-mono text-gray-500">{{ PRODUCTS.length }}</span>
            </div>

            <div 
              v-for="cat in CATEGORIES" 
              :key="cat.id"
              @click="selectedCategory = cat.id"
              class="px-2.5 py-1.5 rounded-lg text-xs cursor-pointer flex items-center justify-between transition-colors"
              :class="selectedCategory === cat.id ? 'bg-red-600/20 text-red-400 font-bold' : 'text-gray-400 hover:text-white'"
            >
              <span class="truncate">{{ cat.name }}</span>
              <span class="text-[10px] font-mono text-gray-500">{{ cat.count }}</span>
            </div>
          </div>
        </div>

        <!-- Brand Filter -->
        <div class="bg-[#12161f] border border-gray-800 rounded-2xl p-4">
          <div class="flex items-center justify-between mb-3">
            <h3 class="text-xs font-bold uppercase text-gray-300">Brand</h3>
            <button 
              v-if="selectedBrand" 
              @click="selectedBrand = ''"
              class="text-[10px] text-red-400 hover:text-red-300"
            >
              Reset
            </button>
          </div>
          <div class="space-y-1.5 max-h-48 overflow-y-auto">
            <div 
              v-for="brand in allBrands" 
              :key="brand"
              @click="selectedBrand = selectedBrand === brand ? '' : brand"
              class="px-2.5 py-1 rounded-lg text-xs cursor-pointer flex items-center justify-between transition-colors"
              :class="selectedBrand === brand ? 'bg-red-600/20 text-red-400 font-bold' : 'text-gray-400 hover:text-white'"
            >
              <span>{{ brand }}</span>
              <Check v-if="selectedBrand === brand" class="w-3.5 h-3.5 text-red-400" />
            </div>
          </div>
        </div>

        <!-- Max Price Filter -->
        <div class="bg-[#12161f] border border-gray-800 rounded-2xl p-4">
          <div class="flex items-center justify-between mb-2">
            <h3 class="text-xs font-bold uppercase text-gray-300">Max Price</h3>
            <span class="text-xs font-mono font-bold text-red-400">${{ maxPrice }}</span>
          </div>
          <input 
            type="range" 
            min="500" 
            max="9000" 
            step="250"
            v-model.number="maxPrice"
            class="w-full accent-red-600 cursor-pointer"
          />
          <div class="flex justify-between text-[10px] text-gray-500 font-mono mt-1">
            <span>$500</span>
            <span>$9,000</span>
          </div>
        </div>

        <!-- Quick Toggles -->
        <div class="bg-[#12161f] border border-gray-800 rounded-2xl p-4 space-y-2.5">
          <label class="flex items-center space-x-2 text-xs text-gray-300 cursor-pointer">
            <input 
              type="checkbox" 
              v-model="inStockOnly"
              class="rounded bg-zinc-800 border-gray-700 text-red-600 focus:ring-red-500 w-4 h-4"
            />
            <span>In Stock Only (Cambodia)</span>
          </label>

          <label class="flex items-center space-x-2 text-xs text-gray-300 cursor-pointer">
            <input 
              type="checkbox" 
              v-model="installationOnly"
              class="rounded bg-zinc-800 border-gray-700 text-red-600 focus:ring-red-500 w-4 h-4"
            />
            <span>Installation Service Available</span>
          </label>
        </div>
      </div>

      <!-- Products Grid -->
      <div class="lg:col-span-3 space-y-6">
        <!-- Active Filter Tags Bar -->
        <div v-if="hasActiveFilters" class="flex flex-wrap items-center gap-2">
          <span class="text-xs text-gray-500 font-medium">Active Filters:</span>
          
          <span v-if="searchQuery" class="px-2.5 py-1 rounded-full text-xs bg-zinc-800 text-gray-200 border border-gray-700 flex items-center space-x-1">
            <span>"{{ searchQuery }}"</span>
            <X @click="searchQuery = ''" class="w-3 h-3 hover:text-red-400 cursor-pointer" />
          </span>

          <span v-if="selectedCategory" class="px-2.5 py-1 rounded-full text-xs bg-zinc-800 text-gray-200 border border-gray-700 flex items-center space-x-1">
            <span>Category: {{ selectedCategory }}</span>
            <X @click="selectedCategory = ''" class="w-3 h-3 hover:text-red-400 cursor-pointer" />
          </span>

          <span v-if="selectedBrand" class="px-2.5 py-1 rounded-full text-xs bg-zinc-800 text-gray-200 border border-gray-700 flex items-center space-x-1">
            <span>Brand: {{ selectedBrand }}</span>
            <X @click="selectedBrand = ''" class="w-3 h-3 hover:text-red-400 cursor-pointer" />
          </span>

          <button 
            @click="clearAllFilters"
            class="text-xs text-red-400 hover:text-red-300 underline font-semibold ml-2 cursor-pointer"
          >
            Clear All
          </button>
        </div>

        <!-- Product Cards Grid -->
        <div v-if="filteredProducts.length" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <ProductCard 
            v-for="product in filteredProducts" 
            :key="product.id" 
            :product="product" 
          />
        </div>

        <!-- Empty State -->
        <div v-else class="text-center py-16 bg-[#12161f] border border-gray-800 rounded-3xl p-8 space-y-4">
          <div class="w-16 h-16 rounded-2xl bg-zinc-900 border border-gray-700 flex items-center justify-center mx-auto text-gray-500">
            <PackageSearch class="w-8 h-8" />
          </div>
          <h3 class="text-lg font-bold text-white">No Matching Components Found</h3>
          <p class="text-xs text-gray-400 max-w-md mx-auto">
            Try loosening your vehicle compatibility filter, searching a broader term, or reset the filters.
          </p>
          <button 
            @click="clearAllFilters"
            class="px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer"
          >
            Reset All Filters
          </button>
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
import { ref, computed, watch, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { 
  Car, Bike, Wrench, Layers, Search, Check, X, PackageSearch 
} from '@lucide/vue';
import { PRODUCTS, CATEGORIES } from '../data/mockData';
import { useVehicleStore } from '../stores/vehicleStore';
import { useUserStore } from '../stores/userStore';
import ProductCard from '../components/ProductCard.vue';
import VehicleSelectorModal from '../components/VehicleSelectorModal.vue';

const route = useRoute();
const router = useRouter();
const vehicleStore = useVehicleStore();
const userStore = useUserStore();

const isVehicleModalOpen = ref(false);
const catalogTab = ref('all'); // 'all' | 'moto' | 'car' | 'b2b'
const searchQuery = ref('');
const selectedCategory = ref('');
const selectedBrand = ref('');
const maxPrice = ref(9000);
const inStockOnly = ref(false);
const installationOnly = ref(false);
const onlyCompatible = ref(false);
const sortBy = ref('featured');

const allBrands = computed(() => {
  return [...new Set(PRODUCTS.map(p => p.brand))];
});

onMounted(() => {
  if (route.query.vehicleType) {
    catalogTab.value = route.query.vehicleType;
  }
  if (route.query.b2bOnly === 'true') {
    catalogTab.value = 'b2b';
  }
  if (route.query.category) {
    selectedCategory.value = route.query.category;
  }
  if (route.query.search) {
    searchQuery.value = route.query.search;
  }
});

watch(() => route.query, (newQ) => {
  if (newQ.vehicleType) catalogTab.value = newQ.vehicleType;
  if (newQ.b2bOnly === 'true') catalogTab.value = 'b2b';
  if (newQ.category) selectedCategory.value = newQ.category;
  if (newQ.search) searchQuery.value = newQ.search;
});

const pageTitle = computed(() => {
  if (catalogTab.value === 'moto') return 'Motorcycle Custom Parts';
  if (catalogTab.value === 'car') return 'Automobile & Car Tuning Upgrades';
  if (catalogTab.value === 'b2b') return 'B2B Bulk Wholesale Catalog';
  return 'Full Custom & Performance Catalog';
});

function selectCatalogTab(tab) {
  catalogTab.value = tab;
  if (tab === 'b2b') {
    userStore.setUserMode('b2b');
  }
}

const hasActiveFilters = computed(() => {
  return searchQuery.value || selectedCategory.value || selectedBrand.value || maxPrice.value < 9000 || inStockOnly.value || installationOnly.value || onlyCompatible.value;
});

function clearAllFilters() {
  searchQuery.value = '';
  selectedCategory.value = '';
  selectedBrand.value = '';
  maxPrice.value = 9000;
  inStockOnly.value = false;
  installationOnly.value = false;
  onlyCompatible.value = false;
  catalogTab.value = 'all';
}

const filteredProducts = computed(() => {
  return PRODUCTS.filter(p => {
    // 1. Catalog tab
    if (catalogTab.value === 'moto' && p.vehicleType !== 'moto' && p.vehicleType !== 'all') return false;
    if (catalogTab.value === 'car' && p.vehicleType !== 'car' && p.vehicleType !== 'all') return false;
    if (catalogTab.value === 'b2b' && (!p.b2bTiers || p.b2bTiers.length === 0)) return false;

    // 2. Search query
    if (searchQuery.value) {
      const q = searchQuery.value.toLowerCase();
      const matchTitle = p.title.toLowerCase().includes(q) || p.titleKh.includes(q);
      const matchBrand = p.brand.toLowerCase().includes(q);
      const matchDesc = p.description.toLowerCase().includes(q);
      if (!matchTitle && !matchBrand && !matchDesc) return false;
    }

    // 3. Category
    if (selectedCategory.value && p.category !== selectedCategory.value) {
      return false;
    }

    // 4. Brand
    if (selectedBrand.value && p.brand !== selectedBrand.value) {
      return false;
    }

    // 5. Price
    const effectivePrice = userStore.isB2B && p.b2bTiers ? p.b2bTiers[p.b2bTiers.length - 1].price : p.retailPrice;
    if (effectivePrice > maxPrice.value) return false;

    // 6. In stock
    if (inStockOnly.value && !p.inStock) return false;

    // 7. Installation
    if (installationOnly.value && !p.installationAvailable) return false;

    // 8. Vehicle Fitment check
    if (onlyCompatible.value && vehicleStore.activeVehicle) {
      const fit = vehicleStore.checkFitment(p);
      if (!fit.isFit) return false;
    }

    return true;
  }).sort((a, b) => {
    if (sortBy.value === 'price-asc') return a.retailPrice - b.retailPrice;
    if (sortBy.value === 'price-desc') return b.retailPrice - a.retailPrice;
    if (sortBy.value === 'rating') return b.rating - a.rating;
    if (sortBy.value === 'reviews') return b.reviewCount - a.reviewCount;
    return b.featured ? 1 : -1;
  });
});
</script>

