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
                            <p class="font-semibold m-0 text-xs">{{ user.email }}</p>
                        </div>
                    </div>
                    <p>{{ user.location }}</p>
                    <p class="font-bold">Instrument(s) :</p>
                    <div v-for="instrument in user.instruments" :key="instrument.id">
                        <p>- {{ instrument.name }}</p>
                    </div>
                    <p v-if="user.instruments.length === 0">Vous n'avez pas sélectionné d'instruments</p>
                    <p>{{ user.styles }}</p>
                    <p class="font-bold"> Description :</p>
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
                    <p class="font-semibold">Ma dernière annonce</p>
                    <Button class="my-2">Lien vers la dernière annonce</Button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { authStore } from '@/stores/auth';

export default {
    data() {
        return {
            auth: authStore(),
            user: {
                pseudo: '',
                email: '',
                instruments: '',
                styles: '',
                description: '',
                announcement: ''
            }
        }
    },
    async created() {
        this.user = await this.auth.fetchProfil(this.auth.jwToken);
    },
}
</script>

<style scoped>
* {
    color: #161616;
}
</style>
