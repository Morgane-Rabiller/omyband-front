<template>
    <div
        class="container card fixed w-full top-0 left-0 flex justify-content-between"
    >
        <div class="flex flex-initial align-items-start justify-content-start">
            <img
                src="../assets/img/Omy_band-Logo.png"
                class="min-w-min md:min-w-max custom-logo"
                alt="Logo O'my band"
            />
            <h1 class="min-w-min md:min-w-max custom-title">O'MY BAND</h1>
        </div>
        <div
            v-if="this.$route.path === '/connection'"
            class="right-part hidden md:flex mt-6 mr-5 flex-column align-items-end"
        >
            <p class="no-account hidden md:flex">
                Je n'ai pas encore de compte ?
            </p>
            <router-link to="/registration" class="mt-2 hidden md:flex">
                <i class="pi pi-sign-in" />&nbsp; S'inscrire
            </router-link>
        </div>
        <div
            v-else-if="this.$route.path === '/registration'"
            class="right-part hidden md:flex mt-6 mr-5 flex-column align-items-end"
        >
            <p class="no-account hidden md:flex">J'ai déjà un compte ?</p>
            <router-link to="/connection" class="mt-2 hidden md:flex">
                <i class="pi pi-sign-in" />&nbsp; Connection
            </router-link>
        </div>
        <div
            v-else
            class="right-part hidden md:flex mr-5 flex-wrap align-items-center"
        >
            <p class="mr-5">Publier une annonce</p>
            <p class="mr-5">Voir les annonces</p>
            <p class="mr-5">Mes annonces</p>
            <i class="profil pi pi-user text-4xl" @click="toggleMenu"></i>
        </div>
        <Sidebar v-model:visible="visible">
            <h2>Sidebar</h2>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.
            </p>
        </Sidebar>
        <Button
            class="custom-burger flex md:hidden justify-content-center"
            @click="visible = true"
        >
            <i class="pi pi-align-justify custom-icon"> </i>
        </Button>
    </div>
    <div :class="elementClass" class="element-transition">
        <router-link to="/" class="profil-link p-3 border-bottom-1 border-round-xl">Mon profil</router-link> 
        <router-link to="/" class="profil-link p-3 border-round-xl">Déconnexion</router-link> 
    </div>
    <hr class="mt-20" />
</template>

<script>
export default {
    data() {
        return {
            visible: false,
            open: false,
        };
    },
    computed: {
        elementClass() {
            return {
                "flex profil-links absolute right-0 mr-2 flex-column animation-delay-400 element-transition": this.open,
                "hidden": !this.open
            }
        }
    },
    methods: {
        toggleMenu() {
            this.open = !this.open;
        },
    },
};
</script>

<style scoped>
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
.custom-burger {
    background-color: #161616;
    border: none;
    color: #0e8388;
    height: 2.7rem;
    width: 2.7rem;
    margin: 25px 15px 0 0;
}
.custom-icon {
    font-size: 1.5rem;
    color: #cbe4de;
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
