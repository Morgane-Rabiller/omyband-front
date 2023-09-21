<template>
  <HeaderComponent />
  <ConnectionComponent />
  <FooterComponent />
</template>

<script>
import ConnectionComponent from '@/components/ConnectionComponent.vue';
import FooterComponent from '@/components/FooterComponent.vue';
import HeaderComponent from '@/components/HeaderComponent.vue';

export default {
name: 'ConnectionView',
components: {
    ConnectionComponent,
    HeaderComponent,
    FooterComponent
}
}
</script>