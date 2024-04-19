<template>
    <div class="container flex flex-column align-items-center mb-8">
        <h2>Publier mon annonce</h2>
        <span class="flex flex-column">
            <label for="title" class="mb-1">Titre de l'annonce*</label>
            <InputText
                id="title"
                v-model="titleValue"
                class="w-20rem md:w-30rem"
                placeholder="Recherche guitariste amateur"
            />
        </span>

        <div class="card mt-4 flex flex-column">
            <label for="userType" class="mb-1">Je suis :*</label>
            <Dropdown
                id="userType"
                v-model="selectedType"
                :options="types"
                optionLabel="name"
                placeholder="Sélectionne ton rôle"
                class="w-20rem md:w-30rem"
            />
        </div>

        <!-- Si l'utilisateur sélectionne "Groupe" en premier, le deuxième dropdown disparaîtra -->
        <div
            v-if="selectedType && selectedType.name !== 'Groupe'"
            class="card mt-4 flex flex-column"
        >
            <label for="researchType" class="mb-1">Je cherche :*</label>
            <Dropdown
                id="researchType"
                v-model="selectedSearch"
                :options="types"
                optionLabel="name"
                placeholder="Sélectionne ce que tu cherches"
                class="w-20rem md:w-30rem"
            />
        </div>

        <!-- Si l'utilisateur est un musicien qui cherche un groupe, le troisième dropdown disparaîtra -->
        <div
            v-if="
                (selectedType && selectedType.name === 'Groupe') ||
                (selectedSearch && selectedSearch.name !== 'Groupe')
            "
            class="card mt-4 flex flex-column"
        >
            <label for="type" class="mb-1">Instrument(s) recherché(s) :*</label>
            <MultiSelect
                id="type"
                v-model="selectedInstrument"
                display="chip"
                :options="instruments"
                optionLabel="name"
                placeholder="Sélectionne ce que tu cherches"
                :maxSelectedLabels="3"
                class="w-20rem md:w-30rem"
            />
        </div>

        <div class="card mt-4 flex flex-column">
            <label for="style" class="mb-1">Mon/Mes style(s)</label>
            <MultiSelect
                id="style"
                v-model="selectedStyles"
                display="chip"
                :options="styles"
                optionLabel="name"
                placeholder="Sélectionne un ou plusieurs style(s)"
                :maxSelectedLabels="3"
                class="w-20rem md:w-30rem"
            />
        </div>

        <div class="card mt-4 flex flex-column">
            <label for="description" class="mb-1">Description</label>
            <p class="text-xs w-20rem mt-0 mb-2 lg:w-30rem">Si tu n'as pas trouvé le(s) instrument(s) et/ou le(s) style(s) que tu recherches dans les listes, merci de les préciser dans ta description.</p>
            <Textarea
                id="description"
                v-model="descValue"
                autoResize
                rows="5"
                cols="45"
                class="w-20rem md:w-30rem"
                placeholder="Décris ta recherche en détail, des exemples de références de morceaux, etc.."
            />
        </div>
        <p class="text-red-300 mb-0">{{ errorMessage }}</p>
        <Button
            label="Poster l'annonce"
            icon="pi pi-send"
            @click="publishAnnouncement"
        />
        <Dialog
                    v-model:visible="visibleDialog"
                    modal
                    header="Annonce publiée ✔"
                >
                    <p>Ton annonce a bien été enregistré, tu vas être redirigé vers la page d'accueil.</p>
                </Dialog>
    </div>
</template>

<script>
import { authStore } from "@/stores/auth";
import cookiesStorage from "@/services/cookie";
import translate from "translate";

export default {
    data() {
        return {
            titleValue: "",
            descValue: "",
            selectedType: null,
            selectedSearch: null,
            selectedStyles: [],
            selectedInstrument: [],
            types: [],
            instruments: [],
            styles: [],
            store: authStore(),
            errorMessage: "",
            visibleDialog: false,
        };
    },
    methods: {
        async publishAnnouncement() {
            const announcement = {
                title: this.titleValue,
                user_type: this.selectedType,
                research_type: this.selectedSearch,
                description: this.descValue,
                styles: this.selectedStyles,
                instruments: this.selectedInstrument,
            };
            let researchTypeValue = 0;

            if (
                announcement.user_type &&
                announcement.user_type.name === "Groupe"
            ) {
                researchTypeValue = 1; // Valeur par défaut pour les groupes
            } else if (announcement.research_type) {
                researchTypeValue = announcement.research_type.type_id || 0;
            }
            try {
                await this.store.createAnnouncement(
                    announcement.title,
                    announcement.user_type.type_id,
                    researchTypeValue,
                    announcement.description,
                    announcement.styles,
                    announcement.instruments,
                    cookiesStorage.getItem()
                );
                this.visibleDialog = true;
                window.setTimeout(() => {
                    this.visibleDialog = false;
                    this.$router.push("/validation");
                }, 3000);
            } catch (error) {
                console.error(error, "Les informations ne sont pas correctes");
                this.errorMessage = error.response.data.message || await translate(error.response.data.errorMessage, "fr");
                window.setTimeout(() => {
                    this.errorMessage = "";
                }, 3000);
            }
        },
    },
    async created() {
        this.types = await this.store.fetchTypes(cookiesStorage.getItem());
        this.instruments = await this.store.fetchInstruments(
            cookiesStorage.getItem()
        );
        this.styles = await this.store.fetchStyles(cookiesStorage.getItem());
    },
};
</script>

<style>
.p-dropdown:hover {
    border-color: #0e8388 !important;
}
</style>
