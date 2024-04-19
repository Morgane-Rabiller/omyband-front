<template>
    <div class="container mb-7 flex flex-column">
        <div class="flex flex-column justify-content-center align-items-center">
            <h2>Ma recherche d'annonces</h2>
        </div>
        <div class="filters mx-auto flex flex-column align-items-center lg:flex-row">
            <MultiSelect
            v-model="selectedGenre"
            display="chip"
            :options="styles"
            optionLabel="name"
            option-value="style_id"
            placeholder="Sélectionne un Genre"
            :maxSelectedLabels="3"
            class="w-20rem mb-4 lg:ml-0 lg:mb-0"
            />
            <Dropdown v-model="selectedInstrument" :options="instruments" option-label="name" option-value="instrument_id" placeholder="Sélectionne un Instrument" class="z-0 w-20rem mb-4 lg:mb-0 lg:ml-8"/>
            <Dropdown v-model="selectedLocation" :options="department" option-label="name" option-value="name" placeholder="Selectionne un département" class="z-0 w-20rem lg:ml-8"/>
        </div>
        <div class="card mt-6 mx-8 " v-for="announcement in announcements" :key="announcement.announcement_id">
            <div class="card-backgroundColor border-1 surface-border border-round m-2 text-center py-1 px-4" >
                <div class="flex flex-column md:flex-row md:justify-content-between">
                    <div class="flex flex-wrap align-items-start">
                        <div class="flex flex-column">
                            <h2 class="w-auto md:w-max">{{ announcement.title }}</h2>
                            <div class="flex flex-wrap align-items-baseline">
                                <img class="avatar" src="../assets/img/user-icon.png" alt="">
                                <p class="ml-3 mb-0">{{ announcement.user.pseudo }} - {{ announcement.userType.name  }}</p>
                            </div>
                        </div>
                    </div>
                    <div class="flex flex-wrap">
                        <div v-for="style in announcement.styles" :key="style.style_id" >
                                    <Tag class="tag h-1rem md:h-2rem mt-5 ml-1">{{ style.name }}</Tag>
                                </div>
                        <!-- <Tag class="tag ml-2 h-1rem md:h-2rem mt-5">{{ announcement.userType.name }}</Tag> -->
                    </div>
                </div>
                <div>
                            <p v-if="announcement && announcement && announcement.description">{{ announcement.description.substring(0, 120) }}...</p>
                            <RouterLink v-if="announcement && announcement.announcement_id" :to="{ name: 'announcementCard', params: { id: announcement.announcement_id }}" style="color: #161616;">Voir plus..</RouterLink>
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
    </div>
</template>

<script setup>
import Paginate from "vuejs-paginate-next";
import { ref, onMounted, watch } from "vue";
import { authStore } from "@/stores/auth";
import axios from "axios";

let page = ref(1);
let limit = 5;
let total = 0;
let last_page = 0;

const store = authStore();
let announcements = ref([]);
let selectedGenre = ref('');
let selectedInstrument = ref('');
let selectedLocation = ref('');
let styles = ref([]);
let instruments = ref([]);
const department = ref([]);

console.log(announcements.value);


const loadAnnouncements = async (payload) => {
    const response = await store.fetchAnnouncements(payload)
    announcements.value = response.data;
    page = response.page;
    total = response.total;
    limit = response.limit;
    last_page = Math.floor(total / limit) + 1;
    // console.log("Last", last_page);
    // console.log("total : ", response.total);
};

const changePages = (page) => {
    const payload = {
        page: page,
        limit: limit,
        styles: selectedGenre.value, 
        instruments: selectedInstrument.value,
        userLocation: selectedLocation.value,
    }
    loadAnnouncements(payload);
}
onMounted(async () => {
    const payload = {
          page: page,
          limit: limit,
        }
    styles = await store.fetchStyles();
    instruments = await store.fetchInstruments();
    // console.log('styles', instruments);
    loadAnnouncements(payload);
})

watch(selectedGenre, () => {
    const payload = {
        page: page,
        limit: limit,
        styles: selectedGenre.value,
        instruments: selectedInstrument.value,
        userLocation: selectedLocation.value,
    }
    // console.log('styles', selectedGenre.value);
    loadAnnouncements(payload);
})
watch(selectedLocation, () => {
    const payload = {
        page: page,
        limit: limit,
        styles: selectedGenre.value,
        instruments: selectedInstrument.value,
        userLocation: selectedLocation.value,
    }
    // console.log('styles', selectedGenre.value);
    loadAnnouncements(payload);
})

watch(selectedInstrument, () => {
    const payload = {
        page: page,
        limit: limit,
        styles: selectedGenre.value,
        instruments: selectedInstrument.value,
        userLocation: selectedLocation.value,
    }
    // console.log('Instrument', selectedInstrument.value);
    loadAnnouncements(payload);
})

axios
    .get("https://geo.api.gouv.fr/departements")
    .then((response) => {
        department.value = response.data.map((data) => {
            return {
                name: data.nom,
                code: data.code,
            };
        });
    })
    .catch((err) => {
        console.error(err);
    });
</script>

<style>
.pagination {
  display: flex !important;
  justify-content: center !important;
  align-items: center !important;
}

/* Style des éléments de liste (li) */
.pagination .page-item {
  list-style: none !important; 
  display: inline-block !important; 
  margin: 5px !important; 
}

/* Style des liens de page (a) */
.pagination .page-link {
  background-color: #CBE4DE !important;
  color: #0e8388 !important; 
  border: 1px solid #0e8388 !important; 
  padding: 8px 12px !important; 
  border-radius: 5px !important; 
  text-decoration: none !important; 
  cursor: pointer !important; 
  transition: background-color 0.3s, color 0.3s !important; 
}
/* Style des liens de page (a) au survol */
.pagination .page-link:hover {
  background-color: #0e8388 !important; 
  color: #CBE4DE !important; 
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