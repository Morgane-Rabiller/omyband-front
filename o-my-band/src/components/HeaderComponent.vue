<template>
    <div class="card flex justify-content-between">
        <div class="flex flex-wrap">
            <img src="../assets/img/Omy_band-Logo.png"  class="custom-logo" alt="Logo O'my band">
            <h1 class="custom-title">O'MY BAND</h1>
        </div>
        <Sidebar v-model:visible="visible">
            <h2>Sidebar</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
        </Sidebar>
        <Button class="custom-burger" @click="visible = true">
            <i class="pi pi-align-justify custom-icon">
            </i>
        </Button>
    </div>
    <hr>
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
    height: 60px;
    margin: 15px 15px 0 0;
}
.custom-icon {
    font-size: 1.5rem;
    color: #CBE4DE;
}
.custom-title {
    font-family: 'Vampiro One', sans-serif;
    color: #0E8388;
    margin-top: 30px;
}
.custom-logo {
    width: 65px;
    height: 65px;
    margin: 15px 25px 0 15px
}

</style>