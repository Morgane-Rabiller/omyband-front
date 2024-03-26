<template>
    <HeaderComponent />
    <div v-if="announcements">
        <div
            v-for="announcement in allAnnouncements"
            :key="announcement.announcement_id"
            class="card-backgroundColor border-1 surface-border border-round mt-8 mx-8 mb-8 text-center py-1 px-4"
        >
            <div class="flex justify-content-between">
                <div class="flex flex-wrap align-items-start">
                    <div class="flex flex-column">
                        <h2 class="">{{ announcement.title }}</h2>
                        <div class="flex flex-wrap align-items-baseline">
                            <img
                                class="avatar"
                                src="../assets/img/user-icon.png"
                                alt="avatar"
                            />
                            <p class="ml-3">
                                {{ user.pseudo }} - {{ announcement.userType.name }}
                            </p>
                        </div>
                    </div>
                </div>
                <div class="flex flex-wrap">
                    <div
                        v-for="style in announcement.styles"
                        :key="style.style_id"
                    >
                        <Tag class="tag h-1rem md:h-2rem mt-5 ml-1">{{
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
            <div class="flex justify-content-between align-items-baseline">
                <div class="flex">
                    <p class="opacity-60 mr-2">
                        Publiée le
                        {{
                            new Date(
                                announcement.created_at
                            ).toLocaleDateString("fr-FR") || ""
                        }}
                    </p>
                    <p class="mr-2">-</p>
                    <p class="opacity-60">
                        {{ user.location }}
                    </p>
                </div>
                <div>
                    <Button
                        class="mt-0 p-0 mr-5"
                        label="Modifier l'annonce"
                        link
                        icon="pi pi-file-edit"
                        @click="openEditDialog(announcement)"
                    />
                    <Button
                        class="text-red-700 mt-0 p-0"
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
                    `http://localhost:8080/announcements/${ad.announcement_id}`
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
                        `http://localhost:8080/announcements/${ad.announcement_id}`
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
