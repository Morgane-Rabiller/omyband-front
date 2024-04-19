<template>
    <div v-if="visible">
        <p>Es-tu sûr de vouloir supprimer ton profil ?</p>
        <p class="m-0 p-0 text-red-700">{{ errorMessage }}</p>
        <div class="flex justify-content-around">
            <Button class="mr-5" @click="deleteProfil">Confirmer</Button>
            <Dialog v-model:visible="deletedAccount"
                    modal
                    header="Compte supprimé 🗑">
                <p>Ton compte a bien été supprimé ! ✔</p>
            </Dialog>
            <Button @click="cancel">Annuler</Button>
        </div>
    </div>
</template>

<script>
import router from '@/router';
import { authStore } from '@/stores/auth';

export default {
    data() {
        return {
            store: authStore(),
            errorMessage: "",
            deletedAccount: false,
        };
    },
    methods: {
        cancel() {
            this.$emit("deletion-cancelled");
        },
        async deleteProfil() {
            try {
                await this.store.deleteProfil(this.userId, this.token);
                this.deletedAccount = true;
                window.setTimeout(async() => {
                    this.deletedAccount = false;
                    await this.store.logoutUser();
                    router.push("/connection");
                }, 2000);
            } catch (error) {
                console.log(error);
                console.log(error.response.data.message);
                this.errorMessage = "Tu n'as pas l'autorisation de supprimer ce compte, tu peux nous contacter pour plus de renseignement";
                window.setTimeout(() => {
                    this.errorMessage = "";
                }, 3000)
            }
        }
    },
    props: {
        userId: {
            type: Number,
            required: true,
        },
        visible: {
            type: Boolean,
            required: true,
        },
        token: {
            type: String,
            required: true,
        }
    },
    emits: ["deletion-cancelled"],
};
</script>
