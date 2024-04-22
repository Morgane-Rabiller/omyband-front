<template>
    <div class="container flex flex-column align-items-center mb-8">
        <div
            class="card my-7 mx-5 py-2 px-5"
            style="background-color: #cbe4de; border: 0.5rem solid #0e8388"
        >
            <h2 class="text-xl mb-5 md:text-2xl">Votre profil O'my band</h2>
            <div class="md:flex justify-content-between">
                <div class="md:w-30rem mr-8 text-sm md:text-base">
                    <div class="flex flex-wrap">
                        <img
                            class="avatar w-2rem mr-4"
                            src="../assets/img/user-icon.png"
                            alt="avatar"
                        />
                        <div class="flex flex-column mb-3">
                            <p class="font-semibold m-0">{{ user.pseudo }}</p>
                            <p class="font-semibold m-0 text-xs">
                                {{ user.email }}
                            </p>
                        </div>
                    </div>
                    <Button
                        class="m-0 p-0"
                        label="Modifier mon mot de passe"
                        link
                        icon="pi pi-lock"
                        @click="visibleEditPassword = true"
                    />
                    <Dialog
                        v-model:visible="visibleEditPassword"
                        modal
                        header="Modifier mon mot de passe"
                    >
                        <EditPasswordComponent
                            @password-changed-successfully="
                                handlePasswordChangeSuccess
                            "
                        />
                    </Dialog>
                    <p>{{ user.location }}</p>
                    <p class="font-bold">Instrument(s) :</p>
                    <div
                        v-for="instrument in user.instruments"
                        :key="instrument.id"
                    >
                        <p>- {{ instrument.name }}</p>
                    </div>
                    <p v-if="user.instruments.length === 0">
                        Vous n'avez pas sélectionné d'instruments
                    </p>
                    <p>{{ user.styles }}</p>
                    <p class="font-bold">Description :</p>
                    <p v-if="user.description">{{ user.description }}</p>
                    <p v-else>Vous n'avez pas de description</p>
                </div>
                <hr class="my-5 md:hidden" />
                <div
                    class="hidden md:flex h-20rem surface-hover mb-6"
                    style="width: 0.3rem; background-color: #0e8388 !important"
                ></div>
                <div
                    class="flex flex-column align-items-center md:ml-8 text-base"
                >
                    <p class="font-semibold">Mes annonces</p>
                    <Button class="my-2" @click="myannouncements">Lien vers mes annonces</Button>
                </div>
            </div>
            <div class="flex justify-content-end">
                <Button
                    class=""
                    label="Modifier mon profil"
                    link
                    icon="pi pi-user-edit"
                    @click="visibleEditProfil = true"
                />
                <Dialog
                    v-model:visible="visibleEditProfil"
                    modal
                    header="Modifier mon profil"
                >
                    <EditProfilComponent @edit-profil-successfully="handleEditProfilSuccessfull" />
                </Dialog>
                <Button
                    class="text-red-700"
                    label="Supprimer mon profil"
                    link
                    icon="pi pi-trash"
                    @click="visibleDeleteProfil = true"
                />
                <Dialog
                    v-model:visible="visibleDeleteProfil"
                    modal
                    header="Supprimer mon profil 🗑"
                >
                    <DeleteProfilComponent :userId="userId" :token="token" :visible="visibleDeleteProfil" @deletion-cancelled="handleDelationCancelled"/>
                </Dialog>
            </div>
        </div>
    </div>
</template>

<script>
import { authStore } from "@/stores/auth";
import cookiesStorage from "@/services/cookie";
import EditProfilComponent from "./EditProfilComponent.vue";
import EditPasswordComponent from "./EditPasswordComponent.vue";
import DeleteProfilComponent from "./DeleteProfilComponent.vue";
import router from "@/router";

export default {
    data() {
        return {
            auth: authStore(),
            user: {
                pseudo: "",
                email: "",
                instruments: "",
                styles: "",
                description: "",
                announcement: "",
            },
            token: cookiesStorage.getItem(),
            visibleEditProfil: false,
            visibleDeleteProfil: false,
            visibleEditPassword: false,
            userId: null,
        };
    },
    async created() {
        this.user = await this.auth.fetchProfil(this.token);
        this.userId = this.user.user_id;
        console.log(this.userId);
    },
    methods: {
        handleEditProfilSuccessfull() {
            this.visibleEditProfil = false;
        },
        handlePasswordChangeSuccess() {
            this.visibleEditPassword = false;
        },
        handleDelationCancelled() {
            this.visibleDeleteProfil = false;
        },
        myannouncements() {
            router.push({ name: "myAnnouncement" });
        }
    },
    components: {
        EditProfilComponent,
        EditPasswordComponent,
        DeleteProfilComponent
    },
};
</script>

<style scoped>
* {
    color: #161616;
}

.p-button.p-button-link {
    color: #0e8388;
    background-color: transparent !important;
    border: transparent !important;
    font-family: "Montserrat", sans-serif;
}
.p-button.p-button-link:enabled:hover {
    background: transparent !important;
    color: #0e8388;
    border: transparent !important;
}
.p-button.p-button-link:enabled:focus {
    background: transparent;
    box-shadow: none;
    border-color: transparent;
}
</style>
