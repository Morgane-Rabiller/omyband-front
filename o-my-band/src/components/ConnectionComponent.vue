<template>
    <div class="container flex flex-column align-items-center">
        <h1>Je me connecte</h1>
        <img
            class="img_login"
            src="../assets/img/chat_login.png"
            alt="chat_login"
        />
        <p class="required-fields">*Champs Obligatoires</p>
        <span class="p-float-label">
            <InputText id="username" v-model="value" />
            <label for="username">Adresse Mail</label>
        </span>
        <span class="p-float-label">
            <Password v-model="value" inputId="password" toggleMask/>
            <label for="password">Password</label>
        </span>
        <Button class="submit" type="button" label="Connexion" icon="pi pi-sign-in" :loading="loading" @click="load" />
    </div>
</template>

<script setup></script>

<style>
.container {
    display: flex;
}
img {
    width: 32%;
    height: 32%;
    border-radius: 5%;
    margin-bottom: 10%;
    box-shadow: 15%;
}

.p-float-label {
    margin-top: 1.5rem;
}

.required-fields {
    color: rgb(99, 99, 99);
}


.same-width {
    padding-right: 0%;
}

.p-input-icon-right > .p-inputtext {
    padding-right: 0 !important;
}

.p-inputtext {
    padding-right: 0 !important;
}

.p-button {
    margin-top: 1.5rem;
    background-color: #0E8388 !important;
    border-color: #0E8388 !important;
}
</style>
