<template>
    <div class="container p-fluid flex justify-content-between fixed w-full flex-col items-center bg-neutral-100 text-center dark:bg-neutral-600 lg:text-left bottom-0 left-0">
        <div class="left-part">
            <p>Mentions légales</p>
        </div>
        <div class="right-part flex flex-wrap justify-content-between align-items-center">
            <router-link to="/faq" class="faq no-underline">FAQ &nbsp; &nbsp;</router-link>
            <p>Contact</p>
        </div>
    </div>
</template>

<style scoped>
.container {
    background-color: #0E8388;
    color: #CBE4DE !important;
}
.faq {
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
