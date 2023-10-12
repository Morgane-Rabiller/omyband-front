<template>
    <div class="container flex flex-column">
        <div class="flex flex-column justify-content-center align-items-center">
            <h2>Ma recherche d'annonces</h2>
        </div>
        <div class="card mt-6 mx-8" >
            <div class="card-backgroundColor border-1 surface-border border-round m-2 text-center py-1 px-4" >
                <div class="flex justify-content-between">
                    <div class="flex flex-wrap align-items-start">
                        <div class="flex flex-column">
                            <h2 class="">Title</h2>
                            <div class="flex flex-wrap align-items-baseline">
                                <img class="avatar" src="../assets/img/user-icon.png" alt="">
                                <p class="ml-3">Jeanmi</p>
                            </div>
                        </div>
                    </div>
                    <div class="flex flex-wrap">
                        <Tag class="tag h-1rem md:h-2rem mt-5"> BANANA </Tag>
                        <Tag class="tag ml-2 h-1rem md:h-2rem mt-5">Type</Tag>
                    </div>
                </div>
                <div>
                    <p>Description</p>
                </div>
                <div class="flex justify-content-between">
                    <p class="opacity-60">Publiée le 00/00/0000</p>
                    <p class="opacity-60">Bananaland next to CatParadise</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { authStore } from "@/stores/auth";

const store = authStore;
let announcements = ref([]);
const Announcement = async () => {
    try {
        announcements.value = await store.fetchAnnouncements();
        store.fetchAnnouncements().then((data) => (announcements.value = data.slice(0,9)));
    } catch(error) {
        console.error(error);
    }
}
onMounted(async () => {
    Announcement();
})

</script>

<style scoped>
p, h1, .tag {
    font-family: 'Montserrat', sans-serif;
}

.card-backgroundColor{
    background-color: #CBE4DE;
    color: #161616;
}
.tag {
    background-color: #161616;
}
.avatar{
    width: 30px;
}
</style>