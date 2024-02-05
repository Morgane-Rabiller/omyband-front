<template>
  <HeaderComponent />
  <div class="container">
  </div>
  <FooterComponent />
</template>

<script>
import FooterComponent from "@/components/FooterComponent.vue";
import HeaderComponent from "@/components/HeaderComponent.vue";
import  { authStore } from "@/stores/auth.js"

export default {
  name: "HomeView",
  components: {
    HeaderComponent,
    FooterComponent,
  },
    data() {
        return {
            announcements: {},
            store: authStore(),
        };
    },
    async created() {
        const user = await this.store.fetchProfil(this.store.jwToken);
        this.announcements = user.announcements;
        console.log(this.announcements);
    },
};
</script>
