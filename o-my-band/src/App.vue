<template>
  <router-view/>
</template>

<style>
* {
  /* margin: 0; */
  padding: 0;
}
html {
  background-color: #161616;
  color: #CBE4DE;
  font-family: 'Montserrat', sans-serif;
}
hr {
  width: 70%;
  margin: 0 auto 0 auto !important;
  border: 1px solid #0E8388;
}

@media screen and (min-width: 768px) {

  .full-screen {
  width: 100vw;
  height: 100vh;
}
  hr {
  width: 50%;
  border: 1px solid #0E8388;
}

}
@import url('https://fonts.cdnfonts.com/css/montserrat');
</style>
