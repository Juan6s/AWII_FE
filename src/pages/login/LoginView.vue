<template>
  <div class="flex justify-content-center align-items-center" style="height: 80vh">
    <div class="surface-card p-4 shadow-2 border-round w-full lg:w-5 p-justify-center p-ai-center">
      <div class="text-center mb-5">
        <div class="text-900 text-3xl font-medium mb-3">Bienvenido</div>
        <span class="text-600 font-medium line-height-3">Sin cuenta?</span>
        <a class="font-medium no-underline ml-2 text-blue-500 cursor-pointer"
          ><RouterLink to="/register">Registrate!</RouterLink></a
        >
      </div>

      <div>
        <label for="email" class="block text-900 font-medium mb-2">Email</label>
        <InputText
          :invalid="form.failed"
          id="email"
          v-model="email"
          type="text"
          class="w-full mb-3"
        />

        <label for="password" class="block text-900 font-medium mb-2">Contraseña</label>
        <InputText
          :invalid="form.failed"
          id="password"
          v-model="password"
          type="password"
          class="w-full mb-3"
        />

        <div class="flex align-items-center justify-content-between mb-6">
          <a class="font-medium no-underline ml-2 text-blue-500 text-right cursor-pointer"
            >Olvidaste la contraseña?</a
          >
        </div>
        <Message :closable="false" v-if="form.failed" severity="error">Fallo al ingresar</Message>
        <Button label="Ingresá" icon="pi pi-user" class="w-full" @click="onLoginButton"></Button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { router } from '@/main';
import { login } from '@/services/auth.service';
import { RouterLink } from 'vue-router';
import { ref } from 'vue';
const email = ref('');
const password = ref('');
const form = ref({ failed: false });

const onLoginButton = async () => {
  const { error } = await login(email.value, password.value);
  if (error) {
    errorInForm();
    return;
  }
  router.replace({ path: '/' });
};

const errorInForm = async () => {
  form.value = { failed: true };
  email.value = '';
  password.value = '';

  setTimeout(() => {
    form.value = { failed: false };
  }, 2000);
};
</script>
