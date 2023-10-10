<template>
    <div class="container flex flex-column">
        <div class="headband px-8 py-3 mt-6">
            <p>La musique est un langage universel qui rassemble des individus autour de leur passion commune. Cependant, de nombreux musiciens, chanteurs et compositeurs rencontrent des difficultés pour trouver des partenaires. Cette application vise à faciliter la rencontre entre les artistes musicaux en leur offrant un espace où ils peuvent trouver des groupes et/ou des membres de groupe en postant des annonces pour jouer ensemble.</p>
        </div>
        <hr class="mt-6">
        <div class="card mt-6">
            <Carousel :value="announcements" :numVisible="1" :numScroll="1" :responsiveOptions="responsiveOptions" circular :autoplayInterval="10000">
                <template #item="announcement"> 
                    <div class="card-backgroundColor border-1 surface-border border-round m-2 text-center py-5 px-3">
                        <div class="mb-3 flex justify-content-between">
                            <div class="flex flex-wrap align-items-start">
                                <img src="#" alt="avatar">
                                <p class="ml-5">{{ announcement.data.user.pseudo }}</p>
                                <div class="flex flex-column align-items-start ml-5">
                                    <h1>{{ announcement.data.title }}</h1>
                                </div>
                            </div>
                            <div class="flex flex-wrap">
                                <p>{{ announcement.data.styles[0].name }}</p>
                                <p class="ml-2">{{ announcement.data.type.name}}</p>
                            </div>
                        </div>
                        <div>
                            <p>{{ announcement.data.description }}</p>
                        </div>
                        <div>
                            <p>Date de publication</p>
                            <p>{{ announcement.data.user.location }}</p>
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
const Announcement = () => {
   try {
    announcements.value = store.fetchAnnouncements();
    // console.log(announcements.value);
    // console.log(store.fetchAnnouncements());
    // store.fetchAnnouncements().then((data) => (console.log(data)));
    store.fetchAnnouncements().then((data) => (announcements.value = data.slice(0, 9)));
   } catch(error) {
    console.error(error)
   }
}
onMounted(async () => {
    Announcement();
})

// const responsiveOptions = ref([
//     {
//         breakpoint: '1199px',
//         numVisible: 1,
//         numScroll: 1
//     },
//     {
//         breakpoint: '991px',
//         numVisible: 2,
//         numScroll: 1
//     },
//     {
//         breakpoint: '767px',
//         numVisible: 1,
//         numScroll: 1
//     }
// ]);

</script>

<style scoped>
.headband {
    background-color: #0e8388;
}

.card-backgroundColor {
    background-color: #CBE4DE;
    color: #161616;
}
</style>