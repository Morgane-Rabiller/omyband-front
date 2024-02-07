<template>
    <HeaderComponent />
    <FooterComponent />
  </template>
  
  <script>
  import FooterComponent from '@/components/FooterComponent.vue';
  import HeaderComponent from '@/components/HeaderComponent.vue';
  
  export default {
  name: 'HomeView',
  components: {
      HeaderComponent,
      FooterComponent
  }
  }
  </script>