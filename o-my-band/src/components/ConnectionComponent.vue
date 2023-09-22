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
            <InputText id="username" v-model="value" />
            <label class="username" for="username">Adresse Mail</label>
        </span>
        <span class="w-min md:w-max p-float-label">
            <Password v-model="valueP" inputId="password" toggleMask />
            <label class="password" for="password">Password</label>
        </span>
        <Button
            class="submit"
            type="button"
            label="Connexion"
            icon="pi pi-sign-in"
            :loading="loading"
            @click="load"
        />
    </div>
</template>

<script setup>
import { ref } from 'vue';

const valueP = ref(null);
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
