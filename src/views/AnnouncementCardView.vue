<template>
    <HeaderComponent />
    <div
        v-if="announcement"
        class="card-backgroundColor border-1 surface-border border-round mt-8 mb-8 mx-8 text-center py-1 px-4"
    >
        <div class="flex flex-column md:flex-row md:justify-content-between">
            <div class="flex flex-wrap align-items-start">
                <div class="flex flex-column">
                    <h2 class="w-auto sm:w-max">{{ announcement.title }}</h2>
                    <div class="flex flex-column md:flex-row align-items-baseline">
                        <img
                            class="avatar"
                            src="../assets/img/user-icon.png"
                            alt="avatar"
                        />
                        <p v-if="announcement.user" class="md:ml-3">
                            {{ announcement.user.pseudo }} -
                            {{ announcement.userType.name }}
                        </p>
                    </div>

                    <div  class="flex" v-if="announcement.instruments.length > 0">
                        <p class="text-left">
                            Instrument(s) recherché(s) : &nbsp;
                        </p>
                        <p class="text-left">
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
                <div v-for="style in announcement.styles" :key="style.style_id">
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

        <div class="flex flex-column md:flex-row md:justify-content-between align-items-baseline">
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
            <div
                v-if="
                    currentUser && currentUser.user_id !== announcement.user_id
                "
            >
                <Button
                    v-if="token"
                    class="button"
                    label="Je répond à cette annonce"
                    @click="visible = true"
                />
                <div
                    v-else
                    v-tooltip.bottom="
                        'Connecte toi pour accéder à cette fonctionnalité'
                    "
                >
                    <Button disabled>Répondre à l'annonce</Button>
                </div>

                <Dialog
                    v-model:visible="visible"
                    modal
                    header="Répondre à l'annonce"
                    :style="{ width: '50rem' }"
                    :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
                >
                    <ContactForm @close-dialog="handleCloseDialog"/>
                </Dialog>
            </div>
        </div>
    </div>
    <FooterComponent />
</template>

<script>
import FooterComponent from "@/components/FooterComponent.vue";
import HeaderComponent from "@/components/HeaderComponent.vue";
import ContactForm from "@/components/ContactForm.vue";
import { authStore } from "@/stores/auth";
import Button from "primevue/button";
import cookiesStorage from "@/services/cookie";

export default {
    name: "AnnouncementView",
    data() {
        return {
            announcement: null,
            store: authStore(),
            visible: false,
            token: cookiesStorage.getItem(),
            currentUser: {},
        };
    },
    async created() {
        // console.log(this.token);
        this.announcement = await this.store.getAnnouncementByID(
            this.$route.params.id
        );
        console.log("announcement", this.announcement);
        if (this.token) {
            this.currentUser = await this.store.getFetchProfil();
            console.log("currentUser", this.currentUser);
        }
    },
    methods: {
        handleCloseDialog() {
            this.visible = false;
        }
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
