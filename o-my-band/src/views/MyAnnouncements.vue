<template>
  <HeaderComponent />
  <div
        v-if="announcements">
    <div v-for="announcement in allAnnouncements" :key="announcement.announcement_id"
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
                        <p v-if="announcement.user" class="ml-3">
                            {{ announcement.user.pseudo }}
                        </p>
                    </div>
                </div>
            </div>
            <div class="flex flex-wrap">
                <div v-for="style in announcement.styles" :key="style.style_id">
                    <Tag class="tag h-1rem md:h-2rem mt-5 ml-1">{{
                        style.name
                    }}</Tag>
                </div>
                <Tag class="tag ml-2 h-1rem md:h-2rem mt-5">{{
                    announcement.userType
                        ? announcement.userType
                        : ""
                }}</Tag>
            </div>
        </div>
        <div>
            <p>{{ announcement.description }}</p>
        </div>
        <div class="flex justify-content-between align-items-baseline">
            <p class="opacity-60">
                Publiée le
                {{
                    new Date(announcement.created_at).toLocaleDateString(
                        "fr-FR"
                    ) || ""
                }}
            </p>
            <p v-if="announcement.user" class="opacity-60">
                {{ announcement.user.location }}
            </p>

            <Dialog
                v-model:visible="visible"
                modal
                header="Répondre à l'annonce"
                :style="{ width: '50rem' }"
                :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
            >
                <ContactForm />
            </Dialog>
        </div>
    </div>
  </div>
  <FooterComponent />
</template>

<script>
import FooterComponent from "@/components/FooterComponent.vue";
import HeaderComponent from "@/components/HeaderComponent.vue";
import  { authStore } from "@/stores/auth.js";
import axios from "axios";

export default {
  name: "HomeView",
  components: {
    HeaderComponent,
    FooterComponent,
  },
    data() {
        return {
            announcements: {},
            store: authStore(),
            allAnnouncements: {}
        };
    },
    async created() {
        const user = await this.store.fetchProfil(this.store.jwToken);
        this.announcements = user.announcements;
        const myannouncements = await Promise.all(this.announcements.map(async(ad) => {
          const anAnnouncement = await axios.get(`http://localhost:8080/announcements/${ad.announcement_id}`);
          console.log(ad);
          return {
              id: ad.announcement_id,
              title: anAnnouncement.data.title,
              description: anAnnouncement.data.description,
              instruments: anAnnouncement.data.instruments,
              styles: anAnnouncement.data.styles,
              userType: anAnnouncement.data.userType.name,
              created_at: anAnnouncement.data.created_at

          }
        }));
        this.allAnnouncements = myannouncements;

        // Trie des dates pour que les plus récentes soient en premières
        this.allAnnouncements.sort(function(a, b) {
          const c = new Date(a.created_at);
          const d = new Date(b.created_at);
          return d-c;
        })
    },
};
</script>
