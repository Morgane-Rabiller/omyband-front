<template>
    <div class="container flex justify-content-between">
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
.container {
    display: flex ;
    background-color: #0e8388;
    position: fixed;
    bottom: 0;
    right: 0;
    left: 0;
    width: 100%;
    font-size: 0.8rem;
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
