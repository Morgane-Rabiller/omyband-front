<template>
    <div
        class="container p-fluid card fixed w-full top-0 left-0 flex justify-content-between"
    >
        <router-link to="/" class="no-underline">
            <div
                class="flex flex-initial align-items-start justify-content-start"
            >
                <img
                    src="../assets/img/Omy_band-Logo.png"
                    class="min-w-min md:min-w-max custom-logo"
                    alt="Logo O'my band"
                />
                <h1 class="min-w-min md:min-w-max custom-title">O'MY BAND</h1>
            </div>
        </router-link>
        <div v-if="this.$route.path === '/connection'" class="right-part hidden md:flex mr-5 align-items-center">
            <router-link to="/announcement" class="mr-7 no-underline" style="color: #cbe4de">Voir les annonces</router-link>
            <div>
                <p class="no-account hidden md:flex">
                    Je n'ai pas encore de compte ?
                </p>
                <router-link
                    to="/registration"
                    class="mt-2 hidden md:flex"
                    style="color: #cbe4de"
                >
                    <i class="pi pi-sign-in" />&nbsp; S'inscrire
                </router-link>
            </div>
        </div>
        <div
            v-else-if="this.$route.path === '/registration'"
            class="right-part hidden md:flex mr-5 align-items-center"
        >
            <router-link
                to="/announcement"
                class="mr-7 no-underline"
                style="color: #cbe4de"
                >Voir les annonces</router-link
            >
            <div>
            <p class="no-account hidden md:flex">J'ai déjà un compte ?</p>
            <router-link
                to="/connection"
                class="mt-2 hidden md:flex"
                style="color: #cbe4de"
            >
                <i class="pi pi-sign-in" />&nbsp; Connection
            </router-link>
        </div>
        </div>
        <!-- Si l'utilisateur est connecté il aura toutes les options publier, voir et mes annonces sinon il aura les options ci-après en commentaires
            TODO CONTINUER LES V-ELSE-IF
         -->
        <div
            v-else-if="auth.jwToken"
            class="right-part hidden md:flex mr-5 flex-wrap align-items-center"
        >
            <router-link
                to="/add-announcement"
                class="mr-5 no-underline"
                style="color: #cbe4de"
                >Publier une annonce</router-link
            >
            <router-link
                to="/announcement"
                class="mr-5 no-underline"
                style="color: #cbe4de"
                >Voir les annonces</router-link
            >
            <router-link to="/" class="mr-5 no-underline" style="color: #cbe4de"
                >Mes annonces</router-link
            >
            <i class="profil pi pi-user text-4xl" @click="toggleMenu"></i>
        </div>
        <div
            v-else
            class="right-part hidden md:flex mr-5 flex-wrap align-items-center"
        >
            <router-link
                to="/announcement"
                class="mr-5 no-underline"
                style="color: #cbe4de"
                >Voir les annonces</router-link
            >
            <i class="profil pi pi-user text-4xl" @click="toggleMenu"></i>
        </div>
        <SideBarComponent />
    </div>
    <!-- Si l'utilsateur est connecté il y aura profil et déconnexion, sinon ce sera l'autre -->
    <div v-if="auth.jwToken" :class="elementClass">
        <router-link
            to="/profil"
            class="profil-link p-3 border-bottom-1 border-round-xl"
            >Mon profil</router-link
        >
        <p class="profil-link p-3 border-round-xl m-0" @click="logout"
            >Déconnexion</p>
    </div>
    <div v-else :class="elementClass">
        <router-link
            to="/connection"
            class="profil-link p-3 border-bottom-1 border-round-xl"
            >Se connecter</router-link
        >
        <router-link to="/registration" class="profil-link p-3 border-round-xl"
            >S'inscrire</router-link
        >
    </div>
    <hr class="mt-20" />
</template>

<script>
import { authStore } from "@/stores/auth";
import SideBarComponent from "./SideBarComponent.vue";

export default {
    data() {
        return {
            open: false,
            auth: authStore(),
        };
    },
    components: {
        SideBarComponent,
    },
    computed: {
        elementClass() {
            return {
                "flex profil-links absolute right-0 mr-2 flex-column animation-delay-400 element-transition":
                    this.open,
                hidden: !this.open,
            };
        },
    },
    methods: {
        toggleMenu() {
            this.open = !this.open;
        },
        logout() {
            this.auth.logoutUser();
            this.$router.push('/');
        }
    },
};
</script>

<style scoped>
.container {
    background-color: #161616;
}
.profil-links {
    top: 6rem;
}
.profil-link {
    text-decoration: none;
    color: #161616;
    background-color: #cbe4de;
}
.profil-link:hover {
    background-color: #aad2d3;
}
.profil {
    /* height: 70px;
    width: 50px; */
    color: #cbe4de !important;
}
.custom-title {
    font-family: "Vampiro One", sans-serif;
    color: #0e8388;
    margin-top: 10%;
    font-size: 1.5rem;
}
.custom-logo {
    width: 65px;
    height: 65px;
    margin: 15px 25px 0 15px;
}
.right-part > p {
    margin: 0;
}
.no-account {
    font-size: 0.7rem;
}
.mt-20 {
    margin-top: 6rem !important;
}

@media screen and (min-width: 768px) {
    .mt-20 {
        margin-top: 8rem !important;
    }
    .custom-logo {
        width: 6rem;
        height: 6rem;
        margin: 1.2rem 2rem 0 2rem;
    }
    .custom-title {
        font-family: "Vampiro One", sans-serif;
        color: #0e8388;
        margin-top: 2rem;
        font-size: 3rem;
    }
}
</style>
