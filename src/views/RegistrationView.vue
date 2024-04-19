<template>
    <HeaderComponent />
    <RegistrationComponent />
    <FooterComponent />
  </template>
  
<script>
import RegistrationComponent from '@/components/RegistrationComponent.vue';
import FooterComponent from '@/components/FooterComponent.vue';
import HeaderComponent from '@/components/HeaderComponent.vue';

export default {
name: 'RegistrationView',
components: {
    RegistrationComponent,
    HeaderComponent,
    FooterComponent
}
}
</script>