<template>
    <form @submit.prevent="editProfil">
        <span class="flex flex-column">
            <label for="pseudo" class="mb-1">Pseudo</label>
            <InputText
                id="pseudo"
                class="w-20rem md:w-30rem"
                v-model="pseudo"
            />
        </span>
        <div class="card mt-4 flex flex-column">
            <label class="mb-1">Département</label>
            <Dropdown
                v-model="selectedDepartment"
                :options="departments"
                optionLabel="name"
                placeholder="Departement"
                class="custom-dropdown w-20rem md:w-30rem"
            />
        </div>
        <div class="card flex justify-content-center mt-4">
            <div class="flex flex-column gap-3">
                <label for="instru">Instrument(s)</label>
                <MultiSelect
                    id="instru"
                    v-model="selectedInstrument"
                    display="chip"
                    :options="instruments"
                    optionLabel="name"
                    :maxSelectedLabels="6"
                    class="w-20rem md:w-30rem"
                />
            </div>
        </div>
        <div class="card flex flex-column mt-4">
            <label class="mb-2">Description</label>
            <Textarea
                v-model="description"
                rows="5"
                autoResize
                cols="50"
                class="w-20rem md:w-30rem"
                placeholder="Description libre pour plus de précisions sur toi, tu peux décrire ton groupe ou tes intentions et préciser ton style."
            />
        </div>
        <Button
            type="submit"
            label="Enregistrer"
            icon="pi pi-check"
            @click="visibleDialog = true"
        ></Button>
        <Dialog 
            v-model:visible="visibleDialog"
            modal
            header="Réussi ✔"
        >
        <p>Ton profil est bien modifié, tu vas être redirigé sur ton profil.</p>
        </Dialog>
    </form>
</template>

<script>
import axios from "axios";
import { authStore } from "@/stores/auth";
import cookiesStorage from "@/services/cookie";

export default {
    data() {
        return {
            pseudo: "",
            selectedDepartment: "",
            departments: [],
            selectedInstrument: "",
            instruments: [],
            store: authStore(),
            description: "",
            userId: null,
            visibleDialog: false,
        };
    },
    async created() {
        const response = await axios.get(
            "https://geo.api.gouv.fr/departements"
        );
        this.departments = response.data.map((department) => ({
            name: department.nom,
            code: department.code,
        }));

        this.instruments = await this.store.fetchInstruments();

        const profil = await this.store.getFetchProfil();
        this.pseudo = profil.pseudo;
        this.selectedDepartment = profil.location;
        this.selectedInstrument = profil.instruments;
        this.description = profil.description;
        this.userId = profil.user_id;
    },
    methods: {
        async editProfil() {
            try {
                const response = await this.store.setProfil(
                    this.userId,
                    cookiesStorage.getItem(),
                    {
                        pseudo: this.pseudo,
                        location: this.selectedDepartment.name,
                        instruments: this.selectedInstrument,
                        description: this.description,
                    }
                );
                window.setTimeout(() =>{
                    this.visibleDialog = true;
                    this.$emit('edit-profil-successfully');
                }, 3000);
                console.log(response);
            } catch (error) {
                console.log(error);
            }
        },
    },
};
</script>
