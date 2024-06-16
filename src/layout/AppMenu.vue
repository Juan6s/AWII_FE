<script setup>
import { ref } from 'vue';

import AppMenuItem from './AppMenuItem.vue';

const model = ref([
  {
    
    items: [
      { label: 'Reservas', icon: 'pi pi-fw pi-book', to: '/reservas' },
      { label: 'Inquilinos', icon: 'pi pi-fw pi-users', to: '/inquilinos' },
      { label: 'hospedajes', icon: 'pi pi-fw pi-home', to: '/hospedajes' }
    ]
  }
]);
</script>

<template>
  <ul class="layout-menu">
    <template v-for="(item, i) in model" :key="item">
      <app-menu-item v-if="!item.separator" :item="item" :index="i"></app-menu-item>
      <li v-if="item.separator" class="menu-separator"></li>
    </template>
    <li></li>
  </ul>
</template>

<style lang="scss" scoped></style>
