<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <a class="navbar-brand" href="#">PQ Offline</a>
    <button
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarNav"
      aria-controls="navbarNav"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav">
        <router-link class="nav-item" to="/" tag="li" exact>
          <a class="nav-link">Home <span class="sr-only">(current)</span></a>
        </router-link>

        <router-link class="nav-item" to="/sync" tag="li" exact>
          <a class="nav-link">Sync</a>
        </router-link>

        <router-link class="nav-item" to="/login" tag="li" exact>
          <a class="nav-link">Login</a>
        </router-link>

        <!-- <li class="nav-item">
          <a
            class="nav-link disabled"
            href="#"
            tabindex="-1"
            aria-disabled="true"
            >Disabled</a
          >
        </li> -->
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  name: "NavBar"
};
</script>

<style scoped lang="scss"></style>
