import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useWishlistStore = defineStore('wishlist', () => {
  const itemIds = ref(['MCC-P001', 'MCC-P004']); // Initial saved items

  function toggleWishlist(productId) {
    if (itemIds.value.includes(productId)) {
      itemIds.value = itemIds.value.filter(id => id !== productId);
    } else {
      itemIds.value.push(productId);
    }
  }

  function isInWishlist(productId) {
    return itemIds.value.includes(productId);
  }

  function removeFromWishlist(productId) {
    itemIds.value = itemIds.value.filter(id => id !== productId);
  }

  return {
    itemIds,
    toggleWishlist,
    isInWishlist,
    removeFromWishlist
  };
});

