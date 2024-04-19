<template>
    <form
        class="container flex flex-column align-items-center mb-8"
        @submit.prevent="login"
    >
        <h3>Je me connecte</h3>
        <img
            class="img_login"
            src="../assets/img/chat_login.png"
            alt="chat_login"
        />
        <p class="required-fields">*Champs Obligatoires</p>
        <span class="flex flex-column">
            <label for="email" class="mb-1">Adresse mail*</label>
            <InputText
                id="email"
                v-model="user.email"
                class="w-20rem md:w-30rem"
                placeholder="Exemple@gmail.com"
                @blur="emailValidate"
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
                placeholder="Exemple2M5d4p7"
                @blur="passwordValidate"
                toggleMask
            />
        </span>
        <div v-if="passwordError" class="mt-2">
            <InlineMessage>{{ passwordError }}</InlineMessage>
        </div>
        <router-link
            :to="{ name: 'passwordForgot' }"
            class="forgot m-3 no-underline"
            >Mot de passe oublié ?</router-link
        >
        <Button
            class="submit"
            type="submit"
            label="Connexion"
            icon="pi pi-sign-in"
            :loading="loading"
            @click="login"
        />
        <div v-if="showSnackbar">
            <Message severity="warn" sticky>{{ message }}</Message>
        </div>
    </form>
</template>

<script setup>
import { ref } from "vue";
import { authStore } from "@/stores/auth";
import cookiesStorage from "@/services/cookie";
import router from "@/router";

const auth = authStore();
const user = {
    email: "",
    password: "",
};
const valueP = ref("");
const message = ref("");
const login = async () => {
    try {
        user.password = valueP.value;
        await auth.loginUser(user.email, user.password);
        await auth.setAuthHeaders(cookiesStorage.getItem());
        showSnackbar.value = false;
        router.push("/validation");
    } catch (error) {
        console.error("bouhouhou", error.response.data.message);
        showSnackbar.value = true;
        message.value = error.response.data.message;
    }
};

const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,}$/;

let showSnackbar = ref(false);
const emailError = ref("");
const passwordError = ref("");

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
</script>

<style>
.p-password .p-inputtext {
    width: 20rem;
}
.container {
    display: flex;
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

.required-fields {
    font-size: 0.8rem;
    color: rgb(99, 99, 99);
}

.same-width {
    padding-right: 0%;
}

.username {
    font-size: 0.7rem;
}

.p-input-icon-right > .p-inputtext {
    padding-right: 0 !important;
}

.p-inputtext {
    padding-right: 0 !important;
}

.p-button {
    margin-top: 1.5rem;
    background-color: #0e8388 !important;
    border-color: #0e8388 !important;
}

.forgot {
    color: #0e8388 !important;
}

@media screen and (min-width: 768px) {
    .p-password .p-inputtext {
        width: 30rem;
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
