<template>
    <div class="container flex flex-column align-items-center">
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
</template>

<script>
import { contactStore } from "@/stores/contact";

export default {
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
                console.log(this.store)
                const response = await this.store.contactAnnouncement(
                    this.$route.params.id,
                    this.object,
                    this.text,
                );

                console.log(response); 
            } catch (error) {
                console.error(error, "Non envoyé");
            }
        },
    },
};
</script>

<style>
.p-inputtext:enabled:hover {
    border-color: #0e8388 !important;
}
.p-inputtext:enabled:focus {
    border-color: #0e8388 !important;
    box-shadow: 0 0 0 0.2rem #addddd !important;
}
</style>
