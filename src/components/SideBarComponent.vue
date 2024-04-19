<template>
    <Sidebar v-model:visible="visible" style="background-color: #cbe4de">
        <h3 class="mb-4">Menu de navigation</h3>
        <div v-if="token">
            <div class="flex flex-column">
                <div>
                    <i class="profil pi pi-user text-4xl"></i>
                    <router-link
                        to="/profil"
                        class="no-underline text-black-alpha-90 ml-3"
                        >Mon profil</router-link
                    >
                </div>
                
        <p class="m-0 cursor-pointer" @click="logout"
            >Déconnexion</p>
            </div>
            <hr class="border-gray-600 w-9 mt-5" />
            <div class="mt-5 flex flex-column">
                <router-link
                    to="/add-announcement"
                    class="no-underline text-black-alpha-90 mb-3"
                    ><span class="material-symbols-outlined mr-2">
                        publish
                    </span>
                    Publier une annonce</router-link
                >
                <router-link
                    to="/announcement"
                    class="no-underline text-black-alpha-90 mb-3"
                    ><span class="material-symbols-outlined mr-2">
                        quick_reference_all </span
                    >Voir les annonces</router-link
                >
                <router-link
                    to="/myannouncements"
                    class="no-underline text-black-alpha-90 mb-3"
                    ><span class="material-symbols-outlined mr-2">
                        article </span
                    >Mes annonces</router-link
                >
            </div>
        </div>
        <div class="z-1" v-else>
            <div class="flex flex-wrap align-items-center">
                <i class="profil pi pi-user text-4xl"></i>
                <div class="flex flex-column ml-3">
                    <router-link
                        to="/connection"
                        class="no-underline text-black-alpha-90"
                        >Connexion /</router-link
                    >
                    <router-link
                        to="/registration"
                        class="no-underline text-black-alpha-90"
                        >Inscription</router-link
                    >
                </div>
            </div>
            <hr class="border-gray-600 w-9 mt-5" />
            <div class="mt-5 flex flex-column">
                <router-link
                    to="/"
                    class="no-underline text-black-alpha-90 mb-3"
                    ><span class="material-symbols-outlined mr-2">
                        quick_reference_all </span
                    >Voir les annonces</router-link
                >
            </div>
        </div>
    </Sidebar>
    <Button
        class="custom-burger flex lg:hidden justify-content-center border-none w-3rem h-3rem mr-3"
        @click="visible = true"
    >
        <i class="pi pi-align-justify text-2xl custom-icon"> </i>
    </Button>
</template>

<script>
import { authStore } from "@/stores/auth";
import cookiesStorage from "@/services/cookie";

export default {
    data() {
        return {
            visible: false,
            auth: authStore(),
            token: cookiesStorage.getItem()
        };
    },
    methods: {
        logout() {
            this.auth.logoutUser();
            this.$router.push('/');
        }
    },
};
</script>

<style scoped>
.custom-icon {
    color: #cbe4de;
}
</style>
