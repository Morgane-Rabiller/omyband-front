<template>
    <HeaderComponent />
    <div v-if="announcements.length > 0">
        <div
            v-for="announcement in allAnnouncements"
            :key="announcement.announcement_id"
            class="card-backgroundColor border-1 surface-border border-round mt-8 mx-8 mb-8 text-center pb-3 px-4"
        >
            <div class="flex flex-column md:flex-row md:justify-content-between">
                <div class="flex flex-wrap align-items-start">
                    <div class="flex flex-column align-items-center sm:align-items-start">
                        <h2 class="w-auto sm:w-max">{{ announcement.title }}</h2>
                        <div class="flex flex-column sm:flex-row align-items-baseline">
                            <img
                                class="avatar"
                                src="../assets/img/user-icon.png"
                                alt="avatar"
                            />
                            <p class="mb-0 text-xs sm:text-base sm:ml-3">
                                {{ user.pseudo }} - {{ announcement.userType.name }}
                            </p>
                        </div>
                        <div class="flex text-left text-sm sm:text-base" v-if="announcement.instruments.length > 0">
                        <p class="text-left  mb-0">
                            Instrument(s) recherché(s) : &nbsp;
                        </p>
                        <p class="text-left mb-0">
                            {{
                                announcement.instruments
                                    .map((instrument) => instrument.name)
                                    .join(", ")
                            }}.
                        </p>
                    </div>
                    </div>
                </div>
                <div class="flex flex-wrap">
                    <div
                        v-for="style in announcement.styles"
                        :key="style.style_id"
                    >
                        <Tag class="tag h-1rem md:h-2rem mt-3 ml-1">{{
                            style.name
                        }}</Tag>
                    </div>
                    <!-- <Tag class="tag ml-2 h-1rem md:h-2rem mt-5">{{
                        announcement.userType ? announcement.userType.name : ""
                    }}</Tag> -->
                </div>
            </div>
            <div>
                <p>{{ announcement.description }}</p>
            </div>
            <div class="flex flex-column md:flex-row md:justify-content-between align-items-baseline">
                <div class="flex  flex-column md:flex-row">
                    <p class="opacity-60 m-0 md:mr-2">
                        Publiée le
                        {{
                            new Date(
                                announcement.created_at
                            ).toLocaleDateString("fr-FR") || ""
                        }}
                    </p>
                    <p class="m-0 md:mr-2">-</p>
                    <p class="opacity-60 mt-0 mb-3 ">
                        {{ user.location }}
                    </p>
                </div>
                <div>
                    <Button
                        class="mt-0 p-0 mr-0 sm:mr-5"
                        label="Modifier l'annonce"
                        link
                        icon="pi pi-file-edit"
                        @click="openEditDialog(announcement)"
                    />
                    <Button
                        class="text-red-700 mt-3 sm:mt-0 p-0"
                        label="Supprimer l'annonce"
                        link
                        icon="pi pi-trash"
                        @click="openDeleteDialog(announcement.id)"
                    />
                </div>
            </div>
        </div>
        <Dialog
            v-model:visible="visibleEditAd"
            modal
            header="Modifier l'annonce"
        >
            <EditAnnouncementComponent
                :currentAnnouncement="currentAnnouncement"
                @edit-announcement-successfully="handleEditOrDeleteSuccessfull"
            />
        </Dialog>
        <Dialog
            v-model:visible="visibleDeleteAd"
            modal
            header="Supprimer l'annonce"
        >
            <DeleteAnnouncementComponent :announcementId="announcementId" :visible="visibleDeleteAd" @deletion-cancelled="handleDelationCancelled" @delete-announcement-successfull="handleEditOrDeleteSuccessfull"/>
        </Dialog>
    </div>
    <div v-else>
        <h2 class="text-center mt-8" style="color: #cbe4de"> Tu n'as pas publié d'annonce(s).</h2>
    </div>
    <FooterComponent />
</template>

<script>
import FooterComponent from "@/components/FooterComponent.vue";
import HeaderComponent from "@/components/HeaderComponent.vue";
import EditAnnouncementComponent from "@/components/EditAnnouncementComponent.vue";
import DeleteAnnouncementComponent from "@/components/DeleteAnnouncementComponent.vue";
import { authStore } from "@/stores/auth.js";
import axios from "axios";
import cookiesStorage from "@/services/cookie";

export default {
    name: "HomeView",
    components: {
        HeaderComponent,
        FooterComponent,
        EditAnnouncementComponent,
        DeleteAnnouncementComponent
    },
    data() {
        return {
            announcements: {},
            store: authStore(),
            allAnnouncements: {},
            token: cookiesStorage.getItem(),
            user: {},
            visibleEditAd: false,
            visibleDeleteAd: false,
            currentAnnouncement: null,
            announcementId: null,
        };
    },
    async created() {
        this.user = await this.store.fetchProfil(this.token);
        this.announcements = this.user.announcements;
        const myannouncements = await Promise.all(
            this.announcements.map(async (ad) => {
                const anAnnouncement = await axios.get(
                    `https://omyband-back.mogo-r.fr/announcements/${ad.announcement_id}`
                );
                return {
                    id: ad.announcement_id,
                    title: anAnnouncement.data.title,
                    description: anAnnouncement.data.description,
                    instruments: anAnnouncement.data.instruments,
                    styles: anAnnouncement.data.styles,
                    userType: anAnnouncement.data.userType,
                    researchType: anAnnouncement.data.researchType,
                    created_at: anAnnouncement.data.created_at,
                };
            })
        );
        console.log(this.announcements.length);
        this.allAnnouncements = myannouncements;

        // Trie des dates pour que les plus récentes soient en premières
        this.allAnnouncements.sort(function (a, b) {
            const c = new Date(a.created_at);
            const d = new Date(b.created_at);
            return d - c;
        });
    },
    methods: {
        async refreshAnnouncements() {
            const user = await this.store.fetchProfil(this.token);
            const announcements = user.announcements;
            const myannouncements = await Promise.all(
                announcements.map(async (ad) => {
                    const anAnnouncement = await axios.get(
                        `https://omyband-back.mogo-r.fr/announcements/${ad.announcement_id}`
                    );
                    return {
                        id: ad.announcement_id,
                        title: anAnnouncement.data.title,
                        description: anAnnouncement.data.description,
                        instruments: anAnnouncement.data.instruments,
                        styles: anAnnouncement.data.styles,
                        userType: anAnnouncement.data.userType,
                        researchType: anAnnouncement.data.researchType,
                        created_at: anAnnouncement.data.created_at,
                    };
                })
            );
            this.allAnnouncements = myannouncements;
            this.allAnnouncements.sort((a, b) => {
                const c = new Date(a.created_at);
                const d = new Date(b.created_at);
                return d - c;
            });
        },
        openEditDialog(ad) {
            this.visibleEditAd = true;
            this.currentAnnouncement = ad;
        },
        openDeleteDialog(announcementId) {
            this.visibleDeleteAd = true;
            this.announcementId = announcementId;
        },
        async handleEditOrDeleteSuccessfull() {
            this.visibleEditAd = false;
            this.visibleDeleteAd = false;
            await this.refreshAnnouncements();
        },
        handleDelationCancelled() {
            this.visibleDeleteAd = false;
        }
    },
};
</script>

<style scoped>
.p-button.p-button-link {
    color: #0e8388;
    background-color: transparent !important;
    border: transparent !important;
    font-family: "Montserrat", sans-serif;
}
.p-button.p-button-link:enabled:hover {
    background: transparent !important;
    color: #0e8388;
    border: transparent !important;
}
.p-button.p-button-link:enabled:focus {
    background: transparent;
    box-shadow: none;
    border-color: transparent;
}
</style>
