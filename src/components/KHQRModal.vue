<template>
  <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in">
    <div class="bg-[#12161f] border border-red-500/30 rounded-3xl max-w-md w-full overflow-hidden shadow-2xl relative text-center">
      <!-- KHQR Header Banner -->
      <div class="bg-gradient-to-r from-red-600 to-rose-700 py-3.5 px-6 text-white flex items-center justify-between">
        <div class="flex items-center space-x-2">
          <div class="bg-white text-red-600 font-black text-xs px-2 py-0.5 rounded tracking-tighter">
            KHQR
          </div>
          <span class="text-xs font-bold uppercase tracking-wider">Bakong National QR</span>
        </div>
        <button 
          @click="$emit('cancel')" 
          class="text-white/80 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
        >
          <X class="w-5 h-5" />
        </button>
      </div>

      <!-- Merchant Info & Amount -->
      <div class="p-6 space-y-5">
        <div>
          <div class="text-xs font-bold text-gray-400 uppercase tracking-widest">Merchant</div>
          <h3 class="text-base font-extrabold text-white mt-0.5">MOTOCAR CUSTOM (CAMBODIA) CO., LTD</h3>
          <p class="text-[11px] text-gray-500 font-mono">TIN: K009-882739102 • Bakong ID: motocarcustom@aba</p>
        </div>

        <!-- Big Amount Display -->
        <div class="bg-zinc-900/80 border border-gray-800 rounded-2xl p-4">
          <div class="text-xs text-gray-400 font-medium">Total Amount Due</div>
          <div class="text-3xl font-black text-white font-mono tracking-tight mt-1">
            ${{ amountUSD.toFixed(2) }}
          </div>
          <div class="text-sm font-bold text-red-400 font-mono mt-0.5">
            {{ amountKHR.toLocaleString() }} KHR (៛)
          </div>
        </div>

        <!-- QR Code Frame -->
        <div class="bg-white p-4 rounded-2xl shadow-inner inline-block mx-auto border-4 border-red-600/20 relative">
          <!-- Stylized Mock QR Code with Bakong Center Icon -->
          <svg class="w-48 h-48 mx-auto" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="200" height="200" fill="white"/>
            <!-- Corner Finder 1 -->
            <rect x="10" y="10" width="50" height="50" rx="6" fill="#0b0e14"/>
            <rect x="18" y="18" width="34" height="34" rx="3" fill="white"/>
            <rect x="24" y="24" width="22" height="22" rx="2" fill="#E11D48"/>
            <!-- Corner Finder 2 -->
            <rect x="140" y="10" width="50" height="50" rx="6" fill="#0b0e14"/>
            <rect x="148" y="18" width="34" height="34" rx="3" fill="white"/>
            <rect x="154" y="24" width="22" height="22" rx="2" fill="#E11D48"/>
            <!-- Corner Finder 3 -->
            <rect x="10" y="140" width="50" height="50" rx="6" fill="#0b0e14"/>
            <rect x="18" y="148" width="34" height="34" rx="3" fill="white"/>
            <rect x="24" y="154" width="22" height="22" rx="2" fill="#E11D48"/>
            <!-- QR Data Grid Elements -->
            <rect x="70" y="20" width="12" height="12" fill="#1e293b"/>
            <rect x="90" y="15" width="15" height="15" fill="#1e293b"/>
            <rect x="115" y="25" width="10" height="25" fill="#1e293b"/>
            <rect x="20" y="75" width="20" height="10" fill="#1e293b"/>
            <rect x="30" y="95" width="25" height="15" fill="#1e293b"/>
            <rect x="75" y="70" width="50" height="12" fill="#1e293b"/>
            <rect x="145" y="75" width="20" height="20" fill="#1e293b"/>
            <rect x="175" y="85" width="15" height="25" fill="#1e293b"/>
            <rect x="70" y="145" width="25" height="15" fill="#1e293b"/>
            <rect x="105" y="140" width="18" height="20" fill="#1e293b"/>
            <rect x="135" y="145" width="30" height="15" fill="#1e293b"/>
            <rect x="75" y="170" width="20" height="18" fill="#1e293b"/>
            <rect x="105" y="170" width="45" height="15" fill="#1e293b"/>
            <rect x="160" y="165" width="25" height="20" fill="#1e293b"/>
            <!-- Center Brand Logo -->
            <rect x="80" y="80" width="40" height="40" rx="8" fill="#E11D48"/>
            <text x="100" y="105" font-family="sans-serif" font-weight="900" font-size="14" fill="white" text-anchor="middle">KHQR</text>
          </svg>

          <div class="mt-2 text-[11px] font-bold text-gray-700 tracking-wider">
            SCAN WITH ANY BANKING APP
          </div>
          <div class="text-[9px] text-gray-500">
            ABA Mobile • Bakong • ACLEDA • Wing • Canadia
          </div>
        </div>

        <!-- Timer & Order Ref -->
        <div class="flex items-center justify-between text-xs text-gray-400 px-2">
          <div class="flex items-center space-x-1.5 text-amber-400">
            <Clock class="w-4 h-4" />
            <span class="font-mono font-bold">{{ formattedTimer }}</span>
          </div>
          <div class="font-mono text-gray-500">Ref: {{ orderRef }}</div>
        </div>

        <!-- Simulator Button -->
        <button 
          @click="simulatePaymentSuccess"
          :disabled="isProcessing"
          class="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-extrabold text-sm shadow-xl shadow-red-600/30 flex items-center justify-center space-x-2 transition-all cursor-pointer disabled:opacity-50"
        >
          <Loader2 v-if="isProcessing" class="w-5 h-5 animate-spin" />
          <CheckCircle2 v-else class="w-5 h-5" />
          <span>{{ isProcessing ? 'Verifying Bakong Settlement...' : 'Simulate Instant KHQR Payment' }}</span>
        </button>

        <p class="text-[11px] text-gray-500">
          *In this production demo, clicking above simulates real-time webhook confirmation from the National Bank of Cambodia Bakong network.
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { X, Clock, CheckCircle2, Loader2 } from '@lucide/vue';
import confetti from 'canvas-confetti';

const props = defineProps({
  amountUSD: {
    type: Number,
    required: true
  },
  orderRef: {
    type: String,
    default: 'MCC-' + Math.floor(1000 + Math.random() * 9000)
  }
});

const emit = defineEmits(['success', 'cancel']);

const amountKHR = computed(() => Math.round(props.amountUSD * 4100));
const timeLeft = ref(900); // 15 minutes
const isProcessing = ref(false);
let timerInterval = null;

const formattedTimer = computed(() => {
  const m = Math.floor(timeLeft.value / 60);
  const s = timeLeft.value % 60;
  return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
});

onMounted(() => {
  timerInterval = setInterval(() => {
    if (timeLeft.value > 0) {
      timeLeft.value--;
    } else {
      clearInterval(timerInterval);
    }
  }, 1000);
});

onUnmounted(() => {
  if (timerInterval) clearInterval(timerInterval);
});

function simulatePaymentSuccess() {
  isProcessing.value = true;
  setTimeout(() => {
    isProcessing.value = false;
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });
    emit('success', {
      transactionId: 'TXN-BKNG-' + Math.floor(100000 + Math.random() * 900000),
      paymentMethod: 'KHQR (Bakong / ABA Pay)',
      status: 'Paid'
    });
  }, 1500);
}
</script>

