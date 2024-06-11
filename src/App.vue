<template>
  <TabMenu :model="items">
    <template #item="{ item, props }">
      <router-link v-slot="{ href, navigate }" :to="item.route" custom>
        <a v-ripple :href="href" v-bind="props.action" @click="navigate">
          <span v-bind="props.icon" />
          <span v-bind="props.label">{{ item.label }}</span>
        </a>
      </router-link>
    </template>
  </TabMenu>
  <RouterView />
</template>

<script setup>
import { ref } from 'vue';
import { PATHS } from './router';

const items = ref([
  { label: 'Reservas', route: PATHS.ROUTE_BOOKING },
  { label: 'Hospedaje', route: PATHS.ROUTE_HOUSING },
  { label: 'Inquilinos', route: PATHS.ROUTE_GUEST }
]);
</script>
