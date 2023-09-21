<template>
  <HeaderComponent />
  <ConnectionComponent />
</template>

<script>
import ConnectionComponent from '@/components/ConnectionComponent.vue';
import HeaderComponent from '@/components/HeaderComponent.vue';

export default {
name: 'ConnectionView',
components: {
  ConnectionComponent,
  HeaderComponent
}
}
</script>