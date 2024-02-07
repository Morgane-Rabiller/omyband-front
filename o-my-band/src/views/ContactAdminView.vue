<template>
    <HeaderComponent />
    <div class="container flex flex-column align-items-center m-5">
        <h1>Nous contacter</h1>
        <img
            src="../assets/img/cat-contact.jpg"
            alt="nous contacter"
            class="text-center"
        />

        <span class="p-float-label mb-3">
            <InputText id="username" v-model="object" class="w-20rem" />
            <label for="username">Objet</label>
        </span>
        <span class="p-float-label">
            <Textarea v-model="text" rows="5" cols="30" class="w-20rem" />
            <label>Message</label>
        </span>
        <Button @click="sendMessage">Envoyer mon message</Button>
    </div>
    <FooterComponent />
</template>

<script>
import FooterComponent from "@/components/FooterComponent.vue";
import HeaderComponent from "@/components/HeaderComponent.vue";
import { contactStore } from "@/stores/contact";

export default {
    name: "HomeView",
    components: {
        HeaderComponent,
        FooterComponent,
    },
    data() {
        return {
            object: "",
            text: "",
            store: contactStore(),
        };
    },
    methods: {
        async sendMessage() {
            try {
                console.log(this.store);
                const response = await this.store.contactAdmin(
                    this.object,
                    this.text
                );
                console.log(response);
            } catch (error) {
                console.error(error, "Non envoyé");
            }
        },
    },
};
</script>
