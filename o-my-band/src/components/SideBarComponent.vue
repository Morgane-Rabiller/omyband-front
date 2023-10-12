<template>
    <Sidebar v-model:visible="visible" style="background-color: #cbe4de;">
        <h3 class="mb-4">Menu de navigation</h3>

        <!-- Si utilisateur non connecté -->
        <!-- <div class="flex flex-wrap align-items-center">
            <i class="profil pi pi-user text-4xl"></i>
            <div class="flex flex-column ml-3">
                <router-link to="/connection" class="no-underline text-black-alpha-90">Connexion /</router-link>
                <router-link to="/registration" class="no-underline text-black-alpha-90">Inscription</router-link>
            </div>
        </div>
        <hr class="border-gray-600 w-9 mt-5">
        <div class="mt-5 flex flex-column">
            <router-link to="/" class="no-underline text-black-alpha-90 mb-3"><span class="material-symbols-outlined mr-2"> quick_reference_all
                </span>Voir les annonces</router-link>
        </div> -->

        <!-- Si utilisateur connecté -->
        <div class="flex flex-column">
            <div>
                <i class="profil pi pi-user text-4xl"></i>
                <router-link to="/connection" class="no-underline text-black-alpha-90 ml-3">Mon profil</router-link>
            </div>
            <router-link to="/registration" class="no-underline text-black-alpha-90 mt-2">Déconnection</router-link>
        </div>
        <hr class="border-gray-600 w-9 mt-5">
        <div class="mt-5 flex flex-column">
            <router-link to="/add-announcement" class="no-underline text-black-alpha-90 mb-3"><span class="material-symbols-outlined mr-2"> publish </span>
                 Publier une annonce</router-link>
            <router-link to="/announcement" class="no-underline text-black-alpha-90 mb-3"><span class="material-symbols-outlined mr-2"> quick_reference_all
                </span>Voir les annonces</router-link>
            <router-link to="/" class="no-underline text-black-alpha-90 mb-3"><span class="material-symbols-outlined mr-2"> article </span>Mes annonces</router-link>
        </div>
    </Sidebar>
    <Button
        class="custom-burger flex md:hidden justify-content-center border-none w-3rem h-3rem mr-3"
        @click="visible = true"
    >
        <i class="pi pi-align-justify text-2xl custom-icon"> </i>
    </Button>
</template>

<script>
export default {
    data() {
        return {
            visible: false,
        };
    },
};
</script>

<style scoped>
.custom-icon {
    color: #cbe4de;
}
</style>
