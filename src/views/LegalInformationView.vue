<template>
  <HeaderComponent />
  <div class="container flex flex-column m-5">
    <h1 class="text-center">Mentions légales</h1>
    <h3>Directeur de la publication</h3>
    <p>Morgane Rabiller</p>
    <h3>Adresse de courrier électronique et numéro de téléphone</h3>
    <p>morganerabiller00@gmail.com - 07.60.75.02.87</p>
    <h3>Hébergeur du site</h3>
    Siret : 510 909 807 00032 RCS Clermont Ferrand SAS au capital de 100 000€ Opérateur
    Télécom déclaré ARCEP 09/2989 – AS50474
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
