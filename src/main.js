/* eslint-disable vue/no-reserved-component-names */
/* eslint-disable vue/multi-word-component-names */

import { createApp } from 'vue'
import { router } from './router'

import App from './App.vue'
import PrimeVue from 'primevue/config'
import Button from 'primevue/button'
import Calendar from 'primevue/calendar'
import Toolbar from 'primevue/toolbar'
import TabMenu from 'primevue/tabmenu'

import 'primevue/resources/themes/aura-light-green/theme.css'
import 'primeicons/primeicons.css'

const app = createApp(App)

app.use(PrimeVue)
app.use(router)

app.component('Button', Button)
app.component('Calendar', Calendar)
app.component('Toolbar', Toolbar)
app.component('TabMenu', TabMenu)


app.mount('#app')
