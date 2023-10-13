<template>
    <div class="container flex flex-column">
        <div class="headband px-8 py-3 mt-6">
            <p>La musique est un langage universel qui rassemble des individus autour de leur passion commune. Cependant, de nombreux musiciens, chanteurs et compositeurs rencontrent des difficultés pour trouver des partenaires. Cette application vise à faciliter la rencontre entre les artistes musicaux en leur offrant un espace où ils peuvent trouver des groupes et/ou des membres de groupe en postant des annonces pour jouer ensemble.</p>
        </div>
        <hr class="mt-6">
        <div class="card mt-6">
            <Carousel :value="announcements" :numVisible="1" :numScroll="1" :responsiveOptions="responsiveOptions" circular :autoplayInterval="60000">
                <template #item="announcement"> 
                    <div class="card-backgroundColor border-1 surface-border border-round m-2 text-center py-1 px-4">
                        <div class="flex justify-content-between">
                            <div class="flex flex-wrap align-items-start">
                                <div class="flex flex-column">
                                    <h2 class="">{{ announcement.data.title }}</h2>
                                    <div class="flex flex-wrap align-items-baseline">
                                        <img class="avatar" src="../assets/img/user-icon.png" alt="avatar">
                                        <p class="ml-3">{{ announcement.data.user.pseudo }}</p>
                                    </div>
                                </div>
                            </div>
                            <div class="flex flex-wrap">
                                <Tag v-if="!announcement.data.styles[0]" class="tag h-1rem md:h-2rem mt-5"></Tag>
                                <Tag v-else class="tag h-1rem md:h-2rem mt-5">{{  announcement.data.styles[0].name }}</Tag>
                                <Tag class="tag ml-2 h-1rem md:h-2rem mt-5">{{ announcement.data.researchType.name }}</Tag>
                            </div>
                        </div>
                        <div>
                            <p>{{ announcement.data.description }}</p>
                        </div>
                        <div class="flex justify-content-between">
                            <p class="opacity-60">Publiée le {{ new Date(announcement.data.created_at).toLocaleDateString('fr-FR') }}</p>
                            <p class="opacity-60">{{ announcement.data.user.location }}</p>
                        </div>
                    </div>
                </template>
            </Carousel>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { authStore } from '@/stores/auth';

const store = authStore();
let announcements = ref([]);
const Announcement = async () => {
   try {
    announcements.value = await store.fetchAnnouncements();
    store.fetchAnnouncements().then((data) => (announcements.value = data.slice(0, 4)));
   } catch(error) {
    console.error(error)
   }
}
onMounted(async () => {
    Announcement();
})

</script>

<style scoped>
.headband {
    background-color: #0e8388;
}
p, h1, .tag {
    font-family: "Montserrat", sans-serif;
}
.card-backgroundColor {
    background-color: #CBE4DE;
    color: #161616;
}
.tag {
    background-color: #161616;
}
.avatar {
    width: 30px;
}
</style>