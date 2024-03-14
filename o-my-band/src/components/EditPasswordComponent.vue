<template>
    <form @submit.prevent="updatePassword">
        <span class="flex flex-column mt-4">
            <label class="mb-1" for="password">Ancien mot de passe</label>
            <Password v-model="password" inputId="password" toggleMask />
        </span>
        <span class="flex flex-column mt-4">
            <label class="mb-1" for="password">Nouveau mot de passe</label>
            <Password v-model="newPassword" inputId="newPassword" toggleMask />
        </span>
        <span class="flex flex-column mt-4">
            <label class="mb-1" for="password"
                >Confirmation du nouveau mot de passe</label
            >
            <Password
                v-model="newPasswordRepeat"
                inputId="newPasswordRepeat"
                toggleMask
            />
        </span>
        <p class="m-0 text-red-600">{{ echecMessage }}</p>
        <Button
            type="submit"
            label="Enregistrer"
            icon="pi pi-check"
            @click="updatePassword"
        ></Button>
        <Dialog
            v-model:visible="visible"
            modal
            header="Réussie"
        >
        <p>{{ successMessage }}</p>
        </Dialog>
    </form>
</template>

<script>
import cookiesStorage from "@/services/cookie";
import { authStore } from "@/stores/auth";

export default {
    data() {
        return {
            password: "",
            newPassword: "",
            newPasswordRepeat: "",
            userId: "",
            store: authStore(),
            token: cookiesStorage.getItem(),
            echecMessage: "",
            successMessage: "",
            visible: false,
        };
    },
    async created() {
        const profil = await this.store.getFetchProfil();
        this.userId = profil.user_id;
    },
    methods: {
        async updatePassword() {
            try {
                const response = await this.store.setPassword(
                    this.userId,
                    this.token,
                    {
                        password: this.password,
                        newPassword: this.newPassword,
                        newPasswordRepeat: this.newPasswordRepeat,
                    }
                );
                this.visible = true;
                this.successMessage = response.data.message;
                this.password = "",
                this.newPassword = "",
                this.newPasswordRepeat = "",
                window.setTimeout(() => {
                    this.successMessage = "";
                    this.visible = false;
                    this.$emit('password-changed-successfully');
                }, 3000);
            } catch (error) {
                this.echecMessage = error.response.data.message;
                window.setTimeout(() => {
                    this.message = "";
                }, 5000);
            }
        },
    },
};
</script>
