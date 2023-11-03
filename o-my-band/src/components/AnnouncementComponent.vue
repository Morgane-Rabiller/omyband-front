<template>
    <div class="container flex flex-column">
        <div class="flex flex-column justify-content-center align-items-center">
            <h2>Ma recherche d'annonces</h2>
        </div>
        <div class="filters">
            <!-- <Dropdown v-model="selectedUserType" :options="userTypes" placeholder="Je suis..."/> -->
            <Dropdown v-model="selectedGenre" :options="styles" optionLabel="name" optionValue="style_id" placeholder="Sélectionne un Genre"/>
        </div>
        <div class="card mt-6 mx-8 " v-for="announcement in announcements" :key="announcement.announcement_id">
            <div class="card-backgroundColor border-1 surface-border border-round m-2 text-center py-1 px-4" >
                <div class="flex justify-content-between">
                    <div class="flex flex-wrap align-items-start">
                        <div class="flex flex-column">
                            <h2 class="">{{ announcement.title }}</h2>
                            <div class="flex flex-wrap align-items-baseline">
                                <img class="avatar" src="../assets/img/user-icon.png" alt="">
                                <p class="ml-3">{{ announcement.user.pseudo }}</p>
                            </div>
                        </div>
                    </div>
                    <div class="flex flex-wrap">
                        <div v-for="style in announcement.styles" :key="style.style_id" >
                                    <Tag class="tag h-1rem md:h-2rem mt-5 ml-1">{{ style.name }}</Tag>
                                </div>
                        <Tag class="tag ml-2 h-1rem md:h-2rem mt-5">{{ announcement.researchType.name }}</Tag>
                    </div>
                </div>
                <div>
                    <p>{{ announcement.description }}</p>
                </div>
                <div class="flex justify-content-between">
                    <p class="opacity-60">Publiée le {{ new Date(announcement.created_at).toLocaleDateString('fr-FR') }}</p>
                    <p class="opacity-60">{{ announcement.user.location }}</p>
                </div>
            </div>
        </div>
        <div class="flex flex-column my-auto justify-content-center align-items-center">
            <Paginate
                :current-page="page"
                :initial-page="1"
                :pageCount="last_page ? last_page : 0"
                :clickHandler="changePages"
                :prevText="'<<'"
                :nextText="'>>'"
                :margin-pages="0"
                :page-range="1"
                :first-last-button="true"
            ></Paginate>
        </div>
        <!-- <div>
            <Button @click="LoadNextPage">Page Suivante</Button>
        </div>
        <div>
            <Button @click="loadPreviousPage">Page précédente</Button>
        </div> -->
    </div>
</template>

<script setup>
import Paginate from "vuejs-paginate-next";
import { ref, onMounted, watch } from "vue";
import { authStore } from "@/stores/auth";

let page = ref(1);
let limit = 5;
let total = 0;
let last_page = 0;

const store = authStore();
let announcements = ref([]);
let selectedGenre = ref('');
let styles = ref([]);

const loadAnnouncements = async (payload) => {
    const response = await store.fetchAnnouncements(payload)
    announcements.value = response.data;
    page = response.page;
    total = response.total;
    limit = response.limit;
    last_page = Math.floor(total / limit) + 1;
    console.log("Last", last_page);
    console.log("total : ", response.total);
};

const changePages = (page) => {
    let selectedStyle = [];
    if (selectedGenre.value) {
       selectedStyle = selectedGenre.value;
    }
    const payload = {
        page: page,
        limit: limit,
        styles: selectedStyle, 
    }
    loadAnnouncements(payload);
}

// const LoadNextPage = () => {
//     page.value++;
//     loadAnnouncements(page.value, limit);
// };

// const loadPreviousPage = () => {
//     if (page.value > 1) {
//         page.value--;
//         loadAnnouncements(page.value, limit);
//     }
// };

// const Announcement = async () => {
//    try {
//     announcements.value = await store.fetchAnnouncements();
//     store.fetchAnnouncements().then((data) => (announcements.value = data.data.slice(0, 4)));
//    } catch(error) {
//     console.error(error)
//    }
// }
onMounted(async () => {
    // Announcement();
    const payload = {
          page: page,
          limit: limit,
        }
    styles = await store.fetchStyles();
    console.log('styles', styles);
    loadAnnouncements(payload);
})

watch(selectedGenre, () => {
    const payload = {
        page: page,
        limit: limit,
        styles: selectedGenre.value,
    }
    console.log('styles', selectedGenre.value);
    loadAnnouncements(payload);
})

// const filteredAnnouncements = computed(() => {
//   return announcements.value.filter((announcement) =>
//     !selectedGenre.value || announcement.styles[0]?.name === selectedGenre.value) 
//     }
// );
// const filteredAnnouncements = computed (() => {
//     if (selectedGenre.value) {
//         return announcements.value.filter(announcement => announcement.styles[0]?.name === selectedGenre.value);
//     }
// })
// const genres = computed(() => {
//     const uniqueGenres = [...new Set(announcements.value.map(announcement => announcement.styles[0]?.name))];
//     return [''].concat(uniqueGenres);
// })
</script>

<style>
.pagination {
  display: flex !important; /* !important ajouté */
  justify-content: center !important; /* !important ajouté */
  align-items: center !important; /* !important ajouté */
}

/* Style des éléments de liste (li) */
.pagination .page-item {
  list-style: none !important; /* !important ajouté */
  display: inline-block !important; /* !important ajouté */
  margin: 5px !important; /* !important ajouté */
}

/* Style des liens de page (a) */
.pagination .page-link {
  background-color: #CBE4DE !important; /* !important ajouté */
  color: #0e8388 !important; /* !important ajouté */
  border: 1px solid #0e8388 !important; /* !important ajouté */
  padding: 8px 12px !important; /* !important ajouté */
  border-radius: 5px !important; /* !important ajouté */
  text-decoration: none !important; /* !important ajouté */
  cursor: pointer !important; /* !important ajouté */
  transition: background-color 0.3s, color 0.3s !important; /* !important ajouté */
}
/* Style des liens de page (a) au survol */
.pagination .page-link:hover {
  background-color: #0e8388 !important; /* !important ajouté */
  color: #CBE4DE !important; /* !important ajouté */
}

p, h1, .tag {
    font-family: 'Montserrat', sans-serif;
}

.card-backgroundColor{
    background-color: #CBE4DE;
    color: #161616;
}

.avatar{
    width: 30px;
}
</style>