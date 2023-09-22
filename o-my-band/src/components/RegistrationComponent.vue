<template>
    <div class="container flex flex-column align-items-center overflow-auto">
        <h3>Inscription</h3>
        <p class="required-fields">*Champs Obligatoires</p>
        <span class="p-float-label">
            <InputText id="pseudo" v-model="value" />
            <label class="text-xs md:text-sm pseudo" for="pseudo"
                >Pseudo*</label
            >
        </span>
        <span class="p-float-label">
            <InputText id="username" v-model="value" />
            <label class="text-xs md:text-sm username" for="username"
                >Adresse Mail*</label
            >
        </span>
        <span class="p-float-label">
            <Password v-model="valueP" inputId="password" toggleMask />
            <label class="text-xs md:text-sm password" for="password"
                >Mot de passe*</label
            >
        </span>
        <span class="p-float-label">
            <Password v-model="valueP2" inputId="password" toggleMask />
            <label class="text-xs md:text-sm w-10rem password" for="password"
                >Confirmation du mot de passe*</label
            >
        </span>
        <span class="p-float-label">
            <Password v-model="valueP2" inputId="password" toggleMask />
            <label class="text-xs md:text-sm w-10rem password" for="password"
                >Confirmation du mot de passe*</label
            >
        </span>
        <span class="p-float-label">
            <Password v-model="valueP2" inputId="password" toggleMask />
            <label class="text-xs md:text-sm w-10rem password" for="password"
                >Confirmation du mot de passe*</label
            >
        </span>
        <Dropdown
            v-model="selectedCity"
            :options="cities"
            optionLabel="name"
            placeholder="Département"
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
        <Button
            class="submit"
            type="button"
            label="Inscription"
            icon="pi pi-sign-in"
            :loading="loading"
            @click="load"
        />
    </div>
</template>

<script setup>
import { ref } from "vue";
// const datas = ["Rock", "Métal", "Patate", "Banana", "Miaou"];


const categories = ref([
    {name: "Rock", key: "A"},
    {name: "Métal", key: "M"},
    {name: "Patate", key: "P"},
    {name: "ReseBananaarch", key: "R"},
    {name: "Miaou", key: "Mi"}
]);
const selectedCategories = ref(['Marketing']);
const valueP = ref(null);
const valueP2 = ref(null);
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

.p-button {
    margin-top: 1.5rem;
    background-color: #0e8388 !important;
    border-color: #0e8388 !important;
}

.custom-dropdown .p-dropdown-label {
    font-size: 0.8rem;
}

@media screen and (min-width: 768px) {
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
