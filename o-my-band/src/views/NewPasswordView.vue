<template>
    <HeaderComponent />
    <div class="container flex-column align-items-center mt-5">
        <h1>Nouveau mot de passe</h1>
        <p class="mt-0 mb-6">Tu peux maintenant renouveler ton mot de passe.</p>
        <div class="card flex flex-column mb-5">
            <label class="mb-2" for="password1">Mot de passe*</label>
            <Password inputId="password1" v-model="password1" toggleMask />
        </div>
        <div class="card flex flex-column">
            <label class="mb-2" for="password2"
                >Confirmation du mot de passe*</label
            >
            <Password inputId="password2" v-model="password2" toggleMask />
        </div>
        <p class="text-red-300 mb-0 flex">{{ errorMessage }}</p>
        <Button type="submit" @click="registerPassword">Enregistrer</Button>
        <Dialog
            v-model:visible="visible"
            modal
            header="Enregistré ✔"
            :style="{ width: '25rem' }"
        >
            <p>
                Ton nouveau mot de passe est bien enregistré, tu as être
                redirigé vers la page de connection. 😉
            </p>
        </Dialog>
    </div>
    <FooterComponent />
</template>

<script>
import { authStore } from "@/stores/auth";
import HeaderComponent from "@/components/HeaderComponent.vue";
import FooterComponent from "@/components/FooterComponent.vue";
import router from "@/router";

export default {
    name: "NewPasswordView",
    data() {
        return {
            password1: null,
            password2: null,
            store: authStore(),
            errorMessage: "",
            visible: false,
        };
    },
    methods: {
        async registerPassword() {
            const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,}$/;
            try {
                if (!this.password1 || !this.password2) {
                    this.errorMessage =
                        "Champ(s) vide(s), il faut remplir les deux champs";
                    window.setTimeout(() => {
                        this.errorMessage = "";
                    }, 3000);
                } else if (this.password1 !== this.password2) {
                    this.errorMessage =
                        "Les mots de passe ne correspondent pas ";
                    window.setTimeout(() => {
                        this.errorMessage = "";
                    }, 3000);
                } else if (!passwordRegex.test(this.password1) || !passwordRegex.test(this.password2)) {
                    this.errorMessage =
                        "Ton mot de passe doit comporter minimum 8 caractères dont une minuscule, une majuscule et un chiffre";
                    window.setTimeout(() => {
                        this.errorMessage = "";
                    }, 3000);
                } else {
                    await this.store.newPassword(this.$route.params.id, this.password2);
                    this.value = "";
                    this.visible = true;
                    window.setTimeout(() => {
                        this.visible = false;
                        router.push({ name: "connection" });
                    }, 5000);
                    console.log("reussie");
                }
            } catch (error) {
                console.log(error);

                this.errorMessage ="Une erreur s'est produite, réessai ultérieurement ou contacte nous";
                window.setTimeout(() => {
                    this.errorMessage = "";
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
