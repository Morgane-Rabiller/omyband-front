<template>
    <div
        class="container card fixed w-full top-0 left-0 flex border-bottom-1 justify-content-between"
    >
        <div class="flex flex-initial align-items-start justify-content-start">
            <img
                src="../assets/img/Omy_band-Logo.png"
                class="min-w-min md:min-w-max custom-logo"
                alt="Logo O'my band"
            />
            <h1 class="min-w-min md:min-w-max custom-title">O'MY BAND</h1>
        </div>
        <div
            class="right-part hidden md:flex mt-6 mr-5 flex-column align-items-end"
        >
            <p class="no-account hidden md:flex">
                Je n'ai pas encore de compte ?
            </p>
            <p class="mt-2 hidden md:flex">
                <i class="pi pi-sign-in" />&nbsp; S'inscrire
            </p>
        </div>
        <Sidebar v-model:visible="visible">
            <h2>Sidebar</h2>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.
            </p>
        </Sidebar>
        <Button
            class="custom-burger flex md:hidden justify-content-center"
            @click="visible = true"
        >
            <i class="pi pi-align-justify custom-icon"> </i>
        </Button>
    </div>
        <hr
            class="mt-20"
        />
</template>

<script setup>
import { ref } from "vue";

const visible = ref(false);
</script>

<style scoped>
.custom-burger {
    background-color: #161616;
    border: none;
    color: #0e8388;
    height: 2.7rem;
    width: 2.7rem;
    margin: 25px 15px 0 0;
}
.custom-icon {
    font-size: 1.5rem;
    color: #cbe4de;
}
.custom-title {
    font-family: "Vampiro One", sans-serif;
    color: #0e8388;
    margin-top: 10%;
    font-size: 1.5rem;
}
.custom-logo {
    width: 65px;
    height: 65px;
    margin: 15px 25px 0 15px;
}

.right-part > p {
    margin: 0;
}
.no-account {
    font-size: 0.7rem;
}
.mt-20 {
    margin-top: 6rem !important;
}

@media screen and (min-width: 768px) {
    .mt-20 {
        margin-top: 8rem !important;
    }
    .custom-logo {
        width: 6rem;
        height: 6rem;
        margin: 1.2rem 2rem 0 2rem;
    }
    .custom-title {
        font-family: "Vampiro One", sans-serif;
        color: #0e8388;
        margin-top: 2rem;
        font-size: 3rem;
    }
}
</style>
