<template>
    <HeaderComponent />
    <div
        v-if="announcement"
        class="card-backgroundColor border-1 surface-border border-round mt-8 mx-8 text-center py-1 px-4"
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
                <!-- <Tag v-if="!announcement.styles[0]" class="tag h-1rem md:h-2rem mt-5"></Tag> -->
                <div v-for="style in announcement.styles" :key="style.style_id">
                    <Tag class="tag h-1rem md:h-2rem mt-5 ml-1">{{
                        style.name
                    }}</Tag>
                </div>
                <Tag class="tag ml-2 h-1rem md:h-2rem mt-5">{{
                    announcement.researchType
                        ? announcement.researchType.name
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
            <Button
                class="button"
                label="Je répond à cette annonce"
                @click="visible = true"
            />

            <Dialog v-model:visible="visible" modal header="Ma réponse à l'annonce" :style="{ width: '50rem' }" :breakpoints="{ '1199px': '75vw', '575px': '90vw' }" >
                <ContactForm />
            </Dialog>
        </div>
    </div>
    <FooterComponent />
</template>

<script>
import FooterComponent from "@/components/FooterComponent.vue";
import HeaderComponent from "@/components/HeaderComponent.vue";
import ContactForm from "@/components/ContactForm.vue"
import { authStore } from "@/stores/auth";
import Button from "primevue/button";

export default {
    name: "AnnouncementView",
    data() {
        return {
            announcement: null,
            store: authStore(),
            visible: false,
        };
    },
    async created() {
        this.announcement = await this.store.getAnnouncementByID(
            this.$route.params.id
        );
        console.log(this.announcement);
    },
    components: {
        HeaderComponent,
        FooterComponent,
        ContactForm,
        Button,
    },
};
</script>

<style scoped>
.card-backgroundColor {
    background-color: #cbe4de;
    color: #161616;
}
.tag {
    background-color: #161616;
}
.avatar {
    width: 30px;
}
.p-button {
    background-color: #0e8388 !important;
}
</style>
