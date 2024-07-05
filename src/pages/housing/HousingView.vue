<template>
  <Button
    label="Registrar Nueva cabaña"
    icon="pi pi-plus"
    severity="success"
    class="mr-2 mb-4"
    @click="openNew"
  />

  <div class="grid">
    <div class="col-4" v-for="house in housings" :key="house.id">
      <Card class="p-mb-3">
        <template #title>
          {{ house.name.toUpperCase() }}
        </template>
        <template #content>
          <p><b>Ubicacion:</b> {{ house.location }}</p>
          <p><b>Precio Noche:</b> ${{ house.pricing }}</p>
        </template>
      </Card>
    </div>
  </div>

  <Dialog
    v-model:visible="modalNewHousing"
    :style="{ width: '300px' }"
    header="Detalle Cabaña"
    :modal="true"
  >
    <div class="ml-3">
      <div class="field">
        <label for="name" class="w-full">Nombre</label>
        <InputText id="name" v-model="newHousing.name" />
      </div>
      <div class="field">
        <label for="price" class="w-full">Precio</label>
        <InputNumber id="price" v-model="newHousing.price" />
      </div>
      <div class="field">
        <label for="location" class="w-full">Ubicacion</label>
        <InputText id="location" v-model="newHousing.location" />
      </div>
    </div>

    <template #footer>
      <Button label="Save" icon="pi pi-check" @click="saveHousing" />
    </template>
  </Dialog>
</template>

<script setup>
import { getHousingData, createHousing } from '@/services/housing.service';
import InputNumber from 'primevue/inputnumber';
import { onMounted, ref } from 'vue';

const housings = ref();
const newHousing = ref({});
const modalNewHousing = ref(false);

onMounted(async () => {
  housings.value = await getHousingData();
});

const openNew = () => {
  modalNewHousing.value = true;
};

const saveHousing = async () => {
  const { name, price, location } = newHousing.value;
  await createHousing(name, price, location);
  modalNewHousing.value = false;
};
</script>
