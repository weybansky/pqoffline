<template>
  <div>
    <navbar></navbar>
    <div class="container mt-3">
      <div class="row col-12">
        <button class="btn btn-sm btn-outline-dark" @click="$router.back()">
          &larr; Go Back
        </button>
      </div>
    </div>
    <router-view />
  </div>
</template>

<script>
import navbar from "@/components/NavBar.vue";

export default {
  // name: "Home",
  components: {
    navbar
  }
};
</script>

<style lang="scss">
@import "~bootstrap/scss/bootstrap";
</style>
