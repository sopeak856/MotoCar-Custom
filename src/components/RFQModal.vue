<template>
  <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in">
    <div class="bg-[#12161f] border border-amber-500/40 rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl relative text-left">
      <!-- Modal Header -->
      <div class="bg-gradient-to-r from-amber-600 to-orange-600 p-5 text-black flex items-center justify-between">
        <div class="flex items-center space-x-3">
          <div class="w-10 h-10 rounded-xl bg-black/20 flex items-center justify-center text-black">
            <Layers class="w-6 h-6" />
          </div>
          <div>
            <h3 class="text-base font-black uppercase tracking-wider">Request for Quote (RFQ)</h3>
            <p class="text-xs font-semibold text-black/80">Direct B2B Wholesale Pricing & Fleet Quoting</p>
          </div>
        </div>
        <button 
          @click="$emit('close')" 
          class="text-black/80 hover:text-black p-1.5 rounded-lg hover:bg-black/10 transition-colors cursor-pointer"
        >
          <X class="w-5 h-5" />
        </button>
      </div>

      <!-- Form Content -->
      <form @submit.prevent="handleSubmit" class="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
        <!-- Target Product Info -->
        <div class="p-3.5 rounded-xl bg-zinc-900 border border-gray-800 flex items-center space-x-3">
          <img 
            :src="product.images[0]" 
            :alt="product.title" 
            class="w-12 h-12 rounded-lg object-cover border border-gray-700 shrink-0"
          />
          <div class="overflow-hidden">
            <div class="text-xs font-bold text-white truncate">{{ product.title }}</div>
            <div class="text-[10px] text-amber-400 font-mono">
              Retail: ${{ product.retailPrice }} | B2B MOQ: {{ product.b2bMoq || 3 }} units
            </div>
          </div>
        </div>

        <!-- Quantity & Target Price -->
        <div class="grid grid-cols-2 gap-3">
          <div>
            <label class="block text-xs font-bold uppercase text-gray-400 mb-1">Target Quantity</label>
            <input 
              v-model.number="formData.targetQty" 
              type="number" 
              :min="product.b2bMoq || 1"
              required
              class="w-full bg-zinc-900 border border-gray-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500 font-mono"
            />
          </div>

          <div>
            <label class="block text-xs font-bold uppercase text-gray-400 mb-1">Target Unit Price ($)</label>
            <input 
              v-model.number="formData.offeredUnitPrice" 
              type="number" 
              required
              class="w-full bg-zinc-900 border border-gray-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500 font-mono"
            />
          </div>
        </div>

        <!-- Estimated Total Value -->
        <div class="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 flex justify-between items-center text-xs">
          <span class="text-amber-300 font-medium">Estimated Quotation Value:</span>
          <span class="text-base font-black text-amber-400 font-mono">
            ${{ ((formData.targetQty || 0) * (formData.offeredUnitPrice || 0)).toLocaleString() }}
          </span>
        </div>

        <!-- Delivery Timeline & Location -->
        <div class="grid grid-cols-2 gap-3">
          <div>
            <label class="block text-xs font-bold uppercase text-gray-400 mb-1">Needed By</label>
            <input 
              v-model="formData.neededBy" 
              type="date" 
              required
              class="w-full bg-zinc-900 border border-gray-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
            />
          </div>

          <div>
            <label class="block text-xs font-bold uppercase text-gray-400 mb-1">Payment Term</label>
            <select 
              v-model="formData.paymentTerm" 
              class="w-full bg-zinc-900 border border-gray-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
            >
              <option value="Net 30 Days">B2B Net 30 Days</option>
              <option value="Net 60 Days">B2B Net 60 Days</option>
              <option value="KHQR Upfront">KHQR Upfront (Extra 3% Discount)</option>
              <option value="Letter of Credit">Letter of Credit (LC)</option>
            </select>
          </div>
        </div>

        <!-- Garage Notes / Specific Specs -->
        <div>
          <label class="block text-xs font-bold uppercase text-gray-400 mb-1">Notes / Build Details</label>
          <textarea 
            v-model="formData.garageNotes" 
            rows="3" 
            placeholder="Specify batch requirement, chassis codes, custom flange sizes or delivery logistics..."
            class="w-full bg-zinc-900 border border-gray-700 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-amber-500"
          ></textarea>
        </div>

        <!-- Submit Button -->
        <div class="pt-2">
          <button 
            type="submit" 
            class="w-full py-3 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-black font-extrabold text-xs uppercase tracking-wider shadow-xl shadow-amber-500/20 transition-all cursor-pointer"
          >
            Submit Official RFQ Request
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue';
import { X, Layers } from '@lucide/vue';
import { useUserStore } from '../stores/userStore';

const props = defineProps({
  product: {
    type: Object,
    required: true
  }
});

const emit = defineEmits(['close', 'submitted']);
const userStore = useUserStore();

const formData = reactive({
  targetQty: props.product.b2bMoq || 5,
  offeredUnitPrice: props.product.b2bTiers ? props.product.b2bTiers[1]?.price || props.product.b2bTiers[0].price : Math.round(props.product.retailPrice * 0.8),
  neededBy: '2026-11-20',
  paymentTerm: 'Net 30 Days',
  garageNotes: `Requesting wholesale quotation for ${props.product.title}`
});

function handleSubmit() {
  const newRfq = userStore.addRFQ({
    productName: props.product.title,
    targetQty: formData.targetQty,
    offeredUnitPrice: formData.offeredUnitPrice,
    totalQuoted: formData.targetQty * formData.offeredUnitPrice,
    validUntil: '2026-12-01',
    paymentTerm: formData.paymentTerm,
    garageNotes: formData.garageNotes
  });

  emit('submitted', newRfq);
  emit('close');
}
</script>

