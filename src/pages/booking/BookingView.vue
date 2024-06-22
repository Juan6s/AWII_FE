<template>
  <Toolbar class="mb-6">
    <template #start>
      <Button label="Nueva" icon="pi pi-plus" severity="success" class="mr-2" @click="openNew" />
    </template>
  </Toolbar>

  <div class="grid">
    <div class="col-12 xl:col-12">
      <div class="card">
        <h5>Reservas</h5>
        <DataTable v-model:selection="selectedBookings" v-model:filters="filters" :value="bookings"
          selectionMode="single" dataKey="id" removableSort :rows="5" :paginator="true" responsiveLayout="scroll"
          filterDisplay="row" :loading="loading">
          <template #empty> No customers found. </template>
          <template #loading> Loading customers data. Please wait. </template>

          <Column field="guestName" header="Nombre de reservista" :sortable="true" style="width: 15%">
            <template #body="{ data }">
              {{ data.guestName }}
            </template>
            <template #filter="{ filterModel, filterCallback }">
              <InputText v-model="filterModel.value" type="text" @input="filterCallback()"
                placeholder="Buscar por nombre" />
            </template>
          </Column>

          <Column field="admissionDate" header="Ingreso" :sortable="true" style="width: 25%">
            <template #body="{ data }">
              {{ data.admissionDate }}
            </template>
            <template #filter="{ filterModel, filterCallback }">
              <InputText v-model="filterModel.value" type="text" @input="filterCallback()" placeholder="Buscar fecha" />
            </template>
          </Column>

          <Column field="exitDate" header="Salida" :sortable="true" style="width: 25%">
            <template #body="{ data }">
              {{ data.admissionDate }}
            </template>
            <template #filter="{ filterModel, filterCallback }">
              <InputText v-model="filterModel.value" type="text" @input="filterCallback()" placeholder="Buscar fecha" />
            </template>
          </Column>

          <Column field="housingName" header="Cabaña" :sortable="true" style="width: 25%"> <template #body="{ data }">
              {{ data.housingName }}
            </template>
            <template #filter="{ filterModel, filterCallback }">
              <InputText v-model="filterModel.value" type="text" @input="filterCallback()" placeholder="Hospedaje" />
            </template>
          </Column>

          <Column field="numberGuests" header="Inquilinos" :sortable="true" style="width: 10%"> <template
              #body="{ data }">
              {{ data.numberGuests }}
            </template>
            <template #filter="{ filterModel, filterCallback }">
              <InputText v-model="filterModel.value" type="text" @input="filterCallback()" placeholder="Inquilinos" />
            </template>
          </Column>
        </DataTable>
      </div>
    </div>
  </div>

  <Dialog v-model:visible="productDialog" :style="{ width: '300px' }" header="Detalle reserva" :modal="true">
    <div class="ml-3">
      <div class="field">
        <label for="calendar" class="w-full">Rango de fechas</label>
        <Calendar id="calendar" v-model="booking.dates" selectionMode="range" :manualInput="false" class="w-full" />
      </div>

      <div class="field">
        <label for="guest" class="w-full">Eleji el inquilino</label>
        <AutoComplete id="guest" v-model="booking.guest" dropdown :suggestions="guests" optionLabel="name"
          @complete="search" class="w-full" />
      </div>

      <div class="field">
        <label for="housing" class="w-full">Eleji la cabaña</label>
        <Dropdown id="housing" v-model="booking.housing" :options="housings" optionLabel="name"
          placeholder="Selecciona una cabaña" class="w-full" />
      </div>
    </div>


    <template #footer>
      <Button label="Cancel" icon="pi pi-times" text @click="hideDialog" />
      <Button label="Save" icon="pi pi-check" @click="saveBooking" />
    </template>
  </Dialog>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { createBooking, getBookingData } from '../../services/booking.service';
import { getGuestData } from '../../services/guest.service';
import { FilterMatchMode } from 'primevue/api'
import { getHousingData } from '../../services/housing.service';

onMounted(() => {

  mapData().then((data) => {
    bookings.value = data;
    loading.value = false;
  });

  getHousingData().then((housingData) => {
    housings.value = housingData.map(housing => { return { id: housing.id, name: housing.nombre } })
  })

});
const filters = ref({
  guestName: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  admissionDate: { value: null, matchMode: FilterMatchMode.CONTAINS },
  exitDate: { value: null, matchMode: FilterMatchMode.CONTAINS },
  numberGuests: { value: null, matchMode: FilterMatchMode.EQUALS },
  housingName: { value: null, matchMode: FilterMatchMode.CONTAINS }
});
const loading = ref()
const booking = ref({});
const productDialog = ref(false);
const submitted = ref(false);
const housings = ref()
const guests = ref({})
const bookings = ref();



async function mapData() {
  const bookingData = await getBookingData();
  const guestsData = await getGuestData();
  const housingData = await getHousingData();

  return bookingData.map((booking) => {
    return {
      admissionDate: booking.fechas.ingreso,
      exitDate: booking.fechas.salida,
      guestName: guestsData.find((guest) => guest.id === booking.id_inquilino)?.nombre,
      housingName: housingData.find((housing) => housing.id === booking.id_hospedaje)?.nombre,
      numberGuests: booking.acompanantes.length + 1
    };
  });
}

const openNew = () => {
  booking.value = {};
  submitted.value = false;
  productDialog.value = true;
};

const saveBooking = async () => {
  const bookingDetails = booking.value
  console.log(bookingDetails)
  await createBooking(bookingDetails.dates[0], bookingDetails.dates[1], bookingDetails.guest.id, bookingDetails.housing.id)
  await mapData()
  productDialog.value= false;
  submitted.value = true;
}


const search = async (event) => {
  const guestsData = await getGuestData();
  const filteredGuest = guestsData.filter((guest) => {
    return guest.nombre.toLowerCase().startsWith(event.query.toLowerCase())
  })

  guests.value = filteredGuest.map((guest) => {
    return { id: guest.id, name: guest.nombre }
  })

}
</script>
