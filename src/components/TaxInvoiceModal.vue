<template>
  <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in">
    <div class="bg-white text-zinc-900 rounded-2xl max-w-2xl w-full overflow-hidden shadow-2xl relative text-left">
      <!-- Modal Top Controls -->
      <div class="bg-zinc-900 text-white px-6 py-3 flex items-center justify-between no-print">
        <span class="text-xs font-bold uppercase tracking-wider text-gray-300">
          Official Cambodia Electronic Tax Invoice (វិក្កយបត្រពន្ធ)
        </span>
        <div class="flex items-center space-x-2">
          <button 
            @click="printInvoice"
            class="px-3 py-1 bg-red-600 hover:bg-red-500 text-white text-xs font-bold rounded-lg transition-colors cursor-pointer"
          >
            Print / Save PDF
          </button>
          <button 
            @click="$emit('close')"
            class="text-gray-400 hover:text-white p-1 rounded-lg hover:bg-zinc-800 transition-colors cursor-pointer"
          >
            <X class="w-5 h-5" />
          </button>
        </div>
      </div>

      <!-- Printable Invoice Area -->
      <div class="p-8 space-y-6 max-h-[80vh] overflow-y-auto text-xs font-sans" id="printable-tax-invoice">
        <!-- Official Header -->
        <div class="border-b-2 border-red-600 pb-4 flex justify-between items-start">
          <div>
            <h2 class="text-lg font-black text-red-600 tracking-wider uppercase font-sans">
              MOTOCAR CUSTOM (CAMBODIA) CO., LTD.
            </h2>
            <div class="text-[11px] font-bold text-gray-700">
              ម៉ូតូខា ខាសស្ទឹម (ខេមបូឌា) ខូអិលធីឌី
            </div>
            <div class="text-[11px] text-gray-600 mt-1">
              Street 2004, Sangkat Teuk Thla, Khan Sen Sok, Phnom Penh, Cambodia
            </div>
            <div class="text-[11px] text-gray-800 font-mono font-bold mt-0.5">
              VAT TIN: K009-882739102 | Tel: +855 (0)23 999 888
            </div>
          </div>

          <div class="text-right">
            <div class="text-base font-black text-zinc-900 uppercase">TAX INVOICE</div>
            <div class="text-xs font-khmer text-gray-600">វិក្កយបត្រពន្ធ</div>
            <div class="text-xs font-mono font-bold text-red-600 mt-1">INV #{{ order.id }}</div>
            <div class="text-[11px] text-gray-600">Date: {{ order.date || today }}</div>
          </div>
        </div>

        <!-- Bill To / Customer Details -->
        <div class="grid grid-cols-2 gap-4 bg-zinc-50 p-4 rounded-xl border border-gray-200">
          <div>
            <div class="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Customer / Garage Details</div>
            <div class="text-xs font-bold text-zinc-900 mt-1">{{ order.shippingAddress?.recipient || 'Sokha Rithy' }}</div>
            <div class="text-[11px] text-gray-600">{{ order.shippingAddress?.phone || '+855 12 888 999' }}</div>
            <div class="text-[11px] text-gray-600">{{ order.shippingAddress?.address || 'Phnom Penh, Cambodia' }}</div>
          </div>
          <div class="text-right">
            <div class="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Payment & Tax Spec</div>
            <div class="text-xs font-semibold text-zinc-800 mt-1">Method: {{ order.paymentMethod || 'KHQR Bakong' }}</div>
            <div class="text-[11px] text-gray-600">Official FX Rate: 1 USD = 4,100 KHR</div>
            <div class="text-[11px] text-emerald-700 font-bold">Status: TAX COMPLIANT / PAID</div>
          </div>
        </div>

        <!-- Items Table -->
        <table class="w-full border-collapse">
          <thead>
            <tr class="border-b border-zinc-300 text-left text-[11px] font-bold uppercase text-gray-600 bg-zinc-100">
              <th class="py-2 px-3">Description</th>
              <th class="py-2 px-3 text-center">Qty</th>
              <th class="py-2 px-3 text-right">Unit Price</th>
              <th class="py-2 px-3 text-right">Total USD</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-zinc-200 text-zinc-800">
            <tr v-for="item in order.items" :key="item.id">
              <td class="py-3 px-3">
                <div class="font-bold text-zinc-900">{{ item.title }}</div>
                <div v-if="item.withInstallation" class="text-[10px] text-red-600 font-medium">
                  + Partner Installation Service Included
                </div>
              </td>
              <td class="py-3 px-3 text-center font-mono">{{ item.quantity }}</td>
              <td class="py-3 px-3 text-right font-mono">${{ item.price.toLocaleString() }}</td>
              <td class="py-3 px-3 text-right font-mono font-bold">${{ (item.price * item.quantity).toLocaleString() }}</td>
            </tr>
          </tbody>
        </table>

        <!-- Calculations -->
        <div class="border-t border-zinc-300 pt-3 flex justify-end">
          <div class="w-64 space-y-1.5 text-right text-xs">
            <div class="flex justify-between text-gray-600">
              <span>Subtotal:</span>
              <span class="font-mono">${{ (order.subtotal || order.total * 0.9).toFixed(2) }}</span>
            </div>
            <div class="flex justify-between text-gray-600">
              <span>Installation & Delivery:</span>
              <span class="font-mono">${{ (order.installationTotal || 0).toFixed(2) }}</span>
            </div>
            <div class="flex justify-between text-gray-600">
              <span>VAT (10% អាករលើតម្លៃបន្ថែម):</span>
              <span class="font-mono">${{ (order.tax || order.total * 0.1).toFixed(2) }}</span>
            </div>
            <div class="flex justify-between text-base font-black text-red-600 border-t border-zinc-300 pt-2">
              <span>Grand Total USD:</span>
              <span class="font-mono">${{ Number(order.total).toFixed(2) }}</span>
            </div>
            <div class="text-xs font-bold text-gray-700 font-mono">
              ≈ {{ Math.round(order.total * 4100).toLocaleString() }} KHR (៛)
            </div>
          </div>
        </div>

        <!-- Cambodia GDT Stamp & Signatures -->
        <div class="pt-8 border-t border-zinc-200 grid grid-cols-2 gap-8 text-center text-[10px] text-gray-500">
          <div>
            <div class="h-12 border-b border-dashed border-gray-400 mb-1"></div>
            <div>Buyer Signature / ហត្ថលេខាអ្នកទិញ</div>
          </div>
          <div>
            <div class="h-12 border-b border-dashed border-gray-400 mb-1 flex items-center justify-center text-red-600 font-bold">
              [SEALED & DIGITALLY VERIFIED]
            </div>
            <div>Seller Signature / ហត្ថលេខាអ្នកលក់</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { X } from '@lucide/vue';

const props = defineProps({
  order: {
    type: Object,
    required: true
  }
});

defineEmits(['close']);

const today = computed(() => new Date().toISOString().split('T')[0]);

function printInvoice() {
  window.print();
}
</script>

<style scoped>
@media print {
  .no-print {
    display: none !important;
  }
  body * {
    visibility: hidden;
  }
  #printable-tax-invoice, #printable-tax-invoice * {
    visibility: visible;
  }
  #printable-tax-invoice {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
  }
}
</style>

