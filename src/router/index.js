import { createRouter, createWebHistory } from 'vue-router';

import HomeView from '../views/HomeView.vue';
import ShopView from '../views/ShopView.vue';
import ProductDetailView from '../views/ProductDetailView.vue';
import WishlistView from '../views/WishlistView.vue';
import CartView from '../views/CartView.vue';
import CheckoutView from '../views/CheckoutView.vue';
import OrderConfirmationView from '../views/OrderConfirmationView.vue';
import GaragesView from '../views/GaragesView.vue';
import AccountView from '../views/AccountView.vue';
import AuthView from '../views/AuthView.vue';
import TrackingView from '../views/TrackingView.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView
  },
  {
    path: '/shop',
    name: 'Shop',
    component: ShopView
  },
  {
    path: '/product/:id',
    name: 'ProductDetail',
    component: ProductDetailView,
    props: true
  },
  {
    path: '/wishlist',
    name: 'Wishlist',
    component: WishlistView
  },
  {
    path: '/cart',
    name: 'Cart',
    component: CartView
  },
  {
    path: '/checkout',
    name: 'Checkout',
    component: CheckoutView
  },
  {
    path: '/order-confirmation/:id?',
    name: 'OrderConfirmation',
    component: OrderConfirmationView,
    props: true
  },
  {
    path: '/garages',
    name: 'Garages',
    component: GaragesView
  },
  {
    path: '/account',
    name: 'Account',
    component: AccountView
  },
  {
    path: '/auth',
    name: 'Auth',
    component: AuthView
  },
  {
    path: '/tracking',
    name: 'Tracking',
    component: TrackingView
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/'
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0 };
    }
  }
});

export default router;

