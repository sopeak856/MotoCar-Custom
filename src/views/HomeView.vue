<template>
  <div class="space-y-20 pb-20">
    <!-- I. Hero Banner Section -->
    <section class="relative min-h-[580px] lg:min-h-[660px] flex items-center overflow-hidden carbon-pattern border-b border-gray-800">
      <!-- Glow Gradients -->
      <div class="absolute top-1/4 -left-40 w-96 h-96 bg-red-600/20 rounded-full blur-[130px] pointer-events-none"></div>
      <div class="absolute bottom-10 -right-40 w-96 h-96 bg-cyan-600/15 rounded-full blur-[130px] pointer-events-none"></div>

      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full relative z-10">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <!-- Left Text Content -->
          <div class="lg:col-span-7 space-y-6 text-left">
            <div class="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-red-600/10 border border-red-500/30 text-red-400 text-xs font-bold uppercase tracking-wider">
              <Flame class="w-4 h-4 text-red-500 animate-pulse" />
              <span>Cambodia's #1 Performance & Custom Tuning Platform</span>
            </div>

            <h1 class="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight uppercase leading-[1.08] font-sans">
              UNLEASH <span class="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-rose-400 to-amber-400">RAW POWER</span> & PRECISION AERO
            </h1>

            <p class="text-base sm:text-lg text-gray-300 max-w-2xl font-normal leading-relaxed">
              Official Cambodian distributor for world-class titanium exhaust systems, dry carbon aero kits, forged wheels, Brembo big brakes, and superbike performance. Certified installation network across Phnom Penh and provinces.
            </p>

            <!-- CTA Buttons -->
            <div class="flex flex-wrap items-center gap-3 pt-2">
              <router-link 
                :to="{ path: '/shop', query: { vehicleType: 'car' } }"
                class="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-extrabold text-sm uppercase tracking-wider shadow-xl shadow-red-600/30 flex items-center space-x-2 transition-all cursor-pointer"
              >
                <Car class="w-4 h-4" />
                <span>Shop Car Custom</span>
              </router-link>

              <router-link 
                :to="{ path: '/shop', query: { vehicleType: 'moto' } }"
                class="px-6 py-3.5 rounded-2xl bg-zinc-900 hover:bg-zinc-800 text-white border border-gray-700 hover:border-red-500/50 font-extrabold text-sm uppercase tracking-wider flex items-center space-x-2 transition-all cursor-pointer"
              >
                <Bike class="w-4 h-4 text-red-400" />
                <span>Shop Motorcycle Custom</span>
              </router-link>

              <button 
                @click="userStore.setUserMode('b2b'); $router.push('/shop?b2bOnly=true')"
                class="px-5 py-3.5 rounded-2xl bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/40 text-amber-300 font-extrabold text-xs uppercase tracking-wider flex items-center space-x-1.5 transition-all cursor-pointer"
              >
                <Layers class="w-4 h-4 text-amber-400" />
                <span>B2B Wholesale Portal</span>
              </button>
            </div>

            <!-- Trust Stats -->
            <div class="grid grid-cols-3 gap-4 pt-6 border-t border-gray-800/80 max-w-lg">
              <div>
                <div class="text-2xl font-black text-white font-mono">1,200+</div>
                <div class="text-[11px] text-gray-400 font-medium">Tuned Vehicles in KH</div>
              </div>
              <div>
                <div class="text-2xl font-black text-white font-mono">15+</div>
                <div class="text-[11px] text-gray-400 font-medium">Certified Garages</div>
              </div>
              <div>
                <div class="text-2xl font-black text-white font-mono">100%</div>
                <div class="text-[11px] text-gray-400 font-medium">Genuine Guarantee</div>
              </div>
            </div>
          </div>

          <!-- Right Interactive Fitment Quick Selector Card -->
          <div class="lg:col-span-5">
            <div class="p-6 sm:p-7 rounded-3xl glass-panel border border-red-500/30 shadow-2xl relative overflow-hidden text-left">
              <div class="absolute -top-12 -right-12 w-36 h-36 bg-red-600/20 rounded-full blur-2xl"></div>

              <div class="flex items-center space-x-3 mb-5">
                <div class="w-10 h-10 rounded-xl bg-red-600/20 border border-red-500/30 flex items-center justify-center text-red-400">
                  <Wrench class="w-5 h-5" />
                </div>
                <div>
                  <h3 class="text-base font-black text-white uppercase tracking-wider">Vehicle Fitment Finder</h3>
                  <p class="text-xs text-gray-400">Find guaranteed parts for your exact machine</p>
                </div>
              </div>

              <!-- Quick Selector Form -->
              <div class="space-y-3.5">
                <!-- Vehicle Type Toggle -->
                <div class="grid grid-cols-2 gap-2">
                  <button 
                    type="button"
                    @click="heroType = 'car'; heroMake = ''; heroModel = ''; heroYear = ''"
                    class="py-2.5 px-3 rounded-xl border text-xs font-bold flex items-center justify-center space-x-2 transition-all cursor-pointer"
                    :class="heroType === 'car' ? 'bg-red-600 text-white border-red-500' : 'bg-zinc-900 border-gray-800 text-gray-400'"
                  >
                    <Car class="w-4 h-4" />
                    <span>Car Custom</span>
                  </button>

                  <button 
                    type="button"
                    @click="heroType = 'moto'; heroMake = ''; heroModel = ''; heroYear = ''"
                    class="py-2.5 px-3 rounded-xl border text-xs font-bold flex items-center justify-center space-x-2 transition-all cursor-pointer"
                    :class="heroType === 'moto' ? 'bg-red-600 text-white border-red-500' : 'bg-zinc-900 border-gray-800 text-gray-400'"
                  >
                    <Bike class="w-4 h-4" />
                    <span>Motorcycle</span>
                  </button>
                </div>

                <!-- Select Make -->
                <div>
                  <label class="block text-[11px] font-bold uppercase text-gray-400 mb-1">Make / Brand</label>
                  <select 
                    v-model="heroMake" 
                    @change="heroModel = ''; heroYear = ''"
                    class="w-full bg-zinc-900/90 border border-gray-700 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-red-500"
                  >
                    <option value="" disabled>Select Vehicle Make</option>
                    <option v-for="make in availableHeroMakes" :key="make" :value="make">{{ make }}</option>
                  </select>
                </div>

                <!-- Select Model -->
                <div>
                  <label class="block text-[11px] font-bold uppercase text-gray-400 mb-1">Model / Chassis</label>
                  <select 
                    v-model="heroModel" 
                    :disabled="!heroMake"
                    @change="heroYear = ''"
                    class="w-full bg-zinc-900/90 border border-gray-700 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-red-500 disabled:opacity-40"
                  >
                    <option value="" disabled>Select Model</option>
                    <option v-for="model in availableHeroModels" :key="model.name" :value="model.name">{{ model.name }}</option>
                  </select>
                </div>

                <!-- Select Year -->
                <div>
                  <label class="block text-[11px] font-bold uppercase text-gray-400 mb-1">Year</label>
                  <select 
                    v-model="heroYear" 
                    :disabled="!heroModel"
                    class="w-full bg-zinc-900/90 border border-gray-700 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-red-500 disabled:opacity-40"
                  >
                    <option value="" disabled>Select Year</option>
                    <option v-for="year in availableHeroYears" :key="year" :value="year">{{ year }}</option>
                  </select>
                </div>

                <!-- Find Parts Button -->
                <button 
                  @click="applyHeroFitment"
                  :disabled="!heroMake || !heroModel || !heroYear"
                  class="w-full py-3.5 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-black text-xs uppercase tracking-wider shadow-lg shadow-red-600/30 flex items-center justify-center space-x-2 transition-all cursor-pointer disabled:opacity-40"
                >
                  <CheckCircle2 class="w-4 h-4" />
                  <span>Explore Compatible Upgrades</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- II. Categories Section -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 text-left">
        <div>
          <div class="text-xs font-bold text-red-500 uppercase tracking-widest">Engineered Perfection</div>
          <h2 class="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight">Browse By Upgrade Category</h2>
          <p class="text-xs sm:text-sm text-gray-400 mt-1">From track-tested titanium exhausts to full autoclave dry carbon aero packages.</p>
        </div>
        <router-link to="/shop" class="text-xs font-bold text-red-400 hover:text-red-300 flex items-center space-x-1 shrink-0">
          <span>View All 200+ Products</span>
          <ChevronRight class="w-4 h-4" />
        </router-link>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <router-link 
          v-for="cat in CATEGORIES" 
          :key="cat.id"
          :to="`/shop?category=${cat.id}`"
          class="group relative h-64 rounded-2xl overflow-hidden border border-gray-800/80 hover:border-red-500/50 transition-all duration-300 shadow-lg text-left"
        >
          <!-- Background Image with Gradient Overlay -->
          <img 
            :src="cat.image" 
            :alt="cat.name" 
            class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          />
          <div class="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent"></div>

          <!-- Category Content -->
          <div class="absolute inset-0 p-5 flex flex-col justify-between">
            <div class="flex items-center justify-between">
              <span class="px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider bg-black/60 backdrop-blur-md text-red-400 border border-white/10">
                {{ cat.count }} Parts
              </span>
              <div class="w-8 h-8 rounded-lg bg-red-600/20 border border-red-500/30 flex items-center justify-center text-red-400 group-hover:bg-red-600 group-hover:text-white transition-all">
                <ChevronRight class="w-4 h-4" />
              </div>
            </div>

            <div>
              <h3 class="text-base font-extrabold text-white group-hover:text-red-400 transition-colors">
                {{ cat.name }}
              </h3>
              <p class="text-[11px] text-gray-400 font-khmer mt-0.5 line-clamp-1">
                {{ cat.nameKh }}
              </p>
              <p class="text-[11px] text-gray-300 mt-1 line-clamp-2 opacity-80">
                {{ cat.description }}
              </p>
            </div>
          </div>
        </router-link>
      </div>
    </section>

    <!-- III. Featured Products Spotlight (B2C & B2B Switchable) -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 text-left">
        <div>
          <div class="text-xs font-bold text-red-500 uppercase tracking-widest">Top Tier Performance</div>
          <h2 class="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight">Featured Race & Street Upgrades</h2>
        </div>

        <!-- Filter tabs: All, Car, Motorcycle -->
        <div class="flex items-center space-x-2 bg-zinc-900 p-1 rounded-xl border border-gray-800 text-xs font-semibold">
          <button 
            @click="productTab = 'all'" 
            class="px-3 py-1.5 rounded-lg transition-all cursor-pointer"
            :class="productTab === 'all' ? 'bg-red-600 text-white' : 'text-gray-400 hover:text-white'"
          >
            All Featured
          </button>
          <button 
            @click="productTab = 'car'" 
            class="px-3 py-1.5 rounded-lg transition-all cursor-pointer"
            :class="productTab === 'car' ? 'bg-red-600 text-white' : 'text-gray-400 hover:text-white'"
          >
            Car Custom
          </button>
          <button 
            @click="productTab = 'moto'" 
            class="px-3 py-1.5 rounded-lg transition-all cursor-pointer"
            :class="productTab === 'moto' ? 'bg-red-600 text-white' : 'text-gray-400 hover:text-white'"
          >
            Motorcycle
          </button>
        </div>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <ProductCard 
          v-for="product in filteredFeaturedProducts" 
          :key="product.id" 
          :product="product" 
        />
      </div>
    </section>

    <!-- IV. B2B Wholesale Portal Spotlight Banner -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="rounded-3xl bg-gradient-to-r from-amber-950/60 via-zinc-900 to-zinc-950 border border-amber-500/40 p-8 sm:p-12 relative overflow-hidden text-left shadow-2xl">
        <div class="absolute -top-20 -right-20 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div class="lg:col-span-8 space-y-4">
            <div class="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs font-extrabold uppercase tracking-wider">
              <Building2 class="w-4 h-4 text-amber-400" />
              <span>B2B Wholesale Portal & Fleet Distribution</span>
            </div>

            <h2 class="text-2xl sm:text-4xl font-black text-white uppercase tracking-tight">
              ARE YOU A TUNING GARAGE, WORKSHOP, OR PARTS DEALER?
            </h2>

            <p class="text-sm sm:text-base text-gray-300 max-w-2xl">
              Unlock Tier 1 bulk wholesale pricing, Net-30 credit limits up to $25,000, official Cambodia GDT electronic tax invoices, and direct container consignment delivery.
            </p>

            <!-- B2B Feature Grid -->
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
              <div class="p-3.5 rounded-xl bg-black/40 border border-amber-500/20">
                <div class="text-amber-400 font-extrabold text-xs uppercase">Up to 35% Wholesale Margin</div>
                <div class="text-[11px] text-gray-400 mt-1">Tiered bulk pricing visible per SKU</div>
              </div>
              <div class="p-3.5 rounded-xl bg-black/40 border border-amber-500/20">
                <div class="text-amber-400 font-extrabold text-xs uppercase">Net 30/60 Credit Line</div>
                <div class="text-[11px] text-gray-400 mt-1">Seamless purchase orders & invoicing</div>
              </div>
              <div class="p-3.5 rounded-xl bg-black/40 border border-amber-500/20">
                <div class="text-amber-400 font-extrabold text-xs uppercase">Direct RFQ System</div>
                <div class="text-[11px] text-gray-400 mt-1">Custom quotes answered in &lt; 24h</div>
              </div>
            </div>
          </div>

          <div class="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 justify-center">
            <button 
              @click="userStore.setUserMode('b2b'); $router.push('/shop?b2bOnly=true')"
              class="w-full py-4 px-6 rounded-2xl bg-amber-500 hover:bg-amber-400 text-black font-black text-sm uppercase tracking-wider shadow-xl shadow-amber-500/20 transition-all cursor-pointer text-center"
            >
              Browse Wholesale Catalog
            </button>

            <router-link 
              to="/auth?mode=b2b"
              class="w-full py-3.5 px-6 rounded-2xl bg-zinc-900 hover:bg-zinc-800 text-amber-300 border border-amber-500/30 font-bold text-xs uppercase tracking-wider transition-all text-center"
            >
              Apply for Workshop Account
            </router-link>
          </div>
        </div>
      </div>
    </section>

    <!-- V. Partner Garages Spotlight -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 text-left">
        <div>
          <div class="text-xs font-bold text-cyan-400 uppercase tracking-widest">Certified Installation Network</div>
          <h2 class="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight">Partner Garages Spotlight</h2>
          <p class="text-xs sm:text-sm text-gray-400 mt-1">
            Order online, have parts shipped directly to our certified installation partners in Phnom Penh, Siem Reap & Battambang.
          </p>
        </div>

        <router-link to="/garages" class="text-xs font-bold text-cyan-400 hover:text-cyan-300 flex items-center space-x-1 shrink-0">
          <span>Explore All Garages & Map</span>
          <ChevronRight class="w-4 h-4" />
        </router-link>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div 
          v-for="garage in PARTNER_GARAGES.slice(0, 3)" 
          :key="garage.id"
          class="bg-[#12161f] border border-gray-800 rounded-2xl overflow-hidden hover:border-cyan-500/50 transition-all text-left flex flex-col justify-between shadow-lg"
        >
          <div>
            <div class="relative h-44 overflow-hidden">
              <img :src="garage.image" :alt="garage.name" class="w-full h-full object-cover" />
              <div class="absolute top-3 right-3 px-2 py-0.5 rounded text-[10px] font-bold bg-black/80 text-cyan-400 border border-cyan-500/30">
                {{ garage.province }}
              </div>
            </div>

            <div class="p-5 space-y-3">
              <div class="flex items-center space-x-1 text-amber-400 text-xs">
                <Star class="w-3.5 h-3.5 fill-current" />
                <span class="font-bold text-white">{{ garage.rating }}</span>
                <span class="text-gray-500">({{ garage.reviewsCount }} reviews)</span>
              </div>

              <h3 class="text-base font-bold text-white">{{ garage.name }}</h3>
              <p class="text-xs text-gray-400 flex items-start space-x-1.5">
                <MapPin class="w-3.5 h-3.5 text-red-500 shrink-0 mt-0.5" />
                <span>{{ garage.address }}</span>
              </p>

              <div class="flex flex-wrap gap-1.5 pt-2">
                <span 
                  v-for="s in garage.certifiedServices.slice(0, 2)" 
                  :key="s" 
                  class="px-2 py-0.5 rounded text-[10px] bg-zinc-900 text-gray-300 border border-gray-800"
                >
                  {{ s }}
                </span>
              </div>
            </div>
          </div>

          <div class="p-5 pt-0">
            <button 
              @click="openBookingForGarage(garage)"
              class="w-full py-2.5 rounded-xl bg-cyan-600/20 hover:bg-cyan-600 text-cyan-300 hover:text-white border border-cyan-500/30 font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center space-x-1.5 cursor-pointer"
            >
              <Calendar class="w-3.5 h-3.5" />
              <span>Book Appointment</span>
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- VI. Promotions & Flash Deals -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="p-8 rounded-3xl bg-zinc-900/80 border border-red-500/30 relative overflow-hidden">
        <div class="flex flex-col md:flex-row items-center justify-between gap-6">
          <div class="text-left space-y-2">
            <span class="px-3 py-1 rounded-full text-xs font-black bg-red-600 text-white uppercase tracking-wider">
              FLASH PROMOTIONS
            </span>
            <h3 class="text-2xl font-black text-white uppercase">USE PROMO CODE: <span class="text-red-500 font-mono">MOTO2025</span></h3>
            <p class="text-xs text-gray-400">Get an extra 10% OFF on all performance motorcycle systems & CNC accessories.</p>
          </div>

          <div class="flex flex-wrap gap-3">
            <div 
              v-for="promo in PROMOTIONS" 
              :key="promo.id"
              class="p-4 rounded-2xl bg-black/60 border border-gray-800 text-left min-w-[200px]"
            >
              <div class="flex justify-between items-center text-xs">
                <span class="font-mono font-black text-red-400">{{ promo.code }}</span>
                <span class="px-2 py-0.5 rounded bg-red-600/20 text-red-400 text-[10px] font-bold">{{ promo.discount }}</span>
              </div>
              <div class="text-xs font-bold text-white mt-1">{{ promo.title }}</div>
              <div class="text-[10px] text-gray-500 mt-0.5">Min Spend: ${{ promo.minSpend }}</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- VII. Brand Showcase -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-gray-800/80 pt-14">
      <div class="text-center mb-8">
        <div class="text-xs font-bold uppercase tracking-widest text-gray-500">Official Cambodian Brand Partners</div>
      </div>
      <div class="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4 items-center opacity-70">
        <div class="p-3 bg-zinc-900/50 rounded-xl border border-gray-800 text-center font-black tracking-widest text-sm text-gray-300">AKRAPOVIČ</div>
        <div class="p-3 bg-zinc-900/50 rounded-xl border border-gray-800 text-center font-black tracking-widest text-sm text-gray-300">BREMBO</div>
        <div class="p-3 bg-zinc-900/50 rounded-xl border border-gray-800 text-center font-black tracking-widest text-sm text-gray-300">ÖHLINS</div>
        <div class="p-3 bg-zinc-900/50 rounded-xl border border-gray-800 text-center font-black tracking-widest text-sm text-gray-300">BBS GERMANY</div>
        <div class="p-3 bg-zinc-900/50 rounded-xl border border-gray-800 text-center font-black tracking-widest text-sm text-gray-300">SC-PROJECT</div>
        <div class="p-3 bg-zinc-900/50 rounded-xl border border-gray-800 text-center font-black tracking-widest text-sm text-gray-300">HKS JAPAN</div>
        <div class="p-3 bg-zinc-900/50 rounded-xl border border-gray-800 text-center font-black tracking-widest text-sm text-gray-300">VORSTEINER</div>
        <div class="p-3 bg-zinc-900/50 rounded-xl border border-gray-800 text-center font-black tracking-widest text-sm text-gray-300">EVENTURI</div>
      </div>
    </section>

    <!-- Booking Modal -->
    <InstallationModal 
      v-if="isBookingModalOpen" 
      @close="isBookingModalOpen = false" 
    />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { 
  Flame, Car, Bike, Wrench, Layers, CheckCircle2, ChevronRight, 
  Building2, Star, MapPin, Calendar 
} from '@lucide/vue';
import { CATEGORIES, PRODUCTS, PARTNER_GARAGES, PROMOTIONS, VEHICLE_DATABASE } from '../data/mockData';
import { useVehicleStore } from '../stores/vehicleStore';
import { useUserStore } from '../stores/userStore';
import ProductCard from '../components/ProductCard.vue';
import InstallationModal from '../components/InstallationModal.vue';

const router = useRouter();
const vehicleStore = useVehicleStore();
const userStore = useUserStore();

// Hero Fitment Finder State
const heroType = ref('car');
const heroMake = ref('');
const heroModel = ref('');
const heroYear = ref('');

const productTab = ref('all');
const isBookingModalOpen = ref(false);

const availableHeroMakes = computed(() => {
  const pool = heroType.value === 'car' ? VEHICLE_DATABASE.cars : VEHICLE_DATABASE.motorcycles;
  return pool.map(item => item.make);
});

const availableHeroModels = computed(() => {
  if (!heroMake.value) return [];
  const pool = heroType.value === 'car' ? VEHICLE_DATABASE.cars : VEHICLE_DATABASE.motorcycles;
  const match = pool.find(item => item.make === heroMake.value);
  return match ? match.models : [];
});

const availableHeroYears = computed(() => {
  if (!heroModel.value) return [];
  const modelObj = availableHeroModels.value.find(m => m.name === heroModel.value);
  return modelObj ? modelObj.years : [2021, 2022, 2023, 2024, 2025];
});

function applyHeroFitment() {
  const modelObj = availableHeroModels.value.find(m => m.name === heroModel.value);
  const newV = {
    id: 'hero-' + Date.now(),
    type: heroType.value,
    make: heroMake.value,
    model: heroModel.value,
    year: Number(heroYear.value),
    engine: modelObj?.engines?.[0] || 'High Performance'
  };
  vehicleStore.selectActiveVehicle(newV);
  router.push({ path: '/shop', query: { vehicleType: heroType.value } });
}

const filteredFeaturedProducts = computed(() => {
  if (productTab.value === 'car') {
    return PRODUCTS.filter(p => p.vehicleType === 'car').slice(0, 4);
  }
  if (productTab.value === 'moto') {
    return PRODUCTS.filter(p => p.vehicleType === 'moto').slice(0, 4);
  }
  return PRODUCTS.filter(p => p.featured).slice(0, 8);
});

function openBookingForGarage(garage) {
  isBookingModalOpen.value = true;
}
</script>

