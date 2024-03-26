<template>
    <form action="" @submit.prevent="editAnnoucement">
        <span class="flex flex-column">
            <label for="title" class="mb-1">Titre de l'annonce*</label>
            <InputText
                id="title"
                v-model="title"
                class="w-20rem md:w-25rem"
                placeholder="Recherche guitariste amateur"
            />
        </span>
        <!-- METTRE CA QUE SI USERSEARCH EST PAS 2-->
        <div v-if="currentAnnouncement.researchType.type_id !== 2" class="card mt-4 flex flex-column">
            <label for="type" class="mb-1">Instrument(s) recherché(s) :*</label>
            <MultiSelect
                id="type"
                v-model="selectedInstruments"
                display="chip"
                :options="instruments"
                optionLabel="name"
                placeholder="Sélectionne ce que tu cherches"
                :maxSelectedLabels="3"
                class="w-20rem md:w-25rem"
            />
        </div>
        <!-- ---------------------------------------- -->
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
                class="w-20rem md:w-25rem"
            />
        </div>
        <div class="card mt-4 flex flex-column">
            <label for="description" class="mb-1">Description</label>
            <p class="text-xs w-20rem mt-0 mb-2 lg:w-25rem">
                Si tu n'as pas trouvé le(s) instrument(s) et/ou le(s) style(s)
                que tu recherches dans les listes, merci de les préciser dans ta
                description.
            </p>
            <Textarea
                id="description"
                v-model="description"
                autoResize
                rows="5"
                cols="45"
                class="w-20rem md:w-25rem"
                placeholder="Décris ta recherche en détail, ton style si il n'est pas présent dans la liste ci-dessus, des exemples de références de morceaux, etc.."
            />
        </div>
        <p class="m-0 mt-1 text-red-600">{{ echecMessage }}</p>
        <Button type="submit" label="Enregistrer" icon="pi pi-check" @click="visibleDialog = true"> </Button>
        <Dialog 
            v-model:visible="visibleDialog"
            modal
            header="Réussi ✔"
        >
        <p>Ton annonce est bien modifiée, tu vas être redirigé sur tes annonces.</p>
        </Dialog>
    </form>
</template>

<script>
import { authStore } from "@/stores/auth";
import translate from "translate";

export default {
    data() {
        return {
            store: authStore(),
            title: "",
            instruments: [],
            selectedInstruments: [],
            styles: [],
            selectedStyles: [],
            description: "",
            announcement: {},
            visibleDialog: false,
            echecMessage: "",
        };
    },
    async created() {
        this.instruments = await this.store.fetchInstruments();
        this.styles = await this.store.fetchStyles();
        console.log(this.currentAnnouncement);
        this.title = this.currentAnnouncement.title;
        this.selectedInstruments = this.currentAnnouncement.instruments;
        this.selectedStyles = this.currentAnnouncement.styles;
        this.description = this.currentAnnouncement.description;
    },
    methods: {
        async editAnnoucement() {
            try {
                const response = await this.store.setAnnouncement(this.currentAnnouncement.id, {
                    title: this.title,
                    instruments: this.selectedInstruments,
                    styles: this.selectedStyles,
                    description: this.description,
                });
                console.log(response);
                window.setTimeout(() => {
                    this.visibleDialog = false;
                    this.$emit('edit-announcement-successfully');
                }, 3000);
            } catch (error) {
                this.echecMessage =
                    error.response.data.message ||
                    (await translate(error.response.data.errorMessage, "fr"));
                window.setTimeout(() => {
                    this.echecMessage = "";
                }, 5000);
            }
        },
    },
    props: {
        currentAnnouncement: {
            type: Object,
            required: true,
        },
    },
};
</script>
