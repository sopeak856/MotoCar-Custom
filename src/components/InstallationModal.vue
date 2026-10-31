<template>
  <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in">
    <div class="bg-[#12161f] border border-cyan-500/40 rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl relative text-left">
      <!-- Modal Header -->
      <div class="bg-gradient-to-r from-cyan-600 to-blue-700 p-5 text-white flex items-center justify-between">
        <div class="flex items-center space-x-3">
          <div class="w-10 h-10 rounded-xl bg-black/20 flex items-center justify-center text-white">
            <Wrench class="w-6 h-6" />
          </div>
          <div>
            <h3 class="text-base font-black uppercase tracking-wider">Book Certified Installation</h3>
            <p class="text-xs text-white/80">Professional Dyno, Lift & Certified Technicians</p>
          </div>
        </div>
        <button 
          @click="$emit('close')" 
          class="text-white/80 hover:text-white p-1.5 rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
        >
          <X class="w-5 h-5" />
        </button>
      </div>

      <!-- Booking Form -->
      <form @submit.prevent="handleBooking" class="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
        <!-- Part to Install -->
        <div v-if="product" class="p-3.5 rounded-xl bg-zinc-900 border border-gray-800 flex items-center space-x-3">
          <img 
            :src="product.images[0]" 
            :alt="product.title" 
            class="w-12 h-12 rounded-lg object-cover border border-gray-700 shrink-0"
          />
          <div class="overflow-hidden">
            <div class="text-xs font-bold text-white truncate">{{ product.title }}</div>
            <div class="text-[10px] text-cyan-400 font-medium">
              Estimated install time: {{ product.specifications?.['Installation Time'] || '1.5 - 2.5 Hours' }}
            </div>
          </div>
        </div>

        <!-- 1. Select Garage -->
        <div>
          <label class="block text-xs font-bold uppercase text-gray-400 mb-1">Select Certified Partner Garage</label>
          <select 
            v-model="bookingData.garageId" 
            required
            class="w-full bg-zinc-900 border border-gray-700 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-500"
          >
            <option v-for="g in garageStore.garages" :key="g.id" :value="g.id">
              {{ g.name }} ({{ g.province }} - {{ g.district }})
            </option>
          </select>
        </div>

        <!-- Selected Garage Preview Pill -->
        <div v-if="chosenGarage" class="p-3 rounded-xl bg-cyan-950/40 border border-cyan-500/30 text-xs flex items-center justify-between">
          <div>
            <div class="font-bold text-cyan-300">{{ chosenGarage.name }}</div>
            <div class="text-[10px] text-gray-400">{{ chosenGarage.address }}</div>
          </div>
          <span class="px-2 py-0.5 rounded text-[10px] font-bold bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
            ★ {{ chosenGarage.rating }} ({{ chosenGarage.reviewsCount }})
          </span>
        </div>

        <!-- 2. Vehicle Selector -->
        <div>
          <label class="block text-xs font-bold uppercase text-gray-400 mb-1">Vehicle for Appointment</label>
          <select 
            v-model="bookingData.vehicle" 
            required
            class="w-full bg-zinc-900 border border-gray-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
          >
            <option v-for="v in vehicleStore.garageVehicles" :key="v.id" :value="`${v.year} ${v.make} ${v.model} (${v.plateNumber || 'No Plate'})`">
              {{ v.year }} {{ v.make }} {{ v.model }} ({{ v.plateNumber || v.nickname }})
            </option>
            <option value="Custom Vehicle">Other Vehicle (Enter below)</option>
          </select>
        </div>

        <!-- 3. Date & Time Slot -->
        <div class="grid grid-cols-2 gap-3">
          <div>
            <label class="block text-xs font-bold uppercase text-gray-400 mb-1">Preferred Date</label>
            <input 
              v-model="bookingData.date" 
              type="date" 
              required
              class="w-full bg-zinc-900 border border-gray-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
            />
          </div>

          <div>
            <label class="block text-xs font-bold uppercase text-gray-400 mb-1">Time Slot</label>
            <select 
              v-model="bookingData.timeSlot" 
              class="w-full bg-zinc-900 border border-gray-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
            >
              <option value="09:00 AM - 10:30 AM">09:00 AM - 10:30 AM</option>
              <option value="11:00 AM - 12:30 PM">11:00 AM - 12:30 PM</option>
              <option value="02:00 PM - 03:30 PM">02:00 PM - 03:30 PM</option>
              <option value="04:00 PM - 05:30 PM">04:00 PM - 05:30 PM</option>
            </select>
          </div>
        </div>

        <!-- 4. Contact Phone / Telegram -->
        <div class="grid grid-cols-2 gap-3">
          <div>
            <label class="block text-xs font-bold uppercase text-gray-400 mb-1">Contact Phone</label>
            <input 
              v-model="bookingData.phone" 
              type="text" 
              required
              class="w-full bg-zinc-900 border border-gray-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
            />
          </div>
          <div>
            <label class="block text-xs font-bold uppercase text-gray-400 mb-1">Telegram Handle</label>
            <input 
              v-model="bookingData.telegram" 
              type="text" 
              placeholder="@username"
              class="w-full bg-zinc-900 border border-gray-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
            />
          </div>
        </div>

        <!-- Submit Button -->
        <div class="pt-2">
          <button 
            type="submit" 
            class="w-full py-3.5 rounded-2xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-extrabold text-xs uppercase tracking-wider shadow-xl shadow-cyan-600/30 transition-all cursor-pointer"
          >
            Confirm Installation Slot at Partner Garage
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { reactive, computed } from 'vue';
import { X, Wrench } from '@lucide/vue';
import { useGarageStore } from '../stores/garageStore';
import { useVehicleStore } from '../stores/vehicleStore';
import { useUserStore } from '../stores/userStore';

const props = defineProps({
  product: {
    type: Object,
    default: null
  }
});

const emit = defineEmits(['close', 'booked']);

const garageStore = useGarageStore();
const vehicleStore = useVehicleStore();
const userStore = useUserStore();

const primaryV = vehicleStore.activeVehicle || vehicleStore.garageVehicles[0];

const bookingData = reactive({
  garageId: garageStore.garages[0]?.id || 'G-PP-01',
  vehicle: primaryV ? `${primaryV.year} ${primaryV.make} ${primaryV.model} (${primaryV.plateNumber || 'Saved Ride'})` : '2024 Honda Civic Type R (FL5)',
  date: '2026-11-04',
  timeSlot: '11:00 AM - 12:30 PM',
  customerName: userStore.user.name,
  phone: userStore.user.phone,
  telegram: userStore.user.telegram
});

const chosenGarage = computed(() => {
  return garageStore.garages.find(g => g.id === bookingData.garageId);
});

function handleBooking() {
  const newBooking = garageStore.createBooking({
    garageId: bookingData.garageId,
    garageName: chosenGarage.value?.name || 'Apex Tuning Center',
    vehicle: bookingData.vehicle,
    serviceType: props.product ? `Installation: ${props.product.title}` : 'General Performance Installation',
    date: bookingData.date,
    timeSlot: bookingData.timeSlot,
    customerName: bookingData.customerName,
    phone: bookingData.phone,
    telegram: bookingData.telegram
  });

  emit('booked', newBooking);
  emit('close');
}
</script>

