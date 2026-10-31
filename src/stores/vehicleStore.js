import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { VEHICLE_DATABASE, USER_MOCK } from '../data/mockData';

export const useVehicleStore = defineStore('vehicle', () => {
  const garageVehicles = ref([...USER_MOCK.garageVehicles]);
  const activeVehicle = ref(garageVehicles.value.find(v => v.isPrimary) || garageVehicles.value[0] || null);

  // Shop filter active vehicle
  const filterVehicleType = ref('all'); // 'all' | 'car' | 'moto'
  const filterYear = ref('');
  const filterMake = ref('');
  const filterModel = ref('');

  const allMakes = computed(() => {
    const carMakes = VEHICLE_DATABASE.cars.map(c => ({ make: c.make, type: 'car' }));
    const motoMakes = VEHICLE_DATABASE.motorcycles.map(m => ({ make: m.make, type: 'moto' }));
    if (filterVehicleType.value === 'car') return carMakes.map(c => c.make);
    if (filterVehicleType.value === 'moto') return motoMakes.map(m => m.make);
    return [...new Set([...carMakes.map(c => c.make), ...motoMakes.map(m => m.make)])];
  });

  const availableModels = computed(() => {
    if (!filterMake.value) return [];
    const pool = [...VEHICLE_DATABASE.cars, ...VEHICLE_DATABASE.motorcycles];
    const match = pool.find(item => item.make.toLowerCase() === filterMake.value.toLowerCase());
    return match ? match.models : [];
  });

  function selectActiveVehicle(vehicle) {
    activeVehicle.value = vehicle;
  }

  function addVehicleToGarage(vehicle) {
    const newVehicle = {
      ...vehicle,
      id: 'V-' + Date.now(),
      isPrimary: garageVehicles.value.length === 0
    };
    garageVehicles.value.push(newVehicle);
    if (!activeVehicle.value) {
      activeVehicle.value = newVehicle;
    }
    return newVehicle;
  }

  function removeVehicleFromGarage(id) {
    garageVehicles.value = garageVehicles.value.filter(v => v.id !== id);
    if (activeVehicle.value?.id === id) {
      activeVehicle.value = garageVehicles.value[0] || null;
    }
  }

  function setPrimaryVehicle(id) {
    garageVehicles.value.forEach(v => {
      v.isPrimary = (v.id === id);
    });
    const found = garageVehicles.value.find(v => v.id === id);
    if (found) activeVehicle.value = found;
  }

  // Check product fitment against a vehicle (or the active vehicle)
  function checkFitment(product, targetVehicle = activeVehicle.value) {
    if (!product) return { isFit: false, status: 'unknown', text: 'Select a vehicle', textKh: 'ជ្រើសរើសយានយន្តរបស់អ្នក' };

    if (!targetVehicle) {
      return {
        isFit: null,
        status: 'select_needed',
        text: 'Select your vehicle to verify fitment',
        textKh: 'ជ្រើសរើសយានយន្តរបស់អ្នកដើម្បីពិនិត្យភាពត្រូវគ្នា'
      };
    }

    // If universal
    if (product.vehicleType === 'universal') {
      return {
        isFit: true,
        status: 'universal',
        text: 'Universal Fit - Suitable for all models',
        textKh: 'អាចប្រើបានគ្រប់ប្រភេទយានយន្ត'
      };
    }

    // Vehicle type mismatch
    if (product.vehicleType !== 'all' && product.vehicleType !== targetVehicle.type) {
      const neededType = product.vehicleType === 'car' ? 'Cars' : 'Motorcycles';
      const neededTypeKh = product.vehicleType === 'car' ? 'រថយន្ត' : 'ម៉ូតូ';
      return {
        isFit: false,
        status: 'incompatible',
        text: `Incompatible: This part is engineered exclusively for ${neededType}.`,
        textKh: `មិនត្រូវគ្នា៖ គ្រឿងបន្លាស់នេះសម្រាប់តែ ${neededTypeKh} ប៉ុណ្ណោះ។`
      };
    }

    // Check specific compatibility list
    if (product.compatibleVehicles && Array.isArray(product.compatibleVehicles)) {
      const match = product.compatibleVehicles.find(cv => {
        const makeMatch = cv.make.toLowerCase() === targetVehicle.make.toLowerCase();
        const modelMatch = cv.model.toLowerCase().includes(targetVehicle.model.toLowerCase()) || 
                           targetVehicle.model.toLowerCase().includes(cv.model.toLowerCase());
        const yearMatch = !cv.years || cv.years.includes(Number(targetVehicle.year));
        return makeMatch && modelMatch && yearMatch;
      });

      if (match) {
        return {
          isFit: true,
          status: 'guaranteed',
          text: `Guaranteed Fit for ${targetVehicle.year} ${targetVehicle.make} ${targetVehicle.model}`,
          textKh: `ធានាត្រូវគ្នា ១០០% ជាមួយ ${targetVehicle.year} ${targetVehicle.make} ${targetVehicle.model}`
        };
      } else {
        return {
          isFit: false,
          status: 'incompatible',
          text: `Does NOT fit ${targetVehicle.year} ${targetVehicle.make} ${targetVehicle.model}`,
          textKh: `មិនត្រូវគ្នាជាមួយ ${targetVehicle.year} ${targetVehicle.make} ${targetVehicle.model} ឡើយ`
        };
      }
    }

    return {
      isFit: true,
      status: 'universal',
      text: 'Universal Compatibility',
      textKh: 'ភាពត្រូវគ្នាជាទូទៅ'
    };
  }

  return {
    garageVehicles,
    activeVehicle,
    filterVehicleType,
    filterYear,
    filterMake,
    filterModel,
    allMakes,
    availableModels,
    selectActiveVehicle,
    addVehicleToGarage,
    removeVehicleFromGarage,
    setPrimaryVehicle,
    checkFitment
  };
});

