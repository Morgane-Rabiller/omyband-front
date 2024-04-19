<template>
    <form class="container flex flex-column align-items-center mb-8" @submit.prevent="register">
        <h3>Inscription</h3>
        <p class="required-fields">*Champs Obligatoires</p>
        <span class="flex flex-column mt-4">
            <label class="mb-1" for="pseudo">Pseudo*</label>
            <InputText
                id="pseudo"
                class="w-20rem md:w-30rem"
                v-model="user.pseudo"
            />
        </span>
        <span class="flex flex-column mt-4">
            <label class="mb-1" for="username">Adresse Mail*</label>
            <InputText
                id="username"
                class="w-20rem md:w-30rem"
                v-model="user.email"
            />
        </span>
        <span class="flex flex-column mt-4">
            <label class="mb-1" for="password">Mot de passe*</label>
            <Password
                v-model="valueP"
                inputId="password"
                toggleMask
            />
        </span>
        <span class="flex flex-column mt-4">
            <label class="mb-1" for="password"
                >Confirmation du mot de passe*</label
            >
            <Password
                v-model="valueP2"
                inputId="password2"
                toggleMask
            />
        </span>
        <div class="card mt-4 flex flex-column">
            <label for="type" class="mb-1">Choix du département</label>
            <Dropdown
                v-model="selectedDepartment"
                :options="department"
                optionLabel="name"
                placeholder="Departement"
                class="custom-dropdown w-20rem md:w-30rem"
            />
        </div>

        <div class="card flex justify-content-center mt-4">
            <div class="flex flex-column gap-3">
                <label for="chbx">Sélectionne ton/tes instrument(s)</label>
                <MultiSelect
                    id="type"
                    v-model="selectedInstrument"
                    display="chip"
                    :options="instruments"
                    optionLabel="name"
                    placeholder="Sélectionne ce que tu cherches"
                    :maxSelectedLabels="6"
                    class="w-20rem md:w-30rem"
                />
            </div>
        </div>
        <div class="card flex flex-column mt-4">
            <label class="mb-2">Description</label>
            <Textarea
                v-model="user.description"
                rows="5"
                autoResize
                cols="50"
                class="w-20rem md:w-30rem"
                placeholder="Description libre pour plus de précisions sur toi, tu peux décrire ton groupe ou tes intentions et préciser ton style."
            />
        </div>
        <p class="text-red-300">{{ message }}</p>
        <Button
            type="submit"
            label="Inscription"
            icon="pi pi-sign-in"
            :loading="loading"
        />
        <Dialog
                    v-model:visible="visibleDialog"
                    modal
                    header="Inscription réussie ✔"
                >
                    <p>Ton compte est bien enregistré, tu vas être redirigé vers l'accueil et pouvoir te connecter.</p>
                </Dialog>
    </form>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { authStore } from "@/stores/auth";
import router from "@/router";
import axios from "axios";
import translate from "translate";

const auth = authStore();
const selectedInstrument = ref([]);
let message = ref("");
const selectedDepartment = ref(null);
const department = ref([]);
const valueP = ref(null);
const valueP2 = ref(null);
let visibleDialog = ref(false);
const user = {
    email: "",
    pseudo: "",
    password: "",
    passwordRepeat: "",
    location: "",
    avatar: "",
    description: "",
    instruments: []
};
let instruments = [];

onMounted(async () => {
    instruments = await auth.fetchInstruments();
})

const register = async () => {
    user.password = valueP.value;
    user.passwordRepeat = valueP2.value;
    user.location = selectedDepartment.value
        ? selectedDepartment.value.name
        : "";
        user.instruments = selectedInstrument.value ? selectedInstrument.value : [];
    console.log(selectedInstrument.value);

    try {
        await auth.registerUser(
            user.pseudo,
            user.email,
            user.password,
            user.passwordRepeat,
            user.avatar,
            user.location,
            user.description,
            user.instruments
        );
        console.log(visibleDialog);
        visibleDialog.value = true;
        window.setTimeout(() => {
            visibleDialog.value = false;
            router.push("/validation");
        }, 3000);
    } catch (error) {
        console.error("bouhouhou", error);
        console.error("error", error.response.data.message);
        message.value = error.response.data.message || await translate(error.response.data.errorMessage, "fr");
        window.setTimeout(() => {
            message.value = "";
        }, 3000);
    }
};

axios
    .get("https://geo.api.gouv.fr/departements")
    .then((response) => {
        department.value = response.data.map((data) => {
            return {
                name: data.nom,
                code: data.code,
            };
        });
    })
    .catch((err) => {
        console.error(err);
    });
</script>

<style scoped>
.container {
    display: flex;
    overflow-y: none;
}
img {
    width: 32%;
    height: 32%;
    border-radius: 5%;
    box-shadow: 15%;
}

.required-fields {
    color: rgb(99, 99, 99);
}

.p-button {
    margin-top: 1.5rem;
    background-color: #0e8388 !important;
    border-color: #0e8388 !important;
}

.p-checkbox-box {
    background-color: #cbe4de;
}
@media screen and (min-width: 768px) {
    img {
        width: 10%;
        height: 10%;
    }
}
</style>
