<template>
    <HeaderComponent />
    <div class="container flex-column align-items-center mt-5">
        <h1>Tu as oublié ton mot de passe ?</h1>
        <p></p>
        <div class="flex flex-column gap-2">
            <label for="username">Rentre ton adresse mail ici</label>
            <InputText
                id="username"
                v-model="value"
                class="w-20rem md:w-30rem"
            />
            <p class="text-red-300 m-0">{{ message }}</p>
            <Button
                type="submit"
                icon="pi pi-sign-in"
                class="submit w-10rem flex align-self-center"
                @click="sendEmail"
                >Envoyer</Button
            >
            <Dialog
                v-model:visible="visible"
                modal
                header="Confirmation ✔"
                :style="{ width: '25rem' }"
            >
            <p>Vérifie ta boite mail, tu as reçu un mail pour changer ton mot de passe.</p>
            </Dialog>
        </div>
    </div>
    <FooterComponent />
</template>

<script>
import { authStore } from "@/stores/auth";
import HeaderComponent from "@/components/HeaderComponent.vue";
import FooterComponent from "@/components/FooterComponent.vue";
import router from "@/router";
// import router from "@/router";

export default {
    name: "PasswordForgot",
    data() {
        return {
            value: "",
            store: authStore(),
            message: "",
            visible: false,
        };
    },
    methods: {
        async sendEmail() {
            try {
                if (this.value !== "") {
                    await this.store.forgotPassword(this.value);
                    this.value = ""
                    this.visible = true;
                    window.setTimeout(() => {
                        this.visible = false;
                        router.push({name: 'connection'});
                    }, 5000);
                } else {
                    this.message = "L'adresse mail est requise";
                    window.setTimeout(() => {
                        this.message = "";
                    }, 3000);
                }
            } catch {
                this.message = "L'adresse mail n'est pas valide";
                window.setTimeout(() => {
                    this.message = "";
                }, 3000);
            }
        },
    },
    components: {
        HeaderComponent,
        FooterComponent,
    },
};
</script>
