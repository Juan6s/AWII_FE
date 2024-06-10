<script setup></script>

<template>
  <div class="card flex justify-content-center">
    <Button label="Submit" />
    <Calendar v-model="dates" selectionMode="range" :manualInput="false" />
  </div>
</template>

<style scoped></style>
