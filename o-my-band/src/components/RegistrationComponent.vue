<template>
    <div class="container flex flex-column align-items-center mb-8">
        <h3>Inscription</h3>
        <p class="required-fields">*Champs Obligatoires</p>
        <span class="flex flex-column mt-4">
            <label class="mb-1" for="pseudo">Pseudo*</label>
            <InputText
                id="pseudo"
                class="w-20rem md:w-30rem"
                v-model="user.pseudo"
                @blur="pseusoValidate"
                placeholder="Ton pseuso personnalisé"
            />
        </span>
        <div v-if="pseudoError" class="mt-2">
            <InlineMessage>6 caractères minimum requis </InlineMessage>
        </div>
        <span class="flex flex-column mt-4">
            <label class="mb-1" for="username">Adresse Mail*</label>
            <InputText
                id="username"
                class="w-20rem md:w-30rem"
                v-model="user.email"
                @blur="emailValidate"
                placeholder="Exemple@gmail.com"
            />
        </span>
        <div v-if="emailError" class="mt-2">
            <InlineMessage> {{ emailError }} </InlineMessage>
        </div>
        <span class="flex flex-column mt-4">
            <label class="mb-1" for="password">Mot de passe*</label>
            <Password
                v-model="valueP"
                inputId="password"
                @blur="passwordValidate"
                toggleMask
                placeholder="Exemple2M5d4p7"
            />
        </span>
        <div v-if="passwordError" class="mt-2">
            <InlineMessage>{{ passwordError }}</InlineMessage>
        </div>
        <span class="flex flex-column mt-4">
            <label class="mb-1" for="password"
                >Confirmation du mot de passe*</label
            >
            <Password
                v-model="valueP2"
                inputId="password"
                @blur="passwordValidate"
                toggleMask
                placeholder="Exemple2M5d4p7"
            />
        </span>
        <div v-if="passwordError" class="mt-2">
            <InlineMessage>{{ passwordError }}</InlineMessage>
        </div>
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
        <Button
            type="button"
            label="Inscription"
            icon="pi pi-sign-in"
            :loading="loading"
            @click="register"
        />
        <div v-if="showSnackbar">
            <Message severity="warn" sticky>{{ Content }}</Message>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { authStore } from "@/stores/auth";
import router from "@/router";
import axios from "axios";

const auth = authStore();
const showSnackbar = ref(false);
const selectedInstrument = ref();
let Content = ref("");
const pseudoError = ref("");
const emailError = ref("");
const passwordError = ref("");
const selectedDepartment = ref();
const department = ref([]);
const valueP = ref(null);
const valueP2 = ref(null);
const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,}$/;
const user = {
    email: "",
    pseudo: "",
    password: "",
    location: "",
    avatar: "",
    description: "",
    instruments: []
};
let instruments = [];

onMounted(async () => {
    instruments = await auth.fetchInstruments();
})

const pseusoValidate = () => {
    if (user.pseudo.length < 6) {
        pseudoError.value = "Pseudo non valide";
    } else {
        pseudoError.value = "";
    }
};
const emailValidate = () => {
    if (!emailRegex.test(user.email)) {
        emailError.value = "Email non valide e.g exemple@exemple.com";
    } else {
        emailError.value = "";
    }
};

const passwordValidate = () => {
    if (!passwordRegex.test(valueP.value)) {
        passwordError.value =
            "Votre mot de passe doit comporter minimum 8 caractères dont une minuscule, une majuscule et un chiffre";
    } else {
        passwordError.value = "";
    }
};

const register = async () => {
    try {
        if (valueP.value !== valueP2.value) {
            console.error(
                "Les mots de passes ne correspondent pas. T'es mauvais Jeanmi!"
            );
            Content.value =
                "Les mots de passes ne correspondent pas. T'es mauvais Jeanmi!";
            showSnackbar.value = true;
            return;
        }
        if (user.pseudo.length < 6) {
            console.error(
                "T'abuses, tu pourrais faire un effort sur la longueur de ton pseudo !"
            );
            Content.value =
                "T'abuses, tu pourrais faire un effort sur la longueur de ton pseudo !";
            showSnackbar.value = true;
        }
        user.password = valueP.value;
        console.log(user.password);
        user.location = selectedDepartment.value
            ? selectedDepartment.value.name
            : "";
        user.instruments = selectedInstrument.value
        const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
        if (!emailRegex.test(user.email)) {
            console.error("L'email nest pas au format valide ! Perdu Jeanmi");
            Content.value = "L'email nest pas au format valide ! Perdu Jeanmi";
            showSnackbar.value = true;
        }
        console.log(selectedInstrument.value.name);
        await auth.registerUser(
            user.pseudo,
            user.email,
            user.password,
            user.avatar,
            user.location,
            user.description,
            user.instruments
        );
        router.push("/validation");
        console.log(user);
    } catch (error) {
        console.error("bouhouhou", error);
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
