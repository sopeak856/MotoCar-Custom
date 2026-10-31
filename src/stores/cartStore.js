import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { useUserStore } from './userStore';
import { PROMOTIONS } from '../data/mockData';

export const useCartStore = defineStore('cart', () => {
  const userStore = useUserStore();

  const items = ref([
    {
      productId: 'MCC-P002',
      product: {
        id: 'MCC-P002',
        title: 'SC-Project SC1-R Titanium Slip-On Motorcycle Exhaust',
        titleKh: 'បំពង់ស៊ីម៉ាំងម៉ូតូ SC-Project SC1-R Titanium Slip-On',
        retailPrice: 890,
        b2bTiers: [
          { minQty: 1, price: 890 },
          { minQty: 5, price: 740 },
          { minQty: 10, price: 670 },
          { minQty: 20, price: 590 }
        ],
        images: ['https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&w=400&q=80'],
        installationAvailable: true,
        installationFee: 25
      },
      quantity: 1,
      withInstallation: true,
      selectedGarage: 'K-Speed Superbike & MotoCraft Workshop',
      vehicleNote: '2023 Yamaha YZF-R7'
    }
  ]);

  const appliedPromo = ref(null);
  const deliveryMethod = ref('courier'); // 'courier' | 'virak_buntham' | 'direct_garage'
  const exchangeRateKHR = 4100; // 1 USD = 4,100 KHR

  // Calculate unit price for an item based on B2C vs B2B mode and quantity
  function getItemUnitPrice(item) {
    const isB2B = userStore.isB2B;
    const qty = item.quantity;
    const prod = item.product;

    if (!isB2B) {
      return prod.retailPrice;
    }

    // B2B tier pricing
    if (prod.b2bTiers && prod.b2bTiers.length > 0) {
      // Find matching tier
      const sortedTiers = [...prod.b2bTiers].sort((a, b) => b.minQty - a.minQty);
      const tier = sortedTiers.find(t => qty >= t.minQty);
      return tier ? tier.price : prod.b2bTiers[0].price;
    }

    return prod.retailPrice * 0.85; // fallback 15% wholesale default
  }

  const subtotal = computed(() => {
    return items.value.reduce((sum, item) => {
      return sum + (getItemUnitPrice(item) * item.quantity);
    }, 0);
  });

  const installationTotal = computed(() => {
    // If promo grants free install
    if (appliedPromo.value?.freeInstallation && subtotal.value >= (appliedPromo.value.minSpend || 0)) {
      return 0;
    }
    return items.value.reduce((sum, item) => {
      if (item.withInstallation && item.product.installationFee) {
        return sum + (item.product.installationFee * (userStore.isB2B ? 1 : item.quantity));
      }
      return sum;
    }, 0);
  });

  const discountAmount = computed(() => {
    if (!appliedPromo.value) return 0;
    if (appliedPromo.value.discountPercent) {
      return (subtotal.value * appliedPromo.value.discountPercent) / 100;
    }
    return 0;
  });

  const shippingCost = computed(() => {
    if (subtotal.value >= 300 || deliveryMethod.value === 'direct_garage') {
      return 0; // Free shipping over $300 or direct garage drop
    }
    if (deliveryMethod.value === 'virak_buntham') {
      return 4.5;
    }
    return 6.0;
  });

  const taxAmount = computed(() => {
    // 10% Cambodia VAT (Value Added Tax)
    return Math.round((subtotal.value - discountAmount.value) * 0.1 * 100) / 100;
  });

  const grandTotal = computed(() => {
    return Math.max(0, subtotal.value - discountAmount.value + installationTotal.value + shippingCost.value + taxAmount.value);
  });

  const grandTotalKHR = computed(() => {
    return Math.round(grandTotal.value * exchangeRateKHR);
  });

  const totalCount = computed(() => {
    return items.value.reduce((count, item) => count + item.quantity, 0);
  });

  function addToCart(product, quantity = 1, withInstallation = false, selectedGarage = null, vehicleNote = '') {
    const existing = items.value.find(i => i.productId === product.id);
    if (existing) {
      existing.quantity += quantity;
      if (withInstallation) existing.withInstallation = true;
      if (selectedGarage) existing.selectedGarage = selectedGarage;
      if (vehicleNote) existing.vehicleNote = vehicleNote;
    } else {
      items.value.push({
        productId: product.id,
        product,
        quantity,
        withInstallation,
        selectedGarage: selectedGarage || (withInstallation ? 'Apex Performance Tuning & Dyno Lab' : null),
        vehicleNote
      });
    }
  }

  function updateQuantity(productId, quantity) {
    const item = items.value.find(i => i.productId === productId);
    if (item) {
      if (quantity <= 0) {
        removeFromCart(productId);
      } else {
        item.quantity = quantity;
      }
    }
  }

  function toggleInstallation(productId) {
    const item = items.value.find(i => i.productId === productId);
    if (item) {
      item.withInstallation = !item.withInstallation;
    }
  }

  function removeFromCart(productId) {
    items.value = items.value.filter(i => i.productId !== productId);
  }

  function clearCart() {
    items.value = [];
    appliedPromo.value = null;
  }

  function applyPromo(code) {
    const found = PROMOTIONS.find(p => p.code.toUpperCase() === code.trim().toUpperCase());
    if (found) {
      if (subtotal.value < found.minSpend) {
        return { success: false, message: `Minimum spend of $${found.minSpend} required for promo ${code}.` };
      }
      appliedPromo.value = found;
      return { success: true, message: `Coupon ${found.code} applied successfully!`, promo: found };
    }
    return { success: false, message: 'Invalid or expired coupon code. Try MOTO2025 or GARAGE10' };
  }

  function removePromo() {
    appliedPromo.value = null;
  }

  return {
    items,
    appliedPromo,
    deliveryMethod,
    exchangeRateKHR,
    getItemUnitPrice,
    subtotal,
    installationTotal,
    discountAmount,
    shippingCost,
    taxAmount,
    grandTotal,
    grandTotalKHR,
    totalCount,
    addToCart,
    updateQuantity,
    toggleInstallation,
    removeFromCart,
    clearCart,
    applyPromo,
    removePromo
  };
});

