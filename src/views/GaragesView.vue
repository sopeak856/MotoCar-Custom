<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 text-left">
    <!-- Header -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <div class="text-xs font-bold text-cyan-400 uppercase tracking-widest">Certified Network</div>
        <h1 class="text-3xl font-black text-white uppercase tracking-tight">Partner Garages & Installation</h1>
        <p class="text-xs text-gray-400 mt-1">
          Professional installation hubs equipped with certified hydraulic lifts, 4WD dyno cells, and factory alignment rigs.
        </p>
      </div>

      <!-- Tab Switcher: Directory vs Partnership Application -->
      <div class="flex items-center space-x-2 bg-zinc-900 p-1.5 rounded-2xl border border-gray-800 text-xs font-bold">
        <button 
          @click="activeViewTab = 'directory'"
          class="px-4 py-2 rounded-xl transition-all cursor-pointer"
          :class="activeViewTab === 'directory' ? 'bg-cyan-600 text-white shadow-md' : 'text-gray-400 hover:text-white'"
        >
          Garage Directory
        </button>

        <button 
          @click="activeViewTab = 'register'"
          class="px-4 py-2 rounded-xl transition-all cursor-pointer"
          :class="activeViewTab === 'register' ? 'bg-cyan-600 text-white shadow-md' : 'text-gray-400 hover:text-white'"
        >
          Apply as Partner Garage
        </button>
      </div>
    </div>

    <!-- VIEW 1: GARAGE DIRECTORY -->
    <div v-if="activeViewTab === 'directory'" class="space-y-6">
      <!-- Filter Bar: Province & Search -->
      <div class="p-4 rounded-2xl bg-[#12161f] border border-gray-800 flex flex-wrap items-center justify-between gap-4">
        <div class="flex flex-wrap items-center gap-2 text-xs">
          <span class="text-gray-400 font-bold uppercase text-[10px]">Province:</span>
          <button 
            v-for="prov in ['All', 'Phnom Penh', 'Siem Reap', 'Battambang']"
            :key="prov"
            @click="garageStore.selectedProvince = prov"
            class="px-3 py-1.5 rounded-xl border text-xs font-semibold transition-all cursor-pointer"
            :class="garageStore.selectedProvince === prov ? 'bg-cyan-600 text-white border-cyan-500' : 'bg-zinc-900 text-gray-400 border-gray-800 hover:border-gray-700'"
          >
            {{ prov }}
          </button>
        </div>

        <div class="w-full sm:w-72 relative">
          <input 
            v-model="garageStore.searchQuery"
            type="text" 
            placeholder="Search garage name or street..."
            class="w-full bg-zinc-900 border border-gray-700 rounded-xl pl-9 pr-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
          />
          <Search class="w-3.5 h-3.5 text-gray-500 absolute left-3 top-2.5" />
        </div>
      </div>

      <!-- Garages Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div 
          v-for="garage in garageStore.filteredGarages" 
          :key="garage.id"
          class="bg-[#12161f] border border-gray-800 hover:border-cyan-500/50 rounded-3xl overflow-hidden transition-all duration-300 shadow-xl flex flex-col justify-between"
        >
          <div>
            <!-- Garage Image -->
            <div class="relative h-48 bg-zinc-950 overflow-hidden">
              <img :src="garage.image" :alt="garage.name" class="w-full h-full object-cover" />
              <div class="absolute top-3 left-3 flex gap-1.5">
                <span class="px-2.5 py-1 rounded-md text-[10px] font-black uppercase tracking-wider bg-black/80 backdrop-blur-md text-cyan-400 border border-cyan-500/30">
                  {{ garage.province }}
                </span>
                <span v-if="garage.hasDyno" class="px-2 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider bg-red-600 text-white">
                  DYNO CELL
                </span>
              </div>
            </div>

            <!-- Content Details -->
            <div class="p-6 space-y-4">
              <div>
                <div class="flex items-center space-x-1.5 text-amber-400 text-xs">
                  <Star class="w-3.5 h-3.5 fill-current" />
                  <span class="font-bold text-white">{{ garage.rating }}</span>
                  <span class="text-gray-500">({{ garage.reviewsCount }} reviews)</span>
                </div>
                <h3 class="text-lg font-bold text-white mt-1">{{ garage.name }}</h3>
                <p class="text-xs text-gray-400 flex items-start space-x-1.5 mt-2">
                  <MapPin class="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                  <span>{{ garage.address }}</span>
                </p>
              </div>

              <!-- Contact Info -->
              <div class="space-y-1 text-xs text-gray-300 pt-2 border-t border-gray-800">
                <div class="flex items-center space-x-2">
                  <Phone class="w-3.5 h-3.5 text-emerald-400" />
                  <span>{{ garage.phone }}</span>
                </div>
                <div class="flex items-center space-x-2">
                  <Send class="w-3.5 h-3.5 text-sky-400" />
                  <span class="text-sky-400 font-mono">{{ garage.telegram }}</span>
                </div>
                <div class="flex items-center space-x-2">
                  <Clock class="w-3.5 h-3.5 text-gray-500" />
                  <span class="text-gray-400 text-[11px]">{{ garage.openingHours }}</span>
                </div>
              </div>

              <!-- Certified Services Badges -->
              <div class="space-y-1.5 pt-2">
                <div class="text-[10px] font-bold uppercase text-gray-500">Certified Services:</div>
                <div class="flex flex-wrap gap-1.5">
                  <span 
                    v-for="s in garage.certifiedServices" 
                    :key="s" 
                    class="px-2 py-0.5 rounded text-[10px] bg-zinc-900 border border-gray-800 text-gray-300"
                  >
                    {{ s }}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <!-- Bottom Action -->
          <div class="p-6 pt-0">
            <button 
              @click="openBookingModal(garage)"
              class="w-full py-3 rounded-2xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-extrabold text-xs uppercase tracking-wider shadow-lg shadow-cyan-600/25 flex items-center justify-center space-x-2 transition-all cursor-pointer"
            >
              <Calendar class="w-4 h-4" />
              <span>Book Appointment at this Garage</span>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- VIEW 2: GARAGE PARTNERSHIP REGISTRATION -->
    <div v-else class="max-w-2xl mx-auto bg-[#12161f] border border-cyan-500/40 rounded-3xl p-8 space-y-6">
      <div class="space-y-2 border-b border-gray-800 pb-5">
        <span class="px-3 py-1 rounded-full text-xs font-black bg-cyan-600/20 text-cyan-300 border border-cyan-500/30 uppercase tracking-wider">
          Partner Network Application
        </span>
        <h2 class="text-2xl font-black text-white uppercase tracking-tight">Register Your Garage / Workshop</h2>
        <p class="text-xs text-gray-400">
          Join the MotoCar Custom Certified Network in Cambodia. Receive high-value installation jobs, wholesale parts consignments, and technician certification.
        </p>
      </div>

      <form @submit.prevent="submitApplication" class="space-y-4">
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label class="block text-xs font-bold uppercase text-gray-400 mb-1">Workshop / Garage Name</label>
            <input 
              v-model="partnerApp.name" 
              type="text" 
              required
              placeholder="e.g. SpeedLab Phnom Penh"
              class="w-full bg-zinc-900 border border-gray-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
            />
          </div>

          <div>
            <label class="block text-xs font-bold uppercase text-gray-400 mb-1">Owner / Manager Name</label>
            <input 
              v-model="partnerApp.owner" 
              type="text" 
              required
              class="w-full bg-zinc-900 border border-gray-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
            />
          </div>

          <div>
            <label class="block text-xs font-bold uppercase text-gray-400 mb-1">Province / City</label>
            <select 
              v-model="partnerApp.province" 
              class="w-full bg-zinc-900 border border-gray-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
            >
              <option value="Phnom Penh">Phnom Penh</option>
              <option value="Siem Reap">Siem Reap</option>
              <option value="Battambang">Battambang</option>
              <option value="Sihanoukville">Sihanoukville</option>
              <option value="Kandal">Kandal</option>
              <option value="Kampong Cham">Kampong Cham</option>
            </select>
          </div>

          <div>
            <label class="block text-xs font-bold uppercase text-gray-400 mb-1">Phone / Telegram</label>
            <input 
              v-model="partnerApp.phone" 
              type="text" 
              required
              placeholder="+855 12 000 000"
              class="w-full bg-zinc-900 border border-gray-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
            />
          </div>

          <div>
            <label class="block text-xs font-bold uppercase text-gray-400 mb-1">Hydraulic Lifts Count</label>
            <input 
              v-model.number="partnerApp.lifts" 
              type="number" 
              min="1"
              required
              class="w-full bg-zinc-900 border border-gray-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500 font-mono"
            />
          </div>

          <div>
            <label class="block text-xs font-bold uppercase text-gray-400 mb-1">Dyno Testing Cell</label>
            <select 
              v-model="partnerApp.hasDyno" 
              class="w-full bg-zinc-900 border border-gray-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
            >
              <option :value="true">Yes, 2WD / 4WD / Motorcycle Dyno</option>
              <option :value="false">No Dyno</option>
            </select>
          </div>

          <div class="sm:col-span-2">
            <label class="block text-xs font-bold uppercase text-gray-400 mb-1">Physical Garage Address</label>
            <textarea 
              v-model="partnerApp.address" 
              rows="2"
              required
              class="w-full bg-zinc-900 border border-gray-700 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-cyan-500"
            ></textarea>
          </div>
        </div>

        <div class="pt-3">
          <button 
            type="submit" 
            class="w-full py-4 rounded-2xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-black text-xs uppercase tracking-wider shadow-xl shadow-cyan-600/30 transition-all cursor-pointer"
          >
            Submit Garage Partnership Application
          </button>
        </div>
      </form>
    </div>

    <!-- Booking Modal -->
    <InstallationModal 
      v-if="isBookingModalOpen" 
      @close="isBookingModalOpen = false" 
    />
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue';
import { useRoute } from 'vue-router';
import { Search, Star, MapPin, Phone, Send, Clock, Calendar } from '@lucide/vue';
import { useGarageStore } from '../stores/garageStore';
import InstallationModal from '../components/InstallationModal.vue';

const route = useRoute();
const garageStore = useGarageStore();

const activeViewTab = ref(route.query.tab === 'register' ? 'register' : 'directory');
const isBookingModalOpen = ref(false);

const partnerApp = reactive({
  name: '',
  owner: '',
  province: 'Phnom Penh',
  phone: '',
  lifts: 4,
  hasDyno: true,
  address: ''
});

function openBookingModal(garage) {
  isBookingModalOpen.value = true;
}

function submitApplication() {
  garageStore.submitPartnership(partnerApp);
  alert('Thank you! Your garage partnership application has been received. Our dealer operations team will contact you on Telegram within 48 hours.');
  activeViewTab.value = 'directory';
}
</script>

