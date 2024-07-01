<template>
  <div class="flex justify-content-center align-items-center" style="height: 80vh">
    <div class="surface-card p-4 shadow-2 border-round w-full lg:w-5 p-justify-center p-ai-center">
      <div class="text-center mb-5">
        <div class="text-900 text-3xl font-medium mb-3">Bienvenido, Registrate!</div>
        <span class="text-600 font-medium line-height-3">Ya tenes cuenta? </span>
        <a class="font-medium no-underline ml-2 text-blue-500 cursor-pointer">
          <RouterLink to="/login">Ingresá!</RouterLink></a
        >
      </div>

      <div>
        <label for="email" class="block text-900 font-medium mb-2">Email</label>
        <InputText id="email" v-model="email" type="text" class="w-full mb-3" />

        <label for="password" class="block text-900 font-medium mb-2">Contraseña</label>
        <InputText id="password" v-model="password" type="password" class="w-full mb-3" />

        <label for="passwordCheck" class="block text-900 font-medium mb-2"
          >Repeti la contraseña</label
        >
        <InputText id="passwordCheck" v-model="passwordCheck" type="password" class="w-full mb-3" />

        <Button
          label="Registrate"
          icon="pi pi-user"
          class="w-full"
          @click="onRegisterButton"
        ></Button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { redirect } from '@/router';
import { RouterLink } from 'vue-router';
import { login, register } from '@/services/auth.service';
import { ref } from 'vue';
import { PATHS } from "@/router"

const email = ref('');
const password = ref('');
const passwordCheck = ref();

const onRegisterButton = async () => {
  if (password.value !== passwordCheck.value) {
    return;
  }
  await register(email.value, password.value);
  await login(email.value, password.value);
  redirect(PATHS.ROUTE_HOME);
};
</script>
