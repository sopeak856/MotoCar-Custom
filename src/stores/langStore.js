import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useLangStore = defineStore('lang', () => {
  const currentLang = ref('en'); // 'en' | 'kh'

  function toggleLang() {
    currentLang.value = currentLang.value === 'en' ? 'kh' : 'en';
  }

  function setLang(lang) {
    currentLang.value = lang;
  }

  const translations = {
    en: {
      siteTitle: 'MotoCar Custom',
      tagline: 'High Performance Automotive & Superbike Tuning',
      selectRide: 'Select Your Ride',
      myGarage: 'My Garage',
      retailMode: 'Retail (B2C)',
      wholesaleMode: 'Wholesale (B2B)',
      switchToWholesale: 'Switch to B2B Wholesale Portal',
      switchToRetail: 'Switch to Retail B2C Mode',
      searchPlaceholder: 'Search exhaust, carbon wings, Brembo BBK, coilovers...',
      cart: 'Cart',
      wishlist: 'Wishlist',
      account: 'Account',
      home: 'Home',
      shop: 'Shop All',
      motoCustom: 'Motorcycle Custom',
      carCustom: 'Car Custom',
      b2bCatalog: 'B2B Wholesale Catalog',
      partnerGarages: 'Partner Garages',
      trackOrder: 'Track Order',
      guaranteedFit: 'Guaranteed Fit',
      universalFit: 'Universal Fit',
      incompatible: 'Does Not Fit',
      addToCart: 'Add to Cart',
      requestQuote: 'Request for Quote (RFQ)',
      bookInstallation: 'Book Installation',
      wholesaleTiers: 'Wholesale Tier Pricing',
      retailPrice: 'Retail Price',
      khqrPay: 'KHQR Payment (Bakong)',
      b2bCreditTerm: 'B2B Net-30 Credit',
      cod: 'Cash on Delivery',
      checkout: 'Proceed to Checkout',
      orderConfirmed: 'Order Confirmed',
      downloadTaxInvoice: 'Download Cambodia Tax Invoice (VAT)'
    },
    kh: {
      siteTitle: 'MotoCar Custom',
      tagline: 'មជ្ឈមណ្ឌលគ្រឿងបន្លាស់កែច្នៃរថយន្ត និងម៉ូតូធំកម្រិតខ្ពស់',
      selectRide: 'ជ្រើសរើសយានយន្តរបស់អ្នក',
      myGarage: 'យានដ្ឋានផ្ទាល់ខ្លួន',
      retailMode: 'លក់រាយ (B2C)',
      wholesaleMode: 'លក់ដុំ (B2B)',
      switchToWholesale: 'ប្តូរទៅកាន់ផតថលលក់ដុំ B2B',
      switchToRetail: 'ប្តូរទៅកាន់របៀបទិញរាយ B2C',
      searchPlaceholder: 'ស្វែងរកស៊ីម៉ាំង, កាបូន, ហ្វ្រាំង Brembo, បូមប្រណាំង...',
      cart: 'កន្ត្រកទំនិញ',
      wishlist: 'ទំនិញពេញចិត្ត',
      account: 'គណនី',
      home: 'ទំព័រដើម',
      shop: 'ទំនិញទាំងអស់',
      motoCustom: 'គ្រឿងកែច្នៃម៉ូតូ',
      carCustom: 'គ្រឿងកែច្នៃរថយន្ត',
      b2bCatalog: 'កាតាឡុកលក់ដុំ B2B',
      partnerGarages: 'យានដ្ឋានដៃគូដំឡើង',
      trackOrder: 'តាមដានការដឹកជញ្ជូន',
      guaranteedFit: 'ធានាត្រូវគ្នា ១០០%',
      universalFit: 'ប្រើបានទូទៅ',
      incompatible: 'មិនត្រូវគ្នា',
      addToCart: 'ដាក់ក្នុងកន្ត្រក',
      requestQuote: 'ស្នើសុំសម្រង់តម្លៃ (RFQ)',
      bookInstallation: 'កក់ការដំឡើងនៅយានដ្ឋាន',
      wholesaleTiers: 'តារាងតម្លៃលក់ដុំតាមចំនួន',
      retailPrice: 'តម្លៃលក់រាយ',
      khqrPay: 'ទូទាត់តាម KHQR (បាគង / ABA)',
      b2bCreditTerm: 'ឥណទាន B2B រយៈពេល ៣០ ថ្ងៃ',
      cod: 'ទូទាត់ប្រាក់ពេលទទួលទំនិញ',
      checkout: 'បន្តទៅការទូទាត់ប្រាក់',
      orderConfirmed: 'ការកុម្ម៉ង់ត្រូវបានបញ្ជាក់',
      downloadTaxInvoice: 'ទាញយកវិក្កយបត្រពន្ធ (VAT Cambodia)'
    }
  };

  function t(key) {
    return translations[currentLang.value]?.[key] || translations.en[key] || key;
  }

  return {
    currentLang,
    toggleLang,
    setLang,
    t
  };
});

