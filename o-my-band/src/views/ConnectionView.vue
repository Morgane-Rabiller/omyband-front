<template>
    <ConnectionComponent></ConnectionComponent>
    
    <div class="card flex justify-content-center">
        <Button label="Check" icon="pi pi-align-justify" />
    </div>
</template>

<script>
import ConnectionComponent from '@/components/ConnectionComponent.vue';

export default {
  name: 'ConnectionView',
  components: {
    ConnectionComponent
  }
}
</script>