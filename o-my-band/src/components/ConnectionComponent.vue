<template>
    <div class="container flex flex-column align-items-center">
        <h3>Je me connecte</h3>
        <img
            class="img_login"
            src="../assets/img/chat_login.png"
            alt="chat_login"
        />
        <p class="required-fields">*Champs Obligatoires</p>
        <span class="w-min md:w-max p-float-label">
            <InputText id="username" v-model="user.email" @blur="emailValidate" />
            <label class="username" for="username">Adresse Mail*</label>
        </span>
            <div v-if="emailError" class="mt-2">
                <InlineMessage> {{ emailError }} </InlineMessage>
            </div>
        <span class="w-min md:w-max p-float-label">
            <Password v-model="valueP" inputId="password" @blur="passwordValidate" toggleMask />
            <label class="password" for="password">Mot de passe*</label>
        </span>
            <div v-if="passwordError" class="mt-2">
                <InlineMessage>{{ passwordError }}</InlineMessage>
            </div>
        <Button
            class="submit"
            type="button"
            label="Connexion"
            icon="pi pi-sign-in"
            :loading="loading"
            @click="login"
        />
        
        <div v-if="showSnackbar">
            <Message severity="warn" sticky>Email ou mot de passe incorrect</Message>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { authStore } from '@/stores/auth';

const auth = authStore();
const user = {
    email: '',
    password: '',
};
const valueP = ref('');
const userValide = ref(false);
const login = async () => {
    try {
        if(!userValide.value) {
            showSnackbar.value = true;
        }
        user.password = valueP.value;
        await auth.loginUser(user.email, user.password);
        await auth.setAuthHeaders(auth.jwToken);
    } catch (error) {
        console.error('bouhouhou', error);
    }
}

const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,}$/;

const showSnackbar = ref(false);
const emailError = ref('');
const passwordError = ref('');

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
// const valueP = ref(null);
</script>

<style>
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

.password {
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

@media screen and (min-width: 768px) {
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
