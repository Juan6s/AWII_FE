import { createRouter, createWebHistory } from 'vue-router';
import AppLayout from './layout/AppLayout.vue';

import GuestView from './pages/guest/GuestView.vue';
import BookingView from './pages/booking/BookingView.vue';
import HousingView from './pages/housing/HousingView.vue';
import Todo from './components/Todo.vue';
import LoginView from './pages/login/LoginView.vue';
import RegisterView from './pages/register/RegisterView.vue';
import { getToken } from './services/auth.service';

export const PATHS = {
  ROUTE_GUEST: '/inquilinos',
  ROUTE_HOUSING: '/hospedajes',
  ROUTE_BOOKING: '/reservas',
  ROUTE_LOGIN: '/login',
  ROUTE_REGISTER: '/register',
  ROUTE_HOME: '/',
};

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: PATHS.ROUTE_HOME,
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
      path: PATHS.ROUTE_LOGIN,
      name: 'login',
      component: LoginView
    },
    { path: '/register', name: 'register', component: RegisterView }
  ]
});

router.beforeEach(async function (to, from, next) {
  const token = await getToken();

  if (to.path !== '/login' && to.path !== '/register' && !token) {
    next({ path: '/login' });
    return;
  }

  if (to.path === '/login' && token) {
    next({ path: '/' });
    return;
  }
  next();
});


export function redirect(path){
  router.replace({path})
}

export default router

