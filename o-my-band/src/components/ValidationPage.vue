<template>
    <div class="validation-page">
        <img src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/29baea34-ae86-4d5e-b859-53cf8da2bf5d/d6ckpq7-7a4aeb68-9738-449e-af0e-65136345c096.gif?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzI5YmFlYTM0LWFlODYtNGQ1ZS1iODU5LTUzY2Y4ZGEyYmY1ZFwvZDZja3BxNy03YTRhZWI2OC05NzM4LTQ0OWUtYWYwZS02NTEzNjM0NWMwOTYuZ2lmIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.3RF-_UG8dnQelICuuhQ7jStFZALnZIKGWzktgGZKdB4" alt="loading..." />
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
      }, 3000);
    },
  };
  </script>
  
<style lang="scss">
  .validation-page {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    margin: 0;
    padding: 0;
  }
</style>