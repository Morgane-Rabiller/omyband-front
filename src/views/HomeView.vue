<template>
    <HeaderComponent />
    <HomeComponent />
    <FooterComponent />
  </template>
  
  <script>
  import HomeComponent from '@/components/HomeComponent.vue';
  import FooterComponent from '@/components/FooterComponent.vue';
  import HeaderComponent from '@/components/HeaderComponent.vue';
  
  export default {
  name: 'HomeView',
  components: {
      HomeComponent,
      HeaderComponent,
      FooterComponent
  }
  }
  </script>