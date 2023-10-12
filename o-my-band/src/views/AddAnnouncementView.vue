<template>
    <HeaderComponent />
    <AddAnnouncementComponent />
    <FooterComponent />
  </template>
  
  <script>
  import AddAnnouncementComponent from '@/components/AddAnnouncementComponent.vue';
  import FooterComponent from '@/components/FooterComponent.vue';
  import HeaderComponent from '@/components/HeaderComponent.vue';
  
  export default {
  name: 'AnnouncementView',
  components: {
      AddAnnouncementComponent,
      HeaderComponent,
      FooterComponent
  }
  }
  </script>