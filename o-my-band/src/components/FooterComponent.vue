<template>
    <div class="container p-fluid flex justify-content-between fixed w-full flex-col items-center bg-neutral-100 text-center dark:bg-neutral-600 lg:text-left bottom-0 left-0">
        <div class="left-part">
            <p>Mentions légales</p>
        </div>
        <div class="right-part flex flex-wrap justify-content-between">
            <p class="faq">FAQ &nbsp; &nbsp;</p>
            <p>Contact</p>
        </div>
    </div>
</template>

<style scoped>
/* .container {
    background-color: #0e8388;
    /* position: fixed;
    bottom: 0;
    right: 0;
    left: 0; *
    width: 100%;
    font-size: 0.8rem;
    margin: 4rem 0 0 0 !important;
} */

.container {
    background-color: #0E8388;
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
