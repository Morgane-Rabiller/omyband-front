<template>
    <div class="container p-fluid flex justify-content-between align-items-center fixed w-full flex-col items-center bg-neutral-100 text-center dark:bg-neutral-600 lg:text-left bottom-0 left-0">
        <div class="left-part">
            <router-link to="/legal-information" class="link no-underline">Mentions légales</router-link>
        </div>
        <div class="right-part flex flex-wrap justify-content-between align-items-center">
            <router-link to="/faq" class="link no-underline">FAQ &nbsp; &nbsp;</router-link>
            <p>Contact</p>
        </div>
    </div>
</template>

<style scoped>
.container {
    background-color: #0E8388;
    color: #CBE4DE !important;
}
.link {
    color: #CBE4DE;
}
.left-part {
    margin-left: 5%;
}
.right-part {
    margin-right: 5%;
}

@media screen and (min-width: 768px) {
    .container {
        font-size: 1rem;
    }
    .left-part {
        margin-left: 1%;
    }
    .right-part {
        margin-right: 1%;
    }
}
</style>
