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
import Textarea from 'primevue/textarea';
import Message from 'primevue/message';
import Carousel from 'primevue/carousel';
import InlineMessage from 'primevue/inlinemessage';
import MultiSelect from 'primevue/multiselect';

import Tag from 'primevue/tag';

import { createPinia } from 'pinia'
// import "tailwind.config";

const pinia = createPinia();

createApp(App)
.use(router)
.use(PrimeVue)
.use(pinia)
.component('Button', Button)
.component('Carousel', Carousel)
.component('Dropdown', Dropdown)
.component('Checkbox', Checkbox)
.component('Sidebar', Sidebar)
.component('InputText', InputText)
.component('Password', Password)
.component('Textarea', Textarea)
.component('Message', Message)
.component('InlineMessage', InlineMessage)
.component('Tag', Tag)
.component('MultiSelect', MultiSelect)
.mount('#app')