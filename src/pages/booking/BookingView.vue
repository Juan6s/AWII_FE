<template>
  <div class="grid">
    <div class="col-12 xl:col-12">
      <div class="card">
        <h5>Reservas</h5>
        <DataTable :value="products" :rows="5" :paginator="true" responsiveLayout="scroll">
          <Column field="name" header="Nombre" :sortable="true" style="width: 15%"></Column>
          <Column field="arrivalDate" header="Ingreso" :sortable="true" style="width: 25%"> </Column>
          <Column field="exitDate" header="Salida" :sortable="true" style="width: 25%"></Column>
          <Column field="houssing" header="Cabaña" :sortable="true" style="width: 25%"> </Column>
          <Column field="guests" header="Inquilinos" :sortable="true" style="width: 10%"></Column>
        </DataTable>
      </div>
    </div>
  </div>
</template>

<script setup></script>
