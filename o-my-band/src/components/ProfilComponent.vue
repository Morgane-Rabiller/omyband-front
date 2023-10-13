<template>
    <div class="container flex flex-column align-items-center mb-8">
        <div
            class="card my-7 mx-5 py-2 px-5"
            style="background-color: #cbe4de; border: 0.5rem solid #0e8388"
        >
            <h2 class="text-xl mb-5 md:text-2xl">Votre profil O'my band</h2>
            <div class="md:flex justify-content-between">
                <div class="md:w-30rem mr-8 text-sm md:text-base">
                    <div class="flex flex-wrap">
                        <img
                            class="avatar w-2rem mr-4"
                            src="../assets/img/user-icon.png"
                            alt="avatar"
                        />
                        <div class="flex flex-column mb-3">
                            <p class="font-semibold m-0">Pseudo</p>
                            <p class="font-semibold m-0 text-xs">Adresse mail</p>
                        </div>
                    </div>
                    <p>Département</p>
                    <p>Instrument</p>
                    <p>Styles musicaux</p>
                    <p>
                        Description : Saintes fesses de crucifix de taboire de
                        calvinouche de bout d'crisse de mautadit de viande à
                        chien de tabarnak de maudine de géritole de boswell de
                        christie de mosus d'ostie de Jésus de plâtre de crisse
                        de cul de baptême d'enfant d'chienne de ciboire de
                        bâtard de cibolac de verrat de marde de purée de
                        tabarslaque.
                    </p>
                </div>
                <hr class="my-5 md:hidden" />
                <div
                    class="hidden md:flex h-20rem surface-hover mb-6"
                    style="width: 0.3rem; background-color: #0e8388 !important"
                ></div>
                <div
                    class="flex flex-column align-items-center md:ml-8 text-base"
                >
                    <p class="font-semibold">Ma dernière annonce</p>
                    <Button class="my-2">Lien vers la dernière annonce</Button>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
* {
    color: #161616;
}
</style>
