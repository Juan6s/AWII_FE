<template>
  <Button
    label="Nuevo inquilino"
    icon="pi pi-plus"
    severity="success"
    class="mr-2 mb-4"
    @click="openNew"
  />

  <div class="grid">
    <div class="col-4" v-for="guest in guests" :key="guest.id">
      <Card class="p-mb-3">
        <template #title>
          {{ guest.name.toUpperCase() }}
        </template>
        <template #content>
          <p><b>Telefono:</b> {{ guest.phone }}</p>
          <p><b>DNI:</b> {{ guest.dni }}</p>
        </template>
      </Card>
    </div>
  </div>

  <Dialog
    v-model:visible="submitGuestDialog"
    :style="{ width: '300px', height: '700px' }"
    header="Detalle inquilino"
    :modal="true"
  >
    <div class="ml-3">
      <div class="field">
        <label for="name" class="w-full">Nombre</label>
        <InputText id="name" v-model="newGuest.name" />
      </div>
      <div class="field">
        <label for="dni" class="w-full">DNI</label>
        <InputText id="dni" v-model="newGuest.dni" />
      </div>
      <div class="field">
        <label for="phone" class="w-full">Telefono</label>
        <InputMask
          id="phone"
          v-model="newGuest.phone"
          mask="(999) 999-9999"
          placeholder="(999) 999-9999"
          fluid
        />
      </div>
    </div>

    <template #footer>
      <Button label="Save" icon="pi pi-check" @click="saveGuest" />
    </template>
  </Dialog>
</template>

<script setup>
import { getGuestData, createGuest } from '@/services/guest.service';
import { onMounted, ref } from 'vue';

const submitGuestDialog = ref(false);
const guests = ref();
const newGuest = ref({});

onMounted(async () => {
  guests.value = await getGuestData();
});

const openNew = () => {
  submitGuestDialog.value = true;
};

const saveGuest =async() => {
  const {name, dni, phone} = newGuest.value
  await createGuest(name, phone, dni)
  submitGuestDialog.value = false;
}
</script>
