import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { USER_MOCK } from '../data/mockData';

export const useUserStore = defineStore('user', () => {
  const isLoggedIn = ref(false); // Default to logged-out so user clearly sees Login & Register buttons!
  const userMode = ref('b2c'); // 'b2c' | 'b2b'
  const user = ref({ ...USER_MOCK });

  // Initial demo orders
  const orders = ref([
    {
      id: 'MCC-2026-9021',
      date: '2026-10-28',
      status: 'In Transit',
      statusCode: 'transit', // 'processing' | 'confirmed' | 'transit' | 'installation' | 'completed'
      trackingNumber: 'VET-EXP-882910KH',
      carrier: 'Virak Buntham Express (Phnom Penh -> Siem Reap)',
      estimatedDelivery: '2026-11-01',
      items: [
        {
          id: 'MCC-P002',
          title: 'SC-Project SC1-R Titanium Slip-On Motorcycle Exhaust',
          price: 890,
          quantity: 1,
          withInstallation: true,
          garage: 'K-Speed Superbike & MotoCraft Workshop',
          installationFee: 25,
          image: 'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&w=400&q=80'
        }
      ],
      paymentMethod: 'KHQR (Bakong / ABA Pay)',
      paymentStatus: 'Paid',
      subtotal: 890,
      installationTotal: 25,
      tax: 89,
      shipping: 0,
      discount: 0,
      total: 1004,
      shippingAddress: {
        recipient: 'Sokha Rithy',
        phone: '+855 12 888 999',
        address: 'Street 315, Khan Tuol Kork, Phnom Penh'
      },
      installationDetails: {
        garageName: 'K-Speed Superbike & MotoCraft Workshop',
        appointmentDate: '2026-11-02',
        timeSlot: '10:00 AM - 11:30 AM',
        vehicle: '2023 Yamaha YZF-R7 (Plate: PP 1Z-7711)'
      },
      trackingTimeline: [
        { title: 'Order Placed & Verified', time: 'Oct 28, 2026 09:15 AM', done: true, desc: 'KHQR payment confirmed via Bakong API' },
        { title: 'Warehouse Quality Checked', time: 'Oct 28, 2026 02:40 PM', done: true, desc: 'Italian authenticity certificate stamped' },
        { title: 'Dispatched to Virak Buntham Logistics', time: 'Oct 29, 2026 08:30 AM', done: true, desc: 'Consignment handed to express delivery unit' },
        { title: 'In Transit to Partner Garage', time: 'Oct 30, 2026 11:00 AM', done: true, desc: 'En route to K-Speed Superbike Workshop' },
        { title: 'Installation & Handover', time: 'Estimated Nov 02, 2026', done: false, desc: 'Awaiting customer arrival at garage' }
      ]
    },
    {
      id: 'MCC-2026-8840',
      date: '2026-10-15',
      status: 'Completed',
      statusCode: 'completed',
      trackingNumber: 'MCC-DEL-44120',
      carrier: 'MotoCar Direct Courier (Phnom Penh)',
      estimatedDelivery: '2026-10-16',
      items: [
        {
          id: 'MCC-P007',
          title: 'HKS Flash Editor & Stage 2 ECU Dyno Remap Calibration',
          price: 1150,
          quantity: 1,
          withInstallation: true,
          garage: 'Apex Performance Tuning & Dyno Lab',
          installationFee: 50,
          image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=400&q=80'
        }
      ],
      paymentMethod: 'B2B Net 30 Credit Term',
      paymentStatus: 'Paid',
      subtotal: 1150,
      installationTotal: 50,
      tax: 115,
      shipping: 0,
      discount: 115,
      total: 1200,
      shippingAddress: {
        recipient: 'Apex Motor Tuning Co., Ltd',
        phone: '+855 12 888 999',
        address: 'Street 315, Khan Tuol Kork, Phnom Penh'
      },
      installationDetails: {
        garageName: 'Apex Performance Tuning & Dyno Lab',
        appointmentDate: '2026-10-16',
        timeSlot: '02:00 PM',
        vehicle: '2024 Honda Civic Type R (FL5)'
      },
      trackingTimeline: [
        { title: 'Order Placed', time: 'Oct 15, 2026 10:00 AM', done: true, desc: 'B2B Purchase Order approved' },
        { title: 'Dyno Flash Prepared', time: 'Oct 15, 2026 03:00 PM', done: true, desc: 'Custom 98 Octane tune pre-loaded' },
        { title: 'Completed at Garage', time: 'Oct 16, 2026 04:30 PM', done: true, desc: 'Dyno tested: +54 HP gain verified on graph' }
      ]
    }
  ]);

  // Request for Quotes (B2B wholesale)
  const rfqList = ref([
    {
      id: 'RFQ-2026-0042',
      date: '2026-10-29',
      status: 'Quote Ready',
      statusColor: 'emerald',
      productName: 'Akrapovič Evolution Titanium Full Exhaust System',
      targetQty: 5,
      offeredUnitPrice: 3490,
      totalQuoted: 17450,
      validUntil: '2026-11-15',
      paymentTerm: 'Net 30 Days',
      deliveryMethod: 'Direct Container Delivery to Tuol Kork Workshop',
      garageNotes: 'Requesting 5 units for client builds scheduled in late November.',
      replyFromAdmin: 'Quoted at tier 3 wholesale price with complimentary import tariff handling.'
    },
    {
      id: 'RFQ-2026-0038',
      date: '2026-10-10',
      status: 'Order Placed',
      statusColor: 'cyan',
      productName: 'Brembo GT-R Monobloc 6-Piston Big Brake Kit',
      targetQty: 3,
      offeredUnitPrice: 4600,
      totalQuoted: 13800,
      validUntil: '2026-10-25',
      paymentTerm: 'Net 30 Days',
      deliveryMethod: 'Phnom Penh Warehouse Pickup',
      garageNotes: 'Wholesale batch order for G80 M3 & FL5 Civic track day customers.'
    }
  ]);

  const isB2B = computed(() => userMode.value === 'b2b');

  function toggleUserMode() {
    userMode.value = userMode.value === 'b2c' ? 'b2b' : 'b2c';
  }

  function setUserMode(mode) {
    userMode.value = mode;
  }

  function login(credentials) {
    isLoggedIn.value = true;
    if (credentials?.identifier) {
      if (credentials.identifier.includes('@')) {
        user.value.email = credentials.identifier;
      } else {
        user.value.phone = credentials.identifier;
      }
    }
    return true;
  }

  function logout() {
    isLoggedIn.value = false;
  }

  function registerB2C(userData) {
    isLoggedIn.value = true;
    user.value = {
      ...user.value,
      name: userData.name || user.value.name,
      email: userData.email || user.value.email,
      phone: userData.phone || user.value.phone,
      telegram: userData.telegram || user.value.telegram
    };
    userMode.value = 'b2c';
    return true;
  }

  function registerB2B(data) {
    isLoggedIn.value = true;
    user.value.b2bProfile = {
      ...user.value.b2bProfile,
      ...data,
      isApproved: true
    };
    userMode.value = 'b2b';
    return true;
  }

  function addOrder(orderData) {
    orders.value.unshift(orderData);
    return orderData;
  }

  function addRFQ(rfqData) {
    const newRFQ = {
      ...rfqData,
      id: 'RFQ-2026-' + String(Math.floor(1000 + Math.random() * 9000)),
      date: new Date().toISOString().split('T')[0],
      status: 'Under Review',
      statusColor: 'amber'
    };
    rfqList.value.unshift(newRFQ);
    return newRFQ;
  }

  return {
    isLoggedIn,
    userMode,
    isB2B,
    user,
    orders,
    rfqList,
    toggleUserMode,
    setUserMode,
    login,
    logout,
    registerB2C,
    registerB2B,
    addOrder,
    addRFQ
  };
});
