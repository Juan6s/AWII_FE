import { createRouter, createWebHistory } from 'vue-router';
import AppLayout from './layout/AppLayout.vue';

import GuestView from './pages/guest/GuestView.vue';
import BookingView from './pages/booking/BookingView.vue';
import HousingView from './pages/housing/HousingView.vue';
import Todo from './components/Todo.vue';
import LoginView from './pages/login/LoginView.vue';

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
        { path: '/', component: Todo, auth: true },
        { path: PATHS.ROUTE_BOOKING, component: BookingView, auth: true },
        { path: PATHS.ROUTE_GUEST, component: GuestView, auth: true },
        { path: PATHS.ROUTE_HOUSING, component: HousingView, auth: true }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    }
  ]
});



