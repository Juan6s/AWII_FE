<template>
  <div class="grid">
    <div class="col-4" v-for="guest in guests" :key="guest.id">
      <Card class="p-mb-3">
        <template #title>
          {{ guest.name.toUpperCase() }}
        </template>
        <template #content>
          <p>
            <b>Telefono:</b> {{ guest.phone }}
          </p>
          <p>
            <b>DNI:</b> {{ guest.dni }}
          </p>

        </template>
      </Card>
    </div>
  </div>
</template>

<script setup>
import { getGuestData } from '@/services/guest.service';
import { onMounted, ref } from 'vue';


onMounted(async () => {
  guests.value = await getGuestData();
})

const guests = ref()


</script>
