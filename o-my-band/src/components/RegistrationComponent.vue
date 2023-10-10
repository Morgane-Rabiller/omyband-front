<template>
    <div class="container flex flex-column align-items-center mb-8">
        <h3>Inscription</h3>
        <p class="required-fields">*Champs Obligatoires</p>
        <span class="p-float-label">
            <InputText
                id="pseudo"
                v-model="user.pseudo"
                @blur="pseusoValidate"
            />
            <label class="text-xs md:text-sm pseudo" for="pseudo"
                >Pseudo*</label
            >
        </span>
            <div v-if="pseudoError" class="mt-2">
                <InlineMessage>6 caractères minimum requis </InlineMessage>
            </div>
        <span class="p-float-label">
            <InputText id="username" v-model="user.email" @blur="emailValidate"/>
            <label class="text-xs md:text-sm username" for="username"
                >Adresse Mail*</label
            >
        </span>
            <div v-if="emailError" class="mt-2">
                <InlineMessage> {{ emailError }} </InlineMessage>
            </div>
        <span class="p-float-label">
            <Password v-model="valueP" inputId="password"  @blur="passwordValidate" toggleMask />
            <label class="text-xs md:text-sm password" for="password"
                >Mot de passe*</label
            >
        </span>
            <div v-if="passwordError" class="mt-2">
                <InlineMessage>{{ passwordError }}</InlineMessage>
            </div>
        <span class="p-float-label">
            <Password v-model="valueP2" inputId="password" @blur="passwordValidate" toggleMask />
            <label class="text-xs md:text-sm w-10rem password" for="password"
                >Confirmation du mot de passe*</label
            >
        </span>
            <div v-if="passwordError" class="mt-2">
                <InlineMessage>{{ passwordError }}</InlineMessage>
            </div>
        <Dropdown
            v-model="selectedDepartment"
            :options="department"
            optionLabel="name"
            placeholder="Departement"
            class="custom-dropdown w-12rem md:w-12rem mt-4 mb-4"
        />

        <div class="card flex justify-content-center">
            <div class="flex flex-column gap-3">
                <label for="chbx">Sélectionne ton/tes styles</label>
                <div
                    v-for="category of categories"
                    :key="category.key"
                    class="flex align-items-center"
                >
                    <Checkbox
                        v-model="selectedCategories"
                        :inputId="category.key"
                        name="category"
                        :value="category.name"
                    />
                    <label :for="category.key">{{ category.name }}</label>
                </div>
            </div>
        </div>
        <div class="card flex flex-column my-4">
            <label class="mb-2">Description</label>
            <Textarea
                v-model="user.description"
                rows="5"
                autoResize
                cols="50"
                placeholder="Description libre pour plus de précisions sur toi, tu peux décrire ton groupe ou tes intentions et préciser ton style."
                class="resize"
            />
        </div>
        <Button
            class="submit"
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
import { authStore } from '@/stores/auth';
import router from "@/router";

const auth = authStore();
const showSnackbar = ref(false);
let Content = ref("")
const user = {
    email: '',
    pseudo: '',
    password: '',
    location: '',
    avatar: '',
    description: '',
};
const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,}$/;
const pseudoError = ref('');
const emailError = ref('');
const passwordError = ref('');

const pseusoValidate = () =>{
    if (user.pseudo.length < 6) {
        pseudoError.value = "Pseudo non valide"
    } else {
        pseudoError.value = '';
    }
}
const emailValidate = () =>{
    if (!emailRegex.test(user.email)) {
        emailError.value = "Email non valide e.g exemple@exemple.com"
    } else {
        emailError.value = '';
    }
}

const passwordValidate = () => {
    if (!passwordRegex.test(valueP.value)) {
        passwordError.value = "Votre mot de passe doit comporter minimum 8 caractères dont une minuscule, une majuscule et un chiffre"
    } else {
        passwordError.value = '';
    }
}

const register = async () => {
    try {
        if (valueP.value !== valueP2.value) {
            console.error('Les mots de passes ne correspondent pas. T\'es mauvais Jeanmi!');
            Content.value = "Les mots de passes ne correspondent pas. T'es mauvais Jeanmi!";
            showSnackbar.value = true;
            return
        }
        if(user.pseudo.length < 6) {
            console.error("T'abuses, tu pourrais faire un effort sur la longueur de ton pseudo !");
            Content.value = "T'abuses, tu pourrais faire un effort sur la longueur de ton pseudo !";
            showSnackbar.value = true;
        }
        user.password = valueP.value;
        console.log(user.password);
        user.location = selectedDepartment.value ? selectedDepartment.value.name : '';
        console.log(user.location);
        const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
        if (!emailRegex.test(user.email)) {
            console.error("L'email nest pas au format valide ! Perdu Jeanmi");
            Content.value = "L'email nest pas au format valide ! Perdu Jeanmi";
            showSnackbar.value = true;
        }
        await auth.registerUser(user.pseudo, user.email, user.password, user.avatar, user.location, user.description);
        router.push('/validation');
        console.log(user);
    } catch (error) {
        console.error('bouhouhou', error);
    }
}
// const description = ref("");
const categories = ref([
    { name: "Rock", key: "A" },
    { name: "Métal", key: "M" },
    { name: "Patate", key: "P" },
    { name: "ReseBananaarch", key: "R" },
    { name: "Miaou", key: "Mi" },
]);
const selectedCategories = ref(["Marketing"]);


const selectedDepartment = ref();
const department = ref([]);
onMounted(async () => {
    department.value = await auth.getDepartements;
    return {
    department,
}
});

const valueP = ref(null);
const valueP2 = ref(null);
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

.p-float-label {
    margin-top: 1.5rem;
}

.resize {
    width: 300px;
}
.required-fields {
    font-size: 0.8rem;
    color: rgb(99, 99, 99);
}

.p-button {
    margin-top: 1.5rem;
    background-color: #0e8388 !important;
    border-color: #0e8388 !important;
}

.custom-dropdown .p-dropdown-label {
    font-size: 0.8rem;
}

@media screen and (min-width: 768px) {
    .resize {
        width: 500px;
    }
    .custom-dropdown .p-dropdown-label {
        font-size: 1rem;
    }
    img {
        width: 10%;
        height: 10%;
    }
    h3 {
        font-size: 1.5rem;
    }
    .username {
        font-size: 1rem;
    }
    .password {
        font-size: 1rem;
    }
}
</style>
