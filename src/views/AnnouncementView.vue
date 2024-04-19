<template>
    <HeaderComponent />
    <AnnouncementComponent />
    <FooterComponent />
  </template>
  
  <script>
  import AnnouncementComponent from '@/components/AnnouncementComponent.vue';
  import FooterComponent from '@/components/FooterComponent.vue';
  import HeaderComponent from '@/components/HeaderComponent.vue';
  
  export default {
  name: 'AnnouncementView',
  components: {
      AnnouncementComponent,
      HeaderComponent,
      FooterComponent
  }
  }
  </script>