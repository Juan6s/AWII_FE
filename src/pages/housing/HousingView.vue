<template>
  <div class="grid">
    <div class="col-4" v-for="house in housings" :key="house.id">
      <Card class="p-mb-3">
        <template #title>
          {{ house.nombre.toUpperCase() }}
        </template>
        <template #content>
          <p>
            <b>Ubicacion:</b> {{ house.ubicacion }}
          </p>
          <p>
            <b>Precio Noche:</b> ${{ house.precio_noche }}
          </p>

        </template>
      </Card>
    </div>
  </div>
</template>

<script setup>
import { getHousingData } from '@/services/housing.service';
import { onMounted, ref } from 'vue';


onMounted(async () => {
  housings.value = await getHousingData();
})

const housings = ref()


</script>
