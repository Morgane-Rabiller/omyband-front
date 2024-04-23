<template>
  <HeaderComponent />
  <div class="container flex flex-column m-5 mb-8">
    <h1 class="text-center">FAQ</h1>
    <h3>
      J'ai remarqué un problème sur le site, comment puis-je en avertir les administrateur
      ?
    </h3>
    <p>
      Pour prévenir les administrateurs d'un problème ou pour faire des suggestions pour
      l'amélioration du site, vous pouvez cliquer sur le lien contact en bas à droite de
      votre page.
    </p>
    <h3>J'aimerais répondre à une annonce, comment procéder ?</h3>
    <p>
      Pour répondre à une annonce il te suffit de cliquer sur "voir plus", sur une annonce
      et tu auras la possibilité d'écrire ton message à l'annonceur, il reçevra un mail et
      pourra te répondre.
    </p>
  </div>
  <FooterComponent />
</template>

<script>
import FooterComponent from "@/components/FooterComponent.vue";
import HeaderComponent from "@/components/HeaderComponent.vue";

export default {
  name: "HomeView",
  components: {
    HeaderComponent,
    FooterComponent,
  },
};
</script>
