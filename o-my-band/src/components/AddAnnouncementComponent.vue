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
            <label for="type" class="mb-1">Instrument recherché :*</label>
            <Dropdown
                id="type"
                v-model="selectedInstrument"
                :options="instruments"
                optionLabel="name"
                placeholder="Sélectionne ce que tu cherches"
                class="w-20rem md:w-30rem"
            />
        </div>

        <div class="card mt-4 flex flex-column">
            <label for="style">Mon/Mes style(s)</label>
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
            <Textarea
                id="description"
                v-model="descValue"
                autoResize
                rows="5"
                cols="45"
                class="w-20rem md:w-30rem"
                placeholder="Décris ta recherche en détail, ton style si il n'est pas présent dans la liste ci-dessus, des exemples de références de morceaux, etc.."
            />
        </div>

        <Button
            label="Poster l'annonce"
            icon="pi pi-send"
            @click="publishAnnouncement"
        />
    </div>
</template>

<script>
import { authStore } from "@/stores/auth";

export default {
    data() {
        return {
            titleValue: null,
            descValue: "",
            selectedType: null,
            selectedSearch: null,
            selectedStyles: null,
            selectedInstrument: null,
            types: [],
            instruments: [],
            styles: [],
            store: authStore(),
            announcement: {
                title: this.titleValue,
                user_type: this.selectedType,
                research_type: this.selectedSearch,
                description: this.descValue,
                styles: this.selectedStyles,
                instruments: this.selectedInstrument,
            },
        };
    },
    methods: {
        async publishAnnouncement() {
            await this.store.createAnnouncement(
                this.announcement.title,
                this.announcement.user_type,
                this.announcement.research_type,
                this.announcement.description,
                this.announcement.styles,
                this.announcement.instruments,
                this.store.jwToken
            );
        },
    },
    async created() {
        this.types = await this.store.fetchTypes(this.store.jwToken);

        this.instruments = await this.store.fetchInstruments(this.store.jwToken);
        this.styles = await this.store.fetchStyles(this.store.jwToken);
    },
};
</script>
