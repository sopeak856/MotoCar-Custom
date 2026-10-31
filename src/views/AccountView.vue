<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 text-left">
    <!-- If NOT logged in, show prompt to sign in or register -->
    <div v-if="!userStore.isLoggedIn" class="text-center py-20 bg-[#12161f] border border-gray-800 rounded-3xl p-8 space-y-4 max-w-lg mx-auto">
      <div class="w-16 h-16 rounded-2xl bg-zinc-900 border border-gray-700 flex items-center justify-center mx-auto text-red-500">
        <Lock class="w-8 h-8" />
      </div>
      <h2 class="text-xl font-bold text-white uppercase tracking-wider">Account Sign In Required</h2>
      <p class="text-xs text-gray-400">
        Please sign in with your retail account or register your tuning workshop for B2B wholesale access.
      </p>
      <div class="flex flex-col sm:flex-row gap-3 justify-center pt-2">
        <router-link 
          to="/auth?mode=login"
          class="px-6 py-3 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs uppercase tracking-wider transition-colors"
        >
          Sign In (B2C / B2B)
        </router-link>
        <router-link 
          to="/auth?mode=register"
          class="px-6 py-3 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-gray-700 text-gray-200 font-bold text-xs uppercase tracking-wider transition-colors"
        >
          Register New Account
        </router-link>
      </div>
    </div>

    <!-- If LOGGED IN -->
    <template v-else>
      <!-- Account Header & User Mode Switcher -->
      <div class="p-6 sm:p-8 rounded-3xl bg-[#12161f] border border-gray-800 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div class="flex items-center space-x-4">
          <img 
            :src="userStore.user.avatar" 
            alt="User Avatar" 
            class="w-16 h-16 rounded-2xl object-cover ring-2 ring-red-500/50 shadow-lg"
          />
          <div>
            <div class="flex items-center space-x-2">
              <h1 class="text-2xl font-black text-white">{{ userStore.user.name }}</h1>
              <span 
                class="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider"
                :class="userStore.isB2B ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40' : 'bg-red-600/20 text-red-300 border border-red-500/30'"
              >
                {{ userStore.isB2B ? 'B2B Wholesale Garage' : 'B2C Retail Customer' }}
              </span>
            </div>
            <div class="text-xs text-gray-400 mt-1">
              {{ userStore.user.email }} • {{ userStore.user.phone }}
            </div>
          </div>
        </div>

        <!-- Mode Switcher & Logout Card -->
        <div class="flex flex-wrap items-center gap-3">
          <div class="p-3.5 rounded-2xl bg-zinc-950 border border-gray-800 flex items-center justify-between gap-4">
            <div>
              <div class="text-[10px] font-bold uppercase text-gray-500">Active Mode</div>
              <div class="text-xs font-bold text-white">
                {{ userStore.isB2B ? 'B2B Wholesale Portal' : 'B2C Retail Buyer' }}
              </div>
              <div v-if="userStore.isB2B" class="text-[10px] text-amber-400 font-mono mt-0.5">
                Credit: ${{ userStore.user.b2bProfile.availableCredit.toLocaleString() }}
              </div>
            </div>

            <button 
              @click="userStore.toggleUserMode"
              class="px-3.5 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer"
              :class="userStore.isB2B ? 'bg-amber-500 hover:bg-amber-400 text-black' : 'bg-red-600 hover:bg-red-500 text-white'"
            >
              {{ userStore.isB2B ? 'Switch to Retail' : 'Switch to B2B' }}
            </button>
          </div>

          <!-- Sign Out Button -->
          <button 
            @click="handleLogout"
            class="px-4 py-3 rounded-2xl bg-zinc-900 hover:bg-red-950/40 border border-gray-800 hover:border-red-500/40 text-gray-400 hover:text-red-400 text-xs font-bold transition-all flex items-center space-x-1.5 cursor-pointer"
            title="Sign Out"
          >
            <LogOut class="w-4 h-4" />
            <span>Logout</span>
          </button>
        </div>
      </div>

      <!-- Navigation Tabs -->
      <div class="flex items-center space-x-2 overflow-x-auto pb-2 border-b border-gray-800 text-xs font-bold">
        <button 
          @click="activeTab = 'orders'"
          class="px-4 py-2.5 rounded-xl flex items-center space-x-2 transition-all cursor-pointer shrink-0"
          :class="activeTab === 'orders' ? 'bg-red-600 text-white shadow-md' : 'text-gray-400 hover:text-white hover:bg-zinc-900'"
        >
          <Package class="w-4 h-4" />
          <span>My Orders ({{ userStore.orders.length }})</span>
        </button>

        <button 
          @click="activeTab = 'rfq'"
          class="px-4 py-2.5 rounded-xl flex items-center space-x-2 transition-all cursor-pointer shrink-0"
          :class="activeTab === 'rfq' ? 'bg-amber-500 text-black shadow-md' : 'text-amber-400 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30'"
        >
          <Layers class="w-4 h-4" />
          <span>RFQ Management ({{ userStore.rfqList.length }})</span>
        </button>

        <button 
          @click="activeTab = 'garage'"
          class="px-4 py-2.5 rounded-xl flex items-center space-x-2 transition-all cursor-pointer shrink-0"
          :class="activeTab === 'garage' ? 'bg-red-600 text-white shadow-md' : 'text-gray-400 hover:text-white hover:bg-zinc-900'"
        >
          <Car class="w-4 h-4" />
          <span>My Garage ({{ vehicleStore.garageVehicles.length }})</span>
        </button>

        <button 
          @click="activeTab = 'addresses'"
          class="px-4 py-2.5 rounded-xl flex items-center space-x-2 transition-all cursor-pointer shrink-0"
          :class="activeTab === 'addresses' ? 'bg-red-600 text-white shadow-md' : 'text-gray-400 hover:text-white hover:bg-zinc-900'"
        >
          <MapPin class="w-4 h-4" />
          <span>Addresses</span>
        </button>

        <button 
          @click="activeTab = 'security'"
          class="px-4 py-2.5 rounded-xl flex items-center space-x-2 transition-all cursor-pointer shrink-0"
          :class="activeTab === 'security' ? 'bg-red-600 text-white shadow-md' : 'text-gray-400 hover:text-white hover:bg-zinc-900'"
        >
          <Lock class="w-4 h-4" />
          <span>Security & Password</span>
        </button>
      </div>

      <!-- TAB 1: MY ORDERS & LIVE TRACKING -->
      <div v-if="activeTab === 'orders'" class="space-y-6">
        <div 
          v-for="order in userStore.orders" 
          :key="order.id"
          class="bg-[#12161f] border border-gray-800 rounded-3xl p-6 space-y-4"
        >
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-800 pb-4">
            <div>
              <div class="flex items-center space-x-2">
                <span class="text-base font-black font-mono text-white">{{ order.id }}</span>
                <span class="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-cyan-950 text-cyan-400 border border-cyan-500/30">
                  {{ order.status }}
                </span>
              </div>
              <div class="text-xs text-gray-400 mt-0.5">
                Placed on {{ order.date }} • Total: ${{ Number(order.total).toFixed(2) }} ({{ (order.total * 4100).toLocaleString() }} ៛)
              </div>
            </div>

            <div class="flex items-center space-x-2">
              <router-link 
                :to="{ path: '/tracking', query: { id: order.id } }"
                class="px-3.5 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white font-bold text-xs flex items-center space-x-1.5 transition-colors"
              >
                <PackageSearch class="w-3.5 h-3.5 text-red-400" />
                <span>Track Live Delivery</span>
              </router-link>

              <button 
                @click="openTaxModal(order)"
                class="px-3 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs flex items-center space-x-1 transition-colors cursor-pointer"
              >
                <FileText class="w-3.5 h-3.5" />
                <span>Tax Invoice</span>
              </button>
            </div>
          </div>

          <!-- Items inside this order -->
          <div class="space-y-3">
            <div 
              v-for="item in order.items" 
              :key="item.id || item.productId"
              class="flex items-center justify-between text-xs"
            >
              <div class="flex items-center space-x-3">
                <img :src="item.product?.images?.[0] || item.image" class="w-12 h-12 rounded-xl object-cover bg-zinc-900 border border-gray-700" />
                <div>
                  <div class="font-bold text-white">{{ item.product?.title || item.title }}</div>
                  <div class="text-[10px] text-gray-400">Qty: {{ item.quantity }} • ${{ item.price || item.product?.retailPrice }}</div>
                </div>
              </div>
              <div class="font-mono font-bold text-white">${{ (item.price || item.product?.retailPrice) * item.quantity }}</div>
            </div>
          </div>
        </div>
      </div>

      <!-- TAB 2: RFQ MANAGEMENT (B2B QUOTES) -->
      <div v-else-if="activeTab === 'rfq'" class="space-y-6">
        <div class="flex items-center justify-between">
          <div>
            <h2 class="text-base font-bold text-white uppercase tracking-wider">Wholesale Quotation Requests (RFQ)</h2>
            <p class="text-xs text-gray-400">Manage bulk container and fleet orders directly with MotoCar Custom pricing desk.</p>
          </div>
          <router-link to="/shop?b2bOnly=true" class="px-3.5 py-2 rounded-xl bg-amber-500 text-black font-bold text-xs uppercase tracking-wider">
            New RFQ Request
          </router-link>
        </div>

        <div class="space-y-4">
          <div 
            v-for="rfq in userStore.rfqList" 
            :key="rfq.id"
            class="bg-[#12161f] border border-gray-800 rounded-3xl p-6 space-y-4"
          >
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-800 pb-3">
              <div>
                <div class="flex items-center space-x-2">
                  <span class="text-sm font-black font-mono text-amber-400">{{ rfq.id }}</span>
                  <span class="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                    {{ rfq.status }}
                  </span>
                </div>
                <div class="text-xs text-white font-bold mt-1">{{ rfq.productName }}</div>
              </div>

              <div class="text-right">
                <div class="text-xs text-gray-400">Total Quoted Value</div>
                <div class="text-lg font-black font-mono text-white">${{ rfq.totalQuoted.toLocaleString() }}</div>
              </div>
            </div>

            <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div class="p-2.5 rounded-xl bg-zinc-900 border border-gray-800">
                <span class="text-gray-500 block text-[10px]">Target Quantity</span>
                <span class="font-mono font-bold text-white">{{ rfq.targetQty }} units</span>
              </div>
              <div class="p-2.5 rounded-xl bg-zinc-900 border border-gray-800">
                <span class="text-gray-500 block text-[10px]">Unit Price</span>
                <span class="font-mono font-bold text-amber-400">${{ rfq.offeredUnitPrice }}</span>
              </div>
              <div class="p-2.5 rounded-xl bg-zinc-900 border border-gray-800">
                <span class="text-gray-500 block text-[10px]">Payment Terms</span>
                <span class="font-bold text-white">{{ rfq.paymentTerm }}</span>
              </div>
              <div class="p-2.5 rounded-xl bg-zinc-900 border border-gray-800">
                <span class="text-gray-500 block text-[10px]">Valid Until</span>
                <span class="font-mono text-gray-300">{{ rfq.validUntil }}</span>
              </div>
            </div>

            <div v-if="rfq.replyFromAdmin" class="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-300">
              <span class="font-bold">Desk Note:</span> {{ rfq.replyFromAdmin }}
            </div>
          </div>
        </div>
      </div>

      <!-- TAB 3: MY GARAGE -->
      <div v-else-if="activeTab === 'garage'" class="space-y-6">
        <div class="flex items-center justify-between">
          <h2 class="text-base font-bold text-white uppercase tracking-wider">Registered Vehicles</h2>
          <button 
            @click="isVehicleModalOpen = true"
            class="px-4 py-2 rounded-xl bg-red-600 text-white font-bold text-xs"
          >
            Add New Vehicle
          </button>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div 
            v-for="v in vehicleStore.garageVehicles" 
            :key="v.id"
            class="p-5 rounded-2xl bg-[#12161f] border border-gray-800 flex items-center justify-between"
          >
            <div class="flex items-center space-x-3">
              <div class="w-10 h-10 rounded-xl bg-zinc-900 border border-gray-700 flex items-center justify-center text-red-500">
                <Car v-if="v.type === 'car'" class="w-5 h-5" />
                <Bike v-else class="w-5 h-5" />
              </div>
              <div>
                <div class="text-xs font-bold text-white">{{ v.year }} {{ v.make }} {{ v.model }}</div>
                <div class="text-[10px] text-gray-400 font-mono">{{ v.plateNumber || v.nickname }}</div>
              </div>
            </div>

            <span 
              v-if="vehicleStore.activeVehicle?.id === v.id"
              class="px-2 py-0.5 rounded text-[10px] font-bold bg-red-600 text-white"
            >
              ACTIVE
            </span>
            <button 
              v-else 
              @click="vehicleStore.selectActiveVehicle(v)"
              class="px-3 py-1 rounded-lg bg-zinc-800 text-xs text-gray-300 hover:text-white"
            >
              Select
            </button>
          </div>
        </div>
      </div>

      <!-- TAB 4: ADDRESSES -->
      <div v-else-if="activeTab === 'addresses'" class="space-y-4">
        <h2 class="text-base font-bold text-white uppercase tracking-wider">Saved Delivery Addresses</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div 
            v-for="addr in userStore.user.savedAddresses" 
            :key="addr.id"
            class="p-5 rounded-2xl bg-[#12161f] border border-gray-800 space-y-2 text-xs"
          >
            <div class="flex justify-between items-center">
              <span class="font-bold text-white">{{ addr.label }}</span>
              <span v-if="addr.isDefault" class="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-950 text-emerald-400 border border-emerald-500/30">DEFAULT</span>
            </div>
            <div class="text-gray-300">{{ addr.recipient }} ({{ addr.phone }})</div>
            <div class="text-gray-400">{{ addr.detail }}, {{ addr.district }}, {{ addr.province }}</div>
          </div>
        </div>
      </div>

      <!-- TAB 5: SECURITY -->
      <div v-else-if="activeTab === 'security'" class="max-w-md bg-[#12161f] border border-gray-800 rounded-3xl p-6 space-y-4">
        <h2 class="text-base font-bold text-white uppercase tracking-wider">Change Password</h2>
        <div class="space-y-3">
          <div>
            <label class="block text-xs font-bold uppercase text-gray-400 mb-1">Current Password</label>
            <input type="password" value="••••••••••••" class="w-full bg-zinc-900 border border-gray-700 rounded-xl px-3 py-2 text-xs text-white" />
          </div>
          <div>
            <label class="block text-xs font-bold uppercase text-gray-400 mb-1">New Password</label>
            <input type="password" placeholder="At least 8 characters" class="w-full bg-zinc-900 border border-gray-700 rounded-xl px-3 py-2 text-xs text-white" />
          </div>
          <button class="w-full py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer">
            Update Password
          </button>
        </div>
      </div>
    </template>

    <!-- Modals -->
    <TaxInvoiceModal 
      v-if="selectedTaxOrder"
      :order="selectedTaxOrder"
      @close="selectedTaxOrder = null"
    />

    <VehicleSelectorModal 
      v-if="isVehicleModalOpen"
      @close="isVehicleModalOpen = false"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { Package, Layers, Car, Bike, MapPin, Lock, FileText, PackageSearch, LogOut } from '@lucide/vue';
import { useUserStore } from '../stores/userStore';
import { useVehicleStore } from '../stores/vehicleStore';
import TaxInvoiceModal from '../components/TaxInvoiceModal.vue';
import VehicleSelectorModal from '../components/VehicleSelectorModal.vue';

const router = useRouter();
const userStore = useUserStore();
const vehicleStore = useVehicleStore();

const activeTab = ref('orders');
const selectedTaxOrder = ref(null);
const isVehicleModalOpen = ref(false);

function openTaxModal(order) {
  selectedTaxOrder.value = order;
}

function handleLogout() {
  userStore.logout();
  router.push('/auth');
}
</script>
