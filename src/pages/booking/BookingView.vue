<template>
  <div class="grid">
    <div class="col-12 xl:col-12">
      <div class="card">
        <h5>Reservas</h5>
        <DataTable :value="bookings" removableSort  :rows="5" :paginator="true" responsiveLayout="scroll">
          <Column
            field="guestName"
            header="Nombre de rWeservista"
            :sortable="true"
            style="width: 15%"
          ></Column>
          <Column field="admissionDate" header="Ingreso" :sortable="true" style="width: 25%">
          </Column>
          <Column field="exitDate" header="Salida" :sortable="true" style="width: 25%"></Column>
          <Column field="housingName" header="Cabaña" :sortable="true" style="width: 25%"> </Column>
          <Column field="numberGuests" header="Inquilinos" :sortable="true" style="width: 10%"></Column>
        </DataTable>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { getBookingData } from '../../services/booking.service.js';
import { getGuestData } from '../../services/guest.service.js';
import { getHousingData } from '../../services/housing.service.js';

onMounted(() => {
  mapData().then((data) => (bookings.value = data));
});

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

const bookings = ref();
</script>
