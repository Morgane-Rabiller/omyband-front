<template>
    <HeaderComponent />
    <h1 class="text-center text-8xl">404</h1>
    <p class="text-center">Tu as dû te tromper de route !</p>
    <FooterComponent />
</template>

<script>
import FooterComponent from "@/components/FooterComponent.vue";
import HeaderComponent from "@/components/HeaderComponent.vue";

export default {
    name: "HomeView",
    components: {
        HeaderComponent,
        FooterComponent,
    },
};
</script>
