<template>
    <div class="flex justify-content-center align-items-center" style="height: 80vh;">
        <div class="surface-card p-4 shadow-2 border-round w-full lg:w-5 p-justify-center p-ai-center">
            <div class="text-center mb-5">
                <div class="text-900 text-3xl font-medium mb-3">Bienvenido</div>
                <span class="text-600 font-medium line-height-3">Sin cuenta?</span>
                <a class="font-medium no-underline ml-2 text-blue-500 cursor-pointer">Registrate!</a>
            </div>

            <div>
                <label for="email1" class="block text-900 font-medium mb-2">Email</label>
                <InputText id="email1" type="text" class="w-full mb-3" />

                <label for="password1" class="block text-900 font-medium mb-2">Contraseña</label>
                <InputText id="password1" type="password" class="w-full mb-3" />

                <div class="flex align-items-center justify-content-between mb-6">
                    <a class="font-medium no-underline ml-2 text-blue-500 text-right cursor-pointer">Olvidaste la
                        contraseña?</a>
                </div>

                <Button label="Sign In" icon="pi pi-user" class="w-full"></Button>
            </div>
        </div>
    </div>
</template>

<script>
</script>
