<template>
  <footer class="bg-black border-t border-gray-800/80 text-gray-400 mt-20">
    <!-- Top Value Props Bar -->
    <div class="border-b border-gray-800/60 py-8 bg-zinc-950">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-6">
        <div class="flex items-center space-x-4 p-3 rounded-2xl bg-zinc-900/50 border border-gray-800/60">
          <div class="w-12 h-12 rounded-xl bg-red-600/10 border border-red-500/20 flex items-center justify-center text-red-500 shrink-0">
            <CheckCircle2 class="w-6 h-6" />
          </div>
          <div>
            <div class="text-sm font-bold text-white">100% Genuine Guaranteed</div>
            <div class="text-xs text-gray-400">Direct from Akrapovič, Brembo & SC-Project</div>
          </div>
        </div>

        <div class="flex items-center space-x-4 p-3 rounded-2xl bg-zinc-900/50 border border-gray-800/60">
          <div class="w-12 h-12 rounded-xl bg-cyan-600/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 shrink-0">
            <Wrench class="w-6 h-6" />
          </div>
          <div>
            <div class="text-sm font-bold text-white">Certified Partner Garages</div>
            <div class="text-xs text-gray-400">Professional installation in Phnom Penh & provinces</div>
          </div>
        </div>

        <div class="flex items-center space-x-4 p-3 rounded-2xl bg-zinc-900/50 border border-gray-800/60">
          <div class="w-12 h-12 rounded-xl bg-amber-600/10 border border-amber-500/20 flex items-center justify-center text-amber-400 shrink-0">
            <QrCode class="w-6 h-6" />
          </div>
          <div>
            <div class="text-sm font-bold text-white">Fast KHQR & Net-30 Terms</div>
            <div class="text-xs text-gray-400">Bakong instant scan or B2B garage credit</div>
          </div>
        </div>

        <div class="flex items-center space-x-4 p-3 rounded-2xl bg-zinc-900/50 border border-gray-800/60">
          <div class="w-12 h-12 rounded-xl bg-emerald-600/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
            <Truck class="w-6 h-6" />
          </div>
          <div>
            <div class="text-sm font-bold text-white">All 25 Provinces Delivery</div>
            <div class="text-xs text-gray-400">Via Virak Buntham, VET & Phnom Penh Express</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Footer Body -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
        <!-- Col 1: Brand & Contact -->
        <div class="lg:col-span-2 space-y-4">
          <div class="flex items-center space-x-3">
            <div class="w-9 h-9 rounded-xl bg-gradient-to-tr from-red-600 to-rose-500 flex items-center justify-center shadow-lg shadow-red-600/30">
              <Flame class="w-5 h-5 text-white" />
            </div>
            <span class="text-xl font-black text-white tracking-wider uppercase font-sans">MOTO<span class="text-red-500">CAR</span> CUSTOM</span>
          </div>

          <p class="text-sm text-gray-400 leading-relaxed max-w-md">
            The premier high-performance automotive tuning and motorcycle customization hub in the Kingdom of Cambodia. We bridge racing enthusiasts, top international manufacturers, and certified workshops.
          </p>

          <!-- Contact details in Cambodia -->
          <div class="space-y-2.5 text-xs text-gray-300 pt-2">
            <div class="flex items-center space-x-3">
              <MapPin class="w-4 h-4 text-red-500 shrink-0" />
              <span>Street 2004, Sangkat Teuk Thla, Khan Sen Sok, Phnom Penh, Cambodia</span>
            </div>
            <div class="flex items-center space-x-3">
              <Phone class="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Hotline: +855 (0)23 999 888 / +855 (0)98 888 777</span>
            </div>
            <div class="flex items-center space-x-3">
              <Send class="w-4 h-4 text-sky-400 shrink-0" />
              <a href="https://t.me" target="_blank" class="hover:text-white transition-colors">
                Official Telegram Channel: @motocarcustom_kh
              </a>
            </div>
            <div class="flex items-center space-x-3">
              <Clock class="w-4 h-4 text-amber-400 shrink-0" />
              <span>Mon - Sat: 8:00 AM - 7:00 PM | Sun: 9:00 AM - 5:00 PM</span>
            </div>
          </div>
        </div>

        <!-- Col 2: Shop & Categories -->
        <div>
          <h4 class="text-xs font-black uppercase text-white tracking-widest mb-4">Shop Categories</h4>
          <ul class="space-y-2.5 text-xs">
            <li><router-link to="/shop?category=exhaust" class="hover:text-white transition-colors">Titanium Exhaust Systems</router-link></li>
            <li><router-link to="/shop?category=aero" class="hover:text-white transition-colors">Dry Carbon Aerokits</router-link></li>
            <li><router-link to="/shop?category=wheels" class="hover:text-white transition-colors">BBS Forged Monoblock</router-link></li>
            <li><router-link to="/shop?category=brakes" class="hover:text-white transition-colors">Brembo Big Brake Kits</router-link></li>
            <li><router-link to="/shop?category=suspension" class="hover:text-white transition-colors">Öhlins DFV & TTX Shocks</router-link></li>
            <li><router-link to="/shop?category=tuning" class="hover:text-white transition-colors">HKS & Dyno ECU Remap</router-link></li>
            <li><router-link to="/shop?category=moto-cnc" class="hover:text-white transition-colors">Superbike CNC Sliders</router-link></li>
          </ul>
        </div>

        <!-- Col 3: Services & Garages -->
        <div>
          <h4 class="text-xs font-black uppercase text-white tracking-widest mb-4">Garages & Wholesale</h4>
          <ul class="space-y-2.5 text-xs">
            <li><router-link to="/garages" class="hover:text-white transition-colors">Partner Garage Directory</router-link></li>
            <li><router-link to="/garages?tab=book" class="hover:text-white transition-colors">Book Installation Slot</router-link></li>
            <li><router-link to="/garages?tab=register" class="hover:text-white transition-colors">Garage Partner Registration</router-link></li>
            <li><router-link to="/shop?b2bOnly=true" class="text-amber-400 hover:text-amber-300 font-semibold">B2B Wholesale Portal</router-link></li>
            <li><router-link to="/account?tab=rfq" class="hover:text-white transition-colors">Submit RFQ (Bulk Quote)</router-link></li>
            <li><router-link to="/auth?mode=b2b" class="hover:text-white transition-colors">Wholesale Account Approval</router-link></li>
          </ul>
        </div>

        <!-- Col 4: Quick Order Tracking & Legal -->
        <div>
          <h4 class="text-xs font-black uppercase text-white tracking-widest mb-4">Fast Order Tracking</h4>
          <p class="text-xs text-gray-400 mb-3">
            Enter your MotoCar order code to inspect dispatch status and Virak Buntham tracking:
          </p>
          <div class="flex items-center space-x-1.5">
            <input 
              v-model="trackingInput" 
              @keydown.enter="trackOrderQuick"
              type="text" 
              placeholder="e.g. MCC-2026-9021" 
              class="bg-zinc-900 border border-gray-800 text-xs rounded-lg px-2.5 py-2 w-full text-white placeholder-gray-600 focus:outline-none focus:border-red-500"
            />
            <button 
              @click="trackOrderQuick" 
              class="px-3 py-2 bg-red-600 hover:bg-red-500 text-white rounded-lg text-xs font-bold shrink-0 transition-colors cursor-pointer"
            >
              Track
            </button>
          </div>

          <!-- Accepted Payments -->
          <div class="mt-6 pt-4 border-t border-gray-800/80">
            <div class="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2">Accepted In Cambodia</div>
            <div class="flex flex-wrap gap-1.5 text-[10px] font-bold">
              <span class="px-2 py-0.5 rounded bg-red-950/80 text-red-300 border border-red-800/40">KHQR Bakong</span>
              <span class="px-2 py-0.5 rounded bg-blue-950/80 text-blue-300 border border-blue-800/40">ABA PAY</span>
              <span class="px-2 py-0.5 rounded bg-amber-950/80 text-amber-300 border border-amber-800/40">B2B Net 30</span>
              <span class="px-2 py-0.5 rounded bg-zinc-800 text-gray-300">Cash / COD</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Bottom Bar -->
      <div class="border-t border-gray-800/80 mt-12 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
        <div>
          © 2026 MotoCar Custom Cambodia. All Rights Reserved. General Department of Taxation VAT TIN: K009-882739102.
        </div>
        <div class="flex items-center space-x-4">
          <a href="#" class="hover:text-gray-300 transition-colors">Privacy Policy</a>
          <span>•</span>
          <a href="#" class="hover:text-gray-300 transition-colors">Terms of Service</a>
          <span>•</span>
          <a href="#" class="hover:text-gray-300 transition-colors">Warranty & GDT Tax</a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { Flame, MapPin, Phone, Send, Clock, CheckCircle2, Wrench, QrCode, Truck } from '@lucide/vue';

const router = useRouter();
const trackingInput = ref('');

function trackOrderQuick() {
  if (trackingInput.value.trim()) {
    router.push({ path: '/tracking', query: { id: trackingInput.value.trim() } });
  } else {
    router.push('/tracking');
  }
}
</script>

