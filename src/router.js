import { createRouter, createWebHistory } from 'vue-router';
import AppLayout from './layout/AppLayout.vue';

import GuestView from './pages/guest/GuestView.vue';
import BookingView from './pages/booking/BookingView.vue';
import HousingView from './pages/housing/HousingView.vue';

export const PATHS = {
  ROUTE_GUEST: '/inquilinos',
  ROUTE_HOUSING: '/hospedajes',
  ROUTE_BOOKING: '/reservas'
};

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'dahboard',
      component: AppLayout,
      children: [
        { path: PATHS.ROUTE_BOOKING, component: BookingView },
        { path: PATHS.ROUTE_GUEST, component: GuestView },
        { path: PATHS.ROUTE_HOUSING, component: HousingView }
      ]
    }
  ]
});
