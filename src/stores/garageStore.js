import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { PARTNER_GARAGES } from '../data/mockData';

export const useGarageStore = defineStore('garage', () => {
  const garages = ref([...PARTNER_GARAGES]);
  const selectedProvince = ref('All');
  const selectedService = ref('All');
  const searchQuery = ref('');

  const bookings = ref([
    {
      id: 'BKG-9921',
      garageId: 'G-PP-02',
      garageName: 'K-Speed Superbike & MotoCraft Workshop',
      vehicle: '2023 Yamaha YZF-R7',
      serviceType: 'Superbike SC-Project Exhaust Fitting',
      date: '2026-11-02',
      timeSlot: '10:00 AM - 11:30 AM',
      customerName: 'Sokha Rithy',
      phone: '+855 12 888 999',
      status: 'Confirmed',
      notes: 'Customer bringing in slip-on purchased via MotoCar Custom.'
    }
  ]);

  const partnershipApplications = ref([]);

  const filteredGarages = computed(() => {
    return garages.value.filter(g => {
      const matchProv = selectedProvince.value === 'All' || g.province === selectedProvince.value;
      const matchServ = selectedService.value === 'All' || g.certifiedServices.some(s => s.toLowerCase().includes(selectedService.value.toLowerCase()));
      const matchSearch = !searchQuery.value || 
        g.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        g.address.toLowerCase().includes(searchQuery.value.toLowerCase());
      return matchProv && matchServ && matchSearch;
    });
  });

  function createBooking(booking) {
    const newBooking = {
      ...booking,
      id: 'BKG-' + Math.floor(1000 + Math.random() * 9000),
      status: 'Confirmed',
      createdAt: new Date().toISOString()
    };
    bookings.value.unshift(newBooking);
    return newBooking;
  }

  function submitPartnership(application) {
    const newApp = {
      ...application,
      id: 'APP-' + Math.floor(1000 + Math.random() * 9000),
      status: 'Application Received (Reviewing within 48h)',
      submittedAt: new Date().toISOString()
    };
    partnershipApplications.value.unshift(newApp);
    return newApp;
  }

  return {
    garages,
    selectedProvince,
    selectedService,
    searchQuery,
    bookings,
    partnershipApplications,
    filteredGarages,
    createBooking,
    submitPartnership
  };
});

