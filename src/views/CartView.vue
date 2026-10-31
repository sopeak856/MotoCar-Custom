<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 text-left">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-3xl font-black text-white uppercase tracking-tight">Shopping Cart</h1>
        <p class="text-xs text-gray-400 mt-1">Review your items, apply wholesale promo codes, and configure installation.</p>
      </div>
      <router-link to="/shop" class="text-xs font-bold text-red-400 hover:text-red-300">
        ← Continue Shopping
      </router-link>
    </div>

    <!-- Main Grid: Items List + Order Summary -->
    <div v-if="cartStore.items.length" class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      <!-- Items Column (8 Cols) -->
      <div class="lg:col-span-8 space-y-4">
        <!-- B2B Mode Banner if Active -->
        <div v-if="userStore.isB2B" class="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-between text-xs">
          <div class="flex items-center space-x-2 text-amber-300 font-bold">
            <Layers class="w-4 h-4 text-amber-400" />
            <span>B2B Wholesale Garage Mode Active: Volume Tier Discounts Applied</span>
          </div>
          <span class="text-[10px] text-amber-400 font-mono">Net 30 Invoicing Eligible</span>
        </div>

        <!-- Item Cards -->
        <div 
          v-for="item in cartStore.items" 
          :key="item.productId"
          class="p-4 sm:p-5 rounded-2xl bg-[#12161f] border border-gray-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
        >
          <!-- Left: Image & Info -->
          <div class="flex items-start space-x-4">
            <img 
              :src="item.product.images[0]" 
              :alt="item.product.title" 
              class="w-20 h-20 rounded-xl object-cover bg-zinc-950 border border-gray-700 shrink-0"
            />
            <div class="space-y-1">
              <span class="text-[10px] font-mono text-red-400 font-bold uppercase tracking-wider">
                {{ item.product.brand }}
              </span>
              <router-link :to="`/product/${item.product.id}`" class="text-sm font-bold text-white hover:text-red-400 transition-colors block line-clamp-1">
                {{ item.product.title }}
              </router-link>
              <div class="text-[11px] text-gray-400 font-mono">
                Unit Price: ${{ cartStore.getItemUnitPrice(item).toLocaleString() }}
              </div>

              <!-- Installation Toggle -->
              <div v-if="item.product.installationAvailable" class="pt-1">
                <label class="inline-flex items-center space-x-1.5 text-xs text-cyan-300 cursor-pointer">
                  <input 
                    type="checkbox" 
                    :checked="item.withInstallation"
                    @change="cartStore.toggleInstallation(item.productId)"
                    class="rounded bg-zinc-900 border-gray-700 text-cyan-500 focus:ring-cyan-500 w-3.5 h-3.5"
                  />
                  <span>Certified Installation (+${{ item.product.installationFee || 35 }})</span>
                </label>
              </div>
            </div>
          </div>

          <!-- Right: Quantity Controls & Subtotal -->
          <div class="flex items-center justify-between sm:justify-end gap-6 pt-3 sm:pt-0 border-t sm:border-t-0 border-gray-800">
            <!-- Quantity Stepper -->
            <div class="flex items-center border border-gray-700 rounded-xl bg-zinc-900 overflow-hidden">
              <button 
                @click="cartStore.updateQuantity(item.productId, item.quantity - 1)"
                class="p-2 hover:bg-zinc-800 text-gray-400 hover:text-white transition-colors cursor-pointer"
              >
                <Minus class="w-3.5 h-3.5" />
              </button>
              <span class="w-10 text-center font-mono font-bold text-xs text-white">
                {{ item.quantity }}
              </span>
              <button 
                @click="cartStore.updateQuantity(item.productId, item.quantity + 1)"
                class="p-2 hover:bg-zinc-800 text-gray-400 hover:text-white transition-colors cursor-pointer"
              >
                <Plus class="w-3.5 h-3.5" />
              </button>
            </div>

            <!-- Total Price for item -->
            <div class="text-right">
              <div class="text-sm font-black font-mono text-white">
                ${{ (cartStore.getItemUnitPrice(item) * item.quantity).toLocaleString() }}
              </div>
              <div class="text-[10px] text-gray-500 font-mono">
                ≈ {{ ((cartStore.getItemUnitPrice(item) * item.quantity) * 4100).toLocaleString() }} ៛
              </div>
            </div>

            <!-- Remove Button -->
            <button 
              @click="cartStore.removeFromCart(item.productId)"
              class="p-2 text-gray-500 hover:text-red-400 transition-colors cursor-pointer"
              title="Remove Item"
            >
              <Trash2 class="w-4 h-4" />
            </button>
          </div>
        </div>

        <!-- Clear Cart CTA -->
        <div class="flex justify-between items-center text-xs pt-2">
          <button 
            @click="cartStore.clearCart" 
            class="text-gray-500 hover:text-red-400 transition-colors cursor-pointer"
          >
            Clear Entire Cart
          </button>
          <span class="text-gray-400 font-medium">Free express shipping automatically applied over $300</span>
        </div>
      </div>

      <!-- Order Summary Card (4 Cols) -->
      <div class="lg:col-span-4 space-y-4">
        <div class="p-6 rounded-3xl bg-[#12161f] border border-gray-800 space-y-5">
          <h2 class="text-base font-black text-white uppercase tracking-wider">Order Summary</h2>

          <!-- Promo Code Input -->
          <div>
            <label class="block text-xs font-bold uppercase text-gray-400 mb-1.5">Promotion / Garage Code</label>
            <div class="flex items-center space-x-2">
              <input 
                v-model="promoInput"
                type="text" 
                placeholder="Try MOTO2025 or GARAGE10"
                class="w-full bg-zinc-900 border border-gray-700 rounded-xl px-3 py-2 text-xs text-white uppercase font-mono focus:outline-none focus:border-red-500"
              />
              <button 
                @click="applyPromoCode"
                class="px-4 py-2 bg-red-600 hover:bg-red-500 text-white rounded-xl text-xs font-bold shrink-0 transition-colors cursor-pointer"
              >
                Apply
              </button>
            </div>
            <div v-if="promoFeedback" class="text-[11px] font-semibold mt-1" :class="promoFeedback.success ? 'text-emerald-400' : 'text-red-400'">
              {{ promoFeedback.message }}
            </div>
          </div>

          <!-- Applied Promo Tag -->
          <div v-if="cartStore.appliedPromo" class="p-2.5 rounded-xl bg-emerald-950/40 border border-emerald-500/30 flex items-center justify-between text-xs text-emerald-300">
            <span class="font-bold">Code {{ cartStore.appliedPromo.code }} Applied ({{ cartStore.appliedPromo.discount }})</span>
            <button @click="cartStore.removePromo" class="text-gray-400 hover:text-white cursor-pointer">
              <X class="w-3.5 h-3.5" />
            </button>
          </div>

          <!-- Line Items Breakdown -->
          <div class="space-y-2.5 text-xs text-gray-400 border-t border-gray-800 pt-4">
            <div class="flex justify-between">
              <span>Subtotal:</span>
              <span class="font-mono text-white font-bold">${{ cartStore.subtotal.toFixed(2) }}</span>
            </div>

            <div v-if="cartStore.installationTotal > 0" class="flex justify-between text-cyan-400">
              <span>Certified Installation:</span>
              <span class="font-mono font-bold">+${{ cartStore.installationTotal.toFixed(2) }}</span>
            </div>

            <div v-if="cartStore.discountAmount > 0" class="flex justify-between text-emerald-400">
              <span>Promo Discount:</span>
              <span class="font-mono font-bold">-${{ cartStore.discountAmount.toFixed(2) }}</span>
            </div>

            <div class="flex justify-between">
              <span>Shipping (Cambodia):</span>
              <span class="font-mono" :class="cartStore.shippingCost === 0 ? 'text-emerald-400 font-bold' : 'text-white'">
                {{ cartStore.shippingCost === 0 ? 'FREE' : `$${cartStore.shippingCost.toFixed(2)}` }}
              </span>
            </div>

            <div class="flex justify-between">
              <span>Cambodia VAT (10% អាករ):</span>
              <span class="font-mono text-white font-bold">${{ cartStore.taxAmount.toFixed(2) }}</span>
            </div>

            <!-- Grand Total -->
            <div class="border-t border-gray-800 pt-3 flex items-baseline justify-between">
              <span class="text-sm font-bold text-white uppercase">Grand Total:</span>
              <div class="text-right">
                <div class="text-2xl font-black font-mono text-red-500">
                  ${{ cartStore.grandTotal.toFixed(2) }}
                </div>
                <div class="text-[11px] font-mono text-gray-400 font-bold">
                  {{ cartStore.grandTotalKHR.toLocaleString() }} KHR (៛)
                </div>
              </div>
            </div>
          </div>

          <!-- Checkout CTA Button -->
          <router-link 
            to="/checkout"
            class="w-full py-4 rounded-2xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-black text-xs uppercase tracking-wider shadow-xl shadow-red-600/30 flex items-center justify-center space-x-2 transition-all cursor-pointer block text-center"
          >
            <span>Proceed to Checkout</span>
            <ArrowRight class="w-4 h-4" />
          </router-link>

          <!-- Security Badges -->
          <div class="pt-2 text-center text-[10px] text-gray-500 space-y-1">
            <div>KHQR Bakong • ABA Pay • Net 30 Terms • COD</div>
            <div>Official Cambodia GDT Tax Invoice Generated with Every Order</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Empty Cart State -->
    <div v-else class="text-center py-20 bg-[#12161f] border border-gray-800 rounded-3xl p-8 space-y-4">
      <ShoppingCart class="w-16 h-16 text-gray-600 mx-auto" />
      <h2 class="text-xl font-bold text-white">Your Shopping Cart is Empty</h2>
      <p class="text-xs text-gray-400 max-w-sm mx-auto">
        Browse our catalog of titanium exhausts, dry carbon wings, and superbike upgrades to start customizing your ride.
      </p>
      <router-link 
        to="/shop" 
        class="inline-block px-6 py-3 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs uppercase tracking-wider transition-colors"
      >
        Explore Catalog Now
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { ShoppingCart, Layers, Minus, Plus, Trash2, X, ArrowRight } from '@lucide/vue';
import { useCartStore } from '../stores/cartStore';
import { useUserStore } from '../stores/userStore';

const cartStore = useCartStore();
const userStore = useUserStore();

const promoInput = ref('');
const promoFeedback = ref(null);

function applyPromoCode() {
  if (!promoInput.value.trim()) return;
  const res = cartStore.applyPromo(promoInput.value.trim());
  promoFeedback.value = res;
  if (res.success) {
    promoInput.value = '';
  }
}
</script>

