import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import PrimeVue from 'primevue/config';
import "primevue/resources/themes/lara-light-indigo/theme.css";
import "primeicons/primeicons.css";
import Sidebar from 'primevue/sidebar';
import Button from 'primevue/button';

createApp(App)
.use(router)
.use(PrimeVue)
.component('Button', Button)
.component('Sidebar', Sidebar)
.mount('#app')