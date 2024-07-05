<template>
  <Toolbar class="mb-6">
    <template #start>
      <Button label="Nueva" icon="pi pi-plus" severity="success" class="mr-2" @click="openNew" />
      <Button
        :disabled="!selectedBooking"
        label="Editar"
        icon="pi pi-pencil"
        severity="warning"
        class="mr-2"
        @click="openEdit"
      />
      <Button
        :disabled="!selectedBooking"
        label="Eliminar"
        icon="pi pi-times"
        severity="danger"
        class="mr-2"
        @click="openDelete"
      />
    </template>
  </Toolbar>

  <div class="grid">
    <div class="col-12 xl:col-12">
      <div class="card">
        <h5>Reservas</h5>
        <DataTable
          v-model:selection="selectedBooking"
          v-model:filters="filters"
          :value="bookings"
          selectionMode="single"
          dataKey="id"
          removableSort
          :rows="5"
          :paginator="true"
          responsiveLayout="scroll"
          filterDisplay="row"
          :loading="loading"
        >
          <template #empty> No customers found. </template>
          <template #loading> Loading customers data. Please wait. </template>

          <Column
            field="guestName"
            header="Nombre de reservista"
            :sortable="true"
            style="width: 15%"
          >
            <template #body="{ data }">
              {{ data.guestName }}
            </template>
            <template #filter="{ filterModel, filterCallback }">
              <InputText
                v-model="filterModel.value"
                type="text"
                @input="filterCallback()"
                placeholder="Buscar por nombre"
              />
            </template>
          </Column>

          <Column field="admissionDate" header="Ingreso" :sortable="true" style="width: 25%">
            <template #body="{ data }">
              {{ data.admissionDate }}
            </template>
            <template #filter="{ filterModel, filterCallback }">
              <InputText
                v-model="filterModel.value"
                type="text"
                @input="filterCallback()"
                placeholder="Buscar fecha"
              />
            </template>
          </Column>

          <Column field="exitDate" header="Salida" :sortable="true" style="width: 25%">
            <template #body="{ data }">
              {{ data.admissionDate }}
            </template>
            <template #filter="{ filterModel, filterCallback }">
              <InputText
                v-model="filterModel.value"
                type="text"
                @input="filterCallback()"
                placeholder="Buscar fecha"
              />
            </template>
          </Column>

          <Column field="housingName" header="Cabaña" :sortable="true" style="width: 25%">
            <template #body="{ data }">
              {{ data.housingName }}
            </template>
            <template #filter="{ filterModel, filterCallback }">
              <InputText
                v-model="filterModel.value"
                type="text"
                @input="filterCallback()"
                placeholder="Hospedaje"
              />
            </template>
          </Column>
        </DataTable>
      </div>
    </div>
  </div>

  <Dialog
    v-model:visible="submitBookingDialog"
    :style="{ width: '300px' }"
    header="Detalle reserva"
    :modal="true"
  >
    <div class="ml-3">
      <div class="field">
        <label for="calendar" class="w-full">Rango de fechas</label>
        <Calendar
          id="calendar"
          v-model="booking.dates"
          selectionMode="range"
          :manualInput="false"
          class="w-full"
        />
      </div>

      <div class="field">
        <label for="guest" class="w-full">Eleji el inquilino</label>
        <AutoComplete
          id="guest"
          v-model="booking.guest"
          dropdown
          :suggestions="guests"
          optionLabel="name"
          @complete="search"
          class="w-full"
        />
      </div>

      <div class="field">
        <label for="housing" class="w-full">Eleji la cabaña</label>
        <Dropdown
          id="housing"
          v-model="booking.housing"
          :options="housings"
          optionLabel="name"
          placeholder="Selecciona una cabaña"
          class="w-full"
        />
      </div>
    </div>

    <template #footer>
      <Button label="Cancel" icon="pi pi-times" text @click="hideDialog" />
      <Button label="Save" icon="pi pi-check" @click="saveBooking" />
    </template>
  </Dialog>

  <Dialog
    v-model:visible="confirmDialog"
    :style="{ width: '300px' }"
    header="Continuar con la accion?"
    :modal="true"
  >
    <template #footer>
      <Button label="Cancel" icon="pi pi-times" text @click="hideDialog" />
      <Button label="Save" icon="pi pi-check" @click="onDeleteBooking" />
    </template>
  </Dialog>

  <Dialog
    v-model:visible="editBookingDialog"
    :style="{ width: '300px' }"
    header="Detalle reserva"
    :modal="true"
  >
    <div class="ml-3">
      <div class="field">
        <label for="calendar" class="w-full">Rango de fechas</label>
        <Calendar
          id="calendar"
          v-model="booking.dates"
          selectionMode="range"
          :manualInput="false"
          class="w-full"
        />
      </div>

      <div class="field">
        <label for="guest" class="w-full">Eleji el inquilino</label>
        <AutoComplete
          id="guest"
          v-model="booking.guest"
          dropdown
          :suggestions="guests"
          optionLabel="name"
          @complete="search"
          class="w-full"
        />
      </div>

      <div class="field">
        <label for="housing" class="w-full">Eleji la cabaña</label>
        <Dropdown
          id="housing"
          v-model="booking.housing"
          :options="housings"
          optionLabel="name"
          placeholder="Selecciona una cabaña"
          class="w-full"
        />
      </div>
    </div>

    <template #footer>
      <Button label="Cancel" icon="pi pi-times" text @click="hideDialog" />
      <Button label="Save" icon="pi pi-check" @click="editBooking" />
    </template>
  </Dialog>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { createBooking, getBookingData, deleteBooking, putBooking } from '../../services/booking.service';
import { getGuestData } from '../../services/guest.service';
import { FilterMatchMode } from 'primevue/api';
import { getHousingData } from '../../services/housing.service';

onMounted(() => {
  mapData().then((data) => {
    bookings.value = data;
    loading.value = false;
  });

  getHousingData().then((housingData) => {
    housings.value = housingData.map((housing) => {
      return { id: housing._id, name: housing.name };
    });
  });
});
const filters = ref({
  guestName: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  admissionDate: { value: null, matchMode: FilterMatchMode.CONTAINS },
  exitDate: { value: null, matchMode: FilterMatchMode.CONTAINS },
  numberGuests: { value: null, matchMode: FilterMatchMode.EQUALS },
  housingName: { value: null, matchMode: FilterMatchMode.CONTAINS }
});
const loading = ref();
const booking = ref({});
const submitBookingDialog = ref(false);
const editBookingDialog = ref(false);
const confirmDialog = ref(false);
const submitted = ref(false);
const housings = ref();
const guests = ref({});
const bookings = ref();
const selectedBooking = ref();

async function mapData() {
  const bookingData = await getBookingData();
  const guestsData = await getGuestData();
  const housingData = await getHousingData();

  return bookingData.map((booking) => {
    return {
      id: booking._id,
      admissionDate: booking.checkInDate,
      exitDate: booking.checkOutDate,
      guestName: guestsData.find((guest) => guest._id === booking.guest)?.name,
      housingName: housingData.find((housing) => housing._id === booking.housing)?.name
    };
  });
}

const openNew = () => {
  booking.value = {};
  submitted.value = false;
  submitBookingDialog.value = true;
};

const openDelete = () => {
  confirmDialog.value = true;
};

const openEdit = () => {
  booking.value = {
    guest: selectedBooking.value.guestName
  };
  editBookingDialog.value = true;
};

const saveBooking = async () => {
  const bookingDetails = booking.value;
  await createBooking(
    bookingDetails.dates[0],
    bookingDetails.dates[1],
    bookingDetails.guest.id,
    bookingDetails.housing.id
  );

  bookings.value = await mapData();
  submitBookingDialog.value = false;
  submitted.value = true;
};

const editBooking = async () => {
  const bookingDetails = booking.value;
  await putBooking(
    selectedBooking.value.id,
    bookingDetails.dates[0],
    bookingDetails.dates[1],
    bookingDetails.guest.id,
    bookingDetails.housing.id
  );
  editBookingDialog.value = false

};

const onDeleteBooking = async () => {
  deleteBooking(selectedBooking.value.id);
};

const search = async (event) => {
  const guestsData = await getGuestData();
  const filteredGuest = guestsData.filter((guest) => {
    return guest.name.toLowerCase().startsWith(event.query.toLowerCase());
  });

  guests.value = filteredGuest.map((guest) => {
    return { id: guest._id, name: guest.name };
  });
};
</script>
