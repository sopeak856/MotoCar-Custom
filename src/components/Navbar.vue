<template>
  <header class="sticky top-0 z-50 bg-[#0b0e14]/95 backdrop-blur-md border-b border-gray-800/80 shadow-2xl">
    <!-- Top Announcement Bar -->
    <div class="bg-gradient-to-r from-red-950 via-zinc-900 to-red-950 border-b border-red-900/30 text-xs py-1.5 px-4 text-gray-300">
      <div class="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
        <div class="flex items-center space-x-3">
          <span class="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-red-600 text-white tracking-wider uppercase">Official Partner</span>
          <span class="hidden sm:inline text-gray-300">
            Authorized Distributor for Akrapovič, Brembo, Öhlins & SC-Project in Cambodia 🇰🇭
          </span>
          <span class="sm:hidden text-gray-300">Fast delivery across all 25 provinces via Virak Buntham</span>
        </div>

        <div class="flex items-center space-x-4 text-xs">
          <!-- B2B Mode Switcher Quick Pill -->
          <button 
            @click="userStore.toggleUserMode" 
            class="flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full transition-all border font-medium cursor-pointer"
            :class="userStore.isB2B 
              ? 'bg-amber-500/20 text-amber-300 border-amber-500/50 shadow-[0_0_12px_rgba(245,158,11,0.3)]' 
              : 'bg-zinc-800 hover:bg-zinc-700 text-gray-300 border-gray-700'"
          >
            <Building2 class="w-3.5 h-3.5" :class="userStore.isB2B ? 'text-amber-400' : 'text-gray-400'" />
            <span>{{ userStore.isB2B ? 'Mode: B2B Wholesale' : 'Mode: B2C Retail' }}</span>
            <span class="text-[10px] px-1 py-0.2 rounded bg-black/40 font-mono">{{ userStore.isB2B ? 'ACTIVE' : 'SWITCH' }}</span>
          </button>

          <!-- Language Switcher -->
          <button 
            @click="langStore.toggleLang" 
            class="flex items-center space-x-1 text-gray-400 hover:text-white transition-colors cursor-pointer"
          >
            <Globe class="w-3.5 h-3.5 text-red-500" />
            <span class="font-semibold">{{ langStore.currentLang.toUpperCase() }}</span>
            <span class="text-gray-500 text-[10px]">({{ langStore.currentLang === 'en' ? 'ភាសាខ្មែរ' : 'EN' }})</span>
          </button>

          <!-- Direct Hotline & Telegram -->
          <a href="https://t.me" target="_blank" class="hidden md:flex items-center space-x-1 text-sky-400 hover:text-sky-300">
            <Send class="w-3.5 h-3.5" />
            <span>Telegram: @motocarcustom_kh</span>
          </a>
        </div>
      </div>
    </div>

    <!-- Main Header -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
      <div class="flex items-center justify-between gap-4">
        <!-- Logo -->
        <router-link to="/" class="flex items-center space-x-3 group shrink-0">
          <div class="w-10 h-10 rounded-xl bg-gradient-to-tr from-red-600 via-rose-500 to-amber-500 p-0.5 shadow-lg shadow-red-600/30 group-hover:shadow-red-600/50 transition-all duration-300">
            <div class="w-full h-full bg-[#0d1117] rounded-[10px] flex items-center justify-center">
              <Flame class="w-6 h-6 text-red-500 group-hover:scale-110 transition-transform" />
            </div>
          </div>
          <div>
            <div class="flex items-center space-x-1.5">
              <span class="text-xl font-black tracking-wider text-white uppercase font-sans">MOTO<span class="text-red-500">CAR</span></span>
              <span class="px-1.5 py-0.5 text-[9px] font-black uppercase tracking-widest bg-red-600/20 text-red-400 border border-red-500/30 rounded">CUSTOM</span>
            </div>
            <p class="text-[10px] text-gray-400 tracking-tight font-medium">CAMBODIA TUNING & WHOLESALE</p>
          </div>
        </router-link>

        <!-- "Select Your Ride" Vehicle Selector Pill -->
        <div class="hidden lg:flex items-center">
          <button 
            @click="isVehicleModalOpen = true"
            class="flex items-center space-x-2.5 px-3.5 py-2 rounded-xl bg-zinc-900/90 border border-gray-700 hover:border-red-500/60 transition-all text-left group shadow-inner cursor-pointer"
          >
            <div class="w-7 h-7 rounded-lg bg-red-500/10 border border-red-500/30 flex items-center justify-center text-red-400 group-hover:bg-red-500 group-hover:text-white transition-all">
              <Car v-if="vehicleStore.activeVehicle?.type === 'car'" class="w-4 h-4" />
              <Bike v-else-if="vehicleStore.activeVehicle?.type === 'moto'" class="w-4 h-4" />
              <Wrench v-else class="w-4 h-4" />
            </div>
            <div>
              <div class="text-[10px] uppercase font-bold text-gray-400 tracking-wider">
                {{ langStore.t('selectRide') }}
              </div>
              <div class="text-xs font-semibold text-white group-hover:text-red-400 transition-colors truncate max-w-[200px]">
                {{ vehicleStore.activeVehicle ? `${vehicleStore.activeVehicle.year} ${vehicleStore.activeVehicle.make} ${vehicleStore.activeVehicle.model}` : 'Click to Set Vehicle' }}
              </div>
            </div>
            <ChevronDown class="w-4 h-4 text-gray-500 group-hover:text-red-400 transition-colors" />
          </button>
        </div>

        <!-- Live Search Bar -->
        <div class="flex-1 max-w-md hidden md:block relative">
          <div class="relative">
            <input 
              v-model="searchQuery"
              @keydown.enter="handleSearch"
              type="text" 
              :placeholder="langStore.t('searchPlaceholder')" 
              class="w-full bg-zinc-900/90 border border-gray-800 text-sm rounded-xl pl-10 pr-10 py-2.5 text-gray-200 placeholder-gray-500 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all"
            />
            <Search class="w-4 h-4 text-gray-500 absolute left-3.5 top-3.5" />
            <button 
              v-if="searchQuery" 
              @click="searchQuery = ''"
              class="absolute right-3.5 top-3 text-gray-500 hover:text-gray-300"
            >
              <X class="w-4 h-4" />
            </button>
          </div>
        </div>

        <!-- Right Side Nav Actions: Wishlist, Cart, User Auth / Dashboard -->
        <div class="flex items-center space-x-3">
          <!-- Wishlist -->
          <router-link 
            to="/wishlist" 
            class="relative p-2.5 rounded-xl bg-zinc-900/80 border border-gray-800 hover:border-gray-700 text-gray-300 hover:text-red-400 transition-all cursor-pointer"
            title="Wishlist & Garage"
          >
            <Heart class="w-5 h-5" />
            <span 
              v-if="wishlistStore.itemIds.length" 
              class="absolute -top-1.5 -right-1.5 bg-red-600 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center ring-2 ring-[#0b0e14]"
            >
              {{ wishlistStore.itemIds.length }}
            </span>
          </router-link>

          <!-- Cart Drawer / Link -->
          <router-link 
            to="/cart" 
            class="relative flex items-center space-x-2 px-3 py-2 rounded-xl bg-gradient-to-r from-red-600 to-rose-700 text-white font-medium hover:from-red-500 hover:to-rose-600 shadow-lg shadow-red-600/25 transition-all cursor-pointer"
          >
            <ShoppingCart class="w-5 h-5" />
            <span class="hidden sm:inline text-xs font-bold">{{ langStore.t('cart') }}</span>
            <span class="bg-black/40 text-white text-xs px-2 py-0.5 rounded-full font-mono font-bold">
              {{ cartStore.totalCount }}
            </span>
            <span class="hidden lg:inline text-xs font-mono font-semibold ml-1">
              ${{ cartStore.grandTotal.toFixed(0) }}
            </span>
          </router-link>

          <!-- AUTHENTICATION STATE: LOGGED IN VS NOT LOGGED IN -->
          <template v-if="userStore.isLoggedIn">
            <!-- User Dropdown Menu Wrapper -->
            <div class="relative" ref="userDropdownRef">
              <button 
                @click="isUserMenuOpen = !isUserMenuOpen"
                class="flex items-center space-x-2 p-1.5 sm:px-3 sm:py-2 rounded-xl bg-zinc-900/80 border border-gray-800 hover:border-gray-700 text-gray-300 hover:text-white transition-all cursor-pointer"
              >
                <img 
                  :src="userStore.user.avatar" 
                  alt="Avatar" 
                  class="w-7 h-7 rounded-lg object-cover ring-1 ring-red-500/50"
                />
                <div class="hidden xl:block text-left">
                  <div class="text-xs font-bold text-white truncate max-w-[100px]">{{ userStore.user.name }}</div>
                  <div class="text-[10px] text-gray-400 uppercase font-mono">{{ userStore.isB2B ? 'B2B Partner' : 'Retail Customer' }}</div>
                </div>
                <ChevronDown class="w-3.5 h-3.5 text-gray-400 hidden xl:block" />
              </button>

              <!-- Dropdown Menu -->
              <div 
                v-if="isUserMenuOpen" 
                class="absolute right-0 mt-2 w-56 bg-[#12161f] border border-gray-700 rounded-2xl shadow-2xl py-2 z-50 text-left animate-fade-in"
              >
                <div class="px-4 py-2 border-b border-gray-800">
                  <div class="text-xs font-bold text-white">{{ userStore.user.name }}</div>
                  <div class="text-[11px] text-gray-400 truncate">{{ userStore.user.email }}</div>
                  <span class="inline-block mt-1 px-2 py-0.5 text-[9px] font-black rounded uppercase" :class="userStore.isB2B ? 'bg-amber-500 text-black' : 'bg-red-600 text-white'">
                    {{ userStore.isB2B ? 'B2B Wholesale Account' : 'Retail Buyer' }}
                  </span>
                </div>

                <router-link 
                  to="/account" 
                  @click="isUserMenuOpen = false"
                  class="flex items-center space-x-2.5 px-4 py-2 text-xs text-gray-300 hover:text-white hover:bg-zinc-800/80 transition-colors"
                >
                  <User class="w-4 h-4 text-red-400" />
                  <span>My Account & Profile</span>
                </router-link>

                <router-link 
                  to="/account?tab=orders" 
                  @click="isUserMenuOpen = false"
                  class="flex items-center space-x-2.5 px-4 py-2 text-xs text-gray-300 hover:text-white hover:bg-zinc-800/80 transition-colors"
                >
                  <Package class="w-4 h-4 text-cyan-400" />
                  <span>My Orders & Tracking</span>
                </router-link>

                <router-link 
                  to="/wishlist?tab=garage" 
                  @click="isUserMenuOpen = false"
                  class="flex items-center space-x-2.5 px-4 py-2 text-xs text-gray-300 hover:text-white hover:bg-zinc-800/80 transition-colors"
                >
                  <Car class="w-4 h-4 text-emerald-400" />
                  <span>My Garage Rides</span>
                </router-link>

                <router-link 
                  to="/account?tab=rfq" 
                  @click="isUserMenuOpen = false"
                  class="flex items-center space-x-2.5 px-4 py-2 text-xs text-amber-300 hover:text-white hover:bg-zinc-800/80 transition-colors font-semibold"
                >
                  <Layers class="w-4 h-4 text-amber-400" />
                  <span>Wholesale RFQ Management</span>
                </router-link>

                <div class="border-t border-gray-800 my-1"></div>

                <button 
                  @click="handleLogout"
                  class="w-full flex items-center space-x-2.5 px-4 py-2 text-xs text-red-400 hover:text-red-300 hover:bg-red-950/30 transition-colors text-left cursor-pointer"
                >
                  <LogOut class="w-4 h-4 text-red-500" />
                  <span>Sign Out / ចាកចេញ</span>
                </button>
              </div>
            </div>
          </template>

          <!-- NOT LOGGED IN: DISPLAY PROMINENT LOGIN & REGISTER BUTTONS -->
          <template v-else>
            <div class="flex items-center space-x-2">
              <router-link 
                to="/auth?mode=login" 
                class="px-3.5 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-gray-700 hover:border-red-500 text-gray-200 hover:text-white text-xs font-bold flex items-center space-x-1.5 transition-all cursor-pointer"
              >
                <LogIn class="w-3.5 h-3.5 text-red-400" />
                <span>Sign In</span>
              </router-link>

              <router-link 
                to="/auth?mode=register" 
                class="hidden sm:flex px-3.5 py-2 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white text-xs font-bold items-center space-x-1.5 shadow-lg shadow-red-600/20 transition-all cursor-pointer"
              >
                <UserPlus class="w-3.5 h-3.5" />
                <span>Register</span>
              </router-link>
            </div>
          </template>

          <!-- Mobile Menu Hamburger -->
          <button 
            @click="isMobileMenuOpen = !isMobileMenuOpen" 
            class="md:hidden p-2 rounded-xl bg-zinc-900 border border-gray-800 text-gray-400 hover:text-white"
          >
            <Menu v-if="!isMobileMenuOpen" class="w-6 h-6" />
            <X v-else class="w-6 h-6" />
          </button>
        </div>
      </div>

      <!-- Mobile Search Bar -->
      <div class="mt-3 md:hidden">
        <div class="relative">
          <input 
            v-model="searchQuery" 
            @keydown.enter="handleSearch"
            type="text" 
            :placeholder="langStore.t('searchPlaceholder')" 
            class="w-full bg-zinc-900 border border-gray-800 text-sm rounded-xl pl-10 pr-4 py-2 text-gray-200 placeholder-gray-500 focus:outline-none focus:border-red-500"
          />
          <Search class="w-4 h-4 text-gray-500 absolute left-3.5 top-3" />
        </div>
      </div>
    </div>

    <!-- Secondary Navigation Menu -->
    <nav class="bg-black/60 border-t border-gray-800/60 hidden md:block">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between text-xs font-semibold tracking-wide uppercase">
          <div class="flex items-center space-x-1 lg:space-x-2 py-2">
            <router-link 
              to="/" 
              class="px-3 py-1.5 rounded-lg text-gray-300 hover:text-white hover:bg-zinc-800/80 transition-all"
              active-class="bg-red-600/20 text-red-400 border border-red-500/30"
            >
              {{ langStore.t('home') }}
            </router-link>

            <router-link 
              to="/shop" 
              class="px-3 py-1.5 rounded-lg text-gray-300 hover:text-white hover:bg-zinc-800/80 transition-all"
              active-class="bg-red-600/20 text-red-400 border border-red-500/30"
            >
              {{ langStore.t('shop') }}
            </router-link>

            <router-link 
              :to="{ path: '/shop', query: { vehicleType: 'moto' } }" 
              class="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-gray-300 hover:text-white hover:bg-zinc-800/80 transition-all"
            >
              <Bike class="w-3.5 h-3.5 text-red-400" />
              <span>{{ langStore.t('motoCustom') }}</span>
            </router-link>

            <router-link 
              :to="{ path: '/shop', query: { vehicleType: 'car' } }" 
              class="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-gray-300 hover:text-white hover:bg-zinc-800/80 transition-all"
            >
              <Car class="w-3.5 h-3.5 text-red-400" />
              <span>{{ langStore.t('carCustom') }}</span>
            </router-link>

            <router-link 
              :to="{ path: '/shop', query: { b2bOnly: 'true' } }" 
              class="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-amber-400 bg-amber-500/10 border border-amber-500/20 hover:bg-amber-500/20 transition-all font-bold"
            >
              <Layers class="w-3.5 h-3.5 text-amber-400" />
              <span>{{ langStore.t('b2bCatalog') }}</span>
              <span class="px-1 text-[9px] bg-amber-500 text-black font-extrabold rounded">TIERS</span>
            </router-link>

            <router-link 
              to="/garages" 
              class="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-gray-300 hover:text-white hover:bg-zinc-800/80 transition-all"
              active-class="bg-red-600/20 text-red-400 border border-red-500/30"
            >
              <Wrench class="w-3.5 h-3.5 text-cyan-400" />
              <span>{{ langStore.t('partnerGarages') }}</span>
            </router-link>
          </div>

          <div class="flex items-center space-x-3 py-2 text-gray-400">
            <!-- Dedicated Sign In / Register Link for easy discovery -->
            <router-link 
              to="/auth" 
              class="flex items-center space-x-1.5 px-2.5 py-1 rounded text-red-400 hover:text-red-300 hover:bg-zinc-800/60 transition-all font-bold text-xs"
            >
              <Lock class="w-3.5 h-3.5" />
              <span>Login / Register (X. Auth)</span>
            </router-link>

            <router-link 
              to="/tracking" 
              class="flex items-center space-x-1 px-2.5 py-1 rounded hover:text-white hover:bg-zinc-800/60 transition-all text-xs"
            >
              <PackageSearch class="w-3.5 h-3.5 text-red-400" />
              <span>{{ langStore.t('trackOrder') }}</span>
            </router-link>
          </div>
        </div>
      </div>
    </nav>

    <!-- Mobile Drawer Menu -->
    <div v-if="isMobileMenuOpen" class="md:hidden bg-zinc-950 border-b border-gray-800 px-4 py-4 space-y-3 text-left">
      <!-- Active Ride Mobile -->
      <button 
        @click="isVehicleModalOpen = true; isMobileMenuOpen = false"
        class="w-full flex items-center justify-between p-3 rounded-xl bg-zinc-900 border border-gray-800 text-left"
      >
        <div class="flex items-center space-x-3">
          <Car class="w-5 h-5 text-red-500" />
          <div>
            <div class="text-[10px] uppercase text-gray-400 font-bold">{{ langStore.t('selectRide') }}</div>
            <div class="text-xs font-bold text-white">
              {{ vehicleStore.activeVehicle ? `${vehicleStore.activeVehicle.year} ${vehicleStore.activeVehicle.make} ${vehicleStore.activeVehicle.model}` : 'Tap to select vehicle' }}
            </div>
          </div>
        </div>
        <ChevronRight class="w-4 h-4 text-gray-400" />
      </button>

      <!-- Mobile Auth Action Buttons -->
      <div class="grid grid-cols-2 gap-2 pt-1 pb-1">
        <router-link 
          v-if="!userStore.isLoggedIn"
          @click="isMobileMenuOpen = false" 
          to="/auth?mode=login" 
          class="p-2.5 rounded-xl bg-red-600 text-white font-bold text-xs flex items-center justify-center space-x-1.5"
        >
          <LogIn class="w-4 h-4" />
          <span>Sign In / Login</span>
        </router-link>

        <router-link 
          v-if="!userStore.isLoggedIn"
          @click="isMobileMenuOpen = false" 
          to="/auth?mode=register" 
          class="p-2.5 rounded-xl bg-zinc-900 border border-gray-700 text-gray-200 font-bold text-xs flex items-center justify-center space-x-1.5"
        >
          <UserPlus class="w-4 h-4 text-red-400" />
          <span>Register</span>
        </router-link>

        <router-link 
          v-if="userStore.isLoggedIn"
          @click="isMobileMenuOpen = false" 
          to="/account" 
          class="p-2.5 rounded-xl bg-zinc-900 border border-gray-700 text-white font-bold text-xs flex items-center justify-center space-x-1.5 col-span-2"
        >
          <User class="w-4 h-4 text-red-400" />
          <span>My Account ({{ userStore.user.name }})</span>
        </router-link>
      </div>

      <div class="grid grid-cols-2 gap-2 text-sm">
        <router-link @click="isMobileMenuOpen = false" to="/" class="p-2.5 rounded-lg bg-zinc-900 text-gray-200">Home</router-link>
        <router-link @click="isMobileMenuOpen = false" to="/shop" class="p-2.5 rounded-lg bg-zinc-900 text-gray-200">Shop Catalog</router-link>
        <router-link @click="isMobileMenuOpen = false" :to="{ path: '/shop', query: { vehicleType: 'moto' } }" class="p-2.5 rounded-lg bg-zinc-900 text-gray-200">Motorcycle Custom</router-link>
        <router-link @click="isMobileMenuOpen = false" :to="{ path: '/shop', query: { vehicleType: 'car' } }" class="p-2.5 rounded-lg bg-zinc-900 text-gray-200">Car Custom</router-link>
        <router-link @click="isMobileMenuOpen = false" :to="{ path: '/shop', query: { b2bOnly: 'true' } }" class="p-2.5 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-300 font-bold">B2B Wholesale</router-link>
        <router-link @click="isMobileMenuOpen = false" to="/garages" class="p-2.5 rounded-lg bg-zinc-900 text-gray-200">Partner Garages</router-link>
        <router-link @click="isMobileMenuOpen = false" to="/wishlist" class="p-2.5 rounded-lg bg-zinc-900 text-gray-200">My Garage & Wishlist</router-link>
        <router-link @click="isMobileMenuOpen = false" to="/tracking" class="p-2.5 rounded-lg bg-zinc-900 text-gray-200">Track Order</router-link>
      </div>

      <!-- User Mode Button Mobile -->
      <div class="pt-2 border-t border-gray-800">
        <button 
          @click="userStore.toggleUserMode(); isMobileMenuOpen = false" 
          class="w-full flex items-center justify-between p-3 rounded-xl border font-bold text-sm"
          :class="userStore.isB2B ? 'bg-amber-500/20 text-amber-300 border-amber-500/40' : 'bg-zinc-900 text-gray-300 border-gray-800'"
        >
          <span class="flex items-center space-x-2">
            <Building2 class="w-4 h-4 text-amber-400" />
            <span>Mode: {{ userStore.isB2B ? 'B2B Wholesale' : 'B2C Retail' }}</span>
          </span>
          <span class="text-xs px-2 py-0.5 rounded bg-black/40">Toggle</span>
        </button>
      </div>
    </div>

    <!-- Vehicle Selector Modal -->
    <VehicleSelectorModal 
      v-if="isVehicleModalOpen" 
      @close="isVehicleModalOpen = false" 
    />
  </header>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { 
  Flame, Car, Bike, Wrench, Search, Heart, ShoppingCart, 
  ChevronDown, ChevronRight, Menu, X, Building2, Globe, Send, Layers, 
  PackageSearch, LogIn, UserPlus, LogOut, User, Package, Lock 
} from '@lucide/vue';
import { useVehicleStore } from '../stores/vehicleStore';
import { useCartStore } from '../stores/cartStore';
import { useWishlistStore } from '../stores/wishlistStore';
import { useUserStore } from '../stores/userStore';
import { useLangStore } from '../stores/langStore';
import VehicleSelectorModal from './VehicleSelectorModal.vue';

const router = useRouter();
const vehicleStore = useVehicleStore();
const cartStore = useCartStore();
const wishlistStore = useWishlistStore();
const userStore = useUserStore();
const langStore = useLangStore();

const searchQuery = ref('');
const isMobileMenuOpen = ref(false);
const isVehicleModalOpen = ref(false);
const isUserMenuOpen = ref(false);

function handleSearch() {
  if (searchQuery.value.trim()) {
    router.push({ path: '/shop', query: { search: searchQuery.value.trim() } });
  }
}

function handleLogout() {
  isUserMenuOpen.value = false;
  userStore.logout();
  router.push('/auth');
}
</script>
