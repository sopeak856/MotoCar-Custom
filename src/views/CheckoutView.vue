<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 text-left">
    <!-- Header -->
    <div class="flex items-center space-x-2 text-xs text-gray-500">
      <router-link to="/cart" class="hover:text-gray-300">Cart</router-link>
      <span>/</span>
      <span class="text-gray-300 font-semibold">Checkout & Payment</span>
    </div>

    <h1 class="text-3xl font-black text-white uppercase tracking-tight">Checkout</h1>

    <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      <!-- Left Column: Shipping & Payment Method (7 Cols) -->
      <div class="lg:col-span-7 space-y-6">
        <!-- 1. Shipping Address Section -->
        <div class="p-6 rounded-3xl bg-[#12161f] border border-gray-800 space-y-4">
          <div class="flex items-center space-x-3">
            <div class="w-8 h-8 rounded-xl bg-red-600/20 text-red-500 flex items-center justify-center font-black text-xs">
              1
            </div>
            <h2 class="text-base font-black text-white uppercase tracking-wider">Shipping & Recipient Details</h2>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label class="block text-xs font-bold uppercase text-gray-400 mb-1">Full Name / Garage Name</label>
              <input 
                v-model="shippingData.recipient"
                type="text" 
                required
                class="w-full bg-zinc-900 border border-gray-700 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-red-500"
              />
            </div>

            <div>
              <label class="block text-xs font-bold uppercase text-gray-400 mb-1">Contact Phone</label>
              <input 
                v-model="shippingData.phone"
                type="text" 
                required
                class="w-full bg-zinc-900 border border-gray-700 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-red-500"
              />
            </div>

            <div>
              <label class="block text-xs font-bold uppercase text-gray-400 mb-1">Province / Municipality</label>
              <select 
                v-model="shippingData.province"
                class="w-full bg-zinc-900 border border-gray-700 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-red-500"
              >
                <option value="Phnom Penh">Phnom Penh (រាជធានីភ្នំពេញ)</option>
                <option value="Siem Reap">Siem Reap (ខេត្តសៀមរាប)</option>
                <option value="Battambang">Battambang (ខេត្តបាត់ដំបង)</option>
                <option value="Sihanoukville">Sihanoukville (ខេត្តព្រះសីហនុ)</option>
                <option value="Kandal">Kandal (ខេត្តកណ្តាល)</option>
                <option value="Kampong Cham">Kampong Cham (ខេត្តកំពង់ចាម)</option>
                <option value="Other Province">Other Provincial Route via VET</option>
              </select>
            </div>

            <div>
              <label class="block text-xs font-bold uppercase text-gray-400 mb-1">Telegram Contact (For Delivery)</label>
              <input 
                v-model="shippingData.telegram"
                type="text" 
                placeholder="@username"
                class="w-full bg-zinc-900 border border-gray-700 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-red-500"
              />
            </div>

            <div class="sm:col-span-2">
              <label class="block text-xs font-bold uppercase text-gray-400 mb-1">Street Address / Landmark / Sangkat</label>
              <textarea 
                v-model="shippingData.detail"
                rows="2"
                placeholder="House number, Street, Sangkat, Khan or specific garage location..."
                class="w-full bg-zinc-900 border border-gray-700 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-red-500"
              ></textarea>
            </div>
          </div>
        </div>

        <!-- 2. Delivery Options -->
        <div class="p-6 rounded-3xl bg-[#12161f] border border-gray-800 space-y-4">
          <div class="flex items-center space-x-3">
            <div class="w-8 h-8 rounded-xl bg-red-600/20 text-red-500 flex items-center justify-center font-black text-xs">
              2
            </div>
            <h2 class="text-base font-black text-white uppercase tracking-wider">Delivery Logistics Method</h2>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <!-- Option 1: Express Courier -->
            <div 
              @click="cartStore.deliveryMethod = 'courier'"
              class="p-4 rounded-2xl border cursor-pointer transition-all"
              :class="cartStore.deliveryMethod === 'courier' ? 'bg-red-600/15 border-red-500 text-white' : 'bg-zinc-900 border-gray-800 text-gray-400'"
            >
              <Truck class="w-5 h-5 text-red-500 mb-2" />
              <div class="text-xs font-bold text-white">Phnom Penh Express</div>
              <div class="text-[10px] text-gray-400 mt-1">Same-day / Next-day direct door delivery</div>
              <div class="text-xs font-mono font-bold text-red-400 mt-2">$6.00 (Free over $300)</div>
            </div>

            <!-- Option 2: Virak Buntham Express -->
            <div 
              @click="cartStore.deliveryMethod = 'virak_buntham'"
              class="p-4 rounded-2xl border cursor-pointer transition-all"
              :class="cartStore.deliveryMethod === 'virak_buntham' ? 'bg-red-600/15 border-red-500 text-white' : 'bg-zinc-900 border-gray-800 text-gray-400'"
            >
              <Building2 class="w-5 h-5 text-amber-500 mb-2" />
              <div class="text-xs font-bold text-white">Virak Buntham (VET)</div>
              <div class="text-[10px] text-gray-400 mt-1">Depot pickup in any of 25 provinces</div>
              <div class="text-xs font-mono font-bold text-amber-400 mt-2">$4.50 (Free over $300)</div>
            </div>

            <!-- Option 3: Direct to Partner Garage -->
            <div 
              @click="cartStore.deliveryMethod = 'direct_garage'"
              class="p-4 rounded-2xl border cursor-pointer transition-all"
              :class="cartStore.deliveryMethod === 'direct_garage' ? 'bg-cyan-600/15 border-cyan-500 text-white' : 'bg-zinc-900 border-gray-800 text-gray-400'"
            >
              <Wrench class="w-5 h-5 text-cyan-400 mb-2" />
              <div class="text-xs font-bold text-white">Ship to Garage</div>
              <div class="text-[10px] text-gray-400 mt-1">Direct to partner garage for installation</div>
              <div class="text-xs font-mono font-bold text-emerald-400 mt-2">FREE Delivery</div>
            </div>
          </div>
        </div>

        <!-- 3. Payment Method -->
        <div class="p-6 rounded-3xl bg-[#12161f] border border-gray-800 space-y-4">
          <div class="flex items-center space-x-3">
            <div class="w-8 h-8 rounded-xl bg-red-600/20 text-red-500 flex items-center justify-center font-black text-xs">
              3
            </div>
            <h2 class="text-base font-black text-white uppercase tracking-wider">Payment Method</h2>
          </div>

          <div class="space-y-3">
            <!-- Payment 1: KHQR Bakong -->
            <div 
              @click="selectedPayment = 'khqr'"
              class="p-4 rounded-2xl border cursor-pointer transition-all flex items-center justify-between"
              :class="selectedPayment === 'khqr' ? 'bg-red-600/15 border-red-500 text-white shadow-lg shadow-red-950/20' : 'bg-zinc-900 border-gray-800 text-gray-400'"
            >
              <div class="flex items-center space-x-3">
                <div class="px-2 py-1 bg-red-600 text-white font-black text-xs rounded tracking-tighter">
                  KHQR
                </div>
                <div>
                  <div class="text-xs font-bold text-white">KHQR Scan to Pay (Bakong Standard)</div>
                  <div class="text-[10px] text-gray-400">Supported by ABA, ACLEDA, Wing, Canadia & 30+ Cambodian banks</div>
                </div>
              </div>
              <span class="text-xs font-bold text-emerald-400">Instant Verification</span>
            </div>

            <!-- Payment 2: Cash on Delivery / Pay at Garage -->
            <div 
              @click="selectedPayment = 'cod'"
              class="p-4 rounded-2xl border cursor-pointer transition-all flex items-center justify-between"
              :class="selectedPayment === 'cod' ? 'bg-red-600/15 border-red-500 text-white' : 'bg-zinc-900 border-gray-800 text-gray-400'"
            >
              <div class="flex items-center space-x-3">
                <DollarSign class="w-5 h-5 text-emerald-400" />
                <div>
                  <div class="text-xs font-bold text-white">Cash on Delivery (COD) / Pay at Garage</div>
                  <div class="text-[10px] text-gray-400">Inspect the parts upon courier arrival or pay at partner workshop</div>
                </div>
              </div>
            </div>

            <!-- Payment 3: B2B Net-30 Credit Term -->
            <div 
              @click="selectedPayment = 'b2b_credit'"
              class="p-4 rounded-2xl border cursor-pointer transition-all flex items-center justify-between"
              :class="selectedPayment === 'b2b_credit' ? 'bg-amber-500/15 border-amber-500 text-white shadow-lg' : 'bg-zinc-900 border-gray-800 text-gray-400'"
            >
              <div class="flex items-center space-x-3">
                <Layers class="w-5 h-5 text-amber-400" />
                <div>
                  <div class="text-xs font-bold text-white">B2B Net 30 Days Credit Term</div>
                  <div class="text-[10px] text-gray-400">
                    For verified garages & workshops (Available Credit: ${{ userStore.user.b2bProfile.availableCredit.toLocaleString() }})
                  </div>
                </div>
              </div>
              <span class="text-[10px] px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-bold border border-amber-500/30">
                PO Invoiced
              </span>
            </div>

            <!-- PO Number Input if B2B Credit selected -->
            <div v-if="selectedPayment === 'b2b_credit'" class="p-3 bg-amber-950/20 border border-amber-500/30 rounded-xl space-y-2">
              <label class="block text-xs font-bold uppercase text-amber-300">Workshop Purchase Order (PO) Number</label>
              <input 
                v-model="poNumber"
                type="text" 
                placeholder="e.g. PO-APEX-2026-118"
                class="w-full bg-zinc-900 border border-amber-500/40 rounded-lg px-3 py-2 text-xs text-white uppercase font-mono focus:outline-none"
              />
            </div>
          </div>
        </div>
      </div>

      <!-- Right Column: Order Summary & Confirm (5 Cols) -->
      <div class="lg:col-span-5 space-y-4">
        <div class="p-6 rounded-3xl bg-[#12161f] border border-gray-800 space-y-5">
          <h2 class="text-base font-black text-white uppercase tracking-wider">Order Items ({{ cartStore.totalCount }})</h2>

          <!-- Mini Items List -->
          <div class="space-y-3 max-h-60 overflow-y-auto pr-1">
            <div 
              v-for="item in cartStore.items" 
              :key="item.productId"
              class="flex items-center justify-between text-xs py-2 border-b border-gray-800/80"
            >
              <div class="flex items-center space-x-3 overflow-hidden">
                <img :src="item.product.images[0]" class="w-10 h-10 rounded-lg object-cover bg-zinc-900 border border-gray-700 shrink-0" />
                <div class="truncate">
                  <div class="font-bold text-white truncate">{{ item.product.title }}</div>
                  <div class="text-[10px] text-gray-400">Qty: {{ item.quantity }} × ${{ cartStore.getItemUnitPrice(item) }}</div>
                </div>
              </div>
              <div class="font-mono font-bold text-white shrink-0 ml-2">
                ${{ (cartStore.getItemUnitPrice(item) * item.quantity).toFixed(0) }}
              </div>
            </div>
          </div>

          <!-- Total Calculation -->
          <div class="space-y-2 text-xs text-gray-400 border-t border-gray-800 pt-3">
            <div class="flex justify-between">
              <span>Subtotal:</span>
              <span class="font-mono text-white">${{ cartStore.subtotal.toFixed(2) }}</span>
            </div>
            <div v-if="cartStore.installationTotal > 0" class="flex justify-between text-cyan-400">
              <span>Installation Service:</span>
              <span class="font-mono font-bold">+${{ cartStore.installationTotal.toFixed(2) }}</span>
            </div>
            <div v-if="cartStore.discountAmount > 0" class="flex justify-between text-emerald-400">
              <span>Discount ({{ cartStore.appliedPromo?.code }}):</span>
              <span class="font-mono font-bold">-${{ cartStore.discountAmount.toFixed(2) }}</span>
            </div>
            <div class="flex justify-between">
              <span>Shipping Fee:</span>
              <span class="font-mono text-white">{{ cartStore.shippingCost === 0 ? 'FREE' : `$${cartStore.shippingCost.toFixed(2)}` }}</span>
            </div>
            <div class="flex justify-between">
              <span>Cambodia VAT (10%):</span>
              <span class="font-mono text-white">${{ cartStore.taxAmount.toFixed(2) }}</span>
            </div>

            <!-- Grand Total -->
            <div class="border-t border-gray-800 pt-3 flex items-baseline justify-between">
              <span class="text-sm font-bold text-white uppercase">Grand Total:</span>
              <div class="text-right">
                <div class="text-2xl font-black font-mono text-red-500">
                  ${{ cartStore.grandTotal.toFixed(2) }}
                </div>
                <div class="text-[11px] font-mono text-gray-400">
                  ≈ {{ cartStore.grandTotalKHR.toLocaleString() }} KHR (៛)
                </div>
              </div>
            </div>
          </div>

          <!-- Place Order Button -->
          <button 
            @click="handlePlaceOrder"
            class="w-full py-4 rounded-2xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-extrabold text-sm uppercase tracking-wider shadow-xl shadow-red-600/30 flex items-center justify-center space-x-2 transition-all cursor-pointer"
          >
            <CheckCircle2 class="w-5 h-5" />
            <span>{{ selectedPayment === 'khqr' ? 'Proceed to KHQR Scan' : 'Confirm & Place Order' }}</span>
          </button>

          <p class="text-[11px] text-gray-500 text-center">
            By clicking above, you agree to MotoCar Custom Cambodia terms of warranty & delivery.
          </p>
        </div>
      </div>
    </div>

    <!-- KHQR Modal -->
    <KHQRModal 
      v-if="isKHQRModalOpen"
      :amountUSD="cartStore.grandTotal"
      @success="onKHQRPaid"
      @cancel="isKHQRModalOpen = false"
    />
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue';
import { useRouter } from 'vue-router';
import { Truck, Building2, Wrench, DollarSign, Layers, CheckCircle2 } from '@lucide/vue';
import { useCartStore } from '../stores/cartStore';
import { useUserStore } from '../stores/userStore';
import KHQRModal from '../components/KHQRModal.vue';

const router = useRouter();
const cartStore = useCartStore();
const userStore = useUserStore();

const shippingData = reactive({
  recipient: userStore.user.name,
  phone: userStore.user.phone,
  province: 'Phnom Penh',
  telegram: userStore.user.telegram,
  detail: 'House #42, Street 315, Sangkat Boeung Kak 1, Khan Tuol Kork'
});

const selectedPayment = ref('khqr');
const poNumber = ref('PO-APEX-2026-901');
const isKHQRModalOpen = ref(false);

function handlePlaceOrder() {
  if (selectedPayment.value === 'khqr') {
    isKHQRModalOpen.value = true;
  } else {
    finishOrder(selectedPayment.value === 'b2b_credit' ? `B2B Credit Net-30 (${poNumber.value})` : 'Cash on Delivery (COD)');
  }
}

function onKHQRPaid(paymentPayload) {
  isKHQRModalOpen.value = false;
  finishOrder(paymentPayload.paymentMethod, 'Paid');
}

function finishOrder(method, status = 'Confirmed') {
  const newOrderId = 'MCC-2026-' + Math.floor(1000 + Math.random() * 9000);
  
  const createdOrder = userStore.addOrder({
    id: newOrderId,
    date: new Date().toISOString().split('T')[0],
    status: status === 'Paid' ? 'Paid / Processing' : 'Confirmed / Awaiting Delivery',
    statusCode: 'processing',
    trackingNumber: 'VET-EXP-' + Math.floor(100000 + Math.random() * 900000) + 'KH',
    carrier: cartStore.deliveryMethod === 'virak_buntham' ? 'Virak Buntham Express (VET)' : 'MotoCar Direct Courier (Phnom Penh)',
    items: [...cartStore.items],
    paymentMethod: method,
    subtotal: cartStore.subtotal,
    installationTotal: cartStore.installationTotal,
    discount: cartStore.discountAmount,
    shipping: cartStore.shippingCost,
    tax: cartStore.taxAmount,
    total: cartStore.grandTotal,
    shippingAddress: { ...shippingData, address: `${shippingData.detail}, ${shippingData.province}` },
    installationDetails: {
      garageName: 'Apex Performance Tuning & Dyno Lab',
      appointmentDate: '2026-11-04',
      timeSlot: '11:00 AM',
      vehicle: '2024 Honda Civic Type R (FL5)'
    },
    trackingTimeline: [
      { title: 'Order Placed & Acknowledged', time: 'Just Now', done: true, desc: 'Official order entry recorded in MotoCar Custom Cambodia ERP' },
      { title: 'Warehouse Quality & Fitment Verification', time: 'In Progress', done: false, desc: 'Serial numbers and authenticity holograms inspected' },
      { title: 'Handed to Delivery Courier', time: 'Estimated within 24h', done: false, desc: 'Package prepared with heavy shockproof crating' },
      { title: 'Installation / Final Handover', time: 'Estimated 2-3 Days', done: false, desc: 'Ready for customer testing & pickup' }
    ]
  });

  cartStore.clearCart();
  router.push(`/order-confirmation/${newOrderId}`);
}
</script>

