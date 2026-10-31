<template>
  <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
    <div class="bg-[#12161f] border border-gray-700/80 rounded-2xl max-w-xl w-full overflow-hidden shadow-2xl relative text-left">
      <!-- Modal Header -->
      <div class="p-5 border-b border-gray-800 flex items-center justify-between bg-zinc-900/60">
        <div class="flex items-center space-x-3">
          <div class="w-10 h-10 rounded-xl bg-red-600/10 border border-red-500/20 flex items-center justify-center text-red-500">
            <Car class="w-5 h-5" />
          </div>
          <div>
            <h3 class="text-base font-bold text-white uppercase tracking-wider">Select Your Vehicle</h3>
            <p class="text-xs text-gray-400">Filter parts with 100% Guaranteed Fitment</p>
          </div>
        </div>
        <button 
          @click="$emit('close')" 
          class="p-2 rounded-xl text-gray-400 hover:text-white hover:bg-zinc-800 transition-colors cursor-pointer"
        >
          <X class="w-5 h-5" />
        </button>
      </div>

      <div class="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
        <!-- 1. Quick pick from My Garage -->
        <div v-if="vehicleStore.garageVehicles.length">
          <div class="flex items-center justify-between mb-3">
            <span class="text-xs font-bold uppercase tracking-wider text-gray-400 flex items-center space-x-1.5">
              <Bookmark class="w-3.5 h-3.5 text-red-400" />
              <span>Saved in "My Garage"</span>
            </span>
            <router-link 
              to="/wishlist?tab=garage" 
              @click="$emit('close')"
              class="text-xs text-red-400 hover:text-red-300 font-semibold"
            >
              Manage Garage →
            </router-link>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div 
              v-for="v in vehicleStore.garageVehicles" 
              :key="v.id"
              @click="chooseGarageVehicle(v)"
              class="p-3.5 rounded-xl border transition-all cursor-pointer flex items-center space-x-3 relative"
              :class="vehicleStore.activeVehicle?.id === v.id 
                ? 'bg-red-600/15 border-red-500 text-white shadow-[0_0_15px_rgba(239,68,68,0.2)]' 
                : 'bg-zinc-900/70 border-gray-800 hover:border-gray-700 text-gray-300'"
            >
              <div class="w-9 h-9 rounded-lg bg-black/40 flex items-center justify-center text-red-400 shrink-0">
                <Car v-if="v.type === 'car'" class="w-5 h-5" />
                <Bike v-else class="w-5 h-5" />
              </div>
              <div class="overflow-hidden">
                <div class="text-xs font-bold truncate text-white">{{ v.year }} {{ v.make }} {{ v.model }}</div>
                <div class="text-[10px] text-gray-400 font-mono">{{ v.nickname || v.plateNumber }}</div>
              </div>
              <span 
                v-if="vehicleStore.activeVehicle?.id === v.id" 
                class="absolute top-2 right-2 px-1.5 py-0.5 rounded text-[9px] font-bold bg-red-600 text-white"
              >
                ACTIVE
              </span>
            </div>
          </div>
        </div>

        <div class="relative flex py-2 items-center">
          <div class="flex-grow border-t border-gray-800"></div>
          <span class="flex-shrink mx-4 text-xs font-bold uppercase text-gray-500">Or Configure New Vehicle</span>
          <div class="flex-grow border-t border-gray-800"></div>
        </div>

        <!-- 2. Type selector (Car or Motorcycle) -->
        <div>
          <label class="block text-xs font-bold uppercase text-gray-400 mb-2">Vehicle Category</label>
          <div class="grid grid-cols-2 gap-3">
            <button 
              type="button"
              @click="selectedType = 'car'; selectedMake = ''; selectedModel = ''; selectedYear = ''"
              class="flex items-center justify-center space-x-2 py-3 px-4 rounded-xl border font-bold text-xs transition-all cursor-pointer"
              :class="selectedType === 'car' 
                ? 'bg-red-600 text-white border-red-500 shadow-lg shadow-red-600/25' 
                : 'bg-zinc-900 border-gray-800 text-gray-400 hover:border-gray-700'"
            >
              <Car class="w-4 h-4" />
              <span>Automobile / Car</span>
            </button>

            <button 
              type="button"
              @click="selectedType = 'moto'; selectedMake = ''; selectedModel = ''; selectedYear = ''"
              class="flex items-center justify-center space-x-2 py-3 px-4 rounded-xl border font-bold text-xs transition-all cursor-pointer"
              :class="selectedType === 'moto' 
                ? 'bg-red-600 text-white border-red-500 shadow-lg shadow-red-600/25' 
                : 'bg-zinc-900 border-gray-800 text-gray-400 hover:border-gray-700'"
            >
              <Bike class="w-4 h-4" />
              <span>Motorcycle / Superbike</span>
            </button>
          </div>
        </div>

        <!-- Select Form: Make, Model, Year -->
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <!-- Make -->
          <div>
            <label class="block text-xs font-semibold text-gray-400 mb-1">Make</label>
            <select 
              v-model="selectedMake" 
              @change="selectedModel = ''; selectedYear = ''"
              class="w-full bg-zinc-900 border border-gray-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-red-500"
            >
              <option value="" disabled>Select Make</option>
              <option v-for="make in availableMakes" :key="make" :value="make">{{ make }}</option>
            </select>
          </div>

          <!-- Model -->
          <div>
            <label class="block text-xs font-semibold text-gray-400 mb-1">Model</label>
            <select 
              v-model="selectedModel" 
              :disabled="!selectedMake"
              @change="selectedYear = ''"
              class="w-full bg-zinc-900 border border-gray-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-red-500 disabled:opacity-40"
            >
              <option value="" disabled>Select Model</option>
              <option v-for="model in availableModels" :key="model.name" :value="model.name">{{ model.name }}</option>
            </select>
          </div>

          <!-- Year -->
          <div>
            <label class="block text-xs font-semibold text-gray-400 mb-1">Year</label>
            <select 
              v-model="selectedYear" 
              :disabled="!selectedModel"
              class="w-full bg-zinc-900 border border-gray-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-red-500 disabled:opacity-40"
            >
              <option value="" disabled>Select Year</option>
              <option v-for="year in availableYears" :key="year" :value="year">{{ year }}</option>
            </select>
          </div>
        </div>

        <!-- Save to My Garage Checkbox -->
        <div class="flex items-center space-x-2 pt-1">
          <input 
            type="checkbox" 
            id="saveGarage" 
            v-model="saveToGarage" 
            class="rounded border-gray-700 bg-zinc-900 text-red-600 focus:ring-red-500 w-4 h-4"
          />
          <label for="saveGarage" class="text-xs text-gray-300 cursor-pointer">
            Save this vehicle to "My Garage" for instant 1-click fitment checking
          </label>
        </div>
      </div>

      <!-- Footer Buttons -->
      <div class="p-5 border-t border-gray-800 bg-zinc-900/60 flex items-center justify-between gap-3">
        <button 
          v-if="vehicleStore.activeVehicle"
          @click="clearActiveVehicle"
          class="px-3.5 py-2 rounded-xl text-xs text-gray-400 hover:text-white hover:bg-zinc-800 transition-colors cursor-pointer"
        >
          Clear Selection
        </button>
        <div v-else></div>

        <div class="flex items-center space-x-2">
          <button 
            @click="$emit('close')"
            class="px-4 py-2 rounded-xl text-xs font-semibold text-gray-400 hover:text-white bg-zinc-800 hover:bg-zinc-700 transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button 
            @click="applyVehicleSelection"
            :disabled="!selectedMake || !selectedModel || !selectedYear"
            class="px-5 py-2 rounded-xl text-xs font-bold text-white bg-red-600 hover:bg-red-500 disabled:opacity-40 disabled:cursor-not-allowed shadow-lg shadow-red-600/30 transition-all cursor-pointer"
          >
            Apply Vehicle Fitment
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { X, Car, Bike, Bookmark } from '@lucide/vue';
import { useVehicleStore } from '../stores/vehicleStore';
import { VEHICLE_DATABASE } from '../data/mockData';

const emit = defineEmits(['close']);
const vehicleStore = useVehicleStore();

const selectedType = ref('car');
const selectedMake = ref('');
const selectedModel = ref('');
const selectedYear = ref('');
const saveToGarage = ref(true);

const availableMakes = computed(() => {
  const pool = selectedType.value === 'car' ? VEHICLE_DATABASE.cars : VEHICLE_DATABASE.motorcycles;
  return pool.map(item => item.make);
});

const availableModels = computed(() => {
  if (!selectedMake.value) return [];
  const pool = selectedType.value === 'car' ? VEHICLE_DATABASE.cars : VEHICLE_DATABASE.motorcycles;
  const match = pool.find(item => item.make === selectedMake.value);
  return match ? match.models : [];
});

const availableYears = computed(() => {
  if (!selectedModel.value) return [];
  const modelObj = availableModels.value.find(m => m.name === selectedModel.value);
  return modelObj ? modelObj.years : [2021, 2022, 2023, 2024, 2025];
});

function chooseGarageVehicle(v) {
  vehicleStore.selectActiveVehicle(v);
  emit('close');
}

function clearActiveVehicle() {
  vehicleStore.selectActiveVehicle(null);
  emit('close');
}

function applyVehicleSelection() {
  const modelObj = availableModels.value.find(m => m.name === selectedModel.value);
  const engine = modelObj?.engines?.[0] || 'High Performance Engine';

  const newVehicle = {
    type: selectedType.value,
    make: selectedMake.value,
    model: selectedModel.value,
    year: Number(selectedYear.value),
    engine,
    nickname: `${selectedMake.value} ${selectedModel.value}`
  };

  if (saveToGarage.value) {
    const created = vehicleStore.addVehicleToGarage(newVehicle);
    vehicleStore.selectActiveVehicle(created);
  } else {
    vehicleStore.selectActiveVehicle({ ...newVehicle, id: 'temp-' + Date.now() });
  }

  emit('close');
}
</script>

