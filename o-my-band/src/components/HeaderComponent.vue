<template>
    <div class="card flex justify-content-center">
        <Sidebar v-model:visible="visible">
            <h2>Sidebar</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
        </Sidebar>
        <Button class="custom-burger" @click="visible = true">
            <i class="pi pi-align-justify custom-icon">
            </i>
        </Button>
        <p>bonjour</p>
    </div>
</template>

<script setup>
import { ref } from "vue";

const visible = ref(false);
</script>

<style scoped>
.custom-burger {
    background-color: #161616;
    border: none;
    color: #0E8388;
}
.custom-icon {
    font-size: 1.5rem;
}
</style>