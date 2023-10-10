<template>
    <div class="p-d-flex">
        <div class="p-d-flex loader" v-if="isLoading">
            <i class="pi pi-spin pi-spinner"></i>
        </div>
        <div class="sucess-message" v-else>
            <i class="pi pi-check"></i>
        </div>
    </div>

</template>

<script>
export default {
    data() {
        return {
            isLoading: true,
        };
},
    mounted() {
        setTimeout(() => {
            this.isLoading = false;
            this.$router.push('/');
        }, 3000)
    }   
}
       

</script>

<style>
.loader {
    font-size: 3rem;
}

.success-message {
  font-size: 2rem;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
}
</style>