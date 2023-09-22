import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import PrimeVue from 'primevue/config';
import "primevue/resources/themes/lara-light-indigo/theme.css";
import "primeicons/primeicons.css";
import Sidebar from 'primevue/sidebar';
import InputText from 'primevue/inputtext';
import Password from 'primevue/password';
import Button from 'primevue/button';
import Dropdown from 'primevue/dropdown';
import Checkbox from 'primevue/checkbox';
import { createPinia } from 'pinia'
// import "tailwind.config";

const pinia = createPinia();

createApp(App)
.use(router)
.use(PrimeVue)
.use(pinia)
.component('Button', Button)
.component('Dropdown', Dropdown)
.component('Checkbox', Checkbox)
.component('Sidebar', Sidebar)
.component('InputText', InputText)
.component('Password', Password)
.mount('#app')