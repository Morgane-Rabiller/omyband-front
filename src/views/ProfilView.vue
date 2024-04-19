<template>
    <HeaderComponent />
    <ProfilComponent />
    <FooterComponent />
</template>

<script>
import HeaderComponent from "@/components/HeaderComponent.vue";
import ProfilComponent from "@/components/ProfilComponent.vue";
import FooterComponent from "@/components/FooterComponent.vue";

export default {
    name: "ProfilView",
    components: {
        HeaderComponent,
        ProfilComponent,
        FooterComponent,
    },
};
</script>
