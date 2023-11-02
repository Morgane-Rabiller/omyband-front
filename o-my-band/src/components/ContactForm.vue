<template>
    <div class="container flex flex-column align-items-center">
        <span class="p-float-label mb-3">
            <InputText id="username" v-model="object" class="w-20rem"/>
            <label for="username">Objet</label>
        </span>
        <span class="p-float-label">
            <Textarea v-model="value" rows="5" cols="30" class="w-20rem"/>
            <label>Message</label>
        </span>
        <Button>Envoyer mon message</Button>
    </div>
</template>

<script>
export default {
    data() {
        return {
            object: "",
            value: ""
        }
    }
}
</script>

<style>
.p-inputtext:enabled:hover {
    border-color: #0e8388 !important;
}
.p-inputtext:enabled:focus {
    border-color: #0e8388 !important;
    box-shadow: 0 0 0 0.2rem #addddd !important;
}
</style>