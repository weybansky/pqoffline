<template>
  <div>
    <navbar></navbar>
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
